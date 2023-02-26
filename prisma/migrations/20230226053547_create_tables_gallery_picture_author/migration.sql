-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "bio" VARCHAR,
    "profile_picture" TEXT,
    "username" TEXT NOT NULL,
    "galleryId" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "api_link" TEXT,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" TEXT NOT NULL,
    "html_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alias_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "galleryId" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_username_key" ON "Author"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Author_galleryId_key" ON "Author"("galleryId");

-- CreateIndex
CREATE UNIQUE INDEX "Picture_alias_key_key" ON "Picture"("alias_key");

-- CreateIndex
CREATE UNIQUE INDEX "Picture_galleryId_key" ON "Picture"("galleryId");

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
