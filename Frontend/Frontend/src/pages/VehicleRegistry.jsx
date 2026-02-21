import { useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import VehicleForm from "../Modal/VehicleForm";
import { authColors } from "../colors/colors";

const initialVehicles = [
  { id: 1, plate: "MH 00", model: "2017", type: "Mini", capacity: "5 tonn", odometer: 79000, status: "Idle" },
];

const statusColors = {
  Idle: { bg: authColors.statusIdleBg, text: authColors.statusIdleText, border: authColors.statusIdleBorder },
  Active: { bg: authColors.statusActiveBg, text: authColors.statusActiveText, border: authColors.statusActiveBorder },
  Maintenance: { bg: authColors.statusMaintenanceBg, text: authColors.statusMaintenanceText, border: authColors.statusMaintenanceBorder },
};

export default function VehicleRegistry() {
  const c = authColors;
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const handleSaveVehicle = (newVehicle) => {
    setVehicles(prev => [...prev, {
      id: prev.length + 1,
      plate: newVehicle.plate,
      model: newVehicle.model,
      type: newVehicle.type,
      capacity: newVehicle.capacity,
      odometer: parseInt(newVehicle.odometer),
      status: newVehicle.status,
    }]);
    setShowModal(false);
  };

  const handleDelete = (id) => setVehicles(prev => prev.filter(v => v.id !== id));

  const filtered = vehicles.filter(v =>
    [v.plate, v.model, v.type, v.status].some(f =>
      f.toLowerCase().includes(search.toLowerCase())
    )
  );

return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-teal-50 to-slate-200"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      <Navbar />

      <div className="py-6 px-4 sm:px-6 lg:px-8 w-full">

      {/* Main Panel */}
      <div className="w-full rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: c.registryBg, borderColor: c.registryBorder, border: `1px solid ${c.registryBorder}` }}>

        {/* Toolbar */}
        <div >
          <Search
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by plate, type, model, status..."
            buttonLabel="New Vehicle"
            onButtonClick={() => setShowModal(true)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-widest" style={{ backgroundColor: c.registryHeaderBg, borderBottom: `1px solid ${c.registryBorder}`, color: c.slateText400 }}>
                {["No", "Plate", "Model", "Type", "Capacity", "Odometer", "Status", "Actions"].map(h => (
                  <th key={h} className="px-8 py-4 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-16 text-sm" style={{ color: c.slateText400 }}>No vehicles found.</td></tr>
              ) : null}
              {filtered.map((v, i) => {
                const status = statusColors[v.status] || statusColors.Idle;
                return (
                  <tr key={v.id} className="transition" 
                    style={{ backgroundColor: i % 2 === 0 ? c.registryRowBg : c.registryRowAltBg, borderBottom: `1px solid ${c.registryBorder}` }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.registryRowHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? c.registryRowBg : c.registryRowAltBg)}>
                    <td className="px-8 py-5 font-mono text-xs" style={{ color: c.slateText400 }}>{i + 1}</td>
                    <td className="px-8 py-5 font-semibold" style={{ color: c.slateText800 }}>{v.plate}</td>
                    <td className="px-8 py-5" style={{ color: c.slateText600 }}>{v.model}</td>
                    <td className="px-8 py-5" style={{ color: c.slateText600 }}>{v.type}</td>
                    <td className="px-8 py-5" style={{ color: c.slateText600 }}>{v.capacity}</td>
                    <td className="px-8 py-5 font-mono text-xs" style={{ color: c.slateText600 }}>{v.odometer.toLocaleString()} km</td>
                    <td className="px-8 py-5">
                      <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: status.bg, color: status.text, border: `1px solid ${status.border}` }}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <button onClick={() => handleDelete(v.id)}
                        className="transition font-bold text-base leading-none" 
                        style={{ color: c.deleteText }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = c.deleteTextHover)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = c.deleteText)}>×</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 text-xs flex justify-between" style={{ backgroundColor: c.registryHeaderBg, borderTop: `1px solid ${c.registryBorder}`, color: c.slateText600 }}>
          <span>Showing {filtered.length} of {vehicles.length} vehicles</span>
          <span>Fleet Flow · Asset Management v1.0</span>
        </div>
      </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ backgroundColor: c.modalOverlay }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in" style={{ backgroundColor: c.registryBg, border: `1px solid ${c.registryBorder}` }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${c.registryBorder}` }}>
              <div>
                <h2 className="font-bold text-base" style={{ color: c.slateText800 }}>New Vehicle Registration</h2>
                <p className="text-xs mt-0.5" style={{ color: c.slateText600 }}>Fill in vehicle details below</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-xl font-bold leading-none transition" style={{ color: c.slateText400 }} onMouseEnter={(e) => (e.currentTarget.style.color = c.slateText600)} onMouseLeave={(e) => (e.currentTarget.style.color = c.slateText400)}>×</button>
            </div>
            <div className="px-6 py-5">
              <VehicleForm onSave={handleSaveVehicle} onCancel={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fade-in { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}