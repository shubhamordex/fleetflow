import { useState } from "react";
import { authColors } from "../colors/colors";
import { useNavigate } from "react-router-dom";

const EyeIcon = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {open ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    )}
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
  </svg>
);

export default function LoginPage() {
  const c = authColors;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Developer");
  const [loading, setLoading] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const roles = ["Fleet Managers", "Dispatchers", "Safety Officers", "Financial Analysts"];

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: c.pageBg }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500, height: 500,
          background: `radial-gradient(circle, ${c.ambientCoral} 0%, ${c.transparent} 70%)`,
          top: -140, left: -140, filter: "blur(70px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 420, height: 420,
          background: `radial-gradient(circle, ${c.ambientGreen} 0%, ${c.transparent} 70%)`,
          bottom: -110, right: -110, filter: "blur(65px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          background: `radial-gradient(circle, ${c.ambientBlue} 0%, ${c.transparent} 70%)`,
          top: "42%", right: "18%", filter: "blur(55px)",
        }}
      />


      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md mx-4 rounded-2xl"
        style={{
          background: c.cardBg,
          border: `1px solid ${c.cardBorder}`,
          backdropFilter: "blur(24px)",
          boxShadow: `0 40px 100px ${c.cardShadow}, 0 0 0 1px ${c.cardInsetBorder}`,
          padding: "44px 40px",
        }}
      >
        {/* Brand header */}
        <div className="flex flex-col items-center mb-6">
          {/* Coral ring logo */}
          <div className="relative mb-3">
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 54, height: 54,
                border: `2.5px solid ${c.logoRing}`,
                boxShadow: `0 0 20px ${c.logoGlow}, inset 0 0 12px ${c.logoInsetGlow}`,
              }}
            >
            <i className="fa-regular fa-user text-white text-2xl"></i>
            </div>
          </div>
          <h1
            className="text-white font-bold tracking-tight text-xl"
            style={{ letterSpacing: "-0.4px" }}
          >
            FleetFlow
          </h1>
        </div>

        {/* Role selector */}
        <div className="mb-6">
          <label
            className="block text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: c.roleAccent, letterSpacing: "0.18em" }}
          >
            Role
          </label>
          <div className="flex gap-2 flex-wrap">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: role === r ? c.roleActiveBg : c.inputBg,
                  border: role === r ? `1px solid ${c.roleActiveBorder}` : `1px solid ${c.cardBorder}`,
                  color: role === r ? c.roleAccent : c.neutral500,
                  boxShadow: role === r ? `0 0 14px ${c.roleActiveShadow}` : "none",
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username field */}
          <div>
            <label
              className="block text-xs font-medium uppercase tracking-widest mb-2"
              style={{ color: c.neutral400, letterSpacing: "0.13em" }}
            >
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => setUsernameFocused(false)}
                className="w-full text-white placeholder-gray-600 outline-none transition-all duration-300 rounded-xl"
                style={{
                  background: c.inputBg,
                  border: usernameFocused
                    ? `1px solid ${c.inputBorderFocus}`
                    : `1px solid ${c.inputBorder}`,
                  padding: "13px 44px 13px 16px",
                  fontSize: "14.5px",
                  boxShadow: usernameFocused
                    ? `0 0 0 3px ${c.inputFocusRing}`
                    : `inset 0 1px 3px ${c.inputInsetShadow}`,
                }}
              />
              {username && (
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{ background: c.success, boxShadow: `0 0 7px ${c.success}` }}
                />
              )}
            </div>
          </div>

          {/* Password field */}
          <div>
            <label
              className="block text-xs font-medium uppercase tracking-widest mb-2"
              style={{ color: c.neutral400, letterSpacing: "0.13em" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full text-white placeholder-gray-600 outline-none transition-all duration-300 rounded-xl pr-12"
                style={{
                  background: c.inputBg,
                  border: passwordFocused
                    ? `1px solid ${c.inputBorderFocus}`
                    : `1px solid ${c.inputBorder}`,
                  padding: "13px 48px 13px 16px",
                  fontSize: "14.5px",
                  boxShadow: passwordFocused
                    ? `0 0 0 3px ${c.inputFocusRing}`
                    : `inset 0 1px 3px ${c.inputInsetShadow}`,
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                style={{ color: c.neutral600, background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = c.neutral400)}
                onMouseLeave={(e) => (e.currentTarget.style.color = c.neutral600)}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
              style={{
                background: c.errorBg,
                border: `1px solid ${c.errorBorder}`,
                color: c.error,
              }}
            >
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between pt-1">
            <label
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setRemember(!remember)}
            >
              <div
                className="w-4 h-4 rounded flex items-center justify-center transition-all duration-200"
                style={{
                  background: remember ? c.successBgStrong : c.inputBg,
                  border: remember ? `1px solid ${c.success}` : `1px solid ${c.inputBorder}`,
                }}
              >
                {remember && (
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke={c.success} strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-xs" style={{ color: c.neutral500 }}>Remember me</span>
            </label>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 mt-1"
            style={{
              background: c.successBg,
              border: `1.5px solid ${c.successBorder}`,
              padding: "14px",
              color: c.success,
              fontSize: "15px",
              letterSpacing: "0.02em",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: `0 0 24px ${c.successGlow}`,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = c.successBgHover;
                e.currentTarget.style.boxShadow = `0 0 36px ${c.successGlowHover}`;
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = c.successBg;
                e.currentTarget.style.boxShadow = `0 0 24px ${c.successGlow}`;
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {loading ? (
              <>
                <SpinnerIcon />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: c.divider }} />
        </div>

        {/* Sign up */}
        <p className="text-center text-xs mt-6" style={{ color: c.gray }}>
          Don&apos;t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="transition-colors duration-200"
            style={{ color: c.roleAccent, background: "none", border: "none", cursor: "pointer", fontSize: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = c.roleAccentHover)}
            onMouseLeave={(e) => (e.currentTarget.style.color = c.roleAccent)}
          >
            Sign up
          </button>
        </p>

      </div>
    </div>
  );
}