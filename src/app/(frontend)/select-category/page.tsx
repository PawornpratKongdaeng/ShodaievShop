import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

type Props = {
  searchParams: Promise<{ brand?: string; model?: string; type?: string }>
}

export default async function SelectCategoryPage({ searchParams }: Props) {
  const params = await searchParams
  const brandValue = params.brand || ''
  const modelValue = params.model || ''
  const chosenType = params.type || 'original'

  const payload = await getPayload({ config })

  // 1. ดึงชื่อ Brand และ Model มาเพื่อแสดงผล (Breadcrumbs)
  let headerTitle = "หมวดหมู่สินค้า"
  try {
     const [brandDoc, modelDoc] = await Promise.all([
        brandValue ? payload.findByID({ collection: 'brands', id: brandValue }) : null,
        modelValue ? payload.findByID({ collection: 'models', id: modelValue }) : null
     ])
     if(brandDoc && modelDoc) {
        headerTitle = `${brandDoc.name} ${modelDoc.name}`
     }
  } catch (e) {
     // Ignore error if IDs are invalid
  }

  // 2. ดึง Categories (แก้ collection เป็น 'categories' ตามบริบท)
  const { docs: categories } = await payload.find({
    collection: 'categories', 
    limit: 50,
    sort: 'name'
  })

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            // ย้อนกลับไปหน้ารุ่น โดยส่ง brand เดิมกลับไป
            href={`/select-model?brand=${brandValue}&type=${chosenType}`} 
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-bold text-sm"
          >
            <span>←</span> เลือกรุ่นรถใหม่
          </Link>
          <div className="text-sm font-black text-gray-400 uppercase tracking-widest hidden sm:block">
            Step 03: Category
          </div>
          <div className="w-24"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-12">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1 bg-red-50 text-red-600 rounded-full text-xs font-black uppercase mb-4 tracking-widest border border-red-100">
             {headerTitle !== "หมวดหมู่สินค้า" ? headerTitle : "Selected Car"}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase">
            เลือกหมวดหมู่สินค้า
          </h1>
        </div>

        <div className="space-y-3">
          {categories.map((cat: any) => (
            <Link 
              key={cat.id}
              // 👉 ส่งทุกอย่างไปหน้า Products สุดท้าย
              href={`/products?brand=${brandValue}&model=${modelValue}&category=${cat.id}&type=${chosenType}`}
              className="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between transition-all hover:border-red-500 hover:shadow-md hover:translate-x-1"
            >
              <div className="flex items-center gap-4">
                 {/* ถ้า Category มี icon */}
                 {cat.icon?.url && (
                    <img src={cat.icon.url} alt="" className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100" />
                 )}
                 <span className="text-lg font-semibold text-gray-800 group-hover:text-red-600">
                    {cat.name}
                 </span>
              </div>
              <span className="text-gray-300 group-hover:text-red-500 transition-transform group-hover:translate-x-2">
                →
              </span>
            </Link>
          ))}
        </div>
        
        {categories.length === 0 && (
          <div className="text-center py-10 text-gray-400">ไม่พบหมวดหมู่สินค้า</div>
        )}

      </div>
    </div>
  )
}