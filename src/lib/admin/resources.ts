import type {
  AdminField,
  AdminInputField,
  AdminInputFieldType,
  AdminResourceDefinition,
  AdminResourceKey,
  AdminSection,
} from "@/lib/admin/types";

const localeDefinitions = [
  { suffix: "Tr", label: "TR" },
  { suffix: "En", label: "EN" },
  { suffix: "De", label: "DE" },
] as const;

function localizedFields(
  baseName: string,
  label: string,
  type: Extract<AdminInputFieldType, "text" | "textarea" | "url">,
  options?: {
    required?: boolean;
    placeholder?: string;
    description?: string;
  },
) {
  return localeDefinitions.map<AdminInputField>(({ suffix, label: locale }) => ({
    type,
    name: `${baseName}${suffix}`,
    label: `${label} (${locale})`,
    required: options?.required,
    placeholder: options?.placeholder,
    description: options?.description,
  }));
}

function sortField(name = "sortOrder", label = "Siralama") {
  return {
    type: "number",
    name,
    label,
    min: 0,
    step: 1,
  } satisfies AdminInputField;
}

function booleanField(name: string, label: string, description?: string) {
  return {
    type: "checkbox",
    name,
    label,
    description,
  } satisfies AdminInputField;
}

function section(title: string, fields: AdminField[], description?: string) {
  return {
    title,
    description,
    fields,
  } satisfies AdminSection;
}

const campaignSections = [
  section(
    "Cok Dilli Basliklar",
    localizedFields("title", "Kampanya basligi", "text", {
      required: true,
      placeholder: "Ornek: Bahar rituel paketi",
    }),
    "Panel tek dilli olacak ama web tarafi TR / EN / DE olarak yayinlanacak.",
  ),
  section(
    "SEO URL ve Rozet",
    [
      ...localizedFields("seoUrl", "SEO URL", "text", {
        required: true,
        placeholder: "bahar-rituel-paketi",
      }),
      ...localizedFields("badge", "Rozet / Etiket", "text", {
        placeholder: "Ornek: Yeni sezon",
      }),
    ],
  ),
  section("Aciklama", localizedFields("desc", "Kisa aciklama", "textarea")),
  section("Medya ve Yayin", [
    {
      type: "url",
      name: "imageUrl",
      label: "Kampanya gorseli URL",
      placeholder: "https://...",
    },
    {
      type: "datetime-local",
      name: "startsAt",
      label: "Baslangic tarihi",
    },
    {
      type: "datetime-local",
      name: "endsAt",
      label: "Bitis tarihi",
    },
    sortField(),
    booleanField("isActive", "Yayinda"),
  ]),
];

const userSections = [
  section("Temel Bilgiler", [
    {
      type: "text",
      name: "firstName",
      label: "Ad",
      required: true,
    },
    {
      type: "text",
      name: "lastName",
      label: "Soyad",
      required: true,
    },
    {
      type: "email",
      name: "email",
      label: "E-posta",
      placeholder: "ornek@emselbeauty.com",
    },
    {
      type: "tel",
      name: "phoneNumber",
      label: "Telefon",
      placeholder: "+905551234567",
    },
    {
      type: "select",
      name: "status",
      label: "Durum",
      required: true,
      options: [
        { label: "Beklemede", value: "PENDING" },
        { label: "Aktif", value: "ACTIVE" },
        { label: "Askida", value: "SUSPENDED" },
        { label: "Engelli", value: "BANNED" },
      ],
    },
  ]),
];

const whoSections = [
  section("Cok Dilli Baslik", localizedFields("title", "Bolum basligi", "text")),
  section(
    "Cok Dilli Icerik",
    localizedFields("whoDesc", "Aciklama", "textarea", {
      placeholder: "Kurumsal hikaye, vizyon veya marka metni",
    }),
  ),
  section("Gorsel ve Durum", [
    {
      type: "url",
      name: "imageUrl",
      label: "Gorsel URL",
      placeholder: "https://...",
    },
    sortField(),
    booleanField("isActive", "Aktif"),
  ]),
];

