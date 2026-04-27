ALTER TABLE "products"
  DROP COLUMN IF EXISTS "price",
  DROP COLUMN IF EXISTS "stock",
  DROP COLUMN IF EXISTS "currency",
  DROP COLUMN IF EXISTS "is_featured";
