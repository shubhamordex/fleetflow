import { useState } from "react";
import { authColors } from "../colors/colors";

export default function VehicleForm({ onSave, onCancel }) {
  const c = authColors;
  const [form, setForm] = useState({
    plate: "",
    capacity: "",
    odometer: "",
    type: "",
    model: "",
    status: "Idle",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.plate.trim()) e.plate = "License plate required";
    if (!form.capacity.trim()) e.capacity = "Payload required";
    if (!form.odometer || isNaN(form.odometer))
      e.odometer = "Valid odometer required";
    if (!form.type.trim()) e.type = "Type required";
    if (!form.model.trim()) e.model = "Model required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    onSave({
      plate: form.plate,
      capacity: form.capacity,
      odometer: parseInt(form.odometer),
      type: form.type,
      model: form.model,
      status: form.status,
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
        onChange={(e) =>
          setForm((p) => ({ ...p, [name]: e.target.value }))
        }
        style={{
          borderColor: errors[name] ? c.error : c.registryBorder,
          backgroundColor: errors[name] ? c.errorBg : c.registryBg,
          color: c.slateText800
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
      <Input label="License Plate" name="plate" />
      <Input label="Max Payload" name="capacity" />
      <Input label="Odometer" name="odometer" type="number" />
      <Input label="Vehicle Type" name="type" />
      <Input label="Model / Make" name="model" />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase" style={{ color: c.slateText600 }}>
          Status
        </label>
        <select
          value={form.status}
          onChange={(e) =>
            setForm((p) => ({ ...p, status: e.target.value }))
          }
          style={{
            borderColor: c.registryBorder,
            backgroundColor: c.registryBg,
            color: c.slateText800
          }}
          className="w-full mt-1 rounded-xl px-4 py-2 border focus:outline-none focus:ring-2 transition"
          onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${c.teal400}40`)}
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <option>Idle</option>
          <option>Active</option>
          <option>Maintenance</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl font-semibold transition"
          style={{ borderColor: c.registryBorder, border: `1px solid ${c.registryBorder}`, color: c.slateText600 }}
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
          Register Vehicle
        </button>
      </div>
    </div>
  );
}