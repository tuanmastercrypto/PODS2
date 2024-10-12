import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Call API để lấy danh sách URL
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sitemapall`);
  const { data } = await response.json(); // API trả về object chứa mảng 'data'

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khoacu.com';

  // Tạo sitemap động từ dữ liệu API
  const dynamicUrls = data.map((item: { slug: string }) => ({
    url: `${siteUrl}/${item.slug}`, // API trả về thuộc tính `slug`
    lastModified: new Date(), // Dùng thời gian hiện tại nếu không có updatedAt
    priority: 0.8,
  }));

  // Các trang tĩnh (nếu có)
  const staticUrls = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      priority: 1
    },
  ];

  // Trả về danh sách URL bao gồm cả tĩnh và động
  return [...staticUrls, ...dynamicUrls];
}
