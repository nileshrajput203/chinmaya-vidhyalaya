import React, { useState, useEffect } from 'react';
import { Search, FileText, Download, Eye, ShieldCheck, Filter } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { documentService } from '../services/documentService';
import { SchoolDocument, DocumentCategory, TermCategory } from '../types/documents';
import { DocumentViewerModal } from '../components/documents/DocumentViewerModal';

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
  const [selectedTerm, setSelectedTerm] = useState<TermCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeViewingDoc, setActiveViewingDoc] = useState<SchoolDocument | null>(null);

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
    { label: 'Mandatory Public Disclosures (TC)', value: 'mandatory-information' },
    { label: 'Sample Question Papers', value: 'sample-papers' },
    { label: 'School Circulars & Notices', value: 'circulars' },
    { label: 'Admissions & Forms', value: 'admissions' },
    { label: 'Academics & Curricula', value: 'academics' },
  ];

  // Filter term-wise if applicable
  const displayDocuments = documents.filter((doc) => {
    if (selectedTerm === 'all') return true;
    return doc.term === selectedTerm;
  });

  const isSamplePapers = selectedCategory === 'sample-papers' || initialCategory === 'sample-papers';

  return (
    <div className="bg-[#FCFBF7] text-[#181C20] pb-24">
      <PageHero title={pageTitle} subtitle={pageSubtitle} badge="Official Repository" />
      <Breadcrumb items={[{ label: "Downloads" }, { label: pageTitle }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Public Disclosure Compliance Banner if in mandatory-information */}
        {(selectedCategory === 'mandatory-information' || initialCategory === 'mandatory-information') && (
          <div className="bg-[#FAF3E8] border border-[#E7E2D8] p-5 rounded-2xl flex items-start sm:items-center gap-3.5 shadow-sm text-xs text-[#181C20]">
            <ShieldCheck className="w-5 h-5 text-[#DF711B] shrink-0 mt-0.5 sm:mt-0" />
            <div className="space-y-0.5">
              <span className="font-bold block font-cinzel text-sm text-[#181C20]">CBSE SARAS Compliance & Statutory Transparency</span>
              <p className="text-[#4A5568] font-light leading-relaxed">
                In adherence to CBSE statutory norms, public disclosures, safety clearances, and official Transfer Certificate (TC) records are made accessible in certified view-only format. Click the "View" button to read any document.
              </p>
            </div>
          </div>
        )}

        {/* High Utility Search & Filter Bar */}
        <div className="bg-white border border-[#E7E2D8] p-6 rounded-3xl shadow-card space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Tabs (if not locked to initial category) */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setSelectedCategory(cat.value);
                    setSelectedTerm('all');
                  }}
                  className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all rounded-xl border ${
                    selectedCategory === cat.value
                      ? 'bg-[#181818] text-white border-[#181818] shadow-sm font-bold'
                      : 'bg-[#FAF8F5] border-[#E7E2D8] text-[#4A5568] hover:bg-white hover:text-[#181C20]'
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
                placeholder="Search by title, standard, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E2D8] rounded-xl focus:outline-none focus:border-[#DF711B] font-sans"
              />
            </div>
          </div>

          {/* Term-Wise Filter (For Sample Papers per user request) */}
          {isSamplePapers && (
            <div className="pt-3 border-t border-[#E7E2D8] flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#181C20] uppercase flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#DF711B]" />
                Filter by Term:
              </span>
              <div className="flex items-center gap-2">
                {[
                  { label: 'All Terms', value: 'all' },
                  { label: 'Term 1 / Periodic Assessments (Std 1 - 10)', value: 'Term 1' },
                  { label: 'Term 2 / Evaluation III (Std 1 - 5)', value: 'Term 2' },
                ].map((termOpt) => (
                  <button
                    key={termOpt.value}
                    onClick={() => setSelectedTerm(termOpt.value as TermCategory | 'all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedTerm === termOpt.value
                        ? 'bg-[#DF711B] text-white border-[#DF711B] font-bold shadow-sm'
                        : 'bg-white border-[#E7E2D8] text-[#4A5568] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    {termOpt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* High Utility Document Table Layout (Category column removed per user specification) */}
        {loading ? (
          <div className="text-center py-20 text-[#4A5568] text-xs font-mono">Loading repository documents...</div>
        ) : displayDocuments.length > 0 ? (
          <div className="bg-white border border-[#E7E2D8] rounded-3xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181818] text-white text-[11px] font-mono uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6 font-bold">Document Title & Description</th>
                    <th className="py-4 px-4 font-bold">Term / Session</th>
                    <th className="py-4 px-4 font-bold">File Size</th>
                    <th className="py-4 px-6 font-bold text-right">Access Options</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E2D8]">
                  {displayDocuments.map((doc) => {
                    const isDownloadAllowed = doc.downloadable && doc.category !== 'mandatory-information';

                    return (
                      <tr key={doc.id} className="hover:bg-[#FAF8F5] transition-colors group">
                        <td className="py-4 px-6 text-[#181C20]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#FAF3E8] text-[#DF711B] flex items-center justify-center shrink-0 group-hover:bg-[#181818] group-hover:text-white transition-colors">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-semibold text-xs text-[#181C20] group-hover:text-[#DF711B] transition-colors">
                                {doc.title}
                              </div>
                              {doc.description && (
                                <div className="text-[11px] text-[#4A5568] font-normal mt-0.5 font-light">
                                  {doc.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-[11px] font-mono text-[#181C20]">
                          {doc.term ? (
                            <span className="font-bold text-[#DF711B] bg-[#FAF3E8] px-2 py-0.5 rounded border border-[#E7E2D8]">
                              {doc.term}
                            </span>
                          ) : (
                            doc.academicYear || 'Academic Year'
                          )}
                        </td>

                        <td className="py-4 px-4 text-[11px] font-mono text-[#4A5568]">
                          {doc.fileSize || 'Standard'}
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex items-center gap-2 justify-end">
                            {/* Eye View Button for all documents */}
                            <button
                              type="button"
                              onClick={() => setActiveViewingDoc(doc)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#181818] hover:text-white text-[#181C20] border border-[#E7E2D8] text-xs font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
                              title="View Document Online"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#DF711B]" />
                              <span>View</span>
                            </button>

                            {/* Download Button ONLY when permitted (curricula, sample papers, admissions) */}
                            {isDownloadAllowed && (
                              <a
                                href={doc.fileUrl}
                                download
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#DF711B] hover:bg-[#c85f12] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                                title="Download PDF File"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Download</span>
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-[#E7E2D8] p-16 rounded-3xl text-center space-y-3">
            <FileText className="w-12 h-12 text-[#DF711B] mx-auto opacity-50" />
            <h3 className="font-cinzel font-bold text-[#181C20] text-xl">No documents found</h3>
            <p className="text-xs text-[#4A5568]">Try selecting a different filter or search keyword.</p>
          </div>
        )}

      </div>

      {/* Interactive Modal Viewer */}
      {activeViewingDoc && (
        <DocumentViewerModal
          document={activeViewingDoc}
          onClose={() => setActiveViewingDoc(null)}
          allowDownload={activeViewingDoc.downloadable && activeViewingDoc.category !== 'mandatory-information'}
        />
      )}
    </div>
  );
};
