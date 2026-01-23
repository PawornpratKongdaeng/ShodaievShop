'use client'

import { useState } from 'react'
import Link from 'next/link'

// Define the Props interface
type HeaderProps = {
  logoUrl?: string | null
}

export const Header = ({ logoUrl }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md border-b border-orange-100" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            {logoUrl ? (
              // Case 1: Dynamic Logo from Payload
              <img 
                src={logoUrl} 
                alt="Shodai Shop" 
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
              />
            ) : (
              // Case 2: Fallback (Your original design)
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform">
                S
              </div>
            )}
            
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              SHODAI<span className="text-orange-500">.</span>SHOP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors">หน้าแรก</Link>
            <Link href="/select-brand" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors">ค้นหาอะไหล่</Link>
            <Link href="/contact" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors">ติดต่อเรา</Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden h-11 w-11 flex flex-col items-center justify-center gap-1.5"
            >
              <div className={`w-6 h-0.5 bg-slate-900 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-slate-900 ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-slate-900 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-orange-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-800">หน้าแรก</Link>
          <Link href="/select-brand" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-800">ค้นหาอะไหล่</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-800">ติดต่อเรา</Link>
          <hr className="border-slate-100" />
          <button className="w-full h-14 bg-orange-500 text-white rounded-2xl font-bold">เข้าสู่ระบบ</button>
        </div>
      )}
    </header>
  )
}