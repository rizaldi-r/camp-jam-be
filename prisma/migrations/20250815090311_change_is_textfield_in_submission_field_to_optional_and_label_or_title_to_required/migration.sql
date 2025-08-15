/*
  Warnings:

  - Made the column `submission_title` on table `submission_template` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."submission_field" ALTER COLUMN "is_textfield" DROP NOT NULL,
ALTER COLUMN "is_textfield" SET DEFAULT false;

-- AlterTable
ALTER TABLE "public"."submission_template" ALTER COLUMN "submission_title" SET NOT NULL;
