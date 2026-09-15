export type DocumentCategory = 
  | 'mandatory-information'
  | 'sample-papers'
  | 'circulars'
  | 'academics'
  | 'admissions'
  | 'other';

export type TermCategory = 'Term 1' | 'Term 2' | 'Annual';

export interface SchoolDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  academicYear?: string;
  term?: TermCategory;
  fileUrl: string;
  fileSize?: string;
  uploadDate: string;
  description: string;
  downloadable: boolean;
}
