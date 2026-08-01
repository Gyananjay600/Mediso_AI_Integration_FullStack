import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Activity } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate short premium transition delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      const result = await login(form);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-[#F8F6F0] text-[#0B1E15] font-sans selection:bg-[#2D6A4F]/20 overflow-hidden">
      
      {/* --- Left Immersive Column: Deep Forest Green (Large Screens Only) --- */}
      <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 bg-[#0B1E15] overflow-hidden text-[#F8F6F0]">
        {/* Soft, slowly drifting organic ambient glow */}
        <div className="absolute top-1/4 -left-20 w-[350px] h-[350px] rounded-full bg-[#2D6A4F]/10 blur-[100px] animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-1/4 -right-20 w-[250px] h-[250px] rounded-full bg-[#3D8B5B]/10 blur-[90px] animate-pulse duration-[6000ms]" />

        {/* Header/Logo */}
        <Link to="/" className="relative flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-[#F8F6F0] hover:opacity-90 transition-opacity">
          <div className="h-9 w-9 rounded-full bg-[#2D6A4F]/20 border border-[#2D6A4F]/30 flex items-center justify-center">
            <Activity size={18} className="text-[#3D8B5B]" />
          </div>
          Mediso
        </Link>

        {/* Feature Promo Copy */}
        <div className="relative space-y-6 max-w-sm z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/20 border border-[#2D6A4F]/30 text-xs text-[#4CAF75] font-medium tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4CAF75] animate-ping" />
            Secure Patient Portal
          </div>
          <h2 className="text-4xl font-semibold tracking-tight leading-[1.15]">
            Simplifying <br />
            your healthcare <br />
            <span className="text-[#4CAF75] italic font-serif">journey.</span>
          </h2>
          <p className="text-[#F8F6F0]/60 text-sm leading-relaxed">
            Log in to safely review your clinical details, manage upcoming doctor visits, and check your digital care dashboard.
          </p>
        </div>

        {/* Footer */}
        <p className="relative text-xs text-[#F8F6F0]/30 z-10">
          &copy; {new Date().getFullYear()} Mediso Inc. Crafted for modern medical experiences.
        </p>
      </div>

      {/* --- Right Form Column: Warm Off-White Sand --- */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center py-16 px-6 sm:px-12 md:px-24 relative">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header Block */}
          <div className="text-center lg:text-left space-y-2">
            <div className="lg:hidden flex justify-center mb-6">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-[#0B1E15]">
                <div className="h-8 w-8 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center">
                  <Activity size={16} className="text-[#2D6A4F]" />
                </div>
                Mediso
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0B1E15]">Welcome back</h1>
            <p className="text-[#0B1E15]/60 text-sm">Please log in to manage your medical appointments</p>
          </div>

          {/* Form container with very soft natural card styling */}
          <form onSubmit={handleSubmit} className="bg-white border border-[#0B1E15]/5 rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(11,30,21,0.02)] space-y-5 transition-transform duration-500 hover:shadow-[0_20px_40px_rgb(11,30,21,0.04)]">
            {error && (
              <div className="bg-[#FFECEB] text-[#D32F2F] text-xs px-4 py-3.5 rounded-xl border border-[#FFDAD8] animate-[shake_0.4s_ease-in-out]">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-1.5 group">
              <label className="block text-xs font-bold text-[#0B1E15]/50 uppercase tracking-wider group-focus-within:text-[#2D6A4F] transition-colors duration-200">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1E15]/30 group-focus-within:text-[#2D6A4F] transition-colors duration-200">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-[#F8F6F0]/50 border border-[#0B1E15]/10 focus:border-[#2D6A4F] focus:bg-white text-[#0B1E15] rounded-xl py-3.5 pl-12 pr-4 outline-none transition-all duration-300 placeholder:text-[#0B1E15]/30 focus:ring-4 focus:ring-[#2D6A4F]/5"
                  placeholder="yournam@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5 group">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-[#0B1E15]/50 uppercase tracking-wider group-focus-within:text-[#2D6A4F] transition-colors duration-200">
                  Password
                </label>
                <a href="#forgot" className="text-xs text-[#2D6A4F] hover:text-[#1e4835] font-semibold transition-colors">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1E15]/30 group-focus-within:text-[#2D6A4F] transition-colors duration-200">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-[#F8F6F0]/50 border border-[#0B1E15]/10 focus:border-[#2D6A4F] focus:bg-white text-[#0B1E15] rounded-xl py-3.5 pl-12 pr-12 outline-none transition-all duration-300 placeholder:text-[#0B1E15]/30 focus:ring-4 focus:ring-[#2D6A4F]/5"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0B1E15]/40 hover:text-[#0B1E15] transition-colors duration-200 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Premium Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden bg-[#2D6A4F] hover:bg-[#1E4835] text-white font-semibold rounded-xl py-4 transition-all duration-300 shadow-md shadow-[#2D6A4F]/10 hover:shadow-[#2D6A4F]/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-[#F8F6F0] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Log In
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Footer Registration Link */}
          <p className="text-center text-sm text-[#0B1E15]/50">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#2D6A4F] font-bold hover:text-[#1E4835] transition-colors duration-200 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}