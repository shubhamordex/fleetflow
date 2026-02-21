import { useState } from "react";
import { authColors } from "../colors/colors";

export default function NewServiceForm({ onSave, onCancel }) {
  const c = authColors;

  const [form, setForm] = useState({
    vehicle: "",
    issue: "",
    date: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.vehicle.trim()) e.vehicle = "Vehicle required";
    if (!form.issue.trim()) e.issue = "Issue / service required";
    if (!form.date.trim()) e.date = "Date required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    onSave({
      vehicle: form.vehicle,
      issue: form.issue,
      date: form.date,
      notes: form.notes,
    });
  };

  const Input = ({ label, name, type = "text" }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase" style={{ color: c.slateText600 }}>
        {label}
      </label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
        style={{
          borderColor: errors[name] ? c.error : c.registryBorder,
          backgroundColor: errors[name] ? c.errorBg : c.registryBg,
          color: c.slateText800,
        }}
        className="w-full rounded-xl px-4 py-2 border text-sm focus:outline-none focus:ring-2 transition"
        onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${c.teal400}40`)}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      />

      {errors[name] && (
        <span className="text-xs" style={{ color: c.error }}>{errors[name]}</span>
      )}
    </div>
  );

  return (
    <div className="space-y-3">
      <Input label="Vehicle Name" name="vehicle" />
      <Input label="Issue / Service" name="issue" />
      <Input label="Date" name="date" type="date" />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase" style={{ color: c.slateText600 }}>
          Notes (optional)
        </label>
        <textarea
          value={form.notes}
          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
          className="w-full rounded-xl px-4 py-2 border text-sm focus:outline-none focus:ring-2 transition"
          style={{ borderColor: c.registryBorder, backgroundColor: c.registryBg, color: c.slateText800 }}
          onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${c.teal400}40`)}
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl font-semibold transition"
          style={{ border: `1px solid ${c.registryBorder}`, color: c.slateText600 }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.registryHeaderBg)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="flex-1 py-2.5 rounded-xl text-white font-semibold transition"
          style={{ backgroundColor: c.teal500 }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.teal600)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.teal500)}
        >
          Create
        </button>
      </div>
    </div>
  );
}
