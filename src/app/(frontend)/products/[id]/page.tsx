import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

// --- Icons ---
const CartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
)

const CarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.125 1.125 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
)

// --- Page Component ---
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config })

  // ดึงข้อมูลสินค้า (ใช้ ID)
  const product = await payload.findByID({
    collection: 'products',
    id: id,
    depth: 2, // สำคัญ: ดึงลึก 2 ระดับเพื่อให้ได้ชื่อ Brand, Model, Category, Type
  }).catch(() => null)

  // ถ้าไม่เจอสินค้า
  if (!product) {
    return notFound()
  }

  // --- Helper Variables (Safe Data Access) ---
  
  // 1. Image: เช็คว่าเป็น Object ไหมก่อนดึง URL
  const imageUrl = (typeof product.image === 'object' && product.image?.url) 
    ? product.image.url 
    : '/placeholder.jpg' // ใส่รูป Placeholder ของคุณที่นี่

  // 2. Brand: ดึงชื่อยี่ห้อ (Config คุณใช้ relationTo: 'brands')
  const brandName = typeof product.brand === 'object' 
    ? (product.brand as any)?.name 
    : ''

  // 3. Category: ดึงชื่อหมวดหมู่
  const categoryName = typeof product.category === 'object' 
    ? (product.category as any)?.name || (product.category as any)?.title 
    : 'ทั่วไป'

  // 4. Type: ดึงประเภทอะไหล่ (เดิม/แต่ง)
  const typeName = typeof product.type === 'object'
    ? (product.type as any)?.name || (product.type as any)?.title
    : ''

  // 5. Car Models: เนื่องจาก hasMany: true ตัวแปรนี้จะเป็น Array
  const carModels = Array.isArray(product.carModel) ? product.carModel : []

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-gray-500 mb-8 flex flex-wrap gap-2 items-center">
          <Link href="/" className="hover:text-red-600 transition-colors">หน้าแรก</Link>
          <span className="text-gray-300">/</span>
          <Link href="/products" className="hover:text-red-600 transition-colors">สินค้าทั้งหมด</Link>
          <span className="text-gray-300">/</span>
          <span className="font-medium text-gray-900 truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* --- Left Column: Image --- */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50 group">
              <Image 
                src={imageUrl} 
                alt={product.name || 'Product Image'} 
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" 
                priority
              />
            </div>
          </div>

          {/* --- Right Column: Details --- */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Header */}
            <div className="mb-6 border-b border-gray-100 pb-6">
               <div className="flex gap-2 mb-3">
                  {brandName && (
                    <span className="inline-block px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                      {brandName}
                    </span>
                  )}
                  {typeName && (
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${typeName.includes('แต่ง') ? 'border-orange-200 bg-orange-50 text-orange-600' : 'border-blue-200 bg-blue-50 text-blue-600'}`}>
                      {typeName}
                    </span>
                  )}
               </div>

               {/* ✅ ใช้ product.name ตาม Config */}
               <h1 className="text-3xl font-black text-gray-900 mb-2 leading-tight">{product.name}</h1>
               <p className="text-sm text-gray-500 font-mono">
                 Part No: <span className="text-gray-700 font-bold">{product.partNumber || '-'}</span>
               </p>
            </div>

            {/* Price & Action */}
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                   <p className="text-sm text-gray-500 mb-1">ราคาจำหน่าย</p>
                   <span className="text-4xl font-black text-red-600">฿{product.price?.toLocaleString()}</span>
                </div>
                <div className="text-right">
                   <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-bold">
                     <CheckIcon className="w-4 h-4" /> มีสินค้าพร้อมส่ง
                   </span>
                </div>
              </div>

              <a 
  href="https://line.me/R/ti/p/@shodaiev" 
  target="_blank" 
  rel="noopener noreferrer"
  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-14 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/20 active:scale-95"
>
  {/* icon */}
  <CartIcon className="w-6 h-6" /> 
  
  {/* text */}
  <span>ติดต่อสอบถาม Line: @ShodaiEv</span>
</a>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">ข้อมูลจำเพาะ</h3>
              
              <div className="grid grid-cols-1 gap-4 text-sm">
                
                {/* Category */}
                <div className="flex border-b border-gray-100 pb-3">
                   <span className="text-gray-500 w-32 shrink-0">หมวดหมู่</span>
                   <span className="font-medium text-gray-900">{categoryName}</span>
                </div>

                {/* Car Models (รองรับ hasMany: true) */}
                <div className="flex border-b border-gray-100 pb-3">
                   <span className="text-gray-500 w-32 shrink-0 flex items-center gap-1">
                      <CarIcon className="w-4 h-4" /> รุ่นรถหลัก
                   </span>
                   <div className="flex flex-wrap gap-2">
                      {carModels.length > 0 ? (
                        carModels.map((model: any, index: number) => (
                           <span key={index} className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-medium">
                             {/* ปรับตรงนี้ถ้า Collection models ใช้ field 'name' หรือ 'title' */}
                             {typeof model === 'object' ? (model.name || model.title) : 'Unknown Model'}
                           </span>
                        ))
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                   </div>
                </div>

                {/* Compatibility (Manual Array) */}
                {product.compatibility && product.compatibility.length > 0 && (
                   <div className="flex flex-col pt-2">
                     <span className="text-gray-500 mb-2 block">รองรับเพิ่มเติม:</span>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                       {product.compatibility.map((item: any, i: number) => (
                         <div key={i} className="flex items-center gap-2 bg-white border border-gray-200 p-2 rounded-md">
                           <span className="font-bold text-gray-700">{item.make}</span>
                           <span className="text-gray-600">{item.model}</span>
                           {item.year && <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Year {item.year}</span>}
                         </div>
                       ))}
                     </div>
                   </div>
                )}
                
              </div>
            </div>

            {/* Tags (Optional) */}
            {product.tags && product.tags.length > 0 && (
               <div className="mt-6 flex flex-wrap gap-2">
                  {product.tags.map((t: any, i: number) => (
                     <span key={i} className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-sm border border-gray-100">
                        #{t.tag}
                     </span>
                  ))}
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}