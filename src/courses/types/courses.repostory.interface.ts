import { Program } from '@prisma/client';

// Interfaces to define the shape of the data
export interface ICreateCourse {
  title: string;
  imageSrc?: string;
  imageAlt?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  isMemberOnly?: boolean;
  isLocked?: boolean;
  allowedPrograms: Program[];
  allowedBatchYears: number[];
  categoryIds: string[];
}

export interface IUpdateCourse {
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  isMemberOnly?: boolean;
  isLocked?: boolean;
  instructorId?: string;
  allowedPrograms?: Program[];
  allowedBatchYears?: number[];
  categoryIds?: string[];
}

export interface IFindAllCoursesQuery {
  title?: string;
  program?: Program;
  categoryId?: string;
  categoryName?: string;
  instructorId?: string;
  instructorName?: string;
  instructorUsername?: string;
  studentId?: string;
  studentName?: string;
  studentUsername?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface IFindOneCourseQuery {
  showInstructor?: boolean;
  showSections?: boolean;
  showCategories?: boolean;
  categoryId?: string;
}
