import React from 'react';
import { Card } from './Card';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendPositive = true
}) => {
  return (
    <Card className="flex items-start justify-between relative overflow-hidden">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-100 mt-1">{value}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        {trend && (
          <span
            className={`inline-block mt-2 text-[11px] font-semibold px-2 py-0.5 rounded ${
              trendPositive ? 'bg-emerald-950/60 text-emerald-400' : 'bg-rose-950/60 text-rose-400'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      {icon && <div className="p-3 bg-slate-800/80 rounded-xl text-blue-400 border border-slate-700/50">{icon}</div>}
    </Card>
  );
};
