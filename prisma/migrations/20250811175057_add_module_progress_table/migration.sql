-- CreateTable
CREATE TABLE "public"."module_progress" (
    "id" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "enrollment_id" VARCHAR(255) NOT NULL,
    "module_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "module_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "module_progress_enrollment_id_module_id_key" ON "public"."module_progress"("enrollment_id", "module_id");

-- AddForeignKey
ALTER TABLE "public"."module_progress" ADD CONSTRAINT "module_progress_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."module_progress" ADD CONSTRAINT "module_progress_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
