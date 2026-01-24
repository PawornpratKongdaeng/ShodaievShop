import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ 1. เพิ่มส่วนนี้เพื่ออนุญาตให้โหลดรูปภาพ
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // อนุญาตทุก Domain (เพื่อให้รูปจาก Vercel/S3/External โหลดได้หมด)
      },
      {
        protocol: 'http',
        hostname: '**', // อนุญาต http ธรรมดาด้วย (เผื่อ Localhost)
      },
    ],
  },

  // 2. Webpack Config เดิมของคุณ (เก็บไว้เหมือนเดิม)
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })