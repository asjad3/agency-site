This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Cloudflare

This project is configured for deployment on Cloudflare Workers/Pages using `@opennextjs/cloudflare`.

### Prerequisites

1. Install Wrangler CLI: `npm install -g wrangler`
2. Login to Cloudflare: `wrangler login`
3. Update `wrangler.toml` with your account/project details if needed

### Deployment Commands

```bash
# Preview locally
npm run preview

# Deploy to production
npm run deploy
```

### First Deploy

```bash
# Build and deploy
npm run deploy
```

This will deploy your Next.js app to Cloudflare Workers with static assets served from Cloudflare Pages.
