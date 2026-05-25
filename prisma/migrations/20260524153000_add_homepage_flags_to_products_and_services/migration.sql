ALTER TABLE "products"
ADD COLUMN "show_on_homepage" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "services"
ADD COLUMN "show_on_homepage" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "idx_products_show_on_homepage" ON "products"("show_on_homepage");
CREATE INDEX "idx_services_show_on_homepage" ON "services"("show_on_homepage");
