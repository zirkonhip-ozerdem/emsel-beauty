import type { Locale } from "@/i18n/config";

export type ContactPageContent = {
  headerTitle: string;
  headerSubtitle: string;
  labels: {
    address: string;
    phone: string;
    email: string;
    workingHours: string;
    appointmentTitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    phoneField: string;
    phonePlaceholder: string;
    servicePlaceholder: string;
    campaignPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    whatsappAriaLabel: string;
    mapTitle: string;
  };
  services: string[];
  campaigns: string[];
  contactInfo: {
    address: string[];
    phone: string;
    email: string;
    mapSrc: string;
    whatsapp: string;
    workingHours: string[];
  };
};

const baseContactInfo: ContactPageContent["contactInfo"] = {
  address: ["Aliben Mah. Güzellik Cad. No:12", "Beşiktaş / İstanbul", "Türkiye"],
  phone: "+90 555 123 45 67",
  email: "iletisim@emselbeauty.com",
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010!2d28.97!3d41.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzM2LjAiTiAyOMKwNTgnMTIuMCJF!5e0!3m2!1str!2str!4v1",
  whatsapp: "905551234567",
  workingHours: ["Pzt–Cmt: 09:00 – 20:00", "Pazar: 10:00 – 18:00"],
};

const contactPageContent: Record<Locale, ContactPageContent> = {
  tr: {
    headerTitle: "İletişim - Bize Ulaşın",
    headerSubtitle: "Randevu almak veya bilgi edinmek için",
    labels: {
      address: "Adres",
      phone: "Telefon",
      email: "E-posta",
      workingHours: "Çalışma Saatleri",
      appointmentTitle: "Online Randevu",
      fullName: "Adınız Soyadınız",
      fullNamePlaceholder: "Adınız ve soyadınız",
      phoneField: "Telefon Numaranız",
      phonePlaceholder: "+90 5xx xxx xx xx",
      servicePlaceholder: "Seçiniz",
      campaignPlaceholder: "Kampanya seçiniz",
      submit: "Randevu Talebini Gönder",
      submitting: "Gönderiliyor...",
      success: "Randevu talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.",
      error: "Randevu talebi gönderilemedi.",
      whatsappAriaLabel: "WhatsApp ile iletişim",
      mapTitle: "Emsel Beauty Konum",
    },
    services: ["Kafa Masajı", "Tırnak Sanatı", "Vücut Bakımı", "Yüz Bakımı", "Aromaterapi", "Saç Bakımı"],
    campaigns: [],
    contactInfo: baseContactInfo,
  },
  en: {
    headerTitle: "Contact - Reach Out",
    headerSubtitle: "For appointments or more information",
    labels: {
      address: "Address",
      phone: "Phone",
      email: "Email",
      workingHours: "Working Hours",
      appointmentTitle: "Online Appointment",
      fullName: "Full Name",
      fullNamePlaceholder: "Your full name",
      phoneField: "Phone Number",
      phonePlaceholder: "+90 5xx xxx xx xx",
      servicePlaceholder: "Select",
      campaignPlaceholder: "Select a campaign",
      submit: "Send Appointment Request",
      submitting: "Sending...",
      success: "Your request has been received successfully. We will contact you shortly.",
      error: "Your appointment request could not be sent.",
      whatsappAriaLabel: "Contact us on WhatsApp",
      mapTitle: "Emsel Beauty Location",
    },
    services: ["Head Massage", "Nail Art", "Body Care", "Facial Care", "Aromatherapy", "Hair Care"],
    campaigns: [],
    contactInfo: baseContactInfo,
  },
  de: {
    headerTitle: "Kontakt - Schreiben Sie Uns",
    headerSubtitle: "Fur Termine oder weitere Informationen",
    labels: {
      address: "Adresse",
      phone: "Telefon",
      email: "E-Mail",
      workingHours: "Offnungszeiten",
      appointmentTitle: "Online Termin",
      fullName: "Vor- und Nachname",
      fullNamePlaceholder: "Ihr Vor- und Nachname",
      phoneField: "Telefonnummer",
      phonePlaceholder: "+90 5xx xxx xx xx",
      servicePlaceholder: "Auswahlen",
      campaignPlaceholder: "Kampagne auswahlen",
      submit: "Terminanfrage Senden",
      submitting: "Wird gesendet...",
      success: "Ihre Anfrage wurde erfolgreich erhalten. Wir melden uns in Kurze bei Ihnen.",
      error: "Ihre Terminanfrage konnte nicht gesendet werden.",
      whatsappAriaLabel: "Kontakt uber WhatsApp",
      mapTitle: "Emsel Beauty Standort",
    },
    services: ["Kopfmassage", "Nageldesign", "Korperpflege", "Gesichtspflege", "Aromatherapie", "Haarpflege"],
    campaigns: [],
    contactInfo: baseContactInfo,
  },
};

export function getContactPageContent(locale: Locale) {
  return contactPageContent[locale];
}
