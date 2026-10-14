import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import { info } from '../../lib/info.ts';

const entries = await getCollection('archives', ({ data }) => !data.draft);

// Key = the file name served at /og/<key>.png
const pages = {
  default: {
    title: info.site.title,
    description: info.site.description,
  },
  ...Object.fromEntries(
    entries.map(({ id, data }) => [
      id,
      { title: data.title, description: data.description },
    ])
  ),
};

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[19, 19, 22]],          // matches your dark theme (#131316)
    border: { color: [141, 70, 231], width: 14, side: 'inline-start' },
    padding: 70,
    font: {
      title: { size: 64, weight: 'Bold', color: [240, 240, 245], lineHeight: 1.2 },
      description: { size: 30, color: [160, 160, 170], lineHeight: 1.4 },
    },
  }),
});