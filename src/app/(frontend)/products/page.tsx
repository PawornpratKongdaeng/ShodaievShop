import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload' // ✅ เปลี่ยนให้เหมือนไฟล์อื่น (Next.js 15 Standard)
import config from '@/payload.config'

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
  const payload = await getPayload({ config })

  // --- 🛠️ 1. Smart Type Resolver (แก้ปัญหา String vs ID) ---
  // ถ้า type ส่งมาเป็น text (เช่น 'original') แต่ DB เก็บเป็น ID เราต้องไปหา ID มาก่อน
  let typeIdFilter = type
  let typeNameDisplay = type || ''

  if (type && type.length < 24) { 
    // ถ้า text สั้นๆ ไม่ใช่ ID 24 ตัว (เช่นคำว่า 'original', 'racing')
    // ลองไปค้นหาใน Collection 'types' (สมมติว่าคุณมี collection นี้)
    try {
        const { docs: typeDocs } = await payload.find({
            collection: 'types' as any, // casting เพื่อเลี่ยง type check error ชั่วคราว
            where: {
                or: [
                    { name: { equals: type } }, // หาจากชื่อ
                    { slug: { equals: type } }  // หรือหาจาก slug
                ]
            },
            limit: 1
        })
        if (typeDocs.length > 0) {
            typeIdFilter = typeDocs[0].id // ✅ ได้ ID จริงมาแล้ว!
            typeNameDisplay = (typeDocs[0] as any).name
        }
    } catch (e) {
        console.log('Skipping type lookup (collection might not exist)')
    }
  }

  // --- 🛠️ 2. ดึงชื่อ Brand / Model / Category มาแสดงหัวข้อ ---
  let headerTitle = "รายการสินค้า"
  try {
      const [brandDoc, modelDoc, catDoc] = await Promise.all([
         brand ? payload.findByID({ collection: 'brands', id: brand }) : null,
         model ? payload.findByID({ collection: 'models', id: model }) : null,
         category ? payload.findByID({ collection: 'categories', id: category }) : null
      ])
      
      const brandName = brandDoc ? (brandDoc as any).name : ''
      const modelName = modelDoc ? (modelDoc as any).name : ''
      const catName = catDoc ? (catDoc as any).name : ''
      
      if(brandName || modelName) {
          headerTitle = `${brandName} ${modelName} ${catName}`.trim()
      }
  } catch(e) {}


  // --- 🛠️ 3. สร้าง Query ---
  const where: any = {
    and: [],
  }

  if (typeIdFilter) where.and.push({ type: { equals: typeIdFilter } })
  if (brand) where.and.push({ brand: { equals: brand } })
  if (model) where.and.push({ carModel: { equals: model } }) // field ใน DB คือ carModel
  if (category) where.and.push({ category: { equals: category } })

  // --- 🛠️ 4. ค้นหาข้อมูลสินค้า ---
  const { docs: products } = await payload.find({
    collection: 'products',
    where: where,
    depth: 1, 
    limit: 100,
  })

  // ------------------------------------------------------------------
  // 🔍 DEBUG ZONE: (เอาไว้ดูว่าค่าที่ Resolve มาถูกต้องไหม)
  // ------------------------------------------------------------------
  console.log('--- 🛒 Products Page Debug ---')
  console.log('RAW params:', { brand, model, type, category })
  console.log('RESOLVED Type Filter:', typeIdFilter) 
  console.log('Found:', products.length, 'items')
  // ------------------------------------------------------------------

  // 5. แสดงผล
  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      
      {/* Header Sticky แบบเดียวกับหน้าอื่น */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href={`/select-category?brand=${brand}&model=${model}&type=${type}`}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-bold text-sm"
          >
            <span>←</span> เลือกหมวดหมู่ใหม่
          </Link>
          <div className="text-sm font-black text-gray-400 uppercase tracking-widest hidden sm:block">
            Step 04: Product List
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12">
        
        {/* Title Section */}
        <div className="mb-8 text-center md:text-left">
           {typeNameDisplay && (
               <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-2 uppercase tracking-wide">
                   Type: {typeNameDisplay}
               </span>
           )}
           <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase italic">
             {headerTitle === "รายการสินค้า" ? "รายการสินค้าทั้งหมด" : headerTitle}
           </h1>
           <p className="text-gray-500 mt-2">
             พบสินค้าทั้งหมด <strong className="text-red-600">{products.length}</strong> รายการ
           </p>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <h3 className="text-xl font-bold text-gray-400 uppercase">ไม่พบสินค้าที่คุณค้นหา</h3>
            
            {/* Debug UI สำหรับ User (Developer ดู) */}
            <div className="mt-4 p-4 bg-yellow-50 inline-block text-left rounded text-xs font-mono text-yellow-800 border border-yellow-200">
                <p><strong>Debug Info:</strong></p>
                <p>Filter Brand ID: {brand || 'None'}</p>
                <p>Filter Model ID: {model || 'None'}</p>
                <p>Filter Type: {type} {'->'} {typeIdFilter} (Resolved)</p>
            </div>
            
            <div className="mt-6">
                <Link href="/" className="text-red-600 font-bold underline">
                ล้างการค้นหาและเริ่มใหม่
                </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => {
              
              // Logic รูปภาพ
              let imgUrl = product.image?.url || '/placeholder.jpg'
              // ถ้าไม่มี http นำหน้า และ environment url มีค่า ให้เติมเข้าไป
              if (imgUrl.startsWith('/') && process.env.NEXT_PUBLIC_SERVER_URL) {
                 imgUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${imgUrl}`
              } else if (imgUrl.startsWith('/')) {
                 // Fallback กรณีไม่มี env (เช่น dev mode บางครั้ง)
                 // imgUrl = imgUrl 
              }

              const productName = product.name || 'สินค้า'
              const pPrice = product.price ? product.price.toLocaleString() : 'สอบถามราคา'

              return (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`} 
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-square bg-slate-50">
                    <Image 
                      src={imgUrl} 
                      alt={productName}
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Tag Type มุมภาพ */}
                    {product.type && (
                         <div className="absolute top-2 right-2 bg-black/50 backdrop-blur text-white text-[10px] px-2 py-1 rounded font-bold">
                             {typeof product.type === 'object' ? product.type.name : 'Part'}
                         </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-gray-800 line-clamp-2 mb-2 h-12 text-sm md:text-base group-hover:text-red-600 transition-colors">
                      {productName} 
                    </h3>
                    
                    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                      <span className="text-red-600 font-black text-lg">
                        ฿{pPrice}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-red-600 group-hover:text-white transition-all">
                        →
                      </span>
                    </div>

                    {/* Debug ID (ซ่อนไว้ หรือเปิดคอมเมนต์ถ้าจะดู) */}
                    {/* <div className="mt-2 pt-2 border-t border-dashed border-gray-200 text-[10px] text-gray-400 font-mono">
                        TypeID: {typeof product.type === 'object' ? product.type?.id : product.type}
                    </div> 
                    */}
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