-- DropForeignKey
ALTER TABLE "public"."submission_field_value" DROP CONSTRAINT "submission_field_value_submissionFieldId_fkey";

-- DropForeignKey
ALTER TABLE "public"."submission_field_value" DROP CONSTRAINT "submission_field_value_submissionId_fkey";

-- AddForeignKey
ALTER TABLE "public"."submission_field_value" ADD CONSTRAINT "submission_field_value_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "public"."submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submission_field_value" ADD CONSTRAINT "submission_field_value_submissionFieldId_fkey" FOREIGN KEY ("submissionFieldId") REFERENCES "public"."submission_field"("id") ON DELETE CASCADE ON UPDATE CASCADE;
