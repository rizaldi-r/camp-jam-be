/*
  Warnings:

  - You are about to drop the column `module_progress_data_id` on the `enrollment_data` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lecture_progress_id]` on the table `enrollment_data` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[assignment_progress_id]` on the table `enrollment_data` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."enrollment_data" DROP CONSTRAINT "enrollment_data_module_progress_data_id_fkey";

-- DropIndex
DROP INDEX "public"."enrollment_data_module_progress_data_id_key";

-- AlterTable
ALTER TABLE "public"."enrollment_data" DROP COLUMN "module_progress_data_id",
ADD COLUMN     "assignment_progress_id" VARCHAR(255),
ADD COLUMN     "lecture_progress_id" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_data_lecture_progress_id_key" ON "public"."enrollment_data"("lecture_progress_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_data_assignment_progress_id_key" ON "public"."enrollment_data"("assignment_progress_id");

-- AddForeignKey
ALTER TABLE "public"."enrollment_data" ADD CONSTRAINT "enrollment_data_lecture_progress_id_fkey" FOREIGN KEY ("lecture_progress_id") REFERENCES "public"."enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."enrollment_data" ADD CONSTRAINT "enrollment_data_assignment_progress_id_fkey" FOREIGN KEY ("assignment_progress_id") REFERENCES "public"."enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
