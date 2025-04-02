import {fetchAllPostsMeta} from './lib/indices.mjs';

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || 'http://localhost:3000',
  generateRobotsTxt: true,
  additionalPaths: async () => {
    // You need to generate an array of all your page paths
    // This could come from your markdown files
    const result = [];
    
    // Example: If you have a function that returns all your page slugs
    const allPosts = await fetchAllPostsMeta(); // Replace with your actual function
    
    // Add each page to the sitemap
    allPosts.forEach(data => {
      result.push({
        loc: `/${data.slug}`, // The URL path
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });
    
    return result;
  },  
} 
