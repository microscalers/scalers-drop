#!/bin/bash
set -e

echo "🔐 Deploying Microscalers CLI Worker with Zero Trust..."

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

echo "✅ Worker deployed successfully!"
echo ""
echo "🔐 Next Steps for Zero Trust Setup:"
echo "1. Go to Cloudflare Zero Trust Dashboard"
echo "2. Navigate to Access > Applications"
echo "3. Add application: microscalers-api"
echo "4. Domain: api.microscalers.ai"
echo "5. Session Duration: 24 hours"
echo ""
echo "📋 Policy Configuration:"
echo "Policy 1 - Microscalers Team:"
echo "  Include: emails ending in @microscalers.eth"
echo "  Include: verified ENS names"
echo "  Require: identity provider sign-in"
echo "  JWT Assertions: ✅ Enabled"
echo ""
echo "Policy 2 - Public Read:"
echo "  Include: all users"
echo "  Require: no authentication"
echo "  JWT Assertions: ❌ Disabled"
echo ""
echo "🌐 Worker available at: https://api.microscalers.ai/cli"
echo ""
echo "Test commands:"
echo "curl -s https://api.microscalers.ai/cli?cmd=help"
echo "curl -s https://api.microscalers.ai/v1/status (requires auth)"