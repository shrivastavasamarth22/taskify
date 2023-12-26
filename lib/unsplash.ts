import { createApi } from 'unsplash-js';

export const unSplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
  fetch: fetch
});

