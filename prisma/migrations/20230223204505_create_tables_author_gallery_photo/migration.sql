-- CreateTable
CREATE TABLE "Author" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" UUID NOT NULL,
    "api_link" TEXT NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" UUID NOT NULL,
    "html_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alias_key" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,
    "galleryId" UUID NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_authorId_key" ON "Gallery"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_alias_key_key" ON "Photo"("alias_key");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_galleryId_key" ON "Photo"("galleryId");

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
