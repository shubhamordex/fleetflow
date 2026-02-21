import { useState } from "react";

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
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#f7f5f2" }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(240,100,80,0.16) 0%, transparent 70%)",
          top: -140, left: -140, filter: "blur(70px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 420, height: 420,
          background: "radial-gradient(circle, rgba(70,200,130,0.10) 0%, transparent 70%)",
          bottom: -110, right: -110, filter: "blur(65px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(100,110,255,0.09) 0%, transparent 70%)",
          top: "42%", right: "18%", filter: "blur(55px)",
        }}
      />


      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md mx-4 rounded-2xl"
        style={{
          background: "rgba(18, 24, 33, 0.88)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03)",
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
                border: "2.5px solid #e07060",
                boxShadow: "0 0 20px rgba(224,112,96,0.4), inset 0 0 12px rgba(224,112,96,0.05)",
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
            style={{ color: "#64b5f6", letterSpacing: "0.18em" }}
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
                  background: role === r ? "rgba(100,181,246,0.15)" : "rgba(255,255,255,0.04)",
                  border: role === r ? "1px solid rgba(100,181,246,0.55)" : "1px solid rgba(255,255,255,0.07)",
                  color: role === r ? "#64b5f6" : "#6b7280",
                  boxShadow: role === r ? "0 0 14px rgba(100,181,246,0.18)" : "none",
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
              style={{ color: "#9ca3af", letterSpacing: "0.13em" }}
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
                  background: "rgba(255,255,255,0.04)",
                  border: usernameFocused
                    ? "1px solid rgba(255,255,255,0.3)"
                    : "1px solid rgba(255,255,255,0.09)",
                  padding: "13px 44px 13px 16px",
                  fontSize: "14.5px",
                  boxShadow: usernameFocused
                    ? "0 0 0 3px rgba(255,255,255,0.04)"
                    : "inset 0 1px 3px rgba(0,0,0,0.25)",
                }}
              />
              {username && (
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{ background: "#4ade80", boxShadow: "0 0 7px #4ade80" }}
                />
              )}
            </div>
          </div>

          {/* Password field */}
          <div>
            <label
              className="block text-xs font-medium uppercase tracking-widest mb-2"
              style={{ color: "#9ca3af", letterSpacing: "0.13em" }}
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
                  background: "rgba(255,255,255,0.04)",
                  border: passwordFocused
                    ? "1px solid rgba(255,255,255,0.3)"
                    : "1px solid rgba(255,255,255,0.09)",
                  padding: "13px 48px 13px 16px",
                  fontSize: "14.5px",
                  boxShadow: passwordFocused
                    ? "0 0 0 3px rgba(255,255,255,0.04)"
                    : "inset 0 1px 3px rgba(0,0,0,0.25)",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                style={{ color: "#4b5563", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#9ca3af")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
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
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.22)",
                color: "#f87171",
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
                  background: remember ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.05)",
                  border: remember ? "1px solid #4ade80" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {remember && (
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-xs" style={{ color: "#6b7280" }}>Remember me</span>
            </label>
            <button
              type="button"
              className="text-xs transition-colors duration-200"
              style={{ color: "#64b5f6", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#93c5fd")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64b5f6")}
            >
              Forgot password?
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 mt-1"
            style={{
              background: "rgba(74,222,128,0.10)",
              border: "1.5px solid rgba(74,222,128,0.45)",
              padding: "14px",
              color: "#4ade80",
              fontSize: "15px",
              letterSpacing: "0.02em",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 0 24px rgba(74,222,128,0.12)",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "rgba(74,222,128,0.18)";
                e.currentTarget.style.boxShadow = "0 0 36px rgba(74,222,128,0.22)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "rgba(74,222,128,0.10)";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(74,222,128,0.12)";
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
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Sign up */}
        <p className="text-center text-xs mt-6" style={{ color: "gray" }}>
          Don&apos;t have an account?{" "}
          <button
            className="transition-colors duration-200"
            style={{ color: "#64b5f6", background: "none", border: "none", cursor: "pointer", fontSize: "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#93c5fd")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64b5f6")}
          >
            Sign up
          </button>
        </p>

      </div>
    </div>
  );
}