export type Lecture = {
  id: string;
  sectionId: string;
  title: string;
  ordinalNumber: number;
  canPreview: boolean;
  videoUrl?: string;
};
