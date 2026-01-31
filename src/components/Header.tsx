'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ✅ กำหนด Base URL
const BASE_URL = 'https://www.shodaievshop.com'
// ✅ ใช้ Full URL สำหรับ Default Logo
const defaultLogo = `${BASE_URL}/IMG_3144-removebg-preview.png`

type HeaderProps = {
  logoUrl?: string | null
}

export const Header = ({ logoUrl }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(false)
    const footer = document.getElementById('contact')
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // ✅ Logic ใหม่: จัดการ URL ให้สมบูรณ์เสมอ
  let imageSrc = defaultLogo
  let isExternalLogo = false

  if (logoUrl) {
    if (logoUrl.startsWith('http')) {
      imageSrc = logoUrl
      isExternalLogo = true
    } else {
      // ถ้ามาเป็น relative path (เช่น /media/logo.png) ให้เติม domain นำหน้า
      imageSrc = `${BASE_URL}${logoUrl.startsWith('/') ? '' : '/'}${logoUrl}`
      isExternalLogo = true // ถือว่าเป็น external เพราะเราใส่ domain เต็มแล้ว
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md border-b border-orange-100" />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src={imageSrc}
              alt="Shodai Shop"
              width={120}
              height={120}
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              priority
              // ✅ ใส่ unoptimized=true ไว้ก่อนเพื่อความชัวร์สำหรับรูป External/CMS
              unoptimized={true}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors"
            >
              หน้าแรก
            </Link>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors cursor-pointer"
            >
              ติดต่อเรา
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden h-11 w-11 flex flex-col items-center justify-center gap-1.5"
            >
              <div
                className={`w-6 h-0.5 bg-slate-900 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <div className={`w-6 h-0.5 bg-slate-900 ${isOpen ? 'opacity-0' : ''}`} />
              <div
                className={`w-6 h-0.5 bg-slate-900 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-orange-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-lg font-bold text-slate-800"
          >
            หน้าแรก
          </Link>
          <a
            href="#contact"
            onClick={scrollToContact}
            className="text-lg font-bold text-slate-800 cursor-pointer"
          >
            ติดต่อเรา
          </a>
          <hr className="border-slate-100" />
        </div>
      )}
    </header>
  )
}
