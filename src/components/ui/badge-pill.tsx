import React from 'react';

interface BadgePillProps {
  label: string;
  variant?: 'saffron' | 'navy' | 'emerald' | 'amber' | 'neutral';
  pulse?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const BadgePill: React.FC<BadgePillProps> = ({
  label,
  variant = 'saffron',
  pulse = false,
  className = '',
  icon,
}) => {
  const variantStyles = {
    saffron: 'bg-[#FFF9F2] text-[#DF711B] border-[#DF711B]/30',
    navy: 'bg-[#F5F8FC] text-[#0B1E34] border-[#0B1E34]/20',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-300/40',
    amber: 'bg-amber-50 text-amber-800 border-amber-300/40',
    neutral: 'bg-white text-slate-700 border-slate-200',
  };

  const pulseColors = {
    saffron: 'bg-[#DF711B]',
    navy: 'bg-[#0B1E34]',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border shadow-2xs ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseColors[variant]}`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${pulseColors[variant]}`}
          />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
