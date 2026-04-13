import { compare, hash } from "bcryptjs";

import { PASSWORD_SALT_ROUNDS } from "@/lib/auth/constants";

const passwordPolicy =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,}$/;

export function validatePasswordStrength(password: string) {
  if (!passwordPolicy.test(password)) {
    return {
      ok: false,
      message:
        "Sifre en az 12 karakter olmali; buyuk harf, kucuk harf, rakam ve sembol icermelidir.",
    };
  }

  return {
    ok: true,
  };
}

export async function hashPassword(password: string) {
  return hash(password, PASSWORD_SALT_ROUNDS);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}
