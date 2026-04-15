import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
  var prismaDatabaseUrl: string | undefined;
}

function normalizeDatabaseUrl(value?: string) {
  if (!value) {
    return value;
  }

  try {
    const url = new URL(value);
    const isSupabaseTransactionPooler =
      url.hostname.includes("pooler.supabase.com") && url.port === "6543";

    if (!isSupabaseTransactionPooler) {
      return value;
    }

    if (!url.searchParams.has("pgbouncer")) {
      url.searchParams.set("pgbouncer", "true");
    }

    if (!url.searchParams.has("connection_limit")) {
      url.searchParams.set("connection_limit", "1");
    }

    return url.toString();
  } catch {
    return value;
  }
}

const runtimeDatabaseUrl = normalizeDatabaseUrl(process.env.DATABASE_URL);

if (runtimeDatabaseUrl) {
  process.env.DATABASE_URL = runtimeDatabaseUrl;
}

export function hasDatabaseConfig() {
  return Boolean(runtimeDatabaseUrl);
}

function createPrismaClient(databaseUrl?: string) {
  return new PrismaClient({
    datasources: databaseUrl
      ? {
          db: {
            url: databaseUrl,
          },
        }
      : undefined,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

const shouldReuseExistingClient =
  Boolean(global.prisma) && global.prismaDatabaseUrl === runtimeDatabaseUrl;

if (!shouldReuseExistingClient && global.prisma) {
  void global.prisma.$disconnect().catch(() => {
    // Hot reload sırasında eski bağlantı kapanmasa bile yeni client oluşturmayı engellemiyoruz.
  });
}

export const prisma = shouldReuseExistingClient
  ? (global.prisma as PrismaClient)
  : createPrismaClient(runtimeDatabaseUrl);

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
  global.prismaDatabaseUrl = runtimeDatabaseUrl;
}
