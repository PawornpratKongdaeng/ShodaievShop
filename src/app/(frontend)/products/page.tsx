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

  // --- เริ่มการกรอง ---
  if (type) where.and.push({ type: { equals: type } })
  if (brand) where.and.push({ brand: { equals: brand } })
  if (model) where.and.push({ carModel: { equals: model } })
  if (category) where.and.push({ category: { equals: category } })

  // 3. ค้นหาข้อมูล
  const { docs: products } = await payload.find({
    collection: 'products',
    where: where,
    depth: 1,
    limit: 100,
    // overrideAccess: true, // เปิดบรรทัดนี้ถ้าต้องการเทสโดยไม่สน Permission
  })

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
            <p className="text-slate-400 mt-2">ลองลบตัวกรองบางอย่างออก หรือตรวจสอบข้อมูลในหลังบ้าน</p>
            <Link href="/" className="mt-6 inline-block text-blue-600 hover:underline">
              กลับไปหน้าแรก
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => {
              // --- ส่วน Logic ที่แก้เพิ่ม (UI ไม่เปลี่ยน) ---
              
              // 1. จัดการ URL รูปภาพ (แก้ปัญหารูปไม่ขึ้นถ้าเป็น Relative Path)
              let imgUrl = product.image?.url || '/placeholder.jpg'
              if (imgUrl.startsWith('/') && process.env.NEXT_PUBLIC_SERVER_URL) {
                 imgUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${imgUrl}`
              }

              // 2. ป้องกันชื่อสินค้าว่าง
              const productName = product.name || 'สินค้า'

              // 3. ดึงชื่อ Type แบบปลอดภัย (กัน Error)
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