import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useAuth } from "../context/AuthContext";
import { submitContact } from "../lib/api";
import { 
  User, 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function Contact() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const subjects = ["General Inquiry", "Appointment Help", "Billing & Insurance", "Technical Support"];
  const [activeSubject, setActiveSubject] = useState("General Inquiry");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    message: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await submitContact({ ...form, subject: activeSubject });
      navigate("/form-submit", { state: { aiNote: result.aiNote } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-[#F8F6F0] min-h-screen text-[#0B1E15] selection:bg-[#2D6A4F]/20 pb-24 relative overflow-hidden">
      {/* Soft floating background design elements */}
      <div className="absolute top-1/3 left-[-10%] w-[400px] h-[400px] rounded-full bg-[#2D6A4F]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[350px] h-[350px] rounded-full bg-[#3D8B5B]/5 blur-[100px] pointer-events-none" />

      <PageHero
        eyebrow="Connect with Mediso"
        title="We are here to support your path to wellness."
        subtitle="Submit the request form below and our specialized clinical concierge team will reach out within 2 hours."
      />

      <section className="container-x max-w-6xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- Left Column: Context & Metadata (4 cols) --- */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">
                <Sparkles size={12} /> Response Guarantee
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#0B1E15]">
                Direct channel to your medical team.
              </h2>
              <p className="text-[#0B1E15]/60 text-sm leading-relaxed">
                Whether you need assistance rescheduling a specialist consultation or clarifying billing items, we facilitate premium support.
              </p>
            </div>

            {/* Quick Interactive Info Cards */}
            <div className="space-y-4 pt-4">
              
              {/* Emergency / Hotline Card */}
              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-[#0B1E15]/5 shadow-[0_4px_20px_rgba(11,30,21,0.01)] hover:-translate-y-1 transition-all duration-300">
                <div className="h-10 w-10 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#2D6A4F]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0B1E15]">Premium Priority Line</h4>
                  <p className="text-xs text-[#0B1E15]/60 mt-0.5">1-800-MEDISO-PLUS</p>
                  <p className="text-[10px] text-[#2D6A4F] font-semibold mt-1">Free 24/7 patient line</p>
                </div>
              </div>

              {/* Clinic Location Card */}
              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-[#0B1E15]/5 shadow-[0_4px_20px_rgba(11,30,21,0.01)] hover:-translate-y-1 transition-all duration-300">
                <div className="h-10 w-10 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#2D6A4F]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0B1E15]">Central Headquarters</h4>
                  <p className="text-xs text-[#0B1E15]/60 mt-0.5">742 Evergreen Terrace, New York, NY</p>
                  <p className="text-[10px] text-[#0B1E15]/40 mt-1">Walk-ins welcome (Mon - Sat)</p>
                </div>
              </div>

              {/* Availability Hours */}
              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-[#0B1E15]/5 shadow-[0_4px_20px_rgba(11,30,21,0.01)] hover:-translate-y-1 transition-all duration-300">
                <div className="h-10 w-10 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-[#2D6A4F]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0B1E15]">Clinical Response Hours</h4>
                  <p className="text-xs text-[#0B1E15]/60 mt-0.5">Daily: 8:00 AM – 9:00 PM EST</p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#4CAF75] font-semibold mt-1 bg-[#4CAF75]/10 px-2 py-0.5 rounded-full">
                    ● Operators Online
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* --- Right Column: Interactive Premium Form (7 cols) --- */}
          <div className="lg:col-span-7">
            <form 
              onSubmit={handleSubmit} 
              className="bg-white border border-[#0B1E15]/5 rounded-3xl p-6 sm:p-10 shadow-[0_12px_40px_rgba(11,30,21,0.03)] hover:shadow-[0_24px_50px_rgba(11,30,21,0.05)] transition-all duration-500 space-y-6"
            >
              
              {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Pre-authenticated User Banner */}
              {user && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#2D6A4F]/5 border border-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-semibold">
                  <CheckCircle2 size={15} />
                  <span>Verified Account: Logged in as <span className="underline">{user.name}</span></span>
                </div>
              )}

              {/* Dynamic Pill Category Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#0B1E15]/50 uppercase tracking-wider">
                  Inquiry Topic
                </label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => setActiveSubject(subj)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all duration-300 outline-none select-none ${
                        activeSubject === subj
                          ? "bg-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/10 scale-[1.03]"
                          : "bg-[#F8F6F0] hover:bg-[#EAE7DF] text-[#0B1E15]"
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-[#0B1E15]/5" />

              {/* Interactive Fields Grid */}
              <div className="grid md:grid-cols-2 gap-5">
                
                {/* Name Input */}
                <div className="space-y-1.5 group">
                  <label className="block text-xs font-bold text-[#0B1E15]/50 uppercase tracking-wider group-focus-within:text-[#2D6A4F] transition-colors">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1E15]/30 group-focus-within:text-[#2D6A4F] transition-colors">
                      <User size={18} />
                    </span>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-[#F8F6F0]/50 border border-[#0B1E15]/10 focus:border-[#2D6A4F] focus:bg-white text-[#0B1E15] rounded-xl py-3.5 pl-12 pr-4 outline-none transition-all duration-300 placeholder:text-[#0B1E15]/30 focus:ring-4 focus:ring-[#2D6A4F]/5"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-1.5 group">
                  <label className="block text-xs font-bold text-[#0B1E15]/50 uppercase tracking-wider group-focus-within:text-[#2D6A4F] transition-colors">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1E15]/30 group-focus-within:text-[#2D6A4F] transition-colors">
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-[#F8F6F0]/50 border border-[#0B1E15]/10 focus:border-[#2D6A4F] focus:bg-white text-[#0B1E15] rounded-xl py-3.5 pl-12 pr-4 outline-none transition-all duration-300 placeholder:text-[#0B1E15]/30 focus:ring-4 focus:ring-[#2D6A4F]/5"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

              </div>

              {/* Message Box Input */}
              <div className="space-y-1.5 group">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-[#0B1E15]/50 uppercase tracking-wider group-focus-within:text-[#2D6A4F] transition-colors">
                    Your Message
                  </label>
                  <span className="text-[10px] text-[#0B1E15]/40 font-semibold">
                    {form.message.length} / 500 characters
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-5 text-[#0B1E15]/30 group-focus-within:text-[#2D6A4F] transition-colors">
                    <MessageSquare size={18} />
                  </span>
                  <textarea
                    name="message"
                    required
                    maxLength={500}
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-[#F8F6F0]/50 border border-[#0B1E15]/10 focus:border-[#2D6A4F] focus:bg-white text-[#0B1E15] rounded-xl py-4 pl-12 pr-4 outline-none transition-all duration-300 placeholder:text-[#0B1E15]/30 focus:ring-4 focus:ring-[#2D6A4F]/5 resize-none"
                    placeholder="Describe how we can assist you..."
                  />
                </div>
              </div>

              {/* Premium Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group overflow-hidden bg-[#2D6A4F] hover:bg-[#1E4835] text-white font-semibold rounded-xl py-4 transition-all duration-300 shadow-md shadow-[#2D6A4F]/10 hover:shadow-[#2D6A4F]/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-[#F8F6F0] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Submit Message
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </section>
    </div>
  );
}