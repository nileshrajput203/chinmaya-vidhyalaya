import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, HardDrive } from 'lucide-react';
import { SchoolDocument } from '../../types/documents';
import { DocumentViewerModal } from './DocumentViewerModal';

interface DocumentCardProps {
  document: SchoolDocument;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Download is strictly reserved for curriculums, sample papers, admissions, and circulars
  const canDownload = document.downloadable && document.category !== 'mandatory-information';

  return (
    <>
      <div className="bg-white rounded-2xl shadow-card border border-[#E7E2D8] p-5 hover:shadow-cardHover transition-all flex flex-col justify-between group">
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] text-[#D97745] flex items-center justify-center shrink-0 group-hover:bg-[#0B1D30] group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>

            {/* If there's a specific term badge, display term */}
            {document.term && (
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FAF3E8] text-[#D97745] uppercase tracking-wider border border-[#E7E2D8]">
                {document.term}
              </span>
            )}
            {/* Category badge removed per user specification */}
          </div>

          <h3 className="font-cinzel font-bold text-[#0B1D30] text-base mb-2 group-hover:text-[#D97745] transition-colors line-clamp-2">
            {document.title}
          </h3>

          <p className="text-xs text-[#4A5568] line-clamp-2 mb-4 leading-relaxed font-light">
            {document.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E7E2D8] flex items-center justify-between text-xs text-[#4A5568]">
          <div className="flex items-center gap-3 font-mono text-[11px]">
            {document.fileSize && (
              <span className="flex items-center gap-1 text-slate-500">
                <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                {document.fileSize}
              </span>
            )}
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {document.uploadDate}
            </span>
          </div>

          {/* Action buttons: Eye (View Document) and Download (only when permitted) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsViewerOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#0B1D30] hover:text-white text-[#0B1D30] border border-[#E7E2D8] transition-colors flex items-center gap-1.5 font-medium text-xs shadow-sm"
              title="View document online"
            >
              <Eye className="w-3.5 h-3.5 text-[#D97745]" />
              <span>View</span>
            </button>

            {canDownload && (
              <a
                href={document.fileUrl}
                download
                className="px-3 py-1.5 rounded-xl bg-[#D97745] hover:bg-[#C8652D] text-white transition-colors flex items-center gap-1.5 font-bold text-xs shadow-sm"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Modal Viewer */}
      {isViewerOpen && (
        <DocumentViewerModal
          document={document}
          onClose={() => setIsViewerOpen(false)}
          allowDownload={canDownload}
        />
      )}
    </>
  );
};
