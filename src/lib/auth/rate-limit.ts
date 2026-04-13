import {
  LOGIN_RATE_LIMIT_MAX,
  LOGIN_RATE_LIMIT_WINDOW_MS,
  SUSPICIOUS_ATTEMPTS_PER_HOUR,
  SUSPICIOUS_WINDOW_MS,
} from "@/lib/auth/constants";

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const minuteBucket = new Map<string, RateLimitBucket>();
const hourBucket = new Map<string, RateLimitBucket>();

function nextBucket(bucket: Map<string, RateLimitBucket>, key: string, windowMs: number) {
  const now = Date.now();
  const current = bucket.get(key);

  if (!current || current.resetAt <= now) {
    const fresh = { count: 1, resetAt: now + windowMs };
    bucket.set(key, fresh);
    return fresh;
  }

  current.count += 1;
  bucket.set(key, current);
  return current;
}

export function consumeLoginRateLimit(ipAddress: string) {
  const minuteState = nextBucket(minuteBucket, ipAddress, LOGIN_RATE_LIMIT_WINDOW_MS);
  const hourState = nextBucket(hourBucket, ipAddress, SUSPICIOUS_WINDOW_MS);

  return {
    allowed: minuteState.count <= LOGIN_RATE_LIMIT_MAX,
    retryAfterSeconds: Math.max(
      1,
      Math.ceil((minuteState.resetAt - Date.now()) / 1000),
    ),
    suspicious: hourState.count >= SUSPICIOUS_ATTEMPTS_PER_HOUR,
  };
}
