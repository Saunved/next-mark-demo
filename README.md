# Welcome to next-mark

next-mark is a blogging framework built on top of Next.js, and is intended to be self-hosted.

THIS README IS STILL A WORK IN PROGRESS!

# Basics
next-mark currently only supports Markdown. All Markdown files should be added to the "content" folder.

## Structure
You can create as many folders as you want in the "content" directory for organizing your writing.
An index.md file may be placed at the root of each folder. This file governs how the page will be rendered,
and how posts will be shown on that page, via the front-matter YAML.

## Images
All images referenced in Markdown files must be placed in the "content/assets" folder.
You can refer to the images in your Markdown using the full path, viz. "assets/xyz.jpg" or relative path,
viz. "xyz.jpg". next-mark will resolve both correctly.

## Managing upstream

The rendering logic of this framework is present in the next-mark repository.
In order to sync the rendering logic, ensure that this repository is set as your "remote" repo after forking.

```sh
# Check your current remote
git remote -v
```

```sh
# Set the remote to this repo
git remote add origin git@github.com:Saunved/next-mark.git
```

```sh
# To check if there are upstream changes
git fetch upstream
```

```sh
# To sync upstream changes
git merge upstream/main --allow-unrelated-histories

# Then push to your main branch
```



## TODO

- [x] Implement pagination of some kind
- [x] Implement email subscriptions  
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
