import { z } from "zod";

const requiredText = (max = 255) =>
  z.string().trim().min(1, "Bu alan zorunludur.").max(max);

const optionalText = (max = 10000) =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => {
      if (typeof value !== "string") {
        return null;
      }

      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed.slice(0, max) : null;
    });

const optionalUrl = () =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => {
      if (typeof value !== "string") {
        return null;
      }

      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : null;
    });

const optionalDate = () =>
  z
    .union([z.string(), z.date(), z.null(), z.undefined()])
    .transform((value) => {
      if (!value) {
        return null;
      }

      if (value instanceof Date) {
        return value;
      }

      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? null : date;
    });

const integerNumber = (min = 0) =>
  z.coerce.number().int().min(min, `En az ${min} olmalidir.`);

const decimalNumber = (min = 0) =>
  z.coerce.number().min(min, `En az ${min} olmalidir.`);

const booleanValue = () => z.coerce.boolean();

function localizedOptionalTextObject<const TBaseLabel extends string>(
  baseLabel: TBaseLabel,
  max = 255,
) {
  return {
    [`${baseLabel}Tr`]: optionalText(max),
    [`${baseLabel}En`]: optionalText(max),
    [`${baseLabel}De`]: optionalText(max),
  } as Record<
    `${TBaseLabel}Tr` | `${TBaseLabel}En` | `${TBaseLabel}De`,
    ReturnType<typeof optionalText>
  >;
}

function localizedRequiredTextObject<const TBaseLabel extends string>(
  baseLabel: TBaseLabel,
  max = 255,
) {
  return {
    [`${baseLabel}Tr`]: requiredText(max),
    [`${baseLabel}En`]: requiredText(max),
    [`${baseLabel}De`]: requiredText(max),
  } as Record<
    `${TBaseLabel}Tr` | `${TBaseLabel}En` | `${TBaseLabel}De`,
    ReturnType<typeof requiredText>
  >;
}

const galleryItemSchema = z.object({
  imageUrl: optionalUrl(),
  imageAltTr: optionalText(255),
  imageAltEn: optionalText(255),
  imageAltDe: optionalText(255),
  sortOrder: integerNumber(0).default(0),
});

const serviceFeatureSchema = z.object({
  labelTr: requiredText(255),
  labelEn: requiredText(255),
  labelDe: requiredText(255),
  sortOrder: integerNumber(0).default(0),
});

const serviceProcessStepSchema = z.object({
  stepNumber: integerNumber(1),
  titleTr: requiredText(255),
  titleEn: requiredText(255),
  titleDe: requiredText(255),
  descriptionTr: requiredText(10000),
  descriptionEn: requiredText(10000),
  descriptionDe: requiredText(10000),
  sortOrder: integerNumber(0).default(0),
});

const serviceFaqSchema = z.object({
  questionTr: requiredText(10000),
  questionEn: requiredText(10000),
  questionDe: requiredText(10000),
  answerTr: requiredText(10000),
  answerEn: requiredText(10000),
  answerDe: requiredText(10000),
  sortOrder: integerNumber(0).default(0),
});

export const campaignInputSchema = z.object({
  ...localizedRequiredTextObject("title", 100),
  ...localizedRequiredTextObject("seoUrl", 255),
  ...localizedOptionalTextObject("desc", 10000),
  ...localizedOptionalTextObject("badge", 80),
  imageUrl: optionalUrl(),
  startsAt: optionalDate(),
  endsAt: optionalDate(),
  sortOrder: integerNumber(0).default(0),
  isActive: booleanValue().default(true),
});

export const userInputSchema = z.object({
  firstName: requiredText(100),
  lastName: requiredText(100),
  email: optionalText(255),
  phoneNumber: optionalText(20),
  status: z.enum(["PENDING", "ACTIVE", "SUSPENDED", "BANNED"]),
});

export const whoInputSchema = z.object({
  ...localizedOptionalTextObject("title", 150),
  whoDescTr: optionalText(10000),
  whoDescEn: optionalText(10000),
  whoDescDe: optionalText(10000),
  imageUrl: optionalUrl(),
  sortOrder: integerNumber(0).default(0),
  isActive: booleanValue().default(true),
});

