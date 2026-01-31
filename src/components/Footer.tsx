import Link from 'next/link'

// --- Icons ---
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.733.77-2.733 2.209v1.761h3.906l-.559 3.667h-3.347v7.98H9.101Z" />
  </svg>
)

const LineIcon = ({ className }: { className?: string }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.174-.51.432-.596.065-.021.134-.031.203-.031.21 0 .391.09.506.25l2.443 3.317V8.109c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.769zm-5.355 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.769zm-1.992 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.769zM12 21.48c-6.627 0-12-3.757-12-8.425 0-2.43 1.453-4.636 3.869-6.223 2.196-1.442 5.174-2.26 8.131-2.26 6.627 0 12 3.758 12 8.483 0 4.668-5.373 8.425-12 8.425z" />
  </svg>
)

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
    />
  </svg>
)

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-16 pb-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Info */}
          <div>
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">
              Shodai Ev Shop
            </h2>
            <p className="text-sm leading-relaxed mb-6 text-zinc-500">
              ศูนย์รวมอะไหล่รถยนต์คุณภาพสูง ทั้งอะไหล่แท้เดิมโรงงานและอะไหล่แต่งซิ่ง
              คัดสรรสิ่งที่ดีที่สุดเพื่อรถคุณ
            </p>
            <div className="flex gap-4"></div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">เมนูลัด</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-red-600 transition-colors">
                  สินค้าทั้งหมด
                </Link>
              </li>
              <li>
                {/* ใส่ ID ของหมวดของเดิมตรงนี้ */}
                <Link
                  href="/select-brand?type=6972c5b7d719f186f104ea46"
                  className="hover:text-red-600 transition-colors"
                >
                  อะไหล่เดิม
                </Link>
              </li>
              <li>
                {/* ใส่ ID ของหมวดของแต่งตรงนี้ */}
                <Link
                  href="/select-brand?type=6972c5c3d719f186f104ea5c"
                  className="hover:text-red-600 transition-colors"
                >
                  อะไหล่แต่ง
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6">ติดต่อเรา</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-red-600 shrink-0" />
                <a href="tel:0995566453" className="hover:text-white transition-colors">
                  099-556-6453
                </a>
              </li>
              <li className="flex items-center gap-3">
                <LineIcon className="w-5 h-5 text-red-600 shrink-0" />
                <a
                  href="https://line.me/R/ti/p/@shodaievshop"
                  target="_blank"
                  className="hover:text-white transition-colors"
                >
                  @shodaievshop
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Call to Action */}
          <div>
            <h3 className="text-white font-bold mb-6">สอบถามด่วน?</h3>
            <p className="text-xs text-zinc-500 mb-4">
              หากหาสินค้าไม่เจอ หรือต้องการปรึกษาเรื่องอะไหล่ ทักแชทหาเราได้เลย
            </p>
            <a
              href="https://line.me/R/ti/p/@shodaievshop"
              target="_blank"
              className="block w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white text-center rounded-lg font-bold text-sm transition-all shadow-lg shadow-red-900/20"
            >
              แอด LINE สอบถาม
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>&copy; {new Date().getFullYear()} Shodai Ev Parts. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-400">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-zinc-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
