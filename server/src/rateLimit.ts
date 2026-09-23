/**
 * Lightweight in-memory rate limiter to protect contact and admission endpoints
 */
interface RateLimitRecord {
  count: number;
  firstRequest: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now - record.firstRequest > 15 * 60 * 1000) {
      rateLimitStore.delete(ip);
    }
  }
}, 10 * 60 * 1000);

/**
 * Checks if a request exceeds rate limit (max 10 requests per 15 minutes per IP)
 */
export function isRateLimited(ip: string, maxRequests = 10, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (now - record.firstRequest > windowMs) {
    rateLimitStore.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  record.count += 1;
  return record.count > maxRequests;
}