const siteSettingsSections = [
  section("Temel Site Bilgileri", [
    {
      type: "text",
      name: "siteName",
      label: "Site adi",
      required: true,
    },
    {
      type: "text",
      name: "siteSeoKeywords",
      label: "SEO anahtar kelimeler",
      required: true,
      placeholder: "emsel beauty, spa, guzellik",
    },
    {
      type: "textarea",
      name: "siteSeoDescription",
      label: "SEO aciklamasi",
      required: true,
    },
  ]),
  section("Iletisim", [
    {
      type: "email",
      name: "email",
      label: "E-posta",
    },
    {
      type: "tel",
      name: "phoneNumber",
      label: "Telefon",
      placeholder: "+905551234567",
    },
    {
      type: "tel",
      name: "wpNumber",
      label: "WhatsApp numarasi",
      placeholder: "+905551234567",
    },
    {
      type: "url",
      name: "mapEmbedUrl",
      label: "Google Maps embed URL",
      placeholder: "https://www.google.com/maps/embed?...",
    },
  ]),
  section("Adresler", localizedFields("address", "Acik adres", "textarea")),
  section("Calisma Saatleri", localizedFields("workingHours", "Calisma saatleri", "text")),
  section("Marka ve Sosyal Medya", [
    {
      type: "url",
      name: "logoUrl",
      label: "Logo URL",
      placeholder: "/logo/emsel-logo.png veya https://...",
    },
    {
      type: "url",
      name: "faviconUrl",
      label: "Favicon URL",
      placeholder: "/favicon-emsel.png veya https://...",
    },
    {
      type: "url",
      name: "instagramUrl",
      label: "Instagram URL",
    },
    {
      type: "url",
      name: "facebookUrl",
      label: "Facebook URL",
    },
    {
      type: "url",
      name: "xUrl",
      label: "X / Twitter URL",
    },
  ]),
];

const productSections = [
  section("Urun Adi", localizedFields("name", "Urun adi", "text", { required: true })),
  section("Slug", localizedFields("slug", "Slug", "text", { required: true })),
  section(
    "Kisa Aciklama",
    localizedFields("shortDescription", "Kisa aciklama", "textarea"),
  ),
  section(
    "Detay Aciklama",
    localizedFields("description", "Detay aciklama", "textarea", {
      required: true,
    }),
  ),
  section("Kapak Gorseli", [
    {
      type: "url",
      name: "imageUrl",
      label: "Kapak gorseli URL",
    },
    ...localizedFields("imageAlt", "Kapak gorseli alt metni", "text"),
  ]),
  section("Satis Bilgileri", [
    {
      type: "number",
      name: "price",
      label: "Fiyat",
      required: true,
      min: 0,
      step: 0.01,
    },
    {
      type: "number",
      name: "stock",
      label: "Stok",
      required: true,
      min: 0,
      step: 1,
    },
    {
      type: "select",
      name: "currency",
      label: "Para birimi",
      required: true,
      options: [
        { label: "TRY", value: "TRY" },
        { label: "EUR", value: "EUR" },
        { label: "USD", value: "USD" },
      ],
    },
    sortField(),
    booleanField("isFeatured", "One cikan urun"),
    booleanField("isActive", "Yayinda"),
  ]),
  section("Galeri", [
    {
      type: "repeater",
      name: "galleries",
      label: "Urun galerisi",
      itemLabel: "Galeri gorseli",
      defaultItem: {
        imageUrl: "",
        imageAltTr: "",
        imageAltEn: "",
        imageAltDe: "",
        sortOrder: 0,
      },
      fields: [
        {
          type: "url",
          name: "imageUrl",
          label: "Gorsel URL",
        },
        ...localizedFields("imageAlt", "Alt metin", "text"),
        sortField(),
      ],
    },
  ]),
];

