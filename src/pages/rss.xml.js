import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { info } from '../lib/info.ts';

export async function GET(context) {
  const posts = (await getCollection('archives', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: info.site.title,
    description: info.site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/archives/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}