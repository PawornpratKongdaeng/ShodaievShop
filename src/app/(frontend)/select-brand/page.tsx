import Link from 'next/link'
// 👇 1. เปลี่ยน import ตรงนี้
import { getPayload } from 'payload'
import config from '@/payload.config' 

export default async function SelectBrandPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  // 👇 2. ต้อง await searchParams (Next.js 15)
  const resolvedParams = await searchParams
  const type = resolvedParams?.type || 'original'

  // 👇 3. เรียกใช้ getPayload แบบใหม่
  const payload = await getPayload({ config })

  const { docs: brands } = await payload.find({
    collection: 'brands',
    limit: 100, // แก้เป็น 100 หรือตามต้องการ (limit 0 อาจจะโหลดหนักถ้าข้อมูลเยอะ)
    sort: 'name',
  })

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">

      {/* Header Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-bold text-sm"
          >
            ย้อนกลับ
          </Link>
          <div className="text-sm font-black text-gray-400 uppercase tracking-widest hidden sm:block">
            Step 01: Select Brand
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 italic uppercase">
            เลือกยี่ห้อรถ
          </h1>
          <p className="text-gray-500 font-medium mt-2">
            เลือกยี่ห้อรถเพื่อดำเนินการขั้นตอนถัดไป
          </p>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand: any) => (
            <Link
              key={brand.id}
              href={`/select-model?brand=${brand.id}&type=${type}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-500 px-6 py-10 flex items-center justify-center"
            >
              {/* ถ้ามี Logo ให้ใส่ตรงนี้ได้ */}
              <span className="text-xl font-black text-gray-800 group-hover:text-red-600 transition-colors italic uppercase tracking-wide">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {brands.length === 0 && (
          <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-gray-100 text-center">
            <p className="text-gray-400 font-bold italic uppercase">
              ไม่มีข้อมูลแบรนด์ในระบบ
            </p>
            <Link
              href="/"
              className="text-red-600 text-sm font-bold mt-4 inline-block underline"
            >
              กลับไปหน้าหลัก
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}