/*
  Warnings:

  - Added the required column `password_hash` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "password_hash" VARCHAR(255) NOT NULL;
