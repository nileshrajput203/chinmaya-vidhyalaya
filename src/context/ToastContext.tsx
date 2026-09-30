import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Download, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'download' | 'info' | 'error';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  showSuccess: (title: string, message?: string) => void;
  showDownloadSuccess: (fileName?: string) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(({ type, title, message, duration = 3000 }: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast: ToastItem = { id, type, title, message, duration };

    setToasts((prev) => [newToast, ...prev.slice(0, 2)]);

    setTimeout(() => {
      hideToast(id);
    }, duration);
  }, [hideToast]);

  const showSuccess = useCallback((title: string, message?: string) => {
    showToast({ type: 'success', title, message, duration: 2800 });
  }, [showToast]);

  const showDownloadSuccess = useCallback((fileName?: string) => {
    showToast({
      type: 'download',
      title: 'Download Successful!',
      message: fileName ? `"${fileName}" has been downloaded successfully.` : 'Document has been saved to your device.',
      duration: 3000,
    });
  }, [showToast]);

  // Global listener for all document downloads (clicks on <a> with download or .pdf/.docx)
  React.useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const isDownloadAttr = target.hasAttribute('download');
      const isDocumentLink = 
        href.endsWith('.pdf') || 
        href.endsWith('.docx') || 
        href.endsWith('.xlsx') || 
        (isDownloadAttr && href.length > 0 && !href.startsWith('#'));

      if (isDocumentLink) {
        let cleanName = '';
        const downloadAttrValue = target.getAttribute('download');
        if (downloadAttrValue && downloadAttrValue.length > 0) {
          cleanName = downloadAttrValue;
        } else {
          const parts = href.split('/');
          cleanName = parts[parts.length - 1] || 'Document';
        }
        cleanName = cleanName.replace(/[-_]/g, ' ').replace(/\.\w+$/, '');
        // Capitalize words
        cleanName = cleanName.replace(/\b\w/g, (c) => c.toUpperCase());

        // Trigger toast after small delay
        setTimeout(() => {
          showDownloadSuccess(cleanName);
        }, 300);
      }
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  }, [showDownloadSuccess]);

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showDownloadSuccess, hideToast }}>
      {children}
      
      {/* Toast Notification Container */}
      <div 
        aria-live="polite"
        className="fixed top-5 right-4 sm:right-6 z-[9999] pointer-events-none flex flex-col items-end gap-3 max-w-sm sm:max-w-md w-full"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const isDownload = toast.type === 'download';
            const isSuccess = toast.type === 'success';
            const isError = toast.type === 'error';

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: -25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className={`pointer-events-auto w-full relative overflow-hidden rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl border flex items-start gap-3.5 ${
                  isError
                    ? 'bg-[#181212]/95 border-red-500/40 text-red-100'
                    : isDownload
                    ? 'bg-[#121E2C]/95 border-[#DF711B]/60 text-white'
                    : 'bg-[#15181C]/95 border-emerald-500/40 text-white'
                }`}
              >
                {/* Visual Icon Badge with gentle pulse */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                    isError
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : isDownload
                      ? 'bg-[#DF711B]/25 text-[#FFB740] border border-[#DF711B]/50'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {isError ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : isDownload ? (
                    <Download className="w-5 h-5 animate-bounce" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FFB740]">
                      {isDownload ? 'DOWNLOAD COMPLETE' : isSuccess ? 'SUBMISSION SUCCESS' : 'NOTIFICATION'}
                    </span>
                  </div>
                  <h4 className="font-sans font-bold text-sm text-white tracking-tight leading-snug mt-0.5">
                    {toast.title}
                  </h4>
                  {toast.message && (
                    <p className="font-sans text-xs text-slate-300 leading-relaxed mt-1 font-normal">
                      {toast.message}
                    </p>
                  )}
                </div>

                {/* Dismiss Button */}
                <button
                  type="button"
                  onClick={() => hideToast(toast.id)}
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 shrink-0"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Bottom Auto-Dismiss Progress Bar (2.8 - 3s) */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: (toast.duration || 3000) / 1000, ease: 'linear' }}
                  className={`absolute bottom-0 left-0 right-0 h-1 origin-left ${
                    isError
                      ? 'bg-red-500'
                      : isDownload
                      ? 'bg-[#DF711B]'
                      : 'bg-emerald-400'
                  }`}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
