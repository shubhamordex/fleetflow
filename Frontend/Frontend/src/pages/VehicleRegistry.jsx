import { useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";

const initialVehicles = [
  { id: 1, plate: "MH 00", model: "2017", type: "Mini", capacity: "5 tonn", odometer: 79000, status: "Idle" },
];

const statusColors = {
  Idle: "bg-amber-100 text-amber-700 border border-amber-300",
  Active: "bg-emerald-100 text-emerald-700 border border-emerald-300",
  Maintenance: "bg-red-100 text-red-700 border border-red-300",
};

export default function VehicleRegistry() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    plate: "", payload: "", odometer: "", type: "", model: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.plate.trim()) e.plate = "Required";
    if (!form.payload.trim()) e.payload = "Required";
    if (!form.odometer.trim()) e.odometer = "Required";
    if (!form.type.trim()) e.type = "Required";
    if (!form.model.trim()) e.model = "Required";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setVehicles(prev => [...prev, {
      id: prev.length + 1,
      plate: form.plate,
      model: form.model,
      type: form.type,
      capacity: form.payload,
      odometer: parseInt(form.odometer),
      status: "Idle",
    }]);
    setForm({ plate: "", payload: "", odometer: "", type: "", model: "" });
    setErrors({});
    setShowModal(false);
  };

  const handleDelete = (id) => setVehicles(prev => prev.filter(v => v.id !== id));

  const filtered = vehicles.filter(v =>
    [v.plate, v.model, v.type, v.status].some(f =>
      f.toLowerCase().includes(search.toLowerCase())
    )
  );

  const Field = ({ label, name, placeholder }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{label}</label>
      <input
        value={form[name]}
        onChange={e => { setForm(p => ({ ...p, [name]: e.target.value })); setErrors(p => ({ ...p, [name]: "" })); }}
        placeholder={placeholder}
        className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${errors[name] ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50"}`}
      />
      {errors[name] && <span className="text-xs text-red-500">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-teal-50 to-slate-200"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      <Navbar />

      <div className="py-6 px-4 sm:px-6 lg:px-8 w-full">

      {/* Main Panel */}
      <div className="w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 px-8 py-6 border-b border-slate-100 bg-slate-50">
          <Search
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by plate, type, model, status..."
          />
          <div className="flex gap-3 w-full sm:w-auto">
            {["Group by", "Filter", "Sort by"].map(label => (
              <button key={label} className="text-xs px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition font-medium flex-1 sm:flex-none">
                {label}
              </button>
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="text-xs px-5 py-2.5 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-600 active:scale-95 transition shadow-sm flex items-center gap-2 flex-1 sm:flex-none justify-center sm:justify-start">
              <span className="text-base leading-none">+</span> New Vehicle
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50">
                {["No", "Plate", "Model", "Type", "Capacity", "Odometer", "Status", "Actions"].map(h => (
                  <th key={h} className="px-8 py-4 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-16 text-slate-400 text-sm">No vehicles found.</td></tr>
              ) : null}
              {filtered.map((v, i) => (
                <tr key={v.id} className={`border-b border-slate-50 hover:bg-teal-50/40 transition ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                  <td className="px-8 py-5 text-slate-400 font-mono text-xs">{i + 1}</td>
                  <td className="px-8 py-5 font-semibold text-slate-800">{v.plate}</td>
                  <td className="px-8 py-5 text-slate-600">{v.model}</td>
                  <td className="px-8 py-5 text-slate-600">{v.type}</td>
                  <td className="px-8 py-5 text-slate-600">{v.capacity}</td>
                  <td className="px-8 py-5 text-slate-600 font-mono text-xs">{v.odometer.toLocaleString()} km</td>
                  <td className="px-8 py-5">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[v.status] || statusColors.Idle}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <button onClick={() => handleDelete(v.id)}
                      className="text-red-400 hover:text-red-600 transition font-bold text-base leading-none">×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
          <span>Showing {filtered.length} of {vehicles.length} vehicles</span>
          <span>Fleet Flow · Asset Management v1.0</span>
        </div>
      </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden animate-fade-in">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-800 text-base">New Vehicle Registration</h2>
                <p className="text-xs text-slate-400 mt-0.5">Fill in vehicle details below</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold leading-none">×</button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
              <Field label="License Plate" name="plate" placeholder="e.g. MH 04 AB 1234" />
              <Field label="Max Payload" name="payload" placeholder="e.g. 5 tonn" />
              <Field label="Initial Odometer" name="odometer" placeholder="e.g. 12000" />
              <Field label="Type" name="type" placeholder="e.g. Mini, Heavy, Pickup" />
              <Field label="Model" name="model" placeholder="e.g. 2017" />
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
              <button onClick={handleSave}
                className="flex-1 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 active:scale-95 transition shadow-sm">
                Save Vehicle
              </button>
              <button onClick={() => { setShowModal(false); setErrors({}); setForm({ plate: "", payload: "", odometer: "", type: "", model: "" }); }}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100 active:scale-95 transition">
                Cancel
              </button>
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