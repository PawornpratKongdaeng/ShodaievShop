import React from 'react'
import {Header} from '@/components/Header'
import Footer from '@/components/Footer'
import './styles.css'

export const metadata = {
  description: 'ShodaiEvShop',
  title: 'ShodaiEvShop',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
