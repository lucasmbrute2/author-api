/*
  Warnings:

  - You are about to drop the column `email` on the `Author` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bio` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_picture` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Author_email_key";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "email",
ADD COLUMN     "bio" VARCHAR NOT NULL,
ADD COLUMN     "profile_picture" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_username_key" ON "Author"("username");
