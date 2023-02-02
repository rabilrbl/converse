/*
  Warnings:

  - Added the required column `topic` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "topic" TEXT NOT NULL;
