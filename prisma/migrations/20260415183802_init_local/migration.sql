-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED', 'BANNED');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('ADMIN');

-- CreateEnum
CREATE TYPE "AdminAuthEventType" AS ENUM ('LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGIN_LOCKED', 'LOGIN_RATE_LIMITED', 'LOGIN_SUSPICIOUS', 'SESSION_REFRESHED', 'LOGOUT', 'SESSION_REVOKED');

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
    "last_login" TIMESTAMP(3),
    "failed_attempts" INTEGER NOT NULL DEFAULT 0,
    "locked_until" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "user_agent" VARCHAR(255),
    "ip_address" VARCHAR(64),
    "revoked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_auth_logs" (
    "id" SERIAL NOT NULL,
    "admin_id" INTEGER,
    "email" VARCHAR(255),
    "ip_address" VARCHAR(64),
    "user_agent" VARCHAR(255),
    "event_type" "AdminAuthEventType" NOT NULL,
    "details" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_auth_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" SERIAL NOT NULL,
    "titleTr" VARCHAR(100) NOT NULL,
    "titleEn" VARCHAR(100) NOT NULL,
    "titleDe" VARCHAR(100) NOT NULL,
    "seo_url_tr" VARCHAR(255) NOT NULL,
    "seo_url_en" VARCHAR(255) NOT NULL,
    "seo_url_de" VARCHAR(255) NOT NULL,
    "descTr" TEXT,
    "descEn" TEXT,
    "descDe" TEXT,
    "badge_tr" VARCHAR(80),
    "badge_en" VARCHAR(80),
    "badge_de" VARCHAR(80),
    "image_url" VARCHAR(500),
    "starts_at" TIMESTAMP(3),
    "ends_at" TIMESTAMP(3),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255),
    "phone_number" VARCHAR(20),
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "who" (
    "id" SERIAL NOT NULL,
    "title_tr" VARCHAR(150),
    "title_en" VARCHAR(150),
    "title_de" VARCHAR(150),
    "who_desc_tr" TEXT,
    "who_desc_en" TEXT,
    "who_desc_de" TEXT,
    "image_url" VARCHAR(500),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "who_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" SERIAL NOT NULL,
    "site_name" VARCHAR(100) NOT NULL,
    "site_seo_keywords" VARCHAR(255) NOT NULL,
    "site_seo_description" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "phone_number" VARCHAR(20),
    "wp_number" VARCHAR(20),
    "address_tr" VARCHAR(255),
    "address_en" VARCHAR(255),
    "address_de" VARCHAR(255),
    "map_embed_url" VARCHAR(500),
    "working_hours_tr" VARCHAR(200),
    "working_hours_en" VARCHAR(200),
    "working_hours_de" VARCHAR(200),
    "logo_url" VARCHAR(500),
    "favicon_url" VARCHAR(500),
    "instagram_url" VARCHAR(500),
    "facebook_url" VARCHAR(500),
    "x_url" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name_tr" VARCHAR(150) NOT NULL,
    "name_en" VARCHAR(150) NOT NULL,
    "name_de" VARCHAR(150) NOT NULL,
    "slug_tr" VARCHAR(180) NOT NULL,
    "slug_en" VARCHAR(180) NOT NULL,
    "slug_de" VARCHAR(180) NOT NULL,
    "short_description_tr" TEXT,
    "short_description_en" TEXT,
    "short_description_de" TEXT,
    "description_tr" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_de" TEXT NOT NULL,
    "image_url" VARCHAR(500),
    "image_alt_tr" VARCHAR(255),
    "image_alt_en" VARCHAR(255),
    "image_alt_de" VARCHAR(255),
    "price" DECIMAL(12,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "currency" CHAR(3) NOT NULL DEFAULT 'TRY',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_gallery" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "image_url" VARCHAR(500) NOT NULL,
    "image_alt_tr" VARCHAR(255),
    "image_alt_en" VARCHAR(255),
    "image_alt_de" VARCHAR(255),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "category_tr" VARCHAR(150),
    "category_en" VARCHAR(150),
    "category_de" VARCHAR(150),
    "name_tr" VARCHAR(150) NOT NULL,
    "name_en" VARCHAR(150) NOT NULL,
    "name_de" VARCHAR(150) NOT NULL,
    "slug_tr" VARCHAR(180) NOT NULL,
    "slug_en" VARCHAR(180) NOT NULL,
    "slug_de" VARCHAR(180) NOT NULL,
    "short_description_tr" VARCHAR(300),
    "short_description_en" VARCHAR(300),
    "short_description_de" VARCHAR(300),
    "long_description_tr" TEXT,
    "long_description_en" TEXT,
    "long_description_de" TEXT,
    "badge_tr" VARCHAR(120),
    "badge_en" VARCHAR(120),
    "badge_de" VARCHAR(120),
    "sessions_label_tr" VARCHAR(80),
    "sessions_label_en" VARCHAR(80),
    "sessions_label_de" VARCHAR(80),
    "duration_minutes" INTEGER,
    "image_url" VARCHAR(500),
    "image_alt_tr" VARCHAR(255),
    "image_alt_en" VARCHAR(255),
    "image_alt_de" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_gallery" (
    "id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "image_url" VARCHAR(500) NOT NULL,
    "image_alt_tr" VARCHAR(255),
    "image_alt_en" VARCHAR(255),
    "image_alt_de" VARCHAR(255),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_features" (
    "id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "label_tr" VARCHAR(255) NOT NULL,
    "label_en" VARCHAR(255) NOT NULL,
    "label_de" VARCHAR(255) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_process_steps" (
    "id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "step_number" INTEGER NOT NULL,
    "title_tr" VARCHAR(255) NOT NULL,
    "title_en" VARCHAR(255) NOT NULL,
    "title_de" VARCHAR(255) NOT NULL,
    "description_tr" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_de" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_process_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_faqs" (
    "id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "question_tr" TEXT NOT NULL,
    "question_en" TEXT NOT NULL,
    "question_de" TEXT NOT NULL,
    "answer_tr" TEXT NOT NULL,
    "answer_en" TEXT NOT NULL,
    "answer_de" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" SERIAL NOT NULL,
    "title_tr" VARCHAR(200) NOT NULL,
    "title_en" VARCHAR(200) NOT NULL,
    "title_de" VARCHAR(200) NOT NULL,
    "seo_url_tr" VARCHAR(255) NOT NULL,
    "seo_url_en" VARCHAR(255) NOT NULL,
    "seo_url_de" VARCHAR(255) NOT NULL,
    "meta_tr" VARCHAR(80),
    "meta_en" VARCHAR(80),
    "meta_de" VARCHAR(80),
    "description_tr" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "description_de" TEXT NOT NULL,
    "body_tr" TEXT,
    "body_en" TEXT,
    "body_de" TEXT,
    "image_url" VARCHAR(500) NOT NULL,
    "image_alt_tr" VARCHAR(255),
    "image_alt_en" VARCHAR(255),
    "image_alt_de" VARCHAR(255),
    "read_time_min" INTEGER NOT NULL DEFAULT 1,
    "published_at" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_gallery" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "image_url" VARCHAR(500) NOT NULL,
    "image_alt_tr" VARCHAR(255),
    "image_alt_en" VARCHAR(255),
    "image_alt_de" VARCHAR(255),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_appointments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "phone" VARCHAR(30),
    "service" VARCHAR(100) NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "locale" VARCHAR(5) NOT NULL DEFAULT 'tr',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE INDEX "idx_sessions_user_id" ON "sessions"("user_id");

-- CreateIndex
CREATE INDEX "idx_sessions_expires" ON "sessions"("expires");

-- CreateIndex
CREATE INDEX "idx_admin_auth_logs_email_created" ON "admin_auth_logs"("email", "created_at");

-- CreateIndex
CREATE INDEX "idx_admin_auth_logs_ip_created" ON "admin_auth_logs"("ip_address", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "campaigns_seo_url_tr_key" ON "campaigns"("seo_url_tr");

-- CreateIndex
CREATE UNIQUE INDEX "campaigns_seo_url_en_key" ON "campaigns"("seo_url_en");

-- CreateIndex
CREATE UNIQUE INDEX "campaigns_seo_url_de_key" ON "campaigns"("seo_url_de");

-- CreateIndex
CREATE INDEX "idx_campaigns_status" ON "campaigns"("status");

-- CreateIndex
CREATE INDEX "idx_campaigns_sort_order" ON "campaigns"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE INDEX "idx_who_sort_order" ON "who"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "site_settings_email_key" ON "site_settings"("email");

-- CreateIndex
CREATE UNIQUE INDEX "site_settings_phone_number_key" ON "site_settings"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "site_settings_wp_number_key" ON "site_settings"("wp_number");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_tr_key" ON "products"("slug_tr");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_en_key" ON "products"("slug_en");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_de_key" ON "products"("slug_de");

-- CreateIndex
CREATE INDEX "idx_products_is_active" ON "products"("is_active");

-- CreateIndex
CREATE INDEX "idx_products_created_at" ON "products"("created_at");

-- CreateIndex
CREATE INDEX "idx_products_sort_order" ON "products"("sort_order");

-- CreateIndex
CREATE INDEX "idx_product_gallery_sort" ON "product_gallery"("product_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_tr_key" ON "services"("slug_tr");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_en_key" ON "services"("slug_en");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_de_key" ON "services"("slug_de");

-- CreateIndex
CREATE INDEX "idx_services_is_active" ON "services"("is_active");

-- CreateIndex
CREATE INDEX "idx_services_sort_order" ON "services"("sort_order");

-- CreateIndex
CREATE INDEX "idx_service_gallery_sort" ON "service_gallery"("service_id", "sort_order");

-- CreateIndex
CREATE INDEX "idx_service_feature_sort" ON "service_features"("service_id", "sort_order");

-- CreateIndex
CREATE INDEX "idx_service_process_sort" ON "service_process_steps"("service_id", "sort_order");

-- CreateIndex
CREATE INDEX "idx_service_faq_sort" ON "service_faqs"("service_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_seo_url_tr_key" ON "blog_posts"("seo_url_tr");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_seo_url_en_key" ON "blog_posts"("seo_url_en");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_seo_url_de_key" ON "blog_posts"("seo_url_de");

-- CreateIndex
CREATE INDEX "idx_blog_posts_status" ON "blog_posts"("status");

-- CreateIndex
CREATE INDEX "idx_blog_posts_published_at" ON "blog_posts"("published_at");

-- CreateIndex
CREATE INDEX "idx_blog_posts_sort_order" ON "blog_posts"("sort_order");

-- CreateIndex
CREATE INDEX "idx_blog_gallery_sort" ON "blog_gallery"("post_id", "sort_order");

-- CreateIndex
CREATE INDEX "idx_contact_appointments_status" ON "contact_appointments"("status");

-- CreateIndex
CREATE INDEX "idx_contact_appointments_created_at" ON "contact_appointments"("created_at");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_auth_logs" ADD CONSTRAINT "admin_auth_logs_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_gallery" ADD CONSTRAINT "product_gallery_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_gallery" ADD CONSTRAINT "service_gallery_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_features" ADD CONSTRAINT "service_features_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_process_steps" ADD CONSTRAINT "service_process_steps_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_faqs" ADD CONSTRAINT "service_faqs_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_gallery" ADD CONSTRAINT "blog_gallery_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
