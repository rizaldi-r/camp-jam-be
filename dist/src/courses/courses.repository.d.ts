import { PrismaService } from '../prisma/prisma.service';
import { Course } from '@prisma/client';
import { ICreateCourse, IFindAllCoursesQuery, IFindOneCourseQuery, IUpdateCourse } from 'src/courses/types/courses.repostory.interface';
export declare class CoursesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private buildWhereClause;
    private applyCategoryFilter;
    private applyInstructorFilter;
    private applyStudentFilter;
    private buildOrderByClause;
    create(data: Omit<ICreateCourse, 'categoryIds'>, categoryIds: string[], instructorId: string): Promise<Course>;
    findAll(query: IFindAllCoursesQuery): Promise<Course[]>;
    findById(id: string, query?: IFindOneCourseQuery): Promise<Course | null>;
    findByInstructorId(instructorId: string, query?: IFindOneCourseQuery): Promise<Course[] | null>;
    findInstructorIdByCourseId(courseId: string): Promise<string | null>;
    update(id: string, data: Omit<IUpdateCourse, 'categoryIds'>, categoryIds?: string[]): Promise<Course>;
    remove(id: string): Promise<Course>;
}
