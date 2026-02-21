import { useState } from "react";
import { authColors } from "../colors/colors";
import { useNavigate } from "react-router-dom";

const EyeIcon = ({ open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {open ? (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </>
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    )}
  </svg>
);

export default function SignUp() {
  const c = authColors;
  const navigate = useNavigate();
  const roles = ["Fleet Managers", "Dispatchers", "Safety Officers", "Financial Analysts"];
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    role: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!form.fullname.trim()) {
      newErrors.fullname = "Please enter your full name.";
    }

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!form.role) {
      newErrors.role = "Please select a role.";
    }

    if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (form.confirm !== form.password) {
      newErrors.confirm = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: c.pageBg }}>
        <div
          className="rounded-2xl p-10 text-center w-full max-w-md"
          style={{
            background: c.cardBg,
            border: `1px solid ${c.cardBorder}`,
            backdropFilter: "blur(24px)",
            boxShadow: `0 40px 100px ${c.cardShadow}, 0 0 0 1px ${c.cardInsetBorder}`,
          }}
        >
          <div
            className="w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4"
            style={{ background: c.successBadgeBg, border: `1px solid ${c.successBadgeBorder}` }}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke={c.successBadgeIcon}
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif mb-2 text-white">You're all set!</h2>
          <p style={{ color: c.neutral400 }}>Account created successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: c.pageBg }}>
      <div
        className="rounded-3xl p-6 md:p-7 w-full max-w-sm"
        style={{
          background: c.cardBg,
          border: `1px solid ${c.cardBorder}`,
          backdropFilter: "blur(24px)",
          boxShadow: `0 40px 100px ${c.cardShadow}, 0 0 0 1px ${c.cardInsetBorder}`,
        }}
      >
        
        <div className="flex flex-col items-center mb-5">
          <div className="relative mb-2">
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 46,
                height: 46,
                border: `2.5px solid ${c.logoRing}`,
                boxShadow: `0 0 20px ${c.logoGlow}, inset 0 0 12px ${c.logoInsetGlow}`,
              }}
            >
              <i className="fa-regular fa-user text-white text-xl"></i>
            </div>
          </div>
          <h1 className="text-2xl font-serif mb-1 text-white">Create Account</h1>
          <p className="text-xs text-center" style={{ color: c.neutral400 }}>
            Fill in the details below to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">

          {/* Full Name */}
          <div>
            <label className="text-xs font-medium" style={{ color: c.neutral400 }}>Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="Jane Doe"
              value={form.fullname}
              onChange={handleChange}
              className={`w-full mt-1 p-2.5 rounded-lg border text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 ${
                errors.fullname ? "border-red-500" : "border-white/10"
              }`}
              style={{ background: c.inputBg, "--tw-ring-color": c.roleAccent }}
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium" style={{ color: c.neutral400 }}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              className={`w-full mt-1 p-2.5 rounded-lg border text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "border-white/10"
              }`}
              style={{ background: c.inputBg, "--tw-ring-color": c.roleAccent }}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="text-xs font-medium" style={{ color: c.neutral400 }}>Role</label>
            <div className="flex gap-2 flex-wrap mt-2">
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setForm({ ...form, role: r });
                    setErrors({ ...errors, role: "" });
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    background: form.role === r ? c.roleActiveBg : c.inputBg,
                    border: form.role === r ? `1px solid ${c.roleActiveBorder}` : `1px solid ${c.cardBorder}`,
                    color: form.role === r ? c.roleAccent : c.neutral500,
                    boxShadow: form.role === r ? `0 0 14px ${c.roleActiveShadow}` : "none",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-medium" style={{ color: c.neutral400 }}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={handleChange}
                className={`w-full mt-1 p-2.5 rounded-lg border text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500" : "border-white/10"
                }`}
                style={{ background: c.inputBg, "--tw-ring-color": c.roleAccent }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 transition-colors"
                style={{ color: c.neutral500 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = c.neutral400)}
                onMouseLeave={(e) => (e.currentTarget.style.color = c.neutral500)}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs font-medium" style={{ color: c.neutral400 }}>Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm"
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={handleChange}
                className={`w-full mt-1 p-2.5 rounded-lg border text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 ${
                  errors.confirm ? "border-red-500" : "border-white/10"
                }`}
                style={{ background: c.inputBg, "--tw-ring-color": c.roleAccent }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3.5 transition-colors"
                style={{ color: c.neutral500 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = c.neutral400)}
                onMouseLeave={(e) => (e.currentTarget.style.color = c.neutral500)}
              >
                <EyeIcon open={showConfirm} />
              </button>
            </div>
            {errors.confirm && (
              <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition"
            style={{
              background: c.successBg,
              border: `1.5px solid ${c.successBorder}`,
              color: c.success,
              boxShadow: `0 0 24px ${c.successGlow}`,
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}