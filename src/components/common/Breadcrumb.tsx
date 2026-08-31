import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../../types/navigation';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5 text-slate-600">
        <Link to="/" className="flex items-center gap-1 hover:text-brand-saffron transition-colors">
          <Home className="w-3.5 h-3.5 text-brand-navy" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-brand-navy truncate max-w-xs">{item.label}</span>
              ) : (
                <Link to={item.href} className="hover:text-brand-saffron transition-colors">
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
