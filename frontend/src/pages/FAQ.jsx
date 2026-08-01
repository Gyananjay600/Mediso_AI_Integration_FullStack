import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronDown, 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  ArrowRight
} from "lucide-react";
import PageHero from "../components/PageHero";

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "You can easily schedule a consultation through our secure online booking engine on the Contact page. If you require specialized multi-department onboarding or complex diagnostics, please call our clinical front desk directly for priority slot mapping.",
    category: "booking",
    tag: "Instant Action"
  },
  {
    q: "Do you offer virtual consultations?",
    a: "Yes. Mediso provides fully encrypted, HIPAA-compliant telemedicine pathways. You can connect face-to-face with primary physicians and specialists, review laboratory results, and receive electronic pharmacy prescriptions directly inside your patient portal.",
    category: "clinical",
    tag: "Telehealth"
  },
  {
    q: "What insurance plans do you accept?",
    a: "We actively coordinate with over 45 major health insurance networks. Because coverage rules vary widely by treatment and provider group, our dedicated administrative desk will complete pre-authorization paperwork prior to your physical visit.",
    category: "insurance",
    tag: "Verified"
  },
  {
    q: "Can I request a specific doctor?",
    a: "Absolutely. We encourage continuity of care. You can review full profiles, clinical backgrounds, and certified degrees on our Doctors directory and request your preferred specialist during your online booking sequence.",
    category: "booking",
    tag: "Direct Match"
  },
  {
    q: "What should I bring to my first clinical evaluation?",
    a: "Please bring a valid photo identification card, your active insurance physical card, and copies of any recent blood panels, imaging, or pharmaceutical regimens. This helps us construct your medical record immediately.",
    category: "clinical",
    tag: "Checklist"
  },
  {
    q: "How do I handle second opinion reviews?",
    a: "To request a secondary clinical analysis, simply secure a 'Second Opinion' slot with any matching specialist. Our systems will handle the secure intake of your existing diagnostic files from your external provider.",
    category: "insurance",
    tag: "Clinical Peer Review"
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter dynamic FAQ arrays
  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="bg-[#FAF8F2] min-h-screen text-[#1C1A17] selection:bg-[#EAE5D9] overflow-x-hidden pb-24">
      
      {/* 1. Page Hero with luxury visual flow */}
      <div className="relative bg-[#FAF8F5] border-b border-[#ECE6D9] overflow-hidden">
        {/* Soft atmospheric green radial overlays */}
        <div className="absolute top-[-25%] right-[-15%] w-[450px] md:w-[750px] h-[450px] md:h-[750px] rounded-full bg-[#D4E8DD]/20 blur-[130px] mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-[#E3EFE9]/35 blur-[100px] mix-blend-multiply pointer-events-none" />
        
        <PageHero 
          eyebrow="Help Center" 
          title="Frequently Asked Questions" 
          subtitle="Clear, direct information regarding our booking pathways, clinical frameworks, and administrative processes."
        />
      </div>

      {/* 2. Interactive Category Filter Switcher */}
      <div className="container-x mt-12">
        <div className="flex flex-wrap items-center gap-3 border-b border-[#ECE6D9] pb-6">
          <span className="text-xs uppercase tracking-widest text-[#8C8675] flex items-center gap-1.5 mr-2 font-mono">
            <Sparkles size={12} className="text-[#2F6F4F]" /> Group Topics:
          </span>
          {[
            { id: "all", label: "Show All" },
            { id: "booking", label: "Admissions & Booking" },
            { id: "clinical", label: "Clinical & Telehealth" },
            { id: "insurance", label: "Insurance & Admin" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIdx(null); // Close active FAQ on toggle to prevent index mismatches
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.id 
                  ? "bg-[#2F6F4F] text-white shadow-md shadow-[#2F6F4F]/15" 
                  : "bg-white border border-[#E6DEC0] text-[#1C1A17]/70 hover:border-[#2F6F4F] hover:text-[#2F6F4F]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Dual-Column Layout Content Canvas */}
      <section className="container-x py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Accordion Panel (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {filteredFaqs.map((f, i) => {
              const isOpen = openIdx === i;
              return (
                <div 
                  key={f.q} 
                  className={`border border-[#E6DEC0]/85 rounded-[24px] overflow-hidden transition-all duration-300 ${
                    isOpen 
                      ? "bg-white shadow-[0_15px_40px_rgba(47,111,79,0.03)] border-[#2F6F4F]/30" 
                      : "bg-[#FAF8F5] hover:bg-white hover:border-[#2F6F4F]/40"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 md:p-7 text-left focus:outline-none"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                  >
                    <div className="space-y-1.5 pr-4">
                      <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest text-[#2F6F4F] bg-[#E3EFE9]/60 px-2 py-0.5 rounded">
                        {f.tag}
                      </span>
                      <h3 className="font-display font-medium text-sm md:text-base text-[#1C1A17] tracking-tight">
                        {f.q}
                      </h3>
                    </div>
                    <span className={`p-1.5 rounded-full bg-white border border-[#E6DEC0] text-[#2F6F4F] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#2F6F4F] text-white" : ""}`}>
                      <ChevronDown size={14} />
                    </span>
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-52 border-t border-[#E6DEC0]/50" : "max-h-0"
                    }`}
                  >
                    <p className="p-6 md:p-7 text-xs md:text-sm text-[#5C574A] leading-relaxed font-light">
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Premium Help Center Cards (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Instant Assistance Card */}
            <div className="bg-white border border-[#E6DEC0] rounded-[32px] p-8 space-y-6 shadow-sm relative overflow-hidden">
              {/* Micro decoration element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E3EFE9]/45 rounded-bl-[100px] -z-0 pointer-events-none" />
              
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#2F6F4F] flex items-center gap-1.5">
                  <ShieldCheck size={12} /> Live Help desk
                </span>
                <h4 className="font-display font-medium text-lg text-[#1C1A17]">Need Direct Assistance?</h4>
                <p className="text-xs text-[#8C8675] leading-relaxed font-light">
                  If your clinical inquiries or insurance pathways are not addressed above, connect with our care representatives.
                </p>
              </div>

              <div className="space-y-3 relative z-10">
                <a 
                  href="tel:+1800MEDISO" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DEC0]/50 hover:border-[#2F6F4F] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E3EFE9] flex items-center justify-center text-[#2F6F4F] group-hover:bg-[#2F6F4F] group-hover:text-white transition-colors duration-300">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C8675] block">Emergency & Phone Bookings</span>
                    <span className="text-xs font-bold text-[#1C1A17]">+1 (800) MEDISO</span>
                  </div>
                </a>

                <Link 
                  to="/contact" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DEC0]/50 hover:border-[#2F6F4F] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E3EFE9] flex items-center justify-center text-[#2F6F4F] group-hover:bg-[#2F6F4F] group-hover:text-white transition-colors duration-300">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C8675] block">Online Registration</span>
                    <span className="text-xs font-bold text-[#1C1A17] flex items-center gap-1">
                      Direct Secure Intake <ExternalLink size={10} />
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Quick Action Interactive Promo Block */}
            <div className="bg-[#0B1E15] text-[#FAF8F2] rounded-[32px] p-8 space-y-6 shadow-xl relative overflow-hidden group">
              {/* Diagonal backdrop animation sweep */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-[1200ms] ease-out" />
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#4CAF75] font-bold">Priority Care Onboarding</span>
                <h4 className="font-display font-light text-xl leading-snug">
                  Ready to optimize your long-term health metrics?
                </h4>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-between w-full p-4 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-[#0B1E15] font-semibold text-xs tracking-wider uppercase transition-all duration-300"
              >
                <span>Initiate Intake Setup</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}