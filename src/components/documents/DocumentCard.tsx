import React from 'react';
import { FileText, Download, ExternalLink, Calendar, HardDrive } from 'lucide-react';
import { SchoolDocument } from '../../types/documents';

interface DocumentCardProps {
  document: SchoolDocument;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  return (
    <div className="bg-white rounded-xl shadow-card border border-slate-200 p-5 hover:shadow-cardHover transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0 group-hover:bg-brand-saffron group-hover:text-white transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
            {document.category.replace('-', ' ')}
          </span>
        </div>

        <h3 className="font-heading font-bold text-slate-800 text-base mb-2 group-hover:text-brand-navy transition-colors line-clamp-2">
          {document.title}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {document.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          {document.fileSize && (
            <span className="flex items-center gap-1">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              {document.fileSize}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {document.uploadDate}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={document.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded bg-slate-100 hover:bg-brand-navy hover:text-white text-slate-700 transition-colors"
            title="View document"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          {document.downloadable && (
            <a
              href={document.fileUrl}
              download
              className="p-2 rounded bg-brand-saffron hover:bg-brand-saffronDark text-white transition-colors flex items-center gap-1 font-medium"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
