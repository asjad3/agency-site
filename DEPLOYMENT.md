# Cloudflare Deployment Guide

This guide walks you through deploying the H2 Growth Agency site to Cloudflare Workers with your custom domain `h2growth.ai`.

## Prerequisites

- [Node.js 20+](https://nodejs.org/) installed
- [Cloudflare account](https://dash.cloudflare.com/sign-up)
- Domain `h2growth.ai` added to your Cloudflare account

---

## Step 1: Verify Domain is on Cloudflare

Before deploying, your domain must be managed by Cloudflare:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Add a domain** (if not already added)
3. Enter `h2growth.ai`
4. Cloudflare will scan your DNS records
5. Update your domain's nameservers at your registrar to the ones Cloudflare provides
6. Wait for propagation (can take 24-48 hours, usually faster)

**Verify domain is active:**
```bash
npx wrangler whoami
```

You should see your account listed.

---

## Step 2: Authenticate with Cloudflare

If not already authenticated:

```bash
npx wrangler login
```

This opens a browser window. Log in and authorize Wrangler.

**Verify authentication:**
```bash
npx wrangler whoami
```

Expected output:
```
You are logged in with an OAuth Token, associated with the email admin@h2growth.ai
```

---

## Step 3: Project Configuration

The project is already configured for Cloudflare. Key files:

### `wrangler.toml`
```toml
name = "h2growth-agency"
compatibility_date = "2025-01-01"
compatibility_flags = ["nodejs_compat"]
main = ".open-next/worker.js"
assets = { directory = ".open-next/assets", binding = "ASSETS" }

routes = [
  { pattern = "h2growth.ai", custom_domain = true }
]
```

### `open-next.config.ts`
```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({});
```

### `package.json` scripts
```json
{
  "scripts": {
    "deploy": "npm run build && npx opennextjs-cloudflare build && wrangler deploy",
    "preview": "npm run build && npx opennextjs-cloudflare build && npx opennextjs-cloudflare preview"
  }
}
```

---

## Step 4: Deploy to Cloudflare

### One-line deploy:
```bash
npm run deploy
```

This will:
1. Generate TypeScript types for Cloudflare bindings
2. Build the Next.js application
3. Bundle with OpenNext Cloudflare adapter
4. Deploy to Cloudflare Workers

### Expected output:
```
Deployed h2growth-agency triggers (10.45 sec)
  h2growth.ai (custom domain)
Current Version ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

---

## Step 5: Configure Custom Domain

After the first deploy, verify the custom domain binding:

### Via Dashboard:
1. Go to [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Click on `h2growth-agency`
3. Go to **Triggers** tab
4. Under **Custom Domains**, verify `h2growth.ai` is listed
5. If not, click **Add Custom Domain** and enter `h2growth.ai`

### Via CLI:
```bash
npx wrangler deploy
```

The deployment output should show:
```
Deployed h2growth-agency triggers
  h2growth.ai (custom domain)
```

---

## Step 6: Verify DNS Configuration

Ensure your domain's DNS is pointing correctly:

```bash
# Check if domain resolves
curl -I https://h2growth.ai
```

Expected: HTTP 200 or 301/302 response

### In Cloudflare Dashboard:
1. Go to **DNS** section for `h2growth.ai`
2. You should see a CNAME or proxied record for the Worker

If DNS isn't configured:
1. Go to Workers & Pages → h2growth-agency → Triggers
2. Click **Add Custom Domain**
3. Enter `h2growth.ai`
4. Cloudflare automatically creates the DNS record

---

## Step 7: Configure Environment Variables (if needed)

If your app needs secrets (API keys, etc.):

```bash
npx wrangler secret put <SECRET_NAME>
```

You'll be prompted to enter the value securely.

### Common secrets you might need:
- `GOOGLE_GEMINI_API_KEY` (if using AI features)
- `DATABASE_URL` (if connecting to a database)
- `EMAIL_SERVICE_KEY` (for contact form emails)

### View all secrets:
```bash
npx wrangler secret list
```

---

## Step 8: Test the Deployment

### Visit your site:
- **Production:** https://h2growth.ai

### Test the contact form:
1. Navigate to the contact section
2. Submit a test message
3. Check Worker logs for the submission

### View logs:
```bash
npx wrangler tail
```

This streams real-time logs from your Worker.

---

## Local Development

### Run development server:
```bash
npm run dev
```

Opens at `http://localhost:3000`

### Preview production build locally:
```bash
npm run preview
```

This runs the actual Cloudflare Worker locally.

---

## Troubleshooting

### Error: "You need to register a workers.dev subdomain"

Add this to `wrangler.toml`:
```toml
workers_dev = true
```

Or deploy to a custom domain (see Step 5).

### Error: "Domain not found" or DNS issues

1. Verify domain is added to Cloudflare
2. Check nameservers are updated at your registrar
3. Wait for DNS propagation (up to 48 hours)
4. Run `npx wrangler deploy` again

### Error: "Authentication failed"

```bash
npx wrangler logout
npx wrangler login
```

### Contact form not working

Check if you need to configure an email service or database. The current implementation logs submissions to the console.

### Build fails on Windows

OpenNext has limited Windows support. Consider using WSL:
```bash
# In WSL terminal
npm run deploy
```

---

## Making Changes & Redeploying

1. Make your code changes
2. Test locally: `npm run dev`
3. Deploy: `npm run deploy`

### Version History

View previous deployments:
```bash
npx wrangler deployments list
```

### Rollback to previous version:
```bash
npx wrangler rollback <VERSION_ID>
```

---

## Cost Estimation

Cloudflare Workers **free tier** includes:
- 100,000 requests/day
- 10ms CPU time per request
- 30+ global locations

For most agency sites, this is sufficient. Check [Cloudflare pricing](https://www.cloudflare.com/workers/pricing/) for usage beyond free tier.

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run deploy` | Build and deploy to Cloudflare |
| `npm run preview` | Preview production build locally |
| `npx wrangler whoami` | Check authentication |
| `npx wrangler tail` | Stream live logs |
| `npx wrangler secret put <NAME>` | Add environment secret |
| `npx wrangler deployments list` | View deployment history |

---

## Support Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [OpenNext Cloudflare Docs](https://opennext.js.org/cloudflare)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Community Forum](https://community.cloudflare.com/)
