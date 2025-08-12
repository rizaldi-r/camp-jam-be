/*
  Warnings:

  - You are about to drop the column `user_title` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."instructor" ADD COLUMN     "user_title" VARCHAR(50);

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "user_title";
