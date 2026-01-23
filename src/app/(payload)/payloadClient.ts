import { getPayload } from 'payload';
import configPromise from '@/payload.config';

let client: any;

export async function getPayloadClient() {
  if (!client) {
    client = await getPayload({
      config: configPromise,
    });
  }

  return client;
}
