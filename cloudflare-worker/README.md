# Microscalers CLI Cloudflare Worker

A Cloudflare Worker that serves as a CLI API endpoint for Microscalers.

## Features

- ASCII art branding
- ANSI color support for terminals
- Simple command interface
- ENS domain links

## Commands

- `help` - Show available commands
- `docs` - Link to documentation
- `members` - Link to members portal
- `dev` - Link to developer portal
- `blocks` - Link to blockchain explorer
- `join` - Link to join flow

## Usage

```bash
# Get help
curl -s https://api.microscalers.ai/cli?cmd=help

# Get docs link
curl -s https://api.microscalers.ai/cli?cmd=docs

# Get members link
curl -s https://api.microscalers.ai/cli?cmd=members
```

## Deployment

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Deploy:
```bash
wrangler deploy
```

## Development

```bash
# Start local development server
wrangler dev

# Deploy to production
wrangler deploy
```