const serviceSections = [
  section("Kategori", localizedFields("category", "Kategori", "text")),
  section("Hizmet Adi", localizedFields("name", "Hizmet adi", "text", { required: true })),
  section("Slug", localizedFields("slug", "Slug", "text", { required: true })),
  section("Kart Aciklamasi", localizedFields("shortDescription", "Kisa aciklama", "textarea")),
  section(
    "Detay Aciklama",
    localizedFields("longDescription", "Uzun aciklama", "textarea"),
  ),
  section("Etiketler", [
    ...localizedFields("badge", "Rozet", "text"),
    ...localizedFields("sessionsLabel", "Seans etiketi", "text"),
  ]),
  section("Kapak Gorseli", [
    {
      type: "url",
      name: "imageUrl",
      label: "Kapak gorseli URL",
    },
    ...localizedFields("imageAlt", "Gorsel alt metni", "text"),
  ]),
  section("Yayin Ayarlari", [
    {
      type: "number",
      name: "durationMinutes",
      label: "Sure (dakika)",
      min: 0,
      step: 1,
    },
    sortField(),
    booleanField("isActive", "Yayinda"),
  ]),
  section("Galeri", [
    {
      type: "repeater",
      name: "galleries",
      label: "Galeri",
      itemLabel: "Galeri gorseli",
      defaultItem: {
        imageUrl: "",
        imageAltTr: "",
        imageAltEn: "",
        imageAltDe: "",
        sortOrder: 0,
      },
      fields: [
        {
          type: "url",
          name: "imageUrl",
          label: "Gorsel URL",
        },
        ...localizedFields("imageAlt", "Alt metin", "text"),
        sortField(),
      ],
    },
  ]),
  section("One Cikan Maddeler", [
    {
      type: "repeater",
      name: "features",
      label: "Ozellikler",
      itemLabel: "Ozellik",
      defaultItem: {
        labelTr: "",
        labelEn: "",
        labelDe: "",
        sortOrder: 0,
      },
      fields: [...localizedFields("label", "Madde", "text"), sortField()],
    },
  ]),
  section("Surec Adimlari", [
    {
      type: "repeater",
      name: "processSteps",
      label: "Surec adimlari",
      itemLabel: "Adim",
      defaultItem: {
        stepNumber: 1,
        titleTr: "",
        titleEn: "",
        titleDe: "",
        descriptionTr: "",
        descriptionEn: "",
        descriptionDe: "",
        sortOrder: 0,
      },
      fields: [
        {
          type: "number",
          name: "stepNumber",
          label: "Adim numarasi",
          min: 1,
          step: 1,
        },
        ...localizedFields("title", "Adim basligi", "text"),
        ...localizedFields("description", "Adim aciklamasi", "textarea"),
        sortField(),
      ],
    },
  ]),
  section("Sik Sorulan Sorular", [
    {
      type: "repeater",
      name: "faqs",
      label: "FAQ",
      itemLabel: "Soru / cevap",
      defaultItem: {
        questionTr: "",
        questionEn: "",
        questionDe: "",
        answerTr: "",
        answerEn: "",
        answerDe: "",
        sortOrder: 0,
      },
      fields: [
        ...localizedFields("question", "Soru", "textarea"),
        ...localizedFields("answer", "Cevap", "textarea"),
        sortField(),
      ],
    },
  ]),
];

