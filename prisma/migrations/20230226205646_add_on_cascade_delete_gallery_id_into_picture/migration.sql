-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_galleryId_fkey";

-- CreateIndex
CREATE INDEX "Picture_galleryId_idx" ON "Picture"("galleryId");

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
