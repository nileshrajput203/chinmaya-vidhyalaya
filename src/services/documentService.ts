import { OFFICIAL_DOCUMENTS } from '../data/documents';
import { SchoolDocument, DocumentCategory } from '../types/documents';

export const documentService = {
  async getAllDocuments(): Promise<SchoolDocument[]> {
    return Promise.resolve(OFFICIAL_DOCUMENTS);
  },

  async getDocumentsByCategory(category: DocumentCategory): Promise<SchoolDocument[]> {
    const filtered = OFFICIAL_DOCUMENTS.filter(doc => doc.category === category);
    return Promise.resolve(filtered);
  },

  async searchDocuments(query: string, category?: DocumentCategory): Promise<SchoolDocument[]> {
    const q = query.toLowerCase().trim();
    let results = OFFICIAL_DOCUMENTS;

    if (category) {
      results = results.filter(doc => doc.category === category);
    }

    if (q) {
      results = results.filter(doc => 
        doc.title.toLowerCase().includes(q) || 
        doc.description.toLowerCase().includes(q)
      );
    }

    return Promise.resolve(results);
  }
};
