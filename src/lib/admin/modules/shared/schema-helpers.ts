import { z } from "zod";

export const requiredText = (max = 255) =>
  z.string().trim().min(1, "Bu alan zorunludur.").max(max);

export const optionalText = (max = 10000) =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => {
      if (typeof value !== "string") {
        return null;
      }

      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed.slice(0, max) : null;
    });

export const optionalUrl = () =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => {
      if (typeof value !== "string") {
        return null;
      }

      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : null;
    });

export const optionalDate = () =>
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

export const integerNumber = (min = 0) =>
  z.coerce.number().int().min(min, `En az ${min} olmalidir.`);

export const booleanValue = () => z.coerce.boolean();

export function localizedOptionalTextObject<const TBaseLabel extends string>(
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

export function localizedRequiredTextObject<const TBaseLabel extends string>(
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

export const galleryItemSchema = z.object({
  imageUrl: optionalUrl(),
  imageAltTr: optionalText(255),
  imageAltEn: optionalText(255),
  imageAltDe: optionalText(255),
  sortOrder: integerNumber(0).default(0),
});

export const serviceFeatureSchema = z.object({
  labelTr: requiredText(255),
  labelEn: requiredText(255),
  labelDe: requiredText(255),
  sortOrder: integerNumber(0).default(0),
});

export const serviceProcessStepSchema = z.object({
  stepNumber: integerNumber(1),
  titleTr: requiredText(255),
  titleEn: requiredText(255),
  titleDe: requiredText(255),
  descriptionTr: requiredText(10000),
  descriptionEn: requiredText(10000),
  descriptionDe: requiredText(10000),
  sortOrder: integerNumber(0).default(0),
});

export const serviceFaqSchema = z.object({
  questionTr: requiredText(10000),
  questionEn: requiredText(10000),
  questionDe: requiredText(10000),
  answerTr: requiredText(10000),
  answerEn: requiredText(10000),
  answerDe: requiredText(10000),
  sortOrder: integerNumber(0).default(0),
});
