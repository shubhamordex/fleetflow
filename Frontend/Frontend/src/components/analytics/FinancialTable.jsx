export default function FinancialTable() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-700">
          Financial Summary of Month
        </h3>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-400 text-xs uppercase">
          <tr>
            <th className="px-6 py-3 text-left">Month</th>
            <th className="px-6 py-3 text-left">Revenue</th>
            <th className="px-6 py-3 text-left">Fuel Cost</th>
            <th className="px-6 py-3 text-left">Maintenance</th>
            <th className="px-6 py-3 text-left">Net Profit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr>
            <td className="px-6 py-4 font-medium">Jan</td>
            <td className="px-6 py-4">Rs. 17L</td>
            <td className="px-6 py-4">Rs. 6L</td>
            <td className="px-6 py-4">Rs. 2L</td>
            <td className="px-6 py-4 font-bold text-emerald-600">Rs. 9L</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}