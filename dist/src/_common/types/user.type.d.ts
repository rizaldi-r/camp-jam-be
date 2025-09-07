import { Instructor, Student, User } from '@prisma/client';
export type UserType = User & {
    instructor: Instructor;
} & {
    student: Student;
};
