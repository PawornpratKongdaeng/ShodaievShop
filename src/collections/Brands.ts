import type { CollectionConfig } from 'payload';

export const Brands: CollectionConfig = {
    slug: 'brands',
    admin: {
      useAsTitle: 'name', // ✅ เพิ่มบรรทัดนี้: ให้โชว์ชื่อแบรนด์แทน ID
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
      {
        name: 'value',
        type: 'text',
        required: true,
      },
    ],
};
