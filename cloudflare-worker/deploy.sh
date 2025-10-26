#!/bin/bash
set -e

echo "🚀 Deploying Microscalers CLI Worker to Cloudflare..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Login to Cloudflare (if not already logged in)
echo "🔐 Checking Cloudflare authentication..."
wrangler whoami || wrangler login

# Deploy the worker
echo "📦 Deploying worker..."
wrangler deploy

echo "✅ Deployment complete!"
echo "🌐 Worker available at: https://api.microscalers.ai/cli"
echo ""
echo "Test it:"
echo "curl -s https://api.microscalers.ai/cli?cmd=help"