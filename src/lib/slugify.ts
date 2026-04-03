/**
 * src/lib/slugify.ts
 *
 * Blog post başlığından URL-güvenli slug üretir.
 * Türkçe ve Arapça karakterleri dönüştürür.
 *
 * Örnek:
 *   slugify("Cilt Bakımı Nedir?")  →  "cilt-bakimi-nedir"
 *   slugify("هيد سبا")             →  "hyd-sb"
 */

const TR_MAP: Record<string, string> = {
  ş: "s", Ş: "S",
  ğ: "g", Ğ: "G",
  ü: "u", Ü: "U",
  ö: "o", Ö: "O",
  ı: "i", İ: "I",
  ç: "c", Ç: "C",
};

export function slugify(text: string): string {
  return text
    .split("")
    .map((ch) => TR_MAP[ch] ?? ch)
    .join("")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")  // aksan işaretlerini kaldırma
    .replace(/[^a-z0-9\s-]/g, "")    // Türkçe/Latin dışı karakterleri kaldırma
    .trim()
    .replace(/\s+/g, "-")            // boşlukları tireye çevirme
    .replace(/-+/g, "-")             // çift tireyi tek tire yapma
    || "post";                        // boş string kalırsa fallback
}