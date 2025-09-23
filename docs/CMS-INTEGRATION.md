# 📝 CMS Integration Guide

This document provides comprehensive guides for integrating various Content Management Systems (CMS) with the Design Photography Portfolio project.

## 📋 Table of Contents

- [Overview](#overview)
- [Headless CMS Options](#headless-cms-options)
- [Integration Guides](#integration-guides)
  - [Strapi](#strapi)
  - [Sanity](#sanity)
  - [Contentful](#contentful)
  - [Netlify CMS](#netlify-cms)
  - [Forestry](#forestry)
  - [Ghost](#ghost)
  - [WordPress (Headless)](#wordpress-headless)
- [Security & Backup Strategies](#security--backup-strategies)
- [Performance Considerations](#performance-considerations)
- [Migration Guides](#migration-guides)

## 🎯 Overview

This portfolio template can be integrated with various CMS solutions to provide content management capabilities. All integrations maintain the static site generation benefits while adding dynamic content management.

### Benefits of CMS Integration

- **Content Management**: Non-technical users can manage content
- **Dynamic Updates**: Content updates without code changes
- **Media Management**: Centralized image and asset management
- **Workflow**: Content approval and publishing workflows
- **SEO**: Better content optimization tools

## 🏗️ Headless CMS Options

### Recommended CMS Solutions

| CMS | Type | Pricing | Best For | Difficulty |
|-----|------|---------|----------|------------|
| **Strapi** | Self-hosted | Free/Paid | Full control, custom fields | Medium |
| **Sanity** | Cloud/Self-hosted | Free tier | Real-time collaboration | Easy |
| **Contentful** | Cloud | Free tier | Enterprise features | Easy |
| **Netlify CMS** | Git-based | Free | Git workflow | Easy |
| **Forestry** | Git-based | Paid | Jekyll/Hugo users | Easy |
| **Ghost** | Self-hosted | Free/Paid | Blog-focused | Medium |
| **WordPress** | Self-hosted | Free | Existing WP users | Hard |

## 🔧 Integration Guides

### Strapi

**Best for**: Full control, custom content types, self-hosting

#### Installation

```bash
# Install Strapi
npx create-strapi-app@latest portfolio-cms --quickstart

# Install Astro Strapi integration
npm install @astrojs/strapi
```

#### Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import strapi from '@astrojs/strapi';

export default defineConfig({
  integrations: [
    strapi({
      url: process.env.STRAPI_URL || 'http://localhost:1337',
      token: process.env.STRAPI_TOKEN,
    }),
  ],
});
```

#### Content Types Setup

```javascript
// src/lib/strapi.ts
export async function getPortfolioItems() {
  const response = await fetch(`${process.env.STRAPI_URL}/api/portfolio-items?populate=*`);
  const data = await response.json();
  return data.data;
}

export async function getPortfolioItem(slug: string) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/portfolio-items?filters[slug][$eq]=${slug}&populate=*`
  );
  const data = await response.json();
  return data.data[0];
}
```

#### Environment Variables

```env
# .env
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your-api-token
```

#### Usage in Components

```astro
---
// src/pages/portfolio/[slug].astro
import { getPortfolioItem, getPortfolioItems } from '@/lib/strapi';

export async function getStaticPaths() {
  const items = await getPortfolioItems();
  return items.map((item) => ({
    params: { slug: item.attributes.slug },
    props: { item },
  }));
}

const { item } = Astro.props;
---

<BaseLayout title={item.attributes.title}>
  <div class="portfolio-item">
    <h1>{item.attributes.title}</h1>
    <img src={item.attributes.image.data.attributes.url} alt={item.attributes.title} />
    <div set:html={item.attributes.content} />
  </div>
</BaseLayout>
```

### Sanity

**Best for**: Real-time collaboration, rich content editing

#### Installation

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Initialize Sanity project
sanity init

# Install Astro Sanity integration
npm install @sanity/astro
```

#### Configuration

```javascript
// sanity.config.js
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio CMS',
  projectId: 'your-project-id',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [
      {
        name: 'portfolioItem',
        title: 'Portfolio Item',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
            },
          },
          {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
          },
        ],
      },
    ],
  },
})
```

#### Astro Integration

```javascript
// src/lib/sanity.ts
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})

export async function getPortfolioItems() {
  const query = `*[_type == "portfolioItem"] | order(_createdAt desc)`
  return await client.fetch(query)
}

export async function getPortfolioItem(slug: string) {
  const query = `*[_type == "portfolioItem" && slug.current == $slug][0]`
  return await client.fetch(query, { slug })
}
```

### Contentful

**Best for**: Enterprise features, scalability

#### Installation

```bash
# Install Contentful
npm install contentful
```

#### Configuration

```javascript
// src/lib/contentful.ts
import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function getPortfolioItems() {
  const entries = await client.getEntries({
    content_type: 'portfolioItem',
    order: '-sys.createdAt',
  })
  return entries.items
}

export async function getPortfolioItem(slug: string) {
  const entries = await client.getEntries({
    content_type: 'portfolioItem',
    'fields.slug': slug,
  })
  return entries.items[0]
}
```

#### Environment Variables

```env
# .env
CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_ACCESS_TOKEN=your-access-token
```

### Netlify CMS

**Best for**: Git-based workflow, free hosting

#### Installation

```bash
# Create admin directory
mkdir admin
```

#### Configuration

```yaml
# admin/config.yml
backend:
  name: git-gateway
  branch: main

media_folder: "public/images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "portfolio"
    label: "Portfolio Items"
    folder: "src/data/portfolio"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Slug", name: "slug", widget: "string"}
      - {label: "Description", name: "description", widget: "text"}
      - {label: "Images", name: "images", widget: "list", field: {label: "Image", name: "image", widget: "image"}}
      - {label: "Content", name: "content", widget: "markdown"}
```

#### Admin Interface

```html
<!-- admin/index.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  <script>
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  </script>
</body>
</html>
```

### Forestry

**Best for**: Git-based, user-friendly interface

#### Setup

1. Connect your GitHub repository to Forestry
2. Configure content types in Forestry dashboard
3. Set up preview URLs

#### Configuration

```yaml
# .forestry/front_matter/templates/portfolio-item.yml
label: Portfolio Item
fields:
  - type: text
    name: title
    label: Title
  - type: text
    name: slug
    label: Slug
  - type: text
    name: description
    label: Description
  - type: list
    name: images
    label: Images
    config:
      use_select: false
      source:
        type: pages
        section: images
```

### Ghost

**Best for**: Blog-focused content, self-hosting

#### Installation

```bash
# Install Ghost
npm install -g ghost-cli
ghost install
```

#### Astro Integration

```javascript
// src/lib/ghost.ts
const GHOST_URL = process.env.GHOST_URL
const GHOST_KEY = process.env.GHOST_KEY

export async function getPosts() {
  const response = await fetch(`${GHOST_URL}/ghost/api/v3/content/posts/?key=${GHOST_KEY}`)
  const data = await response.json()
  return data.posts
}

export async function getPost(slug: string) {
  const response = await fetch(`${GHOST_URL}/ghost/api/v3/content/posts/slug/${slug}/?key=${GHOST_KEY}`)
  const data = await response.json()
  return data.posts[0]
}
```

### WordPress (Headless)

**Best for**: Existing WordPress users, familiar interface

#### Installation

```bash
# Install WordPress REST API client
npm install wpapi
```

#### Configuration

```javascript
// src/lib/wordpress.ts
import WPAPI from 'wpapi'

const wp = new WPAPI({
  endpoint: process.env.WORDPRESS_URL + '/wp-json/wp/v2',
  username: process.env.WORDPRESS_USERNAME,
  password: process.env.WORDPRESS_PASSWORD,
})

export async function getPortfolioItems() {
  return await wp.portfolio().perPage(10)
}

export async function getPortfolioItem(id: number) {
  return await wp.portfolio().id(id)
}
```

## 🛡️ Security & Backup Strategies

### Git Branching Strategy

```bash
# Create CMS integration branch
git checkout -b feature/cms-integration

# Work on CMS integration
# Test thoroughly

# If satisfied, merge to main
git checkout main
git merge feature/cms-integration

# If not satisfied, discard changes
git checkout main
git branch -D feature/cms-integration
```

### Backup Strategy

```bash
# Create backup before CMS integration
git tag v2.0.0-pre-cms
git push origin v2.0.0-pre-cms

# Create rollback script
cat > scripts/rollback.sh << 'EOF'
#!/bin/bash
echo "🔄 Rolling back to pre-CMS version..."
git checkout v2.0.0-pre-cms
git checkout -b rollback-$(date +%Y%m%d-%H%M%S)
git push origin rollback-$(date +%Y%m%d-%H%M%S)
echo "✅ Rollback complete!"
EOF

chmod +x scripts/rollback.sh
```

### Environment Security

```env
# .env.example
# CMS Configuration
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your-api-token

SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production

CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_ACCESS_TOKEN=your-access-token

# Security
CMS_PREVIEW_SECRET=your-preview-secret
```

## ⚡ Performance Considerations

### Image Optimization

```javascript
// src/lib/image-optimization.ts
export function optimizeImage(url: string, width: number, height: number) {
  // Strapi
  if (url.includes('strapi')) {
    return `${url}?width=${width}&height=${height}&format=webp`
  }
  
  // Sanity
  if (url.includes('sanity')) {
    return `${url}?w=${width}&h=${height}&fm=webp&q=80`
  }
  
  // Contentful
  if (url.includes('contentful')) {
    return `${url}?w=${width}&h=${height}&fm=webp&q=80`
  }
  
  return url
}
```

### Caching Strategy

```javascript
// src/lib/cache.ts
const cache = new Map()

export async function getCachedData(key: string, fetcher: () => Promise<any>) {
  if (cache.has(key)) {
    return cache.get(key)
  }
  
  const data = await fetcher()
  cache.set(key, data)
  
  // Clear cache after 5 minutes
  setTimeout(() => cache.delete(key), 5 * 60 * 1000)
  
  return data
}
```

### Build Optimization

```javascript
// astro.config.mjs
export default defineConfig({
  build: {
    // Optimize for CMS content
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            cms: ['@sanity/client', 'contentful', '@strapi/strapi'],
          },
        },
      },
    },
  },
})
```

## 🔄 Migration Guides

### From Static to CMS

1. **Backup current content**
2. **Choose CMS solution**
3. **Set up CMS**
4. **Migrate content**
5. **Update build process**
6. **Test thoroughly**
7. **Deploy**

### Between CMS Solutions

1. **Export data from current CMS**
2. **Transform data format**
3. **Import to new CMS**
4. **Update integration code**
5. **Test and deploy**

## 📊 Comparison Matrix

| Feature | Strapi | Sanity | Contentful | Netlify CMS | Forestry |
|---------|--------|--------|------------|-------------|----------|
| **Pricing** | Free/Paid | Free tier | Free tier | Free | Paid |
| **Hosting** | Self-hosted | Cloud/Self | Cloud | Git-based | Git-based |
| **Real-time** | No | Yes | No | No | No |
| **Custom Fields** | Yes | Yes | Yes | Limited | Yes |
| **Media Management** | Good | Excellent | Excellent | Basic | Good |
| **API** | REST/GraphQL | REST/GraphQL | REST/GraphQL | Git | Git |
| **Learning Curve** | Medium | Easy | Easy | Easy | Easy |

## 🚀 Getting Started

1. **Choose your CMS** based on requirements
2. **Set up development environment**
3. **Follow integration guide**
4. **Test thoroughly**
5. **Deploy to production**

## 📚 Additional Resources

- [Astro CMS Integration Guide](https://docs.astro.build/en/guides/cms/)
- [Headless CMS Comparison](https://headlesscms.org/)
- [Static Site Generators + CMS](https://jamstack.org/)

---

This guide provides comprehensive information for integrating various CMS solutions with your Astro portfolio. Choose the solution that best fits your needs and follow the specific integration guide.
