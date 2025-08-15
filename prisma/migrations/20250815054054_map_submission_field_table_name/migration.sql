/*
  Warnings:

  - You are about to drop the `SubmissionField` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."SubmissionField" DROP CONSTRAINT "SubmissionField_template_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."submission_field_value" DROP CONSTRAINT "submission_field_value_submissionFieldId_fkey";

-- DropTable
DROP TABLE "public"."SubmissionField";

-- CreateTable
CREATE TABLE "public"."submission_field" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "is_textfield" BOOLEAN NOT NULL,
    "template_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "submission_field_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."submission_field_value" ADD CONSTRAINT "submission_field_value_submissionFieldId_fkey" FOREIGN KEY ("submissionFieldId") REFERENCES "public"."submission_field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submission_field" ADD CONSTRAINT "submission_field_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."submission_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
