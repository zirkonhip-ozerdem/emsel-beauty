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

function sortField(name = "sortOrder", label = "Sıralama") {
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
    "Çok Dilli Başlıklar",
    localizedFields("title", "Kampanya başlığı", "text", {
      required: true,
      placeholder: "Örnek: Bahar ritüel paketi",
    }),
    "Panel tek dilli olacak ama web tarafı TR / EN / DE olarak yayınlanacak.",
  ),
  section(
    "SEO URL ve Rozet",
    [
      ...localizedFields("seoUrl", "SEO URL", "text", {
        required: true,
        placeholder: "bahar-rituel-paketi",
      }),
      ...localizedFields("badge", "Rozet / Etiket", "text", {
        placeholder: "Örnek: Yeni sezon",
      }),
    ],
  ),
  section("Açıklama", localizedFields("desc", "Kısa açıklama", "textarea")),
  section("Medya ve Yayın", [
    {
      type: "url",
      name: "imageUrl",
      label: "Kampanya görseli URL",
      placeholder: "https://...",
    },
    {
      type: "datetime-local",
      name: "startsAt",
      label: "Başlangıç tarihi",
    },
    {
      type: "datetime-local",
      name: "endsAt",
      label: "Bitiş tarihi",
    },
    sortField(),
    booleanField("isActive", "Yayında"),
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
        { label: "Askıda", value: "SUSPENDED" },
        { label: "Engelli", value: "BANNED" },
      ],
    },
  ]),
];

const whoSections = [
  section("Çok Dilli Başlık", localizedFields("title", "Bölüm başlığı", "text")),
  section(
    "Çok Dilli İçerik",
    localizedFields("whoDesc", "Açıklama", "textarea", {
      placeholder: "Kurumsal hikâye, vizyon veya marka metni",
    }),
  ),
  section("Görsel ve Durum", [
    {
      type: "url",
      name: "imageUrl",
      label: "Görsel URL",
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
      label: "Site adı",
      required: true,
    },
    {
      type: "text",
      name: "siteSeoKeywords",
      label: "SEO anahtar kelimeler",
      required: true,
      placeholder: "emsel beauty, spa, güzellik",
    },
    {
      type: "textarea",
      name: "siteSeoDescription",
      label: "SEO açıklaması",
      required: true,
    },
  ]),
  section("İletişim", [
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
      label: "WhatsApp numarası",
      placeholder: "+905551234567",
    },
    {
      type: "url",
      name: "mapEmbedUrl",
      label: "Google Maps embed URL",
      placeholder: "https://www.google.com/maps/embed?...",
    },
  ]),
  section("Adresler", localizedFields("address", "Açık adres", "textarea")),
  section("Çalışma Saatleri", localizedFields("workingHours", "Çalışma saatleri", "text")),
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
  section("Ürün Adı", localizedFields("name", "Ürün adı", "text", { required: true })),
  section("Slug", localizedFields("slug", "Slug", "text", { required: true })),
  section(
    "Kısa Açıklama",
    localizedFields("shortDescription", "Kısa açıklama", "textarea"),
  ),
  section(
    "Detay Açıklama",
    localizedFields("description", "Detay açıklama", "textarea", {
      required: true,
    }),
  ),
  section("Kapak Görseli", [
    {
      type: "url",
      name: "imageUrl",
      label: "Kapak görseli URL",
    },
    ...localizedFields("imageAlt", "Kapak görseli alt metni", "text"),
  ]),
  section("Satış Bilgileri", [
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
    booleanField("isFeatured", "Öne çıkan ürün"),
    booleanField("isActive", "Yayında"),
  ]),
  section("Galeri", [
    {
      type: "repeater",
      name: "galleries",
      label: "Ürün galerisi",
      itemLabel: "Galeri görseli",
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
          label: "Görsel URL",
        },
        ...localizedFields("imageAlt", "Alt metin", "text"),
        sortField(),
      ],
    },
  ]),
];

