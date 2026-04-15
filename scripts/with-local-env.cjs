/* eslint-disable no-console */
const { existsSync, readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { spawnSync } = require("node:child_process");

function stripWrappingQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function loadEnvFile(filepath) {
  const fileContent = readFileSync(filepath, "utf8");
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
    const value = stripWrappingQuotes(line.slice(separatorIndex + 1).trim());

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

const projectRoot = process.cwd();
const preferredEnvFiles = [".env.local", ".env"];

for (const envFilename of preferredEnvFiles) {
  const envPath = resolve(projectRoot, envFilename);

  if (existsSync(envPath)) {
    loadEnvFile(envPath);
    break;
  }
}

const [command, ...args] = process.argv.slice(2);

if (!command) {
  console.error("Komut bulunamadi. Ornek: node scripts/with-local-env.cjs npx prisma generate");
  process.exit(1);
}

const result = spawnSync(command, args, {
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