export const siteSettingInputSchema = z.object({
  siteName: requiredText(100),
  siteSeoKeywords: requiredText(255),
  siteSeoDescription: requiredText(255),
  email: optionalText(255),
  phoneNumber: optionalText(20),
  wpNumber: optionalText(20),
  addressTr: optionalText(255),
  addressEn: optionalText(255),
  addressDe: optionalText(255),
  mapEmbedUrl: optionalUrl(),
  workingHoursTr: optionalText(200),
  workingHoursEn: optionalText(200),
  workingHoursDe: optionalText(200),
  logoUrl: optionalUrl(),
  faviconUrl: optionalUrl(),
  instagramUrl: optionalUrl(),
  facebookUrl: optionalUrl(),
  xUrl: optionalUrl(),
});

export const productInputSchema = z.object({
  ...localizedRequiredTextObject("name", 150),
  ...localizedRequiredTextObject("slug", 180),
  shortDescriptionTr: optionalText(10000),
  shortDescriptionEn: optionalText(10000),
  shortDescriptionDe: optionalText(10000),
  descriptionTr: requiredText(10000),
  descriptionEn: requiredText(10000),
  descriptionDe: requiredText(10000),
  imageUrl: optionalUrl(),
  imageAltTr: optionalText(255),
  imageAltEn: optionalText(255),
  imageAltDe: optionalText(255),
  price: decimalNumber(0),
  stock: integerNumber(0).default(0),
  currency: z.string().trim().min(3).max(3),
  isFeatured: booleanValue().default(false),
  isActive: booleanValue().default(true),
  sortOrder: integerNumber(0).default(0),
  galleries: z.array(galleryItemSchema).default([]),
});

export const serviceInputSchema = z.object({
  categoryTr: optionalText(150),
  categoryEn: optionalText(150),
  categoryDe: optionalText(150),
  ...localizedRequiredTextObject("name", 150),
  ...localizedRequiredTextObject("slug", 180),
  shortDescriptionTr: optionalText(300),
  shortDescriptionEn: optionalText(300),
  shortDescriptionDe: optionalText(300),
  longDescriptionTr: optionalText(10000),
  longDescriptionEn: optionalText(10000),
  longDescriptionDe: optionalText(10000),
  badgeTr: optionalText(120),
  badgeEn: optionalText(120),
  badgeDe: optionalText(120),
  sessionsLabelTr: optionalText(80),
  sessionsLabelEn: optionalText(80),
  sessionsLabelDe: optionalText(80),
  durationMinutes: integerNumber(0).nullable().optional().transform((value) => value ?? 0),
  imageUrl: optionalUrl(),
  imageAltTr: optionalText(255),
  imageAltEn: optionalText(255),
  imageAltDe: optionalText(255),
  isActive: booleanValue().default(true),
  sortOrder: integerNumber(0).default(0),
  galleries: z.array(galleryItemSchema).default([]),
  features: z.array(serviceFeatureSchema).default([]),
  processSteps: z.array(serviceProcessStepSchema).default([]),
  faqs: z.array(serviceFaqSchema).default([]),
});

export const blogPostInputSchema = z.object({
  ...localizedRequiredTextObject("title", 200),
  ...localizedRequiredTextObject("seoUrl", 255),
  metaTr: optionalText(80),
  metaEn: optionalText(80),
  metaDe: optionalText(80),
  descriptionTr: requiredText(10000),
  descriptionEn: requiredText(10000),
  descriptionDe: requiredText(10000),
  bodyTr: optionalText(30000),
  bodyEn: optionalText(30000),
  bodyDe: optionalText(30000),
  imageUrl: requiredText(500),
  imageAltTr: optionalText(255),
  imageAltEn: optionalText(255),
  imageAltDe: optionalText(255),
  readTimeMin: integerNumber(1).default(1),
  publishedAt: optionalDate(),
  status: booleanValue().default(true),
  sortOrder: integerNumber(0).default(0),
  galleries: z.array(galleryItemSchema).default([]),
});

export const contactAppointmentInputSchema = z.object({
  name: requiredText(120),
  phone: optionalText(30),
  service: requiredText(100),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]),
  locale: z.enum(["tr", "en", "de"]),
});

export const adminResourceSchemas = {
  campaigns: campaignInputSchema,
  users: userInputSchema,
  who: whoInputSchema,
  "site-settings": siteSettingInputSchema,
  products: productInputSchema,
  services: serviceInputSchema,
  "blog-posts": blogPostInputSchema,
  "contact-appointments": contactAppointmentInputSchema,
};
