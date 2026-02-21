import { useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import { authColors } from "../colors/colors";

export default function Performance() {
  const c = authColors;
  const [search, setSearch] = useState("");
  
  const drivers = [
    {
      name: "John Carter",
      license: "23223",
      expiry: "22/36",
      completion: 92,
      safety: 89,
      complaints: 4,
    },
    {
      name: "David Miller",
      license: "99812",
      expiry: "18/36",
      completion: 85,
      safety: 91,
      complaints: 1,
    },
    {
      name: "Alex Morgan",
      license: "77321",
      expiry: "12/36",
      completion: 76,
      safety: 84,
      complaints: 6,
    },
  ];

  // Filter drivers based on search
  const filteredDrivers = drivers.filter(d => 
    search.toLowerCase() === "" ||
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.license.toLowerCase().includes(search.toLowerCase()) ||
    d.expiry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-h-screen w-screen transition-colors duration-300 bg-gradient-to-br from-slate-100 via-teal-50 to-slate-200 overflow-x-hidden flex flex-col"
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">

          {/* PAGE HEADER */}
          <div>
            <h1 className="text-3xl font-bold" style={{ color: c.slateText800 }}>
              Driver Performance
            </h1>
            <p className="mt-1" style={{ color: c.slateText600 }}>
              Monitor completion rate, safety score and driver compliance
            </p>
          </div>

          {/* SEARCH TOOLBAR */}
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search driver by name, license, or ID..."
          />

          {/* PERFORMANCE TABLE */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: c.registryBorder }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: c.registryHeaderBg }}>
                <tr>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: c.slateText800 }}>Driver</th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: c.slateText800 }}>License #</th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: c.slateText800 }}>Expiry</th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: c.slateText800 }}>Completion</th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: c.slateText800 }}>Safety</th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: c.slateText800 }}>Complaints</th>
                </tr>
              </thead>

              <tbody>
                {filteredDrivers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center" style={{ color: c.slateText400 }}>
                      No drivers found matching "{search}"
                    </td>
                  </tr>
                ) : (
                  filteredDrivers.map((d, i) => (
                    <tr
                      key={i}
                      className="transition"
                      style={{
                        backgroundColor: i % 2 === 0 ? c.registryRowBg : c.registryRowAltBg,
                        borderTop: `1px solid ${c.registryBorder}`
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.registryRowHover)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? c.registryRowBg : c.registryRowAltBg)}
                    >
                      <td className="px-6 py-4 font-medium" style={{ color: c.slateText800 }}>
                        {d.name}
                      </td>

                      <td className="px-6 py-4" style={{ color: c.slateText600 }}>
                        {d.license}
                      </td>

                      <td className="px-6 py-4" style={{ color: c.slateText600 }}>
                        {d.expiry}
                      </td>

                      {/* Completion Progress */}
                      <td className="px-6 py-4 w-56">
                        <div className="w-full rounded-full h-2" style={{ backgroundColor: c.registryRowAltBg }}>
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${d.completion}%`, backgroundColor: c.teal500 }}
                          />
                        </div>
                        <span className="text-xs mt-1 inline-block" style={{ color: c.slateText600 }}>
                          {d.completion}%
                        </span>
                      </td>

                      {/* Safety Score */}
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium border"
                          style={{
                            backgroundColor: c.statusActiveBg,
                            color: c.statusActiveText,
                            borderColor: c.statusActiveBorder
                          }}
                        >
                          {d.safety}%
                        </span>
                      </td>

                      {/* Complaints */}
                      <td className="px-6 py-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium border"
                          style={{
                            backgroundColor: d.complaints > 3 ? c.statusMaintenanceBg : c.statusIdleBg,
                            color: d.complaints > 3 ? c.statusMaintenanceText : c.statusIdleText,
                            borderColor: d.complaints > 3 ? c.statusMaintenanceBorder : c.statusIdleBorder
                          }}
                        >
                          {d.complaints}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

      </div>
    </div>
  );
}