const blogSections = [
  section("Baslik", localizedFields("title", "Blog basligi", "text", { required: true })),
  section("SEO URL", localizedFields("seoUrl", "Slug", "text", { required: true })),
  section("Kategori Etiketi", localizedFields("meta", "Meta etiket", "text")),
  section(
    "Kart Aciklamasi",
    localizedFields("description", "Liste aciklamasi", "textarea", {
      required: true,
    }),
  ),
  section("Makale Icerigi", localizedFields("body", "Makale icerigi", "textarea")),
  section("Hero Gorseli", [
    {
      type: "url",
      name: "imageUrl",
      label: "Ana gorsel URL",
      required: true,
    },
    ...localizedFields("imageAlt", "Alt metin", "text"),
  ]),
  section("Yayin Bilgisi", [
    {
      type: "number",
      name: "readTimeMin",
      label: "Okuma suresi (dk)",
      min: 1,
      step: 1,
      required: true,
    },
    {
      type: "datetime-local",
      name: "publishedAt",
      label: "Yayin tarihi",
    },
    sortField(),
    booleanField("status", "Yayinda"),
  ]),
  section("Galeri", [
    {
      type: "repeater",
      name: "galleries",
      label: "Galeri",
      itemLabel: "Galeri gorseli",
      defaultItem: {
        imageUrl: "",
        imageAltTr: "",
        imageAltEn: "",
        imageAltDe: "",
        sortOrder: 0,
      },
      fields: [
        {
          type: "url",
          name: "imageUrl",
          label: "Gorsel URL",
        },
        ...localizedFields("imageAlt", "Alt metin", "text"),
        sortField(),
      ],
    },
  ]),
];

const appointmentSections = [
  section("Randevu Bilgisi", [
    {
      type: "text",
      name: "name",
      label: "Ad Soyad",
      required: true,
    },
    {
      type: "tel",
      name: "phone",
      label: "Telefon",
      placeholder: "+905551234567",
    },
    {
      type: "text",
      name: "service",
      label: "Talep edilen hizmet",
      required: true,
    },
    {
      type: "select",
      name: "locale",
      label: "Dil",
      required: true,
      options: [
        { label: "Turkce", value: "tr" },
        { label: "English", value: "en" },
        { label: "Deutsch", value: "de" },
      ],
    },
    {
      type: "select",
      name: "status",
      label: "Durum",
      required: true,
      options: [
        { label: "Beklemede", value: "PENDING" },
        { label: "Onaylandi", value: "CONFIRMED" },
        { label: "Iptal edildi", value: "CANCELLED" },
        { label: "Tamamlandi", value: "COMPLETED" },
      ],
    },
  ]),
];

