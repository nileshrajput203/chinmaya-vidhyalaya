import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, ShieldAlert, Maximize2 } from 'lucide-react';
import { SchoolDocument } from '../../types/documents';

interface DocumentViewerModalProps {
  document: SchoolDocument | null;
  onClose: () => void;
  allowDownload?: boolean;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  onClose,
  allowDownload = false,
}) => {
  if (!document) return null;

  const isImage = document.fileUrl.match(/\.(jpeg|jpg|png|webp|gif)$/i);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0B1D30]/85 backdrop-blur-md">
        {/* Backdrop Click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-5xl h-[88vh] bg-[#FCFBF7] rounded-3xl shadow-2xl border border-[#E7E2D8] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="px-6 py-4 bg-[#0B1D30] text-white flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#D97745]/20 text-[#D97745] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="truncate">
                <h3 className="font-cinzel font-bold text-sm sm:text-base text-white truncate">
                  {document.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                  {document.fileSize && <span>{document.fileSize}</span>}
                  {document.academicYear && <span>• Session: {document.academicYear}</span>}
                  {!allowDownload && (
                    <span className="text-[#D97745] font-bold">• View-Only Mode</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {allowDownload && (
                <a
                  href={document.fileUrl}
                  download
                  className="px-3 py-1.5 bg-[#D97745] hover:bg-[#C8652D] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              )}

              <a
                href={document.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Open in new window"
              >
                <Maximize2 className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors ml-1"
                aria-label="Close viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* View-Only Advisory Banner for Public Disclosures */}
          {!allowDownload && (
            <div className="bg-[#FAF3E8] px-6 py-2 border-b border-[#E7E2D8] flex items-center gap-2 text-xs text-[#0B1D30] shrink-0 font-medium">
              <ShieldAlert className="w-4 h-4 text-[#D97745] shrink-0" />
              <span>
                Official Verification Display: This public disclosure document is provided in authenticated view-only mode per CBSE SARAS statutory requirements.
              </span>
            </div>
          )}

          {/* Document Content View */}
          <div className="flex-1 w-full bg-slate-100 p-2 sm:p-4 overflow-auto flex items-center justify-center">
            {isImage ? (
              <div className="max-w-full max-h-full flex items-center justify-center p-2">
                <img
                  src={document.fileUrl}
                  alt={document.title}
                  className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-lg border border-[#E7E2D8]"
                />
              </div>
            ) : (
              <iframe
                src={`${document.fileUrl}#toolbar=0`}
                title={document.title}
                className="w-full h-full rounded-xl border border-slate-200 bg-white shadow-inner"
              />
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-white border-t border-[#E7E2D8] flex items-center justify-between text-xs text-[#4A5568] shrink-0">
            <span className="truncate">{document.description}</span>
            <span className="font-mono text-[11px] shrink-0 hidden sm:inline text-slate-500">
              Chinmaya Vidyalaya Tarapur Official Repository
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
