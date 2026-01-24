import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'

// ✅ 1. Import Plugin S3
import { s3Storage } from '@payloadcms/storage-s3'

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

  secret: process.env.PAYLOAD_SECRET || 'secret-key-missing',

  typescript: {
    outputFile: path.resolve(process.cwd(), 'src/payload-types.ts'),
  },

  db: mongooseAdapter({
    url: databaseUri,
  }),

  // ✅ 2. เพิ่มส่วน Plugins ตรงนี้
  plugins: [
    s3Storage({
      collections: {
        media: true, // ชื่อ slug ของ Collection Media (ต้องตรงกับในไฟล์ Media.ts)
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '', // เช่น 'ap-southeast-1' หรือ 'auto'
        endpoint: process.env.S3_ENDPOINT || undefined, // ใส่เฉพาะถ้าใช้ Cloudflare R2 / MinIO
        forcePathStyle: true, // แนะนำให้เปิดไว้ถ้าใช้ Cloudflare/MinIO
      },
      acl: 'public-read',
    }),
  ],

  sharp,
})