import { Link } from "react-router-dom";
import { useState } from "react";
import { HeartPulse } from "lucide-react";
import { subscribeNewsletter } from "../lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    setError("");
    try {
      await subscribeNewsletter(email);
      setSubscribed(true);
      setEmail("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <footer className="bg-ink text-cream/80 mt-24">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-2 items-start mb-14 border-b border-white/10 pb-14">
          <div>
            <h3 className="text-2xl font-display font-semibold text-white mb-2">
              Subscribe to our Newsletter
            </h3>
            <p className="text-sm text-cream/60">
              by subscribing you will agree to privacy and policy
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:justify-end">
            <input
              type="email"
              required
              placeholder="Stay up to date"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-primary-light w-full md:w-72"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
        {subscribed && (
          <p className="text-primary-light text-sm -mt-10 mb-10">Thanks for subscribing!</p>
        )}
        {error && (
          <p className="text-red-400 text-sm -mt-10 mb-10">{error}</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-2xl font-display font-bold text-white">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10">
                <HeartPulse size={18} className="text-primary-light" strokeWidth={2.5} />
              </span>
              Mediso
            </Link>
            <p className="text-sm mt-3 text-cream/50">
              Creative healthcare template to launch your site quick and easily
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Static pages</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">CMS Pages</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/doctors" className="hover:text-white">Doctors</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link to="/blogs" className="hover:text-white">Blogs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-white">Login</Link></li>
              <li><Link to="/register" className="hover:text-white">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Utility Pages</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/404" className="hover:text-white">Error 404</Link></li>
              <li><Link to="/contact" className="hover:text-white">Form Submit</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-xs text-cream/40 mt-14">
          &copy; {new Date().getFullYear()} Mediso. All rights reserved. Built as a frontend clone for educational purposes.
        </div>
      </div>
    </footer>
  );
}
