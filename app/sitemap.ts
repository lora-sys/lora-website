import { MetadataRoute } from 'next';
import { Locales } from 'intlayer';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://loralg.pages.dev';
  const locales = [Locales.ENGLISH, Locales.CHINESE];
  const routes = ['', '/blog'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Root route
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  });

  // Localized routes
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/blog' ? 'weekly' : 'monthly',
        priority: route === '' ? 0.8 : 0.5,
      });
    });
  });

  return sitemapEntries;
}