const serviceSections = [
  section("Kategori", localizedFields("category", "Kategori", "text")),
  section("Hizmet Adı", localizedFields("name", "Hizmet adı", "text", { required: true })),
  section("Slug", localizedFields("slug", "Slug", "text", { required: true })),
  section("Kart Açıklaması", localizedFields("shortDescription", "Kısa açıklama", "textarea")),
  section(
    "Detay Açıklama",
    localizedFields("longDescription", "Uzun açıklama", "textarea"),
  ),
  section("Etiketler", [
    ...localizedFields("badge", "Rozet", "text"),
    ...localizedFields("sessionsLabel", "Seans etiketi", "text"),
  ]),
  section("Kapak Görseli", [
    {
      type: "url",
      name: "imageUrl",
      label: "Kapak görseli URL",
    },
    ...localizedFields("imageAlt", "Görsel alt metni", "text"),
  ]),
  section("Yayın Ayarları", [
    {
      type: "number",
      name: "durationMinutes",
      label: "Süre (dakika)",
      min: 0,
      step: 1,
    },
    sortField(),
    booleanField("isActive", "Yayında"),
  ]),
  section("Galeri", [
    {
      type: "repeater",
      name: "galleries",
      label: "Galeri",
      itemLabel: "Galeri görseli",
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
          label: "Görsel URL",
        },
        ...localizedFields("imageAlt", "Alt metin", "text"),
        sortField(),
      ],
    },
  ]),
  section("Öne Çıkan Maddeler", [
    {
      type: "repeater",
      name: "features",
      label: "Özellikler",
      itemLabel: "Özellik",
      defaultItem: {
        labelTr: "",
        labelEn: "",
        labelDe: "",
        sortOrder: 0,
      },
      fields: [...localizedFields("label", "Madde", "text"), sortField()],
    },
  ]),
  section("Süreç Adımları", [
    {
      type: "repeater",
      name: "processSteps",
      label: "Süreç adımları",
      itemLabel: "Adım",
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
          label: "Adım numarası",
          min: 1,
          step: 1,
        },
        ...localizedFields("title", "Adım başlığı", "text"),
        ...localizedFields("description", "Adım açıklaması", "textarea"),
        sortField(),
      ],
    },
  ]),
  section("Sık Sorulan Sorular", [
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
  section("Başlık", localizedFields("title", "Blog başlığı", "text", { required: true })),
  section("SEO URL", localizedFields("seoUrl", "Slug", "text", { required: true })),
  section("Kategori Etiketi", localizedFields("meta", "Meta etiket", "text")),
  section(
    "Kart Açıklaması",
    localizedFields("description", "Liste açıklaması", "textarea", {
      required: true,
    }),
  ),
  section("Makale İçeriği", localizedFields("body", "Makale içeriği", "textarea")),
  section("Hero Görseli", [
    {
      type: "url",
      name: "imageUrl",
      label: "Ana görsel URL",
      required: true,
    },
    ...localizedFields("imageAlt", "Alt metin", "text"),
  ]),
  section("Yayın Bilgisi", [
    {
      type: "number",
      name: "readTimeMin",
      label: "Okuma süresi (dk)",
      min: 1,
      step: 1,
      required: true,
    },
    {
      type: "datetime-local",
      name: "publishedAt",
      label: "Yayın tarihi",
    },
    sortField(),
    booleanField("status", "Yayında"),
  ]),
  section("Galeri", [
    {
      type: "repeater",
      name: "galleries",
      label: "Galeri",
      itemLabel: "Galeri görseli",
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
          label: "Görsel URL",
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
        { label: "Türkçe", value: "tr" },
        { label: "İngilizce", value: "en" },
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
        { label: "Onaylandı", value: "CONFIRMED" },
        { label: "İptal edildi", value: "CANCELLED" },
        { label: "Tamamlandı", value: "COMPLETED" },
      ],
    },
  ]),
];

