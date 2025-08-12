/*
  Warnings:

  - The values [enrolled,ongoing,finished] on the enum `CourseStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [description,list] on the enum `DescriptionType` will be removed. If these variants are still used in the database, this will fail.
  - The values [pending,approved,rejected,nonmember] on the enum `MembershipStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [lecture,assignment] on the enum `ModuleType` will be removed. If these variants are still used in the database, this will fail.
  - The values [webdev,data_analyst,marketing] on the enum `Program` will be removed. If these variants are still used in the database, this will fail.
  - The values [student,instructor,admin] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CourseStatus_new" AS ENUM ('ENROLLED', 'ONGOING', 'FINISHED');
ALTER TABLE "public"."enrollment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."enrollment" ALTER COLUMN "status" TYPE "public"."CourseStatus_new" USING ("status"::text::"public"."CourseStatus_new");
ALTER TYPE "public"."CourseStatus" RENAME TO "CourseStatus_old";
ALTER TYPE "public"."CourseStatus_new" RENAME TO "CourseStatus";
DROP TYPE "public"."CourseStatus_old";
ALTER TABLE "public"."enrollment" ALTER COLUMN "status" SET DEFAULT 'ENROLLED';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."DescriptionType_new" AS ENUM ('DESCRIPTION', 'LIST');
ALTER TABLE "public"."subdescription" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "public"."subdescription" ALTER COLUMN "type" TYPE "public"."DescriptionType_new" USING ("type"::text::"public"."DescriptionType_new");
ALTER TYPE "public"."DescriptionType" RENAME TO "DescriptionType_old";
ALTER TYPE "public"."DescriptionType_new" RENAME TO "DescriptionType";
DROP TYPE "public"."DescriptionType_old";
ALTER TABLE "public"."subdescription" ALTER COLUMN "type" SET DEFAULT 'DESCRIPTION';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."MembershipStatus_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'NONMEMBER');
ALTER TABLE "public"."student" ALTER COLUMN "membership_status" DROP DEFAULT;
ALTER TABLE "public"."student" ALTER COLUMN "membership_status" TYPE "public"."MembershipStatus_new" USING ("membership_status"::text::"public"."MembershipStatus_new");
ALTER TYPE "public"."MembershipStatus" RENAME TO "MembershipStatus_old";
ALTER TYPE "public"."MembershipStatus_new" RENAME TO "MembershipStatus";
DROP TYPE "public"."MembershipStatus_old";
ALTER TABLE "public"."student" ALTER COLUMN "membership_status" SET DEFAULT 'NONMEMBER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ModuleType_new" AS ENUM ('LECTURE', 'ASSIGNMENT');
ALTER TABLE "public"."module" ALTER COLUMN "module_type" TYPE "public"."ModuleType_new" USING ("module_type"::text::"public"."ModuleType_new");
ALTER TYPE "public"."ModuleType" RENAME TO "ModuleType_old";
ALTER TYPE "public"."ModuleType_new" RENAME TO "ModuleType";
DROP TYPE "public"."ModuleType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Program_new" AS ENUM ('WEBDEV', 'DATA_ANALYST', 'MARKETING');
ALTER TABLE "public"."student" ALTER COLUMN "program" TYPE "public"."Program_new" USING ("program"::text::"public"."Program_new");
ALTER TABLE "public"."course" ALTER COLUMN "allowed_programs" TYPE "public"."Program_new"[] USING ("allowed_programs"::text::"public"."Program_new"[]);
ALTER TABLE "public"."category" ALTER COLUMN "programs" TYPE "public"."Program_new"[] USING ("programs"::text::"public"."Program_new"[]);
ALTER TYPE "public"."Program" RENAME TO "Program_old";
ALTER TYPE "public"."Program_new" RENAME TO "Program";
DROP TYPE "public"."Program_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."UserRole_new" AS ENUM ('STUDENT', 'INSTRUCTOR', 'ADMIN');
ALTER TABLE "public"."user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."user" ALTER COLUMN "role" TYPE "public"."UserRole_new" USING ("role"::text::"public"."UserRole_new");
ALTER TYPE "public"."UserRole" RENAME TO "UserRole_old";
ALTER TYPE "public"."UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "public"."user" ALTER COLUMN "role" SET DEFAULT 'STUDENT';
COMMIT;

-- AlterTable
ALTER TABLE "public"."enrollment" ALTER COLUMN "status" SET DEFAULT 'ENROLLED';

-- AlterTable
ALTER TABLE "public"."student" ALTER COLUMN "membership_status" SET DEFAULT 'NONMEMBER';

-- AlterTable
ALTER TABLE "public"."subdescription" ALTER COLUMN "type" SET DEFAULT 'DESCRIPTION';

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "role" SET DEFAULT 'STUDENT';
