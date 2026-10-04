import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../../types/navigation';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav 
      aria-label="Breadcrumb navigation"
      className="bg-white border-b border-slate-200 py-2 px-3.5 sm:px-6 lg:px-8 text-xs font-mono w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth py-0.5 text-[#555555]">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-[#555555] hover:text-[#DF711B] transition-colors uppercase tracking-wider font-semibold shrink-0"
        >
          <Home className="w-3.5 h-3.5 text-[#DF711B] shrink-0" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <div key={idx} className="inline-flex items-center gap-1.5 shrink-0 pl-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-[#C4BDB0] shrink-0" />
              {isLast || !item.href ? (
                <span className="font-bold text-[#181818] uppercase tracking-wider">
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="hover:text-[#DF711B] transition-colors uppercase tracking-wider">
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};
