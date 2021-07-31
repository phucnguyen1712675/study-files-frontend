type SortResults = 'asc' | 'desc';

export type GettingTeacherCoursesQuery = {
  teacherId: string;
  page: number;
  limit: number;
  sortBy?: string;
  sortResults?: SortResults;
};
