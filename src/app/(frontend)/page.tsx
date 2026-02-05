import Link from 'next/link'
import Image from 'next/image'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

// ✅ 1. ตรวจสอบ Environment
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://www.shodaievshop.com' 
  : 'http://localhost:3000'

// 🖼️ ตั้งค่ารูปภาพเริ่มต้น (Default)
// Desktop: รูปแนวนอนยาว (อันเดิม)
const defaultBannerDesktop = `${BASE_URL}/3.png` 
// Mobile: รูปแนวตั้ง/จัตุรัส (ต้องเอารูปไปใส่ใน folder public แล้วตั้งชื่อนี้)
const defaultBannerMobile = `${BASE_URL}/4.png` 

const TYPE_IDS = {
  modified: '6974187da404b23586260449',
  original: '69741874a404b23586260446',
}

// --- Icons (เหมือนเดิม) ---
const OriginalIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.83-5.83m0 0a2.652 2.652 0 1 1-3.75-3.75 2.652 2.652 0 0 1 3.75 3.75Zm-9.58-9.44a2.652 2.652 0 0 0-3.75 3.75l5.83 5.83m0 0a2.652 2.652 0 0 1 3.75-3.75 2.652 2.652 0 0 1-3.75 3.75Z" /></svg>)
const TuningIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" /></svg>)
const ContactIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.883.213 1.5 1.015 1.5 1.912v6.705a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V10.423c0-.897.617-1.699 1.5-1.912l1.447-.348a18.333 18.333 0 0 1 14.506 0l1.447.348Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M18.914 13.409a2.25 2.25 0 1 1-3.596 2.632M15.75 9l-4.5 4.5m0 0-4.5-4.5m4.5 4.5V3" /></svg>)

export default async function HomePage() {
  const payload = await getPayloadHMR({ config: configPromise })
  const banner = await payload.findGlobal({ slug: 'hero-banner' })

  const bannerImgUrl = typeof banner.backgroundImage === 'object' ? banner.backgroundImage?.url : null
  const bannerImgAlt = typeof banner.backgroundImage === 'object' ? banner.backgroundImage?.alt : 'Auto Parts'

  // Logic จัดการ URL รูปภาพ
  let desktopSrc = defaultBannerDesktop
  
  if (bannerImgUrl) {
    desktopSrc = bannerImgUrl.startsWith('http') ? bannerImgUrl : `${BASE_URL}${bannerImgUrl.startsWith('/') ? '' : '/'}${bannerImgUrl}`
  }

  // ⚠️ หมายเหตุ: เนื่องจากใน CMS ตอนนี้มีช่องใส่รูปเดียว เราจึงใช้รูป Default สำหรับ Mobile ไปก่อน
  // ถ้าในอนาคตคุณเพิ่ม Field "mobileImage" ใน CMS ก็สามารถมาแก้ตรงนี้ได้
  const mobileSrc = defaultBannerMobile 

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      
      {/* ✅ Banner Section: แยกการแสดงผลตามหน้าจอ */}
      <section className="w-full bg-zinc-950 overflow-hidden relative">
        
        {/* 📱 1. Mobile Banner (แสดงเฉพาะจอเล็ก md:hidden) */}
        {/* ใช้ aspect-square (1:1) หรือ aspect-[4/5] เพื่อให้แสดงผลแนวตั้งได้สวยงาม */}
        <div className="block md:hidden relative w-full aspect-square">
          <Image
            src={mobileSrc}
            alt={bannerImgAlt || 'Mobile Banner'}
            fill
            priority
            className="object-cover" // ใช้ cover เพื่อให้เต็มพื้นที่สี่เหลี่ยมจัตุรัส
            unoptimized={true}
          />
        </div>

        {/* 💻 2. Desktop Banner (แสดงเฉพาะจอใหญ่ md:block) */}
        {/* ใช้ aspect-[1920/600] หรือตามสัดส่วนรูปจริงของคุณ */}
        <div className="hidden md:block relative w-full aspect-[1920/600]">
          <Image
            src={desktopSrc}
            alt={bannerImgAlt || 'Desktop Banner'}
            fill
            priority
            className="object-cover" // ใช้ cover หรือ contain ตามความเหมาะสมของรูป Desktop
            unoptimized={true}
          />
        </div>

      </section>

      <section id="select-section" className="max-w-7xl mx-auto px-4 mt-8 relative z-30 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Box 1: อะไหล่เดิม */}
          <Link href={`/select-brand?type=${TYPE_IDS.original}`} className="group bg-white p-8 rounded-2xl shadow-xl shadow-black/5 border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-900/10">
            <div className="text-gray-400 group-hover:text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-500"><OriginalIcon /></div>
            <h2 className="text-xl font-black text-gray-800 group-hover:text-blue-700 mb-2 italic uppercase tracking-tight transition-colors">อะไหล่เดิม</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">อะไหล่แท้ศูนย์ 100% และอะไหล่ทดแทนมาตรฐาน OEM</p>
            <span className="mt-auto font-bold text-blue-600 flex items-center gap-2 text-xs uppercase tracking-[0.1em]">เข้าสู่ระบบ <span className="group-hover:translate-x-1 transition-transform">→</span></span>
          </Link>

          {/* Box 2: อะไหล่แต่ง */}
          <Link href={`/select-brand?type=${TYPE_IDS.modified}`} className="group bg-white p-8 rounded-2xl shadow-xl shadow-black/5 border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-red-900/10">
            <div className="text-gray-400 group-hover:text-red-600 mb-4 group-hover:scale-110 transition-transform duration-500"><TuningIcon /></div>
            <h2 className="text-xl font-black text-gray-800 group-hover:text-red-600 mb-2 italic uppercase tracking-tight transition-colors">อะไหล่แต่ง</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">อัปเกรดประสิทธิภาพและรูปลักษณ์ด้วยอะไหล่แต่งคุณภาพสูง</p>
            <span className="mt-auto font-bold text-red-600 flex items-center gap-2 text-xs uppercase tracking-[0.1em]">เลือกชมสินค้า <span className="group-hover:translate-x-1 transition-transform">→</span></span>
          </Link>

          {/* Box 3: ติดต่อสอบถาม */}
          <div className="group bg-zinc-900 p-8 rounded-2xl shadow-xl shadow-black/20 border border-zinc-800 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="text-red-500 mb-4 relative z-10"><ContactIcon /></div>
            <h2 className="text-xl font-black text-white mb-2 italic uppercase tracking-tight relative z-10">ติดต่อสอบถาม</h2>
            <div className="text-zinc-400 text-sm space-y-2 mb-4 relative z-10">
              <p className="flex items-center justify-center gap-2"><span className="text-white font-bold">@shodaievshop</span></p>
              <p className="flex items-center justify-center gap-2"><span className="text-white font-bold">099-556-6453</span></p>
            </div>
            <Link href="https://line.me/R/ti/p/@shodaievshop" target="_blank" className="mt-auto w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all text-sm relative z-10">ทักแชทสอบถามเลย</Link>
          </div>
        </div>
      </section>
    </div>
  )
}