import { GlobalConfig } from 'payload'

export const HeroBanner: GlobalConfig = {
  slug: 'hero-banner',
  label: 'Hero Banner',
  access: {
    read: () => true,
  },
  fields: [
    { 
      name: 'backgroundImage', 
      type: 'upload', 
      relationTo: 'media',
      required: true, // บังคับว่าต้องใส่รูปเสมอ
      label: 'Hero Image (Full Screen)',
    },
  ],
}