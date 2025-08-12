/*
  Warnings:

  - Added the required column `program` to the `instructor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."instructor" ADD COLUMN     "program" "public"."Program" NOT NULL;
