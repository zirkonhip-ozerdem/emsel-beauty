import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { hasDatabaseConfig, prisma } from "@/lib/prisma";

export function isDatabaseReady() {
  return hasDatabaseConfig();
}

export function parseAdminId(value: string) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export function adminDbUnavailableResponse() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Veritabani baglantisi henuz tanimli degil. DATABASE_URL degerini ekleyince API aktif olacak.",
    },
    { status: 503 },
  );
}

export function adminJsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    {
      ok: false,
      message,
      details,
    },
    { status },
  );
}

export function adminJsonSuccess(data: unknown, message?: string) {
  return NextResponse.json({
    ok: true,
    message,
    data: serializeAdminData(data),
  });
}

export function serializeAdminData<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value, (_, currentValue) => {
      if (currentValue instanceof Prisma.Decimal) {
        return currentValue.toString();
      }

      return currentValue;
    }),
  ) as T;
}

export async function withOptionalDatabase<T>(
  fallbackValue: T,
  resolver: (client: typeof prisma) => Promise<T>,
) {
  if (!hasDatabaseConfig()) {
    return fallbackValue;
  }

  try {
    return await resolver(prisma);
  } catch (error) {
    console.error(error);
    return fallbackValue;
  }
}

export async function tryAdminOperation<T>(resolver: () => Promise<T>) {
  try {
    return await resolver();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
