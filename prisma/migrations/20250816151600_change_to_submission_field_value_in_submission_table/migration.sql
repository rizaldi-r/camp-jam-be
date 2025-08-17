/*
  Warnings:

  - You are about to drop the column `submissionFieldId` on the `submission_field_value` table. All the data in the column will be lost.
  - You are about to drop the column `submissionId` on the `submission_field_value` table. All the data in the column will be lost.
  - Added the required column `submission_field_id` to the `submission_field_value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submission_id` to the `submission_field_value` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."submission_field_value" DROP CONSTRAINT "submission_field_value_submissionFieldId_fkey";

-- DropForeignKey
ALTER TABLE "public"."submission_field_value" DROP CONSTRAINT "submission_field_value_submissionId_fkey";

-- AlterTable
ALTER TABLE "public"."submission_field_value" DROP COLUMN "submissionFieldId",
DROP COLUMN "submissionId",
ADD COLUMN     "submission_field_id" TEXT NOT NULL,
ADD COLUMN     "submission_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."submission_field_value" ADD CONSTRAINT "submission_field_value_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "public"."submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submission_field_value" ADD CONSTRAINT "submission_field_value_submission_field_id_fkey" FOREIGN KEY ("submission_field_id") REFERENCES "public"."submission_field"("id") ON DELETE CASCADE ON UPDATE CASCADE;
