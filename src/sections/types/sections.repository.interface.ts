export interface CreateSectionItf {
  title: string;
  description?: string;
  order?: number;
  courseId: string;
}

export interface UpdateSectionItf {
  title?: string;
  description?: string;
  order?: number;
  courseId?: string;
}
