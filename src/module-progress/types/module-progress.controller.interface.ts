import { ModuleProgress } from '@prisma/client';

export interface CreateModuleProgressData {
  enrollmentId: string;
  moduleId: string;
}

export interface UpdateModuleProgressData {
  isCompleted?: boolean;
}

export interface ModuleProgressRepositoryItf {
  create(data: CreateModuleProgressData): Promise<ModuleProgress>;
  findById(id: string): Promise<ModuleProgress | null>;
  findByEnrollmentId(enrollmentId: string): Promise<ModuleProgress[]>;
  findByEnrollmentAndModule(
    enrollmentId: string,
    moduleId: string,
  ): Promise<ModuleProgress | null>;
  findAll(): Promise<ModuleProgress[]>;
  update(id: string, data: UpdateModuleProgressData): Promise<ModuleProgress>;
  delete(id: string): Promise<ModuleProgress>;
  getStudentOwnerId(id: string): Promise<string | null>;
  getInstructorOwnerId(id: string): Promise<string | null>;
}
