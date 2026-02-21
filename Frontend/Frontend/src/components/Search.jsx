import { authColors } from "../colors/colors";

const Search = ({ value, onChange, placeholder = "Search...", buttonLabel, setShowModal}) => {
  const c = authColors;
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 px-8 py-6" style={{ borderBottom: `1px solid ${c.registryBorder}`, backgroundColor: c.registryHeaderBg }}>|
    <div className="relative flex-1">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={{ color: c.slateText400 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-3 text-sm rounded-xl focus:outline-none transition"
        style={{ 
          borderColor: c.registryBorder,
          border: `1px solid ${c.registryBorder}`,
          backgroundColor: c.white,
          color: c.slateText800
        }}
        onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${c.teal400}40`)}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      />
    </div>
    <div className="flex gap-3 w-full sm:w-auto">
            {["Group by", "Filter", "Sort by"].map(label => (
              <button key={label} className="text-xs px-4 py-2.5 rounded-lg transition font-medium flex-1 sm:flex-none" 
                style={{ 
                  borderColor: c.registryBorder,
                  border: `1px solid ${c.registryBorder}`,
                  backgroundColor: c.white,
                  color: c.slateText600
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.registryHeaderBg)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.white)}>
                {label}
              </button>
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="text-xs px-5 py-2.5 rounded-lg text-white font-semibold active:scale-95 transition shadow-sm flex items-center gap-2 flex-1 sm:flex-none justify-center sm:justify-start"
              style={{ 
                backgroundColor: c.teal500,
                color: c.white
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.teal600)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = c.teal500)}>
              <span className="text-base leading-none">+</span> {buttonLabel}
            </button>
          </div>
       </div>
  );
};

export default Search;