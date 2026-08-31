import React, { useState, useEffect } from 'react';
import { Search, FileText, Download } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { documentService } from '../services/documentService';
import { SchoolDocument, DocumentCategory } from '../types/documents';

interface DocumentListingPageProps {
  initialCategory?: DocumentCategory;
  pageTitle: string;
  pageSubtitle: string;
}

export const DocumentListingPage: React.FC<DocumentListingPageProps> = ({
  initialCategory,
  pageTitle,
  pageSubtitle,
}) => {
  const [documents, setDocuments] = useState<SchoolDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDocs() {
      setLoading(true);
      const cat = selectedCategory === 'all' ? undefined : selectedCategory;
      const data = await documentService.searchDocuments(searchQuery, cat);
      setDocuments(data);
      setLoading(false);
    }
    loadDocs();
  }, [selectedCategory, searchQuery]);

  const categories: { label: string; value: DocumentCategory | 'all' }[] = [
    { label: 'All Documents', value: 'all' },
    { label: 'Mandatory Public Disclosures', value: 'mandatory-information' },
    { label: 'Sample Question Papers', value: 'sample-papers' },
    { label: 'School Circulars', value: 'circulars' },
    { label: 'Admissions & Forms', value: 'admissions' },
  ];

  return (
    <div className="bg-[#FCFBF7] text-[#181C20] pb-24">
      <PageHero title={pageTitle} subtitle={pageSubtitle} badge="Official Documents" />
      <Breadcrumb items={[{ label: "Downloads" }, { label: pageTitle }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* High Utility Search & Filter Bar */}
        <div className="bg-white border border-[#E7E2D8] p-6 rounded-3xl shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all rounded-xl border ${
                  selectedCategory === cat.value
                    ? 'bg-[#0B1D30] text-white border-[#0B1D30] shadow-sm font-bold'
                    : 'bg-[#FAF8F5] border-[#E7E2D8] text-[#4A5568] hover:bg-white hover:text-[#0B1D30]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, subject, or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:outline-none focus:border-[#D97745] font-sans"
            />
          </div>
        </div>

        {/* High Utility Document Table Layout */}
        {loading ? (
          <div className="text-center py-20 text-[#4A5568] text-xs font-mono">Loading official repository documents...</div>
        ) : documents.length > 0 ? (
          <div className="bg-white border border-[#E7E2D8] rounded-3xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0B1D30] text-white text-[11px] font-mono uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6 font-bold">Document Title</th>
                    <th className="py-4 px-4 font-bold">Category</th>
                    <th className="py-4 px-4 font-bold">Format / Size</th>
                    <th className="py-4 px-6 font-bold text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E2D8]">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-4 px-6 text-[#0B1D30]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#FAF3E8] text-[#D97745] flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-[#0B1D30]">{doc.title}</div>
                            {doc.description && (
                              <div className="text-[11px] text-[#4A5568] font-normal mt-0.5 font-light">{doc.description}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[11px] font-mono font-semibold text-[#D97745] uppercase">
                        {doc.category.replace('-', ' ')}
                      </td>
                      <td className="py-4 px-4 text-[11px] font-mono text-[#4A5568]">
                        PDF ({doc.fileSize || 'Official'})
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a
                          href={doc.fileUrl}
                          download
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B1D30] hover:bg-[#D97745] text-white text-[11px] font-bold rounded-xl transition-colors shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Get PDF</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-[#E7E2D8] p-16 rounded-3xl text-center space-y-3">
            <FileText className="w-12 h-12 text-[#D97745] mx-auto opacity-50" />
            <h3 className="font-cinzel font-bold text-[#0B1D30] text-xl">No documents match your search</h3>
            <p className="text-xs text-[#4A5568]">Try searching with a different keyword or select "All Documents".</p>
          </div>
        )}

      </div>
    </div>
  );
};