export const adminResources: AdminResourceDefinition[] = [
  {
    key: "campaigns",
    title: "Kampanyalar",
    singular: "Kampanya",
    description: "Anasayfa ve landing alanlarinda yayinlanacak kampanyalari yonet.",
    href: "/admin/campaigns",
    apiPath: "/api/admin/campaigns",
    emptyState: "Henuz kampanya kaydi yok.",
    createLabel: "Yeni kampanya",
    columns: [
      { key: "titleTr", label: "TR baslik" },
      { key: "badgeTr", label: "Rozet", placeholder: "-" },
      { key: "isActive", label: "Durum", type: "boolean", trueLabel: "Yayinda", falseLabel: "Pasif" },
      { key: "startsAt", label: "Baslangic", type: "date", placeholder: "-" },
      { key: "updatedAt", label: "Guncellendi", type: "date" },
    ],
    formSections: campaignSections,
    defaultValues: {
      titleTr: "",
      titleEn: "",
      titleDe: "",
      seoUrlTr: "",
      seoUrlEn: "",
      seoUrlDe: "",
      descTr: "",
      descEn: "",
      descDe: "",
      badgeTr: "",
      badgeEn: "",
      badgeDe: "",
      imageUrl: "",
      startsAt: "",
      endsAt: "",
      sortOrder: 0,
      isActive: true,
    },
  },
  {
    key: "users",
    title: "Kullanicilar",
    singular: "Kullanici",
    description: "Admin, editor veya potansiyel musteri kayitlarini tek yerde takip et.",
    href: "/admin/users",
    apiPath: "/api/admin/users",
    emptyState: "Henuz kullanici kaydi yok.",
    createLabel: "Yeni kullanici",
    columns: [
      { key: "firstName", label: "Ad" },
      { key: "lastName", label: "Soyad" },
      { key: "email", label: "E-posta", placeholder: "-" },
      { key: "phoneNumber", label: "Telefon", placeholder: "-" },
      { key: "status", label: "Durum" },
    ],
    formSections: userSections,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      status: "PENDING",
    },
  },
  {
    key: "who",
    title: "Hikayemiz",
    singular: "Hikaye bolumu",
    description: "Ana sayfadaki kurumsal hikaye bloklarini ve sira yapisini yonet.",
    href: "/admin/who",
    apiPath: "/api/admin/who",
    emptyState: "Henuz hikaye bolumu eklenmedi.",
    createLabel: "Yeni hikaye bolumu",
    columns: [
      { key: "titleTr", label: "TR baslik", placeholder: "-" },
      { key: "sortOrder", label: "Sira" },
      { key: "isActive", label: "Durum", type: "boolean", trueLabel: "Aktif", falseLabel: "Pasif" },
      { key: "updatedAt", label: "Guncellendi", type: "date" },
    ],
    formSections: whoSections,
    defaultValues: {
      titleTr: "",
      titleEn: "",
      titleDe: "",
      whoDescTr: "",
      whoDescEn: "",
      whoDescDe: "",
      imageUrl: "",
      sortOrder: 0,
      isActive: true,
    },
  },
  {
    key: "site-settings",
    title: "Site Ayarlari",
    singular: "Site ayari",
    description: "Genel marka, SEO, footer ve iletisim verilerini tek merkezden yonet.",
    href: "/admin/site-settings",
    apiPath: "/api/admin/site-settings",
    emptyState: "Site ayari kaydi henuz olusturulmadi.",
    createLabel: "Site ayari olustur",
    singleton: true,
    columns: [
      { key: "siteName", label: "Site adi" },
      { key: "email", label: "E-posta", placeholder: "-" },
      { key: "phoneNumber", label: "Telefon", placeholder: "-" },
      { key: "updatedAt", label: "Guncellendi", type: "date" },
    ],
    formSections: siteSettingsSections,
    defaultValues: {
      siteName: "",
      siteSeoKeywords: "",
      siteSeoDescription: "",
      email: "",
      phoneNumber: "",
      wpNumber: "",
      addressTr: "",
      addressEn: "",
      addressDe: "",
      mapEmbedUrl: "",
      workingHoursTr: "",
      workingHoursEn: "",
      workingHoursDe: "",
      logoUrl: "",
      faviconUrl: "",
      instagramUrl: "",
      facebookUrl: "",
      xUrl: "",
    },
  },
  {
    key: "products",
    title: "Urunler",
    singular: "Urun",
    description: "Cok dilli urun katalogu, fiyat ve stok bilgisini yonet.",
    href: "/admin/products",
    apiPath: "/api/admin/products",
    emptyState: "Henuz urun kaydi yok.",
    createLabel: "Yeni urun",
    columns: [
      { key: "nameTr", label: "TR urun adi" },
      { key: "price", label: "Fiyat", type: "money", currencyKey: "currency" },
      { key: "stock", label: "Stok" },
      { key: "isFeatured", label: "One cikan", type: "boolean", trueLabel: "Evet", falseLabel: "Hayir" },
      { key: "isActive", label: "Durum", type: "boolean", trueLabel: "Yayinda", falseLabel: "Pasif" },
    ],
    formSections: productSections,
    defaultValues: {
      nameTr: "",
      nameEn: "",
      nameDe: "",
      slugTr: "",
      slugEn: "",
      slugDe: "",
      shortDescriptionTr: "",
      shortDescriptionEn: "",
      shortDescriptionDe: "",
      descriptionTr: "",
      descriptionEn: "",
      descriptionDe: "",
      imageUrl: "",
      imageAltTr: "",
      imageAltEn: "",
      imageAltDe: "",
      price: 0,
      stock: 0,
      currency: "TRY",
      isFeatured: false,
      isActive: true,
      sortOrder: 0,
      galleries: [],
    },
  },
  {
    key: "services",
    title: "Hizmetler",
    singular: "Hizmet",
    description: "Hizmet katalogu, surec adimlari, galeri ve SSS bloklarini yonet.",
    href: "/admin/services",
    apiPath: "/api/admin/services",
    emptyState: "Henuz hizmet kaydi yok.",
    createLabel: "Yeni hizmet",
    columns: [
      { key: "nameTr", label: "TR hizmet adi" },
      { key: "categoryTr", label: "Kategori", placeholder: "-" },
      { key: "durationMinutes", label: "Sure", placeholder: "-" },
      { key: "features", label: "Ozellik", type: "count" },
      { key: "isActive", label: "Durum", type: "boolean", trueLabel: "Yayinda", falseLabel: "Pasif" },
    ],
    formSections: serviceSections,
    defaultValues: {
      categoryTr: "",
      categoryEn: "",
      categoryDe: "",
      nameTr: "",
      nameEn: "",
      nameDe: "",
      slugTr: "",
      slugEn: "",
      slugDe: "",
      shortDescriptionTr: "",
      shortDescriptionEn: "",
      shortDescriptionDe: "",
      longDescriptionTr: "",
      longDescriptionEn: "",
      longDescriptionDe: "",
      badgeTr: "",
      badgeEn: "",
      badgeDe: "",
      sessionsLabelTr: "",
      sessionsLabelEn: "",
      sessionsLabelDe: "",
      durationMinutes: 0,
      imageUrl: "",
      imageAltTr: "",
      imageAltEn: "",
      imageAltDe: "",
      isActive: true,
      sortOrder: 0,
      galleries: [],
      features: [],
      processSteps: [],
      faqs: [],
    },
  },
  {
    key: "blog-posts",
    title: "Blog Yazilari",
    singular: "Blog yazisi",
    description: "Liste ve detay sayfalarina gidecek cok dilli editoral icerikleri yonet.",
    href: "/admin/blog-posts",
    apiPath: "/api/admin/blog-posts",
    emptyState: "Henuz blog yazisi yok.",
    createLabel: "Yeni blog yazisi",
    columns: [
      { key: "titleTr", label: "TR baslik" },
      { key: "metaTr", label: "Meta", placeholder: "-" },
      { key: "publishedAt", label: "Yayin tarihi", type: "date", placeholder: "-" },
      { key: "status", label: "Durum", type: "boolean", trueLabel: "Yayinda", falseLabel: "Taslak" },
      { key: "galleries", label: "Galeri", type: "count" },
    ],
    formSections: blogSections,
    defaultValues: {
      titleTr: "",
      titleEn: "",
      titleDe: "",
      seoUrlTr: "",
      seoUrlEn: "",
      seoUrlDe: "",
      metaTr: "",
      metaEn: "",
      metaDe: "",
      descriptionTr: "",
      descriptionEn: "",
      descriptionDe: "",
      bodyTr: "",
      bodyEn: "",
      bodyDe: "",
      imageUrl: "",
      imageAltTr: "",
      imageAltEn: "",
      imageAltDe: "",
      readTimeMin: 1,
      publishedAt: "",
      status: true,
      sortOrder: 0,
      galleries: [],
    },
  },
  {
    key: "contact-appointments",
    title: "Randevu Talepleri",
    singular: "Randevu talebi",
    description: "Iletisim formu ve online rezervasyon taleplerini operasyon ekibi icin yonet.",
    href: "/admin/contact-appointments",
    apiPath: "/api/admin/contact-appointments",
    emptyState: "Henuz randevu talebi yok.",
    createLabel: "Yeni talep",
    columns: [
      { key: "name", label: "Ad Soyad" },
      { key: "phone", label: "Telefon", placeholder: "-" },
      { key: "service", label: "Hizmet" },
      { key: "locale", label: "Dil" },
      { key: "status", label: "Durum" },
      { key: "createdAt", label: "Olusturuldu", type: "date" },
    ],
    formSections: appointmentSections,
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      locale: "tr",
      status: "PENDING",
    },
  },
];

export const adminResourceMap = Object.fromEntries(
  adminResources.map((resource) => [resource.key, resource]),
) as Record<AdminResourceKey, AdminResourceDefinition>;

export function getAdminResource(resourceKey: string) {
  return adminResourceMap[resourceKey as AdminResourceKey] ?? null;
}
