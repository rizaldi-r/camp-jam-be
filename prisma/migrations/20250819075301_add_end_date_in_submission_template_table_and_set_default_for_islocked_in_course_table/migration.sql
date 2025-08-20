-- AlterTable
ALTER TABLE "public"."course" ALTER COLUMN "is_locked" SET DEFAULT true;

-- AlterTable
ALTER TABLE "public"."submission_template" ADD COLUMN     "end_date" TIMESTAMP(3);
