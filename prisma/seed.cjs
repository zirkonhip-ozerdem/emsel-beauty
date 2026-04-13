/* eslint-disable no-console, @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const { hashSync } = require("bcryptjs");

const prisma = new PrismaClient();

const SALT_ROUNDS = 12;
const PASSWORD_POLICY =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,}$/;

async function main() {
  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      siteName: "Emsel Beauty",
      siteSeoKeywords: "emsel beauty, spa, guzellik, bakim",
      siteSeoDescription:
        "Emsel Beauty icin cok dilli site ve admin panel altyapi kurulumu.",
      email: "hello@emselbeauty.com",
      phoneNumber: "+905551234567",
      wpNumber: "+905551234567",
      addressTr: "Ornek Mahallesi, Guzellik Cad. No:12 Istanbul",
      addressEn: "Ornek District, Guzellik Avenue No:12 Istanbul",
      addressDe: "Ornek Viertel, Guzellik Strasse Nr.12 Istanbul",
      workingHoursTr: "Pzt-Cmt 09:00 - 20:00 / Pazar 10:00 - 18:00",
      workingHoursEn: "Mon-Sat 09:00 - 20:00 / Sunday 10:00 - 18:00",
      workingHoursDe: "Mo-Sa 09:00 - 20:00 / Sonntag 10:00 - 18:00",
    },
  });

  await prisma.whoSection.createMany({
    data: [
      {
        titleTr: "Hikayemiz",
        titleEn: "Our Story",
        titleDe: "Unsere Geschichte",
        whoDescTr:
          "Emsel Beauty, klinik disiplin ve spa zarafetini ayni cizgide bulusturan butik bir bakim evidir.",
        whoDescEn:
          "Emsel Beauty is a boutique care house where clinical discipline meets spa elegance.",
        whoDescDe:
          "Emsel Beauty ist ein Boutique-Care-House, in dem klinische Disziplin auf Spa-Eleganz trifft.",
        sortOrder: 1,
      },
    ],
    skipDuplicates: true,
  });

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  if (adminEmail && adminPassword) {
    if (!PASSWORD_POLICY.test(adminPassword)) {
      throw new Error(
        "ADMIN_PASSWORD min 12 karakter, buyuk/kucuk harf, rakam ve sembol icermelidir.",
      );
    }

    await prisma.admin.upsert({
      where: { email: adminEmail },
      update: {
        passwordHash: hashSync(adminPassword, SALT_ROUNDS),
      },
      create: {
        email: adminEmail,
        passwordHash: hashSync(adminPassword, SALT_ROUNDS),
      },
    });
  }

  console.log("Prisma seed tamamlandi.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
