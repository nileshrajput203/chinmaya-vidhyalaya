import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../../types/navigation';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="bg-[#FAF8F5] border-b border-[#E7E2D8] py-2.5 px-4 sm:px-6 lg:px-8 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2 text-[#555555]">
        <Link to="/" className="flex items-center gap-1.5 text-[#555555] hover:text-[#DF711B] transition-colors uppercase tracking-wider font-semibold">
          <Home className="w-3.5 h-3.5 text-[#DF711B]" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-[#C4BDB0] shrink-0" />
              {isLast || !item.href ? (
                <span className="font-bold text-[#181818] uppercase tracking-wider truncate max-w-xs">{item.label}</span>
              ) : (
                <Link to={item.href} className="hover:text-[#DF711B] transition-colors uppercase tracking-wider">
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
