export default function KPI({ label, value }) {
  return (
    <div className="bg-white border border-teal-200 rounded-2xl p-5 text-center shadow-sm">
      <p className="text-xs uppercase font-semibold text-teal-600 tracking-widest">
        {label}
      </p>
      <p className="text-2xl font-black text-slate-800 mt-2">
        {value}
      </p>
    </div>
  );
}