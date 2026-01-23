import type { CollectionConfig } from 'payload';

export const Models: CollectionConfig = {
  slug: 'models',
  admin: {
    useAsTitle: 'name', // ✅ เพิ่มบรรทัดนี้: ให้โชว์ชื่อรุ่นรถแทน ID
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      required: true,
    },
    {
      name: 'yearRange',
      type: 'text'
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media'
    }
  ],
};
