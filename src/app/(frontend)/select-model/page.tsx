import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{ brand?: string; type?: string }>
}

export default async function SelectModelPage({ searchParams }: Props) {
  const params = await searchParams
  const brandValue = params.brand || ''
  const chosenType = params.type || 'original'

  const payload = await getPayload({ config })

  // ดึงชื่อ Brand มาแสดงหัวข้อ (UX ที่ดี)
  const brandDoc = brandValue
    ? await payload.findByID({
        collection: 'brands',
        id: brandValue,
      }).catch(() => null)
    : null

  const brandName = brandDoc?.name || 'Unknown'

  // ดึง Model ที่สัมพันธ์กับ Brand นี้
  const { docs: models } = await payload.find({
    collection: 'models',
    depth: 1, // ดึงรูปภาพออกมาด้วย
    limit: 100,
    where: {
      brand: {
        equals: brandValue, // ✅ ใช้ equals สำหรับ ID
      },
    },
  })

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href={`/select-brand?type=${chosenType}`}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors font-bold text-sm"
          >
            <span>←</span> ย้อนกลับ
          </Link>
          <div className="text-sm font-black text-gray-400 uppercase tracking-widest hidden sm:block">
            Step 02: Select Model
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-12">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 italic uppercase">
            เลือกรุ่นรถ <span className="text-red-600">{brandName}</span>
          </h1>
          <p className="text-gray-500 font-medium mt-2">
            เลือกรุ่นรถเพื่อลุยขั้นตอนต่อไป
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model: any) => {
            // เช็ค URL รูปภาพให้ปลอดภัย
            const imageUrl = (typeof model.image === 'object' && model.image?.url) 
              ? model.image.url 
              : '/fallback-car.jpg'

            return (
              <Link
                key={model.id}
                // 👉 ส่ง brand, model, type ไปหน้าถัดไป
                href={`/select-category?brand=${brandValue}&model=${model.id}&type=${chosenType}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-500 flex flex-col"
              >
                <div className="aspect-[16/10] bg-gray-50 overflow-hidden relative">
                  <img
                    src={imageUrl}
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Badge ปีรถ (ถ้ามี) */}
                  {model.yearRange && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-gray-500 shadow-sm">
                      {model.yearRange}
                    </div>
                  )}
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-gray-800 group-hover:text-red-600 transition-colors italic uppercase">
                      {model.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
                      คลิกเพื่อเลือกหมวดหมู่
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {models.length === 0 && (
          <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-gray-100 text-center">
            <p className="text-gray-400 font-bold italic uppercase">
              ไม่มีข้อมูลรุ่นของยี่ห้อ {brandName} ในขณะนี้
            </p>
            <Link href="/" className="text-red-600 text-sm font-bold mt-4 inline-block underline">
              กลับไปหน้าหลัก
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}