# 🧱 DEPLOY.md — SCALERS CLI / Cloudflare Pages Deployment

## 🧠 Overview
This project powers **SCALERS**, the CLI-grade Microscalers landing site deployed through **Cloudflare Pages** using **Wrangler 4**.

The deployment pipeline is fully automated for both local and CI/CD use.  
Each build produces a static drop under `/dist` and deploys directly to Cloudflare’s global edge.

---

## ⚙️ Requirements
- **Node.js ≥ 20**
- **npm ≥ 10**
- **Wrangler ≥ 4.45**
- Git access to `https://github.com/microscalers/scalers-drop`
- Cloudflare access (account: `dm@minechain.ai`)

---

## 🧾 Configuration
Your `wrangler.toml` must look exactly like this:

```toml
name = "scalers-drop"
compatibility_date = "2025-10-26"
pages_build_output_dir = "dist"

[vars]
PROJECT = "SCALERS"
ENVIRONMENT = "production"
