/* eslint-disable no-param-reassign */
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import fs from 'fs';
import path from 'path';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeRaw from 'rehype-raw';
import remarkPrism from 'remark-prism';
import remarkWikiLink from "remark-wiki-link";
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';
import remarkCaptions from "remark-captions"
import rehypeExternalLinks from 'rehype-external-links';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit'

const getAbsoluteImagePath = (imagePath) => {
    if(imagePath.startsWith("assets/")){
        const absolutePath = imagePath.split("assets/")[1]
        return `/${absolutePath}`
    }

    if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
      return `/${imagePath}`
    }

    return imagePath;
}

const remarkTransformIndexLinks = () => (tree) => {
      visit(tree, 'link', (node) => {
        // Only transform relative links (skip external URLs)
        if (!node.url.startsWith('http://') && !node.url.startsWith('https://')) {
          // Handle both /index and index suffixes
          if (node.url.endsWith('/index') || node.url.endsWith('index')) {
            node.url = node.url.replace(/\/?(index)$/, '');
          }
        }
      });
    }

function remarkAbsoluteImages() {
    return (tree) => {
      visit(tree, 'image', (node) => {
        node.url = getAbsoluteImagePath(node.url)
      })
    }
  }

export const getFirstImageUrl = (markdown) => {
    const imageRegex = /!\[.*?\]\((.*?)\)/;
    const match = markdown.match(imageRegex);
    if (match) {
        const url = match[1];
        return getAbsoluteImagePath(url);
    }
    return null;
}

// eslint-disable-next-line import/prefer-default-export
export const processMDX = async (content) => {
    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkBreaks)
        .use(remarkPrism, {
            transformInlineCode: true
        })
        .use(remarkCaptions)
        .use(remarkFrontmatter)
        .use(remarkAbsoluteImages)
        .use(remarkTransformIndexLinks)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" })
        .use(rehypeRaw)
        .use(rehypeStringify)
        .use(remarkWikiLink, { aliasDivider: "|", pageResolver: (name) => {
            // Remove index suffix if present
            const siteLink = name.replace(/\/?(index)$/, '');
            return [siteLink.toLowerCase()];
        }, hrefTemplate: (permalink) => permalink })
        .process(content)

    return String(file);
}

export const getMatterData = (fileContents) => {
    const matterData = matter(fileContents, {
        excerpt: (file) => {
            const lines = file.content.split('\n');
            let excerpt = '';

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                // Check if the line starts with an alphanumeric character
                if (/^[A-Za-z0-9]/.test(line)) {
                    excerpt = line;
                    break;
                }
            }

            // eslint-disable-next-line no-param-reassign
            file.excerpt = excerpt;
        }
    })

    matterData.data.date = String(matterData.data.date);

    return matterData;
}

export const getFileContents = (fileName) => {
    const contentDirectory = path.join(process.cwd(), 'content');
    const fullPath = path.join(contentDirectory, `${fileName}.md`);
    return fs.readFileSync(fullPath, 'utf8');
}

export const getEnhancedFrontmatter = (frontmatter, excerpt, fileContents, slug) => {

    if (typeof frontmatter.image !== "string") {
        frontmatter.image = getFirstImageUrl(fileContents)
    } else {
        frontmatter.image = getAbsoluteImagePath(frontmatter.image)
    }

    if (typeof frontmatter.description !== "string") {
        frontmatter.description = excerpt || ""
    }

    if (!frontmatter.credit) {
        frontmatter.credit = ""
    }

    if (!frontmatter.slug) {
        frontmatter.slug = `/${slug?.split("/index")[0]?.split("index")[0]}`;
    }

    return frontmatter;
}

export const getMdxContent = async (fileName) => {
    const fileContents = getFileContents(fileName);
    const post = await processMDX(fileContents);


    const matterData = getMatterData(fileContents)
    const frontmatter = getEnhancedFrontmatter(matterData.data, matterData.excerpt, fileContents, fileName)

    return { post, frontmatter };
}
