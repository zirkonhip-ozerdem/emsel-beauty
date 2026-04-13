import type { NextRequest } from "next/server";

export function getClientIp(request: NextRequest | Request) {
  const forwarded =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip");

  if (!forwarded) {
    return "0.0.0.0";
  }

  return forwarded.split(",")[0]?.trim() || "0.0.0.0";
}

export function getUserAgent(request: NextRequest | Request) {
  return request.headers.get("user-agent")?.slice(0, 255) || "unknown";
}

export function isSameOriginRequest(request: NextRequest | Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    return false;
  }

  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}
