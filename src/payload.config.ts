import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'

import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Models } from './collections/Models'
import { Products } from './collections/Products'
import { HeroBanner } from './collections/HeroBanners'
import { Brands } from './collections/Brands'
import { Categories } from './collections/Categories'
import { Types } from './collections/Types'


const databaseUri = process.env.DATABASE_URI || ''

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      // ✅ แก้ไขตรงนี้: เปลี่ยน dirname เป็น process.cwd()
      baseDir: path.resolve(process.cwd()),
    },
  },

  collections: [
    Users,
    Brands,
    Models,
    Categories,
    Types,
    Products,
    Media,
  ],

  globals: [
    HeroBanner,
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'secret-key-missing', // แนะนำให้ใส่ Fallback กันไว้เผื่อ .env ไม่โหลด

  typescript: {
    // ใช้ process.cwd() เพื่อชี้ไปที่ root ของโปรเจกต์ แล้วตามด้วย path ที่ต้องการ
    outputFile: path.resolve(process.cwd(), 'src/payload-types.ts'),
  },

  db: mongooseAdapter({
    url: databaseUri,
  }),

  sharp,
})