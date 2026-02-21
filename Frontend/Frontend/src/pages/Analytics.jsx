import Navbar from "../components/Navbar";
import { authColors } from "../colors/colors";

export default function Analytics() {
  const c = authColors;

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: c.pageBg }}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* 🔹 PAGE TITLE */}
        <div>
          <h1
            className="text-3xl font-semibold tracking-wide"
            style={{ color: c.primaryText }}
          >
            Fleet Analytics Dashboard
          </h1>
          <p className="text-sm mt-2" style={{ color: c.secondaryText }}>
            Overview of performance, cost, and profitability
          </p>
        </div>

        {/* 🔹 KPI SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {[
            { label: "Total Fuel Cost", value: "Rs. 2.6 L" },
            { label: "Fleet ROI", value: "+12.5%" },
            { label: "Utilization Rate", value: "82%" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 hover:scale-[1.02] transition"
            >
              <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: c.secondaryText }}>
                {item.label}
              </p>
              <p className="mt-4 text-4xl font-bold" style={{ color: c.primaryText }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* 🔹 CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Fuel Efficiency */}
          <div
            className="rounded-2xl p-6 shadow-md "
            style={{
              backgroundColor: c.ambientGreen,
            }}
          >
            <h3
              className="text-lg font-semibold mb-6"
              style={{ color: c.primaryText }}
            >
              Fuel Efficiency Trend (km/L)
            </h3>

            <div
              className="h-60 rounded-xl flex items-center justify-center text-sm"
              style={{
                backgroundColor: c.chartBg || "#f8f9fa",
                color: c.secondaryText,
              }}
            >
              Line Chart Here
            </div>
          </div>

          {/* Top Vehicles */}
          <div
            className="rounded-2xl p-6 shadow-md "
            style={{
              backgroundColor: c.ambientGreen,
            }}
          >
            <h3
              className="text-lg font-semibold mb-6"
              style={{ color: c.primaryText }}
            >
              Top 5 Costliest Vehicles
            </h3>

            <div
              className="h-60 rounded-xl flex items-center justify-center text-sm"
              style={{
                backgroundColor: c.chartBg || "#f8f9fa",
                color: c.secondaryText,
              }}
            >
              Bar Chart Here
            </div>
          </div>
        </div>

        {/* 🔹 FINANCIAL SUMMARY */}
        <div
          className="rounded-2xl shadow-md overflow-hidden"
          style={{
            backgroundColor: c.ambientGreen,
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-4"
            style={{ borderColor: c.borderColor }}
          >
            <h3
              className="text-lg font-semibold"
              style={{ color: c.primaryText }}
            >
              Financial Summary of Month
            </h3>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead
                style={{
                  backgroundColor: c.tableHeaderBg || "#f4f6f8",
                }}
              >
                <tr className="text-left">
                  <th className="px-6 py-3">Month</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Fuel Cost</th>
                  <th className="px-6 py-3">Maintenance</th>
                  <th className="px-6 py-3">Net Profit</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="px-6 py-4">Jan</td>
                  <td className="px-6 py-4">Rs. 17L</td>
                  <td className="px-6 py-4">Rs. 6L</td>
                  <td className="px-6 py-4">Rs. 2L</td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    Rs. 9L
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}