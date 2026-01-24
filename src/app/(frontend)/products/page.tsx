import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

type Args = {
  searchParams: Promise<{
    brand?: string
    model?: string
    type?: string
    category?: string
  }>
}

export default async function ProductsPage({ searchParams }: Args) {
  // 1. รับค่าจาก URL
  const { brand, model, type, category } = await searchParams
  const payload = await getPayloadHMR({ config: configPromise })

  // 2. สร้าง Query
  const where: any = {
    and: [],
  }

  // --- เริ่มการกรอง (Filter) ---
  // เช็คว่ามีค่าส่งมาจริงไหมก่อนที่จะ push เข้าไป
  if (type) where.and.push({ type: { equals: type } })
  if (brand) where.and.push({ brand: { equals: brand } })
  if (model) where.and.push({ carModel: { equals: model } }) // map 'model' จาก url เข้า field 'carModel'
  if (category) where.and.push({ category: { equals: category } })

  // 3. ค้นหาข้อมูล
  const { docs: products } = await payload.find({
    collection: 'products',
    where: where,
    depth: 1, // ดึงข้อมูล field ที่ relate มาด้วย (เช่น ชื่อแบรนด์)
    limit: 100,
  })

  // ------------------------------------------------------------------
  // 🔍 DEBUG ZONE: ดู Log นี้ใน Terminal เพื่อหา ID ที่ถูกต้อง
  // ------------------------------------------------------------------
  console.log('--- 🛒 Products Page Debug ---')
  console.log('1. URL Params (สิ่งที่ส่งมา):', { brand, model, type, category })
  
  if (products.length > 0) {
    console.log(`2. Found ${products.length} products. Sample IDs:`)
    const p = products[0] as any
    console.log(`   สินค้า: ${p.name}`)
    console.log(`   - Brand ID: ${typeof p.brand === 'object' ? p.brand?.id : p.brand}`)
    console.log(`   - Model IDs:`, p.carModel?.map((m: any) => typeof m === 'object' ? m.id : m))
    console.log(`   - Type ID:  ${typeof p.type === 'object' ? p.type?.id : p.type}`)
    console.log(`   - Category ID: ${typeof p.category === 'object' ? p.category?.id : p.category}`)
  } else {
    console.log('2. ❌ ไม่พบสินค้า (ตรวจสอบ ID ใน URL ว่าตรงกับ Database หรือไม่)')
  }
  console.log('------------------------------')
  // ------------------------------------------------------------------


  // 4. แสดงผล
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">รายการสินค้า</h1>
          <p className="text-slate-500">
            พบสินค้าทั้งหมด {products.length} รายการ
          </p>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <h3 className="text-xl font-semibold text-slate-600">ไม่พบสินค้าที่คุณค้นหา</h3>
            <p className="text-slate-400 mt-2">ลองลบตัวกรองบางอย่างออก หรือตรวจสอบ ID ใน URL</p>
            <Link href="/products" className="mt-6 inline-block text-blue-600 hover:underline">
              ล้างตัวกรองทั้งหมด
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => {
              
              // Logic จัดการรูปภาพ (เติม Domain ถ้าจำเป็น)
              let imgUrl = product.image?.url || '/placeholder.jpg'
              if (imgUrl.startsWith('/') && process.env.NEXT_PUBLIC_SERVER_URL) {
                 imgUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${imgUrl}`
              }

              // ป้องกันชื่อว่าง
              const productName = product.name || 'สินค้า'

              // ดึงชื่อ Type แบบปลอดภัย
              const typeName = typeof product.type === 'object' 
                ? (product.type?.name || product.type?.title || 'Parts') 
                : 'Parts'

              return (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-100 group"
                >
                  <div className="relative aspect-square bg-slate-100">
                    <Image 
                      src={imgUrl} 
                      alt={productName}
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-800 line-clamp-2 mb-2 h-12">
                      {productName} 
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-red-600 font-bold text-lg">
                        ฿{product.price?.toLocaleString() || 0}
                      </span>
                      {product.type && (
                          <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500">
                            {typeName}
                          </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}