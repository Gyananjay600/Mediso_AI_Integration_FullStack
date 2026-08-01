import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Star, HeartPulse } from "lucide-react";
import { navLinks } from "../data/content";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-black/5">
      <div className="container-x flex items-center justify-between h-20">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-2xl font-bold text-ink"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
            <HeartPulse size={20} className="text-primary" strokeWidth={2.5} />
          </span>
          Mediso
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-ink/70 hover:text-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-ink/70 mr-2">
            <Star size={16} className="fill-primary text-primary" />
            <span>4.7 | 3,460 Reviews</span>
          </div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-ink/80 flex items-center gap-1">
                <User size={16} /> {user.name}
              </span>
              <button onClick={handleLogout} className="btn-outline !px-4 !py-2 text-sm">
                <LogOut size={15} /> Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-outline !px-4 !py-2 text-sm">
                Login
              </Link>
              <Link to="/contact" className="btn-primary !px-4 !py-2 text-sm">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-cream border-t border-black/5">
          <div className="container-x py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="text-ink/80 font-medium"
              >
                {link.label}
              </NavLink>
            ))}
            <hr className="border-black/10" />
            {user ? (
              <>
                <span className="text-ink/80 flex items-center gap-2">
                  <User size={16} /> {user.name}
                </span>
                <button onClick={handleLogout} className="btn-outline w-full">
                  <LogOut size={15} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="btn-outline w-full">
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
