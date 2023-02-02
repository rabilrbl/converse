/*
  Warnings:

  - You are about to drop the column `encoding` on the `Uploads` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `Uploads` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `Uploads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Uploads" DROP COLUMN "encoding",
DROP COLUMN "fileName",
DROP COLUMN "fileType";
