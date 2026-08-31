export type DocumentCategory = 
  | 'mandatory-information'
  | 'sample-papers'
  | 'circulars'
  | 'academics'
  | 'admissions'
  | 'other';

export interface SchoolDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  academicYear?: string;
  fileUrl: string;
  fileSize?: string;
  uploadDate: string;
  description: string;
  downloadable: boolean;
}