export const adminResources: AdminResourceDefinition[] = [
  {
    key: "campaigns",
    title: "Kampanyalar",
    singular: "Kampanya",
    description: "Anasayfa ve landing alanlarında yayınlanacak kampanyaları yönet.",
    href: "/admin/campaigns",
    apiPath: "/api/admin/campaigns",
    emptyState: "Henüz kampanya kaydı yok.",
    createLabel: "Yeni kampanya",
    columns: [
      { key: "titleTr", label: "TR başlık" },
      { key: "badgeTr", label: "Rozet", placeholder: "-" },
      { key: "isActive", label: "Durum", type: "boolean", trueLabel: "Yayında", falseLabel: "Pasif" },
      { key: "startsAt", label: "Başlangıç", type: "date", placeholder: "-" },
      { key: "updatedAt", label: "Güncellendi", type: "date" },
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
    autoFillRules: [
      { source: "titleTr", targets: ["seoUrlTr"], transform: "slugify" },
      { source: "titleEn", targets: ["seoUrlEn"], transform: "slugify" },
      { source: "titleDe", targets: ["seoUrlDe"], transform: "slugify" },
      { source: "titleTr", targets: ["badgeTr"], transform: "copy" },
      { source: "titleEn", targets: ["badgeEn"], transform: "copy" },
      { source: "titleDe", targets: ["badgeDe"], transform: "copy" },
    ],
  },
  {
    key: "users",
    title: "Kullanıcılar",
    singular: "Kullanıcı",
    description: "Admin, editör veya potansiyel müşteri kayıtlarını tek yerde takip et.",
    href: "/admin/users",
    apiPath: "/api/admin/users",
    emptyState: "Henüz kullanıcı kaydı yok.",
    createLabel: "Yeni kullanıcı",
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
    singular: "Hikâye bölümü",
    description: "Ana sayfadaki kurumsal hikâye bloklarını ve sıra yapısını yönet.",
    href: "/admin/who",
    apiPath: "/api/admin/who",
    emptyState: "Henüz hikâye bölümü eklenmedi.",
    createLabel: "Yeni hikâye bölümü",
    columns: [
      { key: "titleTr", label: "TR başlık", placeholder: "-" },
      { key: "sortOrder", label: "Sıra" },
      { key: "isActive", label: "Durum", type: "boolean", trueLabel: "Aktif", falseLabel: "Pasif" },
      { key: "updatedAt", label: "Güncellendi", type: "date" },
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
    title: "Site Ayarları",
    singular: "Site ayarı",
    description: "Genel marka, SEO, footer ve iletişim verilerini tek merkezden yönet.",
    href: "/admin/site-settings",
    apiPath: "/api/admin/site-settings",
    emptyState: "Site ayarı kaydı henüz oluşturulmadı.",
    createLabel: "Site ayarı oluştur",
    singleton: true,
    columns: [
      { key: "siteName", label: "Site adı" },
      { key: "email", label: "E-posta", placeholder: "-" },
      { key: "phoneNumber", label: "Telefon", placeholder: "-" },
      { key: "updatedAt", label: "Güncellendi", type: "date" },
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
    title: "Ürünler",
    singular: "Ürün",
    description: "Çok dilli ürün kataloğu, fiyat ve stok bilgisini yönet.",
    href: "/admin/products",
    apiPath: "/api/admin/products",
    emptyState: "Henüz ürün kaydı yok.",
    createLabel: "Yeni ürün",
    columns: [
      { key: "nameTr", label: "TR ürün adı" },
      { key: "price", label: "Fiyat", type: "money", currencyKey: "currency" },
      { key: "stock", label: "Stok" },
      { key: "isFeatured", label: "Öne çıkan", type: "boolean", trueLabel: "Evet", falseLabel: "Hayır" },
      { key: "isActive", label: "Durum", type: "boolean", trueLabel: "Yayında", falseLabel: "Pasif" },
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
    description: "Hizmet kataloğu, süreç adımları, galeri ve SSS bloklarını yönet.",
    href: "/admin/services",
    apiPath: "/api/admin/services",
    emptyState: "Henüz hizmet kaydı yok.",
    createLabel: "Yeni hizmet",
    columns: [
      { key: "nameTr", label: "TR hizmet adı" },
      { key: "categoryTr", label: "Kategori", placeholder: "-" },
      { key: "durationMinutes", label: "Süre", placeholder: "-" },
      { key: "features", label: "Özellik", type: "count" },
      { key: "isActive", label: "Durum", type: "boolean", trueLabel: "Yayında", falseLabel: "Pasif" },
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
    title: "Blog Yazıları",
    singular: "Blog yazısı",
    description: "Liste ve detay sayfalarına gidecek çok dilli editoryal içerikleri yönet.",
    href: "/admin/blog-posts",
    apiPath: "/api/admin/blog-posts",
    emptyState: "Henüz blog yazısı yok.",
    createLabel: "Yeni blog yazısı",
    columns: [
      { key: "titleTr", label: "TR başlık" },
      { key: "metaTr", label: "Meta", placeholder: "-" },
      { key: "publishedAt", label: "Yayın tarihi", type: "date", placeholder: "-" },
      { key: "status", label: "Durum", type: "boolean", trueLabel: "Yayında", falseLabel: "Taslak" },
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
    description: "İletişim formu ve online rezervasyon taleplerini operasyon ekibi için yönet.",
    href: "/admin/contact-appointments",
    apiPath: "/api/admin/contact-appointments",
    emptyState: "Henüz randevu talebi yok.",
    createLabel: "Yeni talep",
    columns: [
      { key: "name", label: "Ad Soyad" },
      { key: "phone", label: "Telefon", placeholder: "-" },
      { key: "service", label: "Hizmet" },
      { key: "locale", label: "Dil" },
      { key: "status", label: "Durum" },
      { key: "createdAt", label: "Oluşturuldu", type: "date" },
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
