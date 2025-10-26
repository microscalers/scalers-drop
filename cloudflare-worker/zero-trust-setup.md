# Cloudflare Zero Trust Setup for Microscalers API

## Application Configuration

### Basic Settings
- **Application Name**: `microscalers-api`
- **Application Domain**: `api.microscalers.ai`
- **Session Duration**: `24 hours`

## Access Policies

### Policy 1: Microscalers Team Access
- **Policy Name**: `microscalers-team`
- **Include**: 
  - Emails ending in `@microscalers.eth`
  - Verified ENS names (via ENS OAuth)
- **Require**: 
  - Identity provider sign-in (GitHub, ENS-OAuth, etc.)
- **JWT Assertions**: ✅ Enabled
  - Worker receives `Cf-Access-Jwt-Assertion` header

### Policy 2: Public Read Access
- **Policy Name**: `public-read`
- **Include**: 
  - All users
- **Require**: 
  - No authentication (for public endpoints)
- **JWT Assertions**: ❌ Disabled

## Worker Integration

The worker will receive JWT assertions in the `Cf-Access-Jwt-Assertion` header for authenticated requests.

### JWT Payload Structure
```json
{
  "aud": "microscalers-api",
  "email": "user@microscalers.eth",
  "sub": "user_id",
  "iat": 1234567890,
  "exp": 1234654290,
  "iss": "cloudflare-access"
}
```

## Environment Variables

Add these to your Cloudflare Worker environment:

```bash
# Zero Trust JWT Secret (for verification)
CF_ACCESS_JWT_SECRET=your_jwt_secret_here

# Allowed domains for CORS
ALLOWED_ORIGINS=https://microscalers.eth.limo,https://app.microscalers.eth.limo
```

## Security Headers

The worker should include these security headers:

```typescript
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
}
```

## CORS Configuration

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://microscalers.eth.limo',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cf-Access-Jwt-Assertion',
  'Access-Control-Max-Age': '86400'
}
```

## Deployment Steps

1. **Create Application in Zero Trust Dashboard**
   - Go to Access > Applications
   - Add application: `microscalers-api`
   - Domain: `api.microscalers.ai`

2. **Configure Policies**
   - Add team access policy
   - Add public read policy
   - Enable JWT assertions

3. **Update Worker Code**
   - Add JWT verification
   - Add security headers
   - Add CORS support

4. **Deploy Worker**
   ```bash
   wrangler deploy
   ```

5. **Test Access**
   ```bash
   # Public access (no auth)
   curl https://api.microscalers.ai/cli?cmd=help
   
   # Authenticated access (requires login)
   curl -H "Authorization: Bearer $JWT_TOKEN" https://api.microscalers.ai/v1/status
   ```

## Monitoring

- Monitor access logs in Cloudflare Analytics
- Set up alerts for failed authentication attempts
- Track JWT assertion usage
- Monitor CORS violations