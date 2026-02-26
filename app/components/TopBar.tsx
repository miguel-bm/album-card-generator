import { Link, useLocation } from "react-router";
import SearchBar from "./SearchBar";

// ---------------------------------------------------------------------------
// Nav link data
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { to: "/", label: "Design" },
  { to: "/batch", label: "Batch" },
] as const;

// ---------------------------------------------------------------------------
// TopBar component
// ---------------------------------------------------------------------------

export default function TopBar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center gap-6">
        {/* Left: Brand */}
        <Link
          to="/"
          className="flex-shrink-0 font-semibold text-lg tracking-tight text-text hover:text-text transition-colors duration-150"
        >
          Album Cards
        </Link>

        {/* Center: SearchBar (only on design page) */}
        <div className="flex-1 flex justify-center">
          {location.pathname === "/" && <SearchBar />}
        </div>

        {/* Right: Navigation */}
        <nav className="flex-shrink-0 flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={[
                  "px-3.5 py-1.5 rounded-full text-sm font-medium",
                  "transition-all duration-150",
                  isActive
                    ? "bg-accent text-white"
                    : "text-text-muted hover:text-text hover:bg-accent-soft",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
