export default function ChartCard({ title }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-700 mb-4">
        {title}
      </h3>

      <div className="h-48 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 text-sm">
        Chart Placeholder
      </div>
    </div>
  );
}