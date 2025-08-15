/*
  Warnings:

  - You are about to drop the column `submission_title` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the `submission_field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `submitted_content` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `submission_template_id` to the `submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."submission_field" DROP CONSTRAINT "submission_field_template_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."submitted_content" DROP CONSTRAINT "submitted_content_submission_id_fkey";

-- AlterTable
ALTER TABLE "public"."submission" DROP COLUMN "submission_title",
ADD COLUMN     "submission_template_id" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "public"."submission_field";

-- DropTable
DROP TABLE "public"."submitted_content";

-- CreateTable
CREATE TABLE "public"."submission_field_value" (
    "id" TEXT NOT NULL,
    "submitted" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "submissionFieldId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "submission_field_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubmissionField" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "is_textfield" BOOLEAN NOT NULL,
    "template_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubmissionField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."submission" ADD CONSTRAINT "submission_submission_template_id_fkey" FOREIGN KEY ("submission_template_id") REFERENCES "public"."submission_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submission_field_value" ADD CONSTRAINT "submission_field_value_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "public"."submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submission_field_value" ADD CONSTRAINT "submission_field_value_submissionFieldId_fkey" FOREIGN KEY ("submissionFieldId") REFERENCES "public"."SubmissionField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubmissionField" ADD CONSTRAINT "SubmissionField_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."submission_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
