import { useState } from "react";
import { authColors } from "../colors/colors";

export default function NewExpenseForm({ onSave, onCancel }) {
  const c = authColors;

  const [form, setForm] = useState({
    tripId: "",
    driver: "",
    fuelCost: "",
    miscExpense: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.tripId.trim()) e.tripId = "Trip ID required";
    if (!form.driver.trim()) e.driver = "Driver required";
    if (!form.fuelCost || isNaN(form.fuelCost)) e.fuelCost = "Valid fuel cost required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    onSave({
      tripId: form.tripId,
      driver: form.driver,
      fuelCost: parseFloat(form.fuelCost),
      miscExpense: form.miscExpense,
    });
  };

  const Input = ({ label, name, type = "text" }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase" style={{ color: c.slateText600 }}>{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
        style={{ borderColor: errors[name] ? c.error : c.registryBorder, backgroundColor: errors[name] ? c.errorBg : c.registryBg, color: c.slateText800 }}
        className="w-full rounded-xl px-4 py-2 border text-sm focus:outline-none focus:ring-2 transition"
        onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${c.teal400}40`)}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      />
      {errors[name] && <span className="text-xs" style={{ color: c.error }}>{errors[name]}</span>}
    </div>
  );

  return (
    <div className="space-y-3">
      <Input label="Trip ID" name="tripId" />
      <Input label="Driver" name="driver" />
      <Input label="Fuel Cost" name="fuelCost" type="number" />
      <Input label="Misc Expense" name="miscExpense" />

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
