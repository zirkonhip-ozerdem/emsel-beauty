const protectedTokenPattern =
  /https?:\/\/[^\s<>"']+|www\.[^\s<>"']+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

const turkishTextRules: Array<[RegExp, string]> = [
  [/\bOrnek\b/g, "Örnek"],
  [/\bornek\b/g, "örnek"],
  [/\bGuzellik\b/g, "Güzellik"],
  [/\bguzellik\b/g, "güzellik"],
  [/\bIstanbull*\b/g, "İstanbul"],
  [/\bistanbull*\b/g, "İstanbul"],
  [/\bBesiktas\b/g, "Beşiktaş"],
  [/\bbesiktas\b/g, "Beşiktaş"],
  [/\bTurkiye\b/g, "Türkiye"],
  [/\bturkiye\b/g, "Türkiye"],
  [/\bTurkce\b/g, "Türkçe"],
  [/\bturkce\b/g, "Türkçe"],
  [/\bIletisim\b/g, "İletişim"],
  [/\biletisim\b/g, "iletişim"],
  [/\bCalisma\b/g, "Çalışma"],
  [/\bcalisma\b/g, "çalışma"],
  [/\bSaatleri\b/g, "Saatleri"],
  [/\bsaatleri\b/g, "saatleri"],
  [/\bTum haklari saklidir\b/g, "Tüm hakları saklıdır"],
  [/\bTum Haklari Saklidir\b/g, "Tüm Hakları Saklıdır"],
  [/\bHakkimizda\b/g, "Hakkımızda"],
  [/\bhakkimizda\b/g, "hakkımızda"],
  [/\bHizmetler\b/g, "Hizmetler"],
  [/\bhizmetler\b/g, "hizmetler"],
  [/\bUrunler\b/g, "Ürünler"],
  [/\burunler\b/g, "ürünler"],
  [/\bUrun\b/g, "Ürün"],
  [/\burun\b/g, "ürün"],
  [/\bKampanyalar\b/g, "Kampanyalar"],
  [/\bkampanyalar\b/g, "kampanyalar"],
  [/\bBakim\b/g, "Bakım"],
  [/\bbakim\b/g, "bakım"],
  [/\bSac\b/g, "Saç"],
  [/\bsac\b/g, "saç"],
  [/\bYuz\b/g, "Yüz"],
  [/\byuz\b/g, "yüz"],
  [/\bVucut\b/g, "Vücut"],
  [/\bvucut\b/g, "vücut"],
  [/\bTirnak\b/g, "Tırnak"],
  [/\btirnak\b/g, "tırnak"],
  [/\bMasaji\b/g, "Masajı"],
  [/\bmasaji\b/g, "masajı"],
  [/\bKalici\b/g, "Kalıcı"],
  [/\bkalici\b/g, "kalıcı"],
  [/\bKas\b/g, "Kaş"],
  [/\bkas\b/g, "kaş"],
  [/\bTasarim\b/g, "Tasarım"],
  [/\btasarim\b/g, "tasarım"],
  [/\bSekil\b/g, "Şekil"],
  [/\bsekil\b/g, "şekil"],
  [/\bAgrisiz\b/g, "Ağrısız"],
  [/\bagrisiz\b/g, "ağrısız"],
  [/\bSonuclar\b/g, "Sonuçlar"],
  [/\bsonuclar\b/g, "sonuçlar"],
  [/\bOzel\b/g, "Özel"],
  [/\bozel\b/g, "özel"],
  [/\bCok\b/g, "Çok"],
  [/\bcok\b/g, "çok"],
  [/\bDegil\b/g, "Değil"],
  [/\bdegil\b/g, "değil"],
  [/\bDogal\b/g, "Doğal"],
  [/\bdogal\b/g, "doğal"],
  [/\bIc\b/g, "İç"],
  [/\bic\b/g, "iç"],
  [/\bIcerik\b/g, "İçerik"],
  [/\bicerik\b/g, "içerik"],
  [/\bSeciniz\b/g, "Seçiniz"],
  [/\bseciniz\b/g, "seçiniz"],
  [/\bSecili\b/g, "Seçili"],
  [/\bsecili\b/g, "seçili"],
  [/\bSecim\b/g, "Seçim"],
  [/\bsecim\b/g, "seçim"],
  [/\bSecimi\b/g, "Seçimi"],
  [/\bsecimi\b/g, "seçimi"],
  [/\bGonder\b/g, "Gönder"],
  [/\bgonder\b/g, "gönder"],
  [/\bBasvuru\b/g, "Başvuru"],
  [/\bbasvuru\b/g, "başvuru"],
  [/\bRandevu\b/g, "Randevu"],
  [/\brandevu\b/g, "randevu"],
  [/\bRezervasyon\b/g, "Rezervasyon"],
  [/\brezervasyon\b/g, "rezervasyon"],
  [/\bKisisel\b/g, "Kişisel"],
  [/\bkisisel\b/g, "kişisel"],
  [/\bVeriler\b/g, "Veriler"],
  [/\bveriler\b/g, "veriler"],
  [/\bGuvenli\b/g, "Güvenli"],
  [/\bguvenli\b/g, "güvenli"],
  [/\bDeneyim\b/g, "Deneyim"],
  [/\bdeneyim\b/g, "deneyim"],
  [/\bProfesyonel\b/g, "Profesyonel"],
  [/\bprofesyonel\b/g, "profesyonel"],
  [/\bOperasyon\b/g, "Operasyon"],
  [/\boperasyon\b/g, "operasyon"],
  [/\bKoleksiyon\b/g, "Koleksiyon"],
  [/\bkoleksiyon\b/g, "koleksiyon"],
  [/\bMisyon\b/g, "Misyon"],
  [/\bmisyon\b/g, "misyon"],
  [/\bVizyon\b/g, "Vizyon"],
  [/\bvizyon\b/g, "vizyon"],
  [/\bYonetim\b/g, "Yönetim"],
  [/\byonetim\b/g, "yönetim"],
  [/\bYontem\b/g, "Yöntem"],
  [/\byontem\b/g, "yöntem"],
  [/\bYonlendirme\b/g, "Yönlendirme"],
  [/\byonlendirme\b/g, "yönlendirme"],
  [/\bDil secici\b/g, "Dil seçici"],
  [/\bdil secici\b/g, "dil seçici"],
];

function normalizeSegment(value: string) {
  const protectedTokens: string[] = [];
  let next = value.replace(protectedTokenPattern, (token) => {
    const placeholder = `__TR_TEXT_TOKEN_${protectedTokens.length}__`;
    protectedTokens.push(token);
    return placeholder;
  });

  for (const [pattern, replacement] of turkishTextRules) {
    next = next.replace(pattern, replacement);
  }

  return protectedTokens.reduce(
    (result, token, index) => result.replace(`__TR_TEXT_TOKEN_${index}__`, token),
    next,
  );
}

export function normalizeTurkishText<T extends string | null | undefined>(value: T): T {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .split(/(<[^>]+>)/g)
    .map((part) => (part.startsWith("<") && part.endsWith(">") ? part : normalizeSegment(part)))
    .join("") as T;
}
