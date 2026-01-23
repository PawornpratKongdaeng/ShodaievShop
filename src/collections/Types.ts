import type { CollectionConfig } from 'payload';

export const Types: CollectionConfig = {
  slug: 'types',
  admin: {
    useAsTitle: 'name',
    group: 'Shop Data',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
};
