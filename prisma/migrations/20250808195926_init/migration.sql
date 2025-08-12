-- CreateEnum
CREATE TYPE "public"."ModuleType" AS ENUM ('lecture', 'assignment');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('student', 'instructor', 'admin');

-- CreateEnum
CREATE TYPE "public"."MembershipStatus" AS ENUM ('pending', 'approved', 'rejected', 'nonmember');

-- CreateEnum
CREATE TYPE "public"."Program" AS ENUM ('webdev', 'data_analyst', 'marketing');

-- CreateEnum
CREATE TYPE "public"."CourseStatus" AS ENUM ('enrolled', 'ongoing', 'finished');

-- CreateEnum
CREATE TYPE "public"."DescriptionType" AS ENUM ('description', 'list');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "user_title" VARCHAR(100),
    "avatar_src" VARCHAR(255),
    "role" "public"."UserRole" NOT NULL DEFAULT 'student',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."student" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "program" "public"."Program" NOT NULL,
    "batch_year" INTEGER NOT NULL,
    "membership_status" "public"."MembershipStatus" NOT NULL DEFAULT 'nonmember',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."instructor" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."course" (
    "id" TEXT NOT NULL,
    "image_src" VARCHAR(255),
    "image_alt" VARCHAR(255),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "is_locked" BOOLEAN NOT NULL DEFAULT false,
    "instructor_id" VARCHAR(255) NOT NULL,
    "allowed_programs" "public"."Program"[],
    "allowed_batch_years" INTEGER[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "programs" "public"."Program"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."courses_categories" (
    "course_id" VARCHAR(255) NOT NULL,
    "category_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_categories_pkey" PRIMARY KEY ("course_id","category_id")
);

-- CreateTable
CREATE TABLE "public"."section" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "course_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."module" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(255),
    "module_type" "public"."ModuleType" NOT NULL,
    "embed_video_link" VARCHAR(255),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "section_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."subdescription" (
    "id" TEXT NOT NULL,
    "header" VARCHAR(255) NOT NULL,
    "type" "public"."DescriptionType" NOT NULL DEFAULT 'description',
    "description" TEXT,
    "module_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subdescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."link" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "href" VARCHAR(255) NOT NULL,
    "module_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."enrollment" (
    "id" TEXT NOT NULL,
    "student_id" VARCHAR(255) NOT NULL,
    "instructor_id" VARCHAR(255) NOT NULL,
    "course_id" VARCHAR(255) NOT NULL,
    "status" "public"."CourseStatus" NOT NULL DEFAULT 'enrolled',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."enrollment_data" (
    "id" TEXT NOT NULL,
    "progress_percentage" DECIMAL(5,2),
    "module_completed" DECIMAL(5,2),
    "module_total" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "module_progress_id" VARCHAR(255),
    "module_progress_data_id" VARCHAR(255),
    "assignment_score_id" VARCHAR(255),

    CONSTRAINT "enrollment_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."submission" (
    "id" TEXT NOT NULL,
    "student_id" VARCHAR(255) NOT NULL,
    "enrollment_id" VARCHAR(255) NOT NULL,
    "module_id" VARCHAR(255) NOT NULL,
    "is_graded" BOOLEAN NOT NULL DEFAULT false,
    "submission_title" VARCHAR(255),
    "score_percentage" DECIMAL(5,2),
    "score_achieved" DECIMAL(5,2),
    "score_total" INTEGER,
    "feedback" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."submitted_content" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(255),
    "submitted" TEXT,
    "submission_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "submitted_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."submission_template" (
    "id" TEXT NOT NULL,
    "submission_title" VARCHAR(255),
    "module_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "submission_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."submission_field" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "is_textfield" BOOLEAN NOT NULL,
    "template_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "submission_field_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "public"."user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "student_user_id_key" ON "public"."student"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "instructor_user_id_key" ON "public"."instructor"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "public"."category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_student_id_course_id_key" ON "public"."enrollment"("student_id", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_data_module_progress_id_key" ON "public"."enrollment_data"("module_progress_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_data_module_progress_data_id_key" ON "public"."enrollment_data"("module_progress_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_data_assignment_score_id_key" ON "public"."enrollment_data"("assignment_score_id");

-- CreateIndex
CREATE UNIQUE INDEX "submission_student_id_module_id_key" ON "public"."submission"("student_id", "module_id");

-- CreateIndex
CREATE UNIQUE INDEX "submission_template_module_id_key" ON "public"."submission_template"("module_id");

-- AddForeignKey
ALTER TABLE "public"."student" ADD CONSTRAINT "student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."instructor" ADD CONSTRAINT "instructor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."course" ADD CONSTRAINT "course_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "public"."instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."courses_categories" ADD CONSTRAINT "courses_categories_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."courses_categories" ADD CONSTRAINT "courses_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."section" ADD CONSTRAINT "section_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."module" ADD CONSTRAINT "module_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "public"."section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subdescription" ADD CONSTRAINT "subdescription_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."link" ADD CONSTRAINT "link_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."enrollment" ADD CONSTRAINT "enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."enrollment" ADD CONSTRAINT "enrollment_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "public"."instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."enrollment" ADD CONSTRAINT "enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."enrollment_data" ADD CONSTRAINT "enrollment_data_module_progress_id_fkey" FOREIGN KEY ("module_progress_id") REFERENCES "public"."enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."enrollment_data" ADD CONSTRAINT "enrollment_data_module_progress_data_id_fkey" FOREIGN KEY ("module_progress_data_id") REFERENCES "public"."enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."enrollment_data" ADD CONSTRAINT "enrollment_data_assignment_score_id_fkey" FOREIGN KEY ("assignment_score_id") REFERENCES "public"."enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submission" ADD CONSTRAINT "submission_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submission" ADD CONSTRAINT "submission_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submission" ADD CONSTRAINT "submission_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submitted_content" ADD CONSTRAINT "submitted_content_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "public"."submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submission_template" ADD CONSTRAINT "submission_template_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submission_field" ADD CONSTRAINT "submission_field_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."submission_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
