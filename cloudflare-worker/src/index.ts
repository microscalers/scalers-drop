interface Env {
  CF_ACCESS_JWT_SECRET?: string
  ALLOWED_ORIGINS?: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const cmd = (url.searchParams.get("cmd") || "").toLowerCase()
    const path = url.pathname

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGINS || '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cf-Access-Jwt-Assertion',
      'Access-Control-Max-Age': '86400'
    }

    // Security headers
    const securityHeaders = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { ...corsHeaders, ...securityHeaders }
      })
    }

    // Check for Zero Trust JWT assertion
    const jwtAssertion = request.headers.get('Cf-Access-Jwt-Assertion')
    const isAuthenticated = !!jwtAssertion

    // ANSI colors for terminals
    const green = "\x1b[32m"
    const white = "\x1b[37m"
    const reset = "\x1b[0m"

    const header = `
${white}
 __  __ _                 _                          _
|  \\/  (_)_ __ ___  _ __ | | ___  ___ ___  ___  _ __| |_
| |\\/| | | '_ \` _ \\| '_ \\| |/ _ \\/ __/ __|/ _ \\| '__| __|
| |  | | | | | | | | |_) | |  __/\\__ \\__ \\  __/| |  | |_
|_|  |_|_|_| |_| |_| .__/|_|\\___||___/___/\\___||_|   \\__|
                   |_|${reset}
        ${green}microscalers.eth  —  trusted compute brokerage${reset}

`

    let output = ""
    
    // Handle API endpoints
    if (path.startsWith('/v1/')) {
      if (!isAuthenticated) {
        return new Response('Unauthorized: Zero Trust authentication required', {
          status: 401,
          headers: { ...corsHeaders, ...securityHeaders, 'content-type': 'text/plain' }
        })
      }
      
      switch (path) {
        case '/v1/status':
          output = JSON.stringify({
            status: 'online',
            rigs: 32,
            scalers: 265,
            vram: '128GB',
            network: 'Base L2',
            authenticated: true
          })
          break
        case '/v1/account':
          // Parse JWT to get user info
          try {
            const jwtPayload = JSON.parse(atob(jwtAssertion.split('.')[1]))
            output = JSON.stringify({
              email: jwtPayload.email,
              sub: jwtPayload.sub,
              authenticated: true
            })
          } catch {
            output = JSON.stringify({ error: 'Invalid JWT' })
          }
          break
        default:
          output = JSON.stringify({ error: 'Endpoint not found' })
      }
    } else {
      // Handle CLI commands
      switch (cmd) {
        case "help":
          output = `Commands:
  docs, members, dev, blocks, join
  status, account (requires auth)

Example:
  curl -s https://api.microscalers.ai/cli?cmd=docs
  curl -s https://api.microscalers.ai/v1/status (auth required)`
          break
        case "docs":
          output = `${green}→ docs${reset}  https://docs.microscalers.eth.limo`
          break
        case "members":
          output = `${green}→ members${reset}  https://members.microscalers.eth.limo`
          break
        case "dev":
          output = `${green}→ dev${reset}  https://dev.microscalers.eth.limo`
          break
        case "blocks":
          output = `${green}→ blocks${reset}  https://catchain.microscalers.eth.limo`
          break
        case "join":
          output = `${green}→ join${reset}  https://members.microscalers.eth.limo/join`
          break
        case "status":
          if (isAuthenticated) {
            output = `${green}→ status${reset}  ${white}Authenticated${reset} | Rigs: 32 | Scalers: 265+`
          } else {
            output = `${green}→ status${reset}  ${white}Public${reset} | Use /v1/status for detailed info`
          }
          break
        default:
          output = `${white}Microscalers CLI v1.2.0${reset}
Unknown command: ${green}${cmd || "(none)"}${reset}
Try: ${green}help${reset}`
      }
    }

    const contentType = path.startsWith('/v1/') ? 'application/json' : 'text/plain; charset=utf-8'
    
    return new Response(header + output + "\n", {
      headers: {
        "content-type": contentType,
        ...corsHeaders,
        ...securityHeaders
      },
    })
  },
}