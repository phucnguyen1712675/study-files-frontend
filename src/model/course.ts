export interface Course {
  id: string;
  subCategoryId: string;
  teacherId: string;
  name: string;
  shortDescription: string;
  detailDescription: string;
  image: string;
  status: boolean;
  subscriberNumber: number;
  view: number;
  raring: number;
  originalFee: number;
  fee?: number;
  promotionStart?: Date;
  promotionEnd?: Date;
}
