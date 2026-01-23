'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export const SearchFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) params.set('q', term)
    else params.delete('q')
    
    startTransition(() => {
      router.push(`?${params.toString()}`)
    })
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="ค้นหาชื่ออะไหล่ หรือรหัส..."
          defaultValue={searchParams.get('q') || ''}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
      </div>

      {/* Category Filter */}
      <select 
        onChange={(e) => {
          const params = new URLSearchParams(searchParams)
          if (e.target.value) params.set('category', e.target.value)
          else params.delete('category')
          router.push(`?${params.toString()}`)
        }}
        className="h-14 px-6 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20"
      >
        <option value="">ทุกหมวดหมู่</option>
        <option value="engine">เครื่องยนต์</option>
        <option value="suspension">ช่วงล่าง</option>
        <option value="brakes">เบรก</option>
      </select>

      {isPending && <span className="text-xs text-slate-400 animate-pulse flex items-center">กำลังค้นหา...</span>}
    </div>
  )
}