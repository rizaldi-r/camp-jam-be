/*
  Warnings:

  - Made the column `score_percentage` on table `submission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `score_achieved` on table `submission` required. This step will fail if there are existing NULL values in that column.
  - Made the column `score_total` on table `submission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."submission" ALTER COLUMN "score_percentage" SET NOT NULL,
ALTER COLUMN "score_percentage" SET DEFAULT 0,
ALTER COLUMN "score_achieved" SET NOT NULL,
ALTER COLUMN "score_achieved" SET DEFAULT 0,
ALTER COLUMN "score_total" SET NOT NULL,
ALTER COLUMN "score_total" SET DEFAULT 100;
