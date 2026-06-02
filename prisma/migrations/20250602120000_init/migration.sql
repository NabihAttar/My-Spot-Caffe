-- CreateSchema
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL,
    "tabTitle" TEXT NOT NULL,
    "tabClass" TEXT NOT NULL DEFAULT '',
    "tabThumb" TEXT NOT NULL DEFAULT 'coffe.png',
    "discount" INTEGER NOT NULL DEFAULT 0,
    "tabId" TEXT NOT NULL,
    "nameAr" TEXT,
    "description" TEXT,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Product" (
    "id" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "thumb" TEXT NOT NULL DEFAULT '14.jpg',
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceFull" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "leftInfo" TEXT NOT NULL DEFAULT '',
    "rightInfo" TEXT NOT NULL DEFAULT '',
    "description" TEXT,
    "ingredients" TEXT,
    "discountPrice" DOUBLE PRECISION,
    "prepTime" TEXT,
    "sizes" JSONB,
    "addons" JSONB,
    "tags" JSONB,
    "order" INTEGER NOT NULL DEFAULT 0,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AdminCredential" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "username" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminCredential_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Category_order_idx" ON "Category"("order");
CREATE INDEX "Product_categoryId_order_idx" ON "Product"("categoryId", "order");

ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
