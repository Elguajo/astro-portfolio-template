import { getCollection } from 'astro:content';

import { handleAsyncError, createError } from './errorHandler';

export const getWorks = async () => {
  return handleAsyncError(
    async () => {
      const imageInfo = await getCollection('imageInfo');
      const worksData = await getCollection('works');

      if (!imageInfo || imageInfo.length === 0) {
        throw createError(
          'No image info found in content collection',
          'CONTENT_NOT_FOUND',
          404
        );
      }

      if (!worksData || worksData.length === 0) {
        throw createError(
          'No works data found in content collection',
          'CONTENT_NOT_FOUND',
          404
        );
      }

      const works = imageInfo.reduce((ans: any[], item) => {
        const work = worksData.find(it => it.data.base === item.id);
        if (!work) {
          // Log warning but continue processing other works
          const error = createError(
            `Work page not found for: ${item.id}`,
            'CONTENT_NOT_FOUND',
            404
          );
          // eslint-disable-next-line no-console
          console.warn(error.message);
          return ans; // Skip missing works instead of throwing
        }
        return [
          ...ans,
          {
            ...work,
            data: {
              ...work.data,
              members: item.data,
            },
          },
        ];
      }, []);

      return works;
    },
    [] as any[], // fallback value
    'Failed to load works data'
  );
};

export default getWorks;
