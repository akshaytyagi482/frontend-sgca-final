interface StatsCardProps {
  label: string;
  value: string;
  icon?: string; // SVG string
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {icon && (
        <div className="mb-3 w-10 h-10 text-indigo-600" aria-hidden dangerouslySetInnerHTML={{ __html: icon }} />
      )}
      <p className="text-2xl font-bold text-indigo-600">{value}</p>
      <p className="mt-2 text-sm font-medium text-gray-600">{label}</p>
    </div>
  );
}