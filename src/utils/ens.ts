import { normalize } from 'viem/ens'

export function validateSubdomain(subdomain: string): boolean {
  if (!subdomain || subdomain.length < 3) return false
  if (subdomain.length > 32) return false
  return /^[a-z0-9-]+$/.test(subdomain)
}

export function normalizeSubdomain(subdomain: string): string {
  return subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '')
}

export function getFullENS(subdomain: string): string {
  return `${subdomain}.microscaler.eth`
}