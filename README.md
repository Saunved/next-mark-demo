Caution: THIS README IS STILL A WORK IN PROGRESS!

# Welcome to next-mark (alpha)

next-mark (alpha) is a blogging framework built on top of Next.js, and is intended to be self-hosted.
I extracted the core logic of next-mark from my Next.js setup to help others blog more easily.
However, there is a lot more that needs to be done to ensure that you don't have to tinker with next-mark's
internals in order to have your site up and running. Feel free to open a PR to help us get to that goal!

# Setup

1. Clone this repository
2. Add your content (Markdown files) to a "content" folder at the root of this repository
3. Update blog.config.mjs as per your needs
4. Update next.config.mjs to set the base URL (you might need to create a .env.production) file at the root level
5. Set the upstream to this repository to ensure that you pull rendering logic (instructions below)
6. Connect your site to Vercel via GitHub/GitLab, etc.
7. Link your own domain and deploy


## Setting next-mark as the remote upstream
```sh
# Check your current remote
git remote -v
```

```sh
# Set the remote to this repo
git remote add origin git@github.com:Saunved/next-mark.git
```

```sh
# To sync upstream changes
git merge upstream/main --allow-unrelated-histories

# Then push to your main branch
```

# Basics
next-mark currently only supports Markdown. All Markdown files should be added to a "content" folder in the root
directory of this project.

## Structure
You can create as many folders as you want in the "content" directory for organizing your writing.
An index.md file may be placed at the root of each folder. This file governs how the page will be rendered,
and how posts will be shown on that page, via the front-matter YAML.

By default, index pages will show content in the following order:
1. The content on that page
2. The default feed OR a filtered feed based on options you have specified in the "feed" property
3. Folders present at the same level as this index.md, options configurable via a "explorer" property

## All frontmatter properties
The following frontmatter properties are supported by the framework:

### alias
The alternate path for this post (full path must be specified, but do not specify protocal or domain).

### aliases
Same as alias, but supports multiple links as a YAML list.

### alt
The alt attribute of the hero image (for accessibility)

### author
The author of the page

### canonical
The canonical URL of the post (if this post was published elsewhere first and is the actual source of truth).

### credit
The attribution for the hero image

### date
The date on which the post was published

### description
The description

### explorer
The "explorer" property

```yaml
explorer:
  title: Data science
  description: Explore all my posts on data science
```

### feed
The "feed" property in an index page's frontmatter defines what "feed" will be shown on that page.

Example feed property:
```yaml
feed:
  filter: featured
  title: Featured posts
  description: ""
```
^ This will ensure that only posts with the tag "featured" are displayed on the page feed.

### image
The hero image's path.

### page
(true/false)
Whether a particular file is a page or a post.
Pages are ignored when rendering feeds.

### title
The title (mandatory)

### tags
Tags for this page/post

## Planned frontmatter properties

### order
The order in which posts should be shown in the feed

### feed.type
Determine the type of feed to allow for rendering various types of feeds such as simple lists,
lists with images, title-only lists, etc.

## Images
All images referenced in Markdown files must be placed in the "content/assets" folder.
You can refer to the images in your Markdown using the full path, viz. "assets/xyz.jpg" or relative path,
viz. "xyz.jpg". next-mark will resolve both correctly.

## Hidden files and folders
Folders starting with a "." are ignored by next-mark.
Similarly, files starting with a "_" are also ignored.
This feature allows you to keep draft folders or files in the same location as the rest of your content.

## Features

You can contribute to this repository by working on any of the below features or create a PR
for a feature you wish to see.

- [x] Implement pagination of some kind
- [x] Implement email subscriptions  e
- [x] [low priority] Implement breadcrumbs  
- [x] Fix issue with dark mode having "Sun" as the default icon for some reason  
- [x] Implement next/seo (especially canonical URLs)
- [x] Implement a system to index/not index certain posts (use page: true in frontmatter)
- [x] Implement wikilinks parsing
- [x] Create a RelatedPosts section beneath each blog post (using tags)
- [x] Consider using remark (https://github.com/remarkjs/remark) directly instead of the next-mdx-remote package. This package is causing an overhead when integrating any new plugins, and isn't really helpful since I don't actually need any remote files to be fetched
- [x] HTML is not rendering in any of the files, it should be allowed and trusted
- [x] Fix the "Tags" page (use the new logic)
- [x] Fix the "Related posts" logic
- [x] Add a max height for the blog post images
- [x] Remove unused libraries
- [x] Implement automatic folder-based navigation (instead of tag-based navigation)
- [x] Scrolling behaviour on mobile is weird, check and fix
- [x] Add support for image captions
- [x] Support alias/aliases frontmatter key for redirects
- [x] Create better-looking index pages if possible [low priority]
- [x] Do an accessibility audit - 100 on PageSpeedInsights
- [ ] Non-image paths (audio/pdf) in assets folder may not get resolved correctly (needs testing)
- [ ] Add the ability to sort by "order"
- [ ] Add support for RSS feed
- [ ] Generate sitemap
- [ ] Support YouTube embeds
- [ ] Default cover image logic should ignore embeds
- [ ] Make feed type configurable (feed.type) 
- [ ] Process blog config via yaml
- [ ] Setup email collector config via yaml
- [ ] Add support for Table of Contents (low priority)
- [ ] Implement a global search [low priority]
- [ ] Implement a "Likes" system  
- [ ] Implement a "Comments" system  
