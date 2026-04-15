import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

function stripWrappingQuotes(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function loadRuntimeDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return;
  }

  for (const filename of [".env.local", ".env"]) {
    const envPath = resolve(process.cwd(), filename);

    if (!existsSync(envPath)) {
      continue;
    }

    const fileContent = readFileSync(envPath, "utf8");
    const lines = fileContent.split(/\r?\n/);

    for (const rawLine of lines) {
      const line = rawLine.trim();

      if (!line || line.startsWith("#")) {
        continue;
      }

      const separatorIndex = line.indexOf("=");

      if (separatorIndex <= 0) {
        continue;
      }

      const key = line.slice(0, separatorIndex).trim();

      if (key !== "DATABASE_URL") {
        continue;
      }

      process.env.DATABASE_URL = stripWrappingQuotes(
        line.slice(separatorIndex + 1).trim(),
      );
      return;
    }
  }
}

loadRuntimeDatabaseUrl();

export function hasDatabaseConfig() {
  return Boolean(process.env.DATABASE_URL);
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
