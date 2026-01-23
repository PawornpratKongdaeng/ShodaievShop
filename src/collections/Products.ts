import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    group: 'Shop',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'ชื่อสินค้า',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'ข้อมูลพื้นฐาน',
          fields: [
            {
              name: 'price',
              type: 'number',
              label: 'ราคาสินค้า',
              required: true,
            },
            {
              name: 'partNumber',
              type: 'text',
              label: 'รหัสสินค้า (Part No.)',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'รูปภาพสินค้า',
            },
          ],
        },

        {
          label: 'การจัดหมวดหมู่สินค้า',
          fields: [
            {
              name: 'brand',
              type: 'relationship',
              relationTo: 'brands',
              label: 'ยี่ห้อ (หน้า Step 1)',
              required: true,
            },
            {
              name: 'carModel',
              type: 'relationship',
              relationTo: 'models',
              label: 'รุ่นรถ (หน้า Step 2)',
              hasMany: true,
              required: true,
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              label: 'หมวดหมู่สินค้า (หน้า Step 3)',
              required: true,
            },
            {
              name: 'type',
              type: 'relationship',
              relationTo: 'types',
              label: 'ประเภทอะไหล่ (เดิม/แต่ง)',
              required: true,
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Tags (optional)',
              fields: [
                { name: 'tag', type: 'text', label: 'tag' },
              ],
            },
          ],
        },

        {
          label: 'รายละเอียดเพิ่มเติม',
          fields: [
            {
              name: 'compatibility',
              type: 'array',
              label: 'รองรับรุ่นรถเพิ่มเติม (หน้า Detail)',
              fields: [
                { name: 'make', type: 'text', label: 'ยี่ห้อ' },
                { name: 'model', type: 'text', label: 'รุ่น' },
                { name: 'year', type: 'text', label: 'ปี' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
