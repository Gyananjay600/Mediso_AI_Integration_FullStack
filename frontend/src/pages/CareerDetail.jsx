import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, IndianRupee, Send, ShieldCheck, HelpCircle, CheckCircle2 } from "lucide-react";
import { submitCareerApplication } from "../lib/api";

// Synchronized with the expanded list of 6 premium openings
const openings = {
  "senior-physical-therapist": {
    title: "Senior Consultant Physical Therapist",
    type: "Full-time",
    department: "Clinical",
    location: "Chanakyapuri, New Delhi",
    salary: "₹12,00,000 – ₹16,50,000 / yr",
    desc: "Lead clinical rehabilitation strategies for high-recovery pathways, sports injuries, and advanced physical therapy programs using state-of-the-art diagnostic protocols.",
    responsibilities: [
      "Design and implement individualized, evidence-based therapy regimens for patients.",
      "Utilize advanced diagnostic and therapeutic clinical machinery with precise standards.",
      "Collaborate with referring orthopedicians and neuro-consultants across regional medical hubs.",
      "Mentor and guide junior physical therapists and rehabilitation interns.",
    ],
    requirements: [
      "Master of Physiotherapy (MPT) in Orthopedics, Sports, or Neurological sciences.",
      "4+ years of clinical experience in an accredited medical facility or premium wellness clinic.",
      "Strong documentation skills keeping with NABL-level healthcare protocols.",
    ]
  },
  "critical-care-nurse": {
    title: "Critical Care Nurse Specialist",
    type: "Full-time",
    department: "Clinical",
    location: "Indiranagar, Bengaluru",
    salary: "₹8,50,000 – ₹12,00,000 / yr",
    desc: "Deliver intensive nursing care, clinical support, and diagnostic preparation for acute, post-operative, and emergency medical treatments.",
    responsibilities: [
      "Monitor, assess, and manage critical care patients in specialized post-op suites.",
      "Administer intravenous lines, direct medications, and clinical support as prescribed.",
      "Maintain high sterile environments conforming strictly to internal and national health standards.",
      "Counsel families and provide direct emotional and physical support programs.",
    ],
    requirements: [
      "B.Sc. Nursing or Post Basic B.Sc Nursing with Critical Care Nursing registration.",
      "2+ years of continuous clinical practice in a premium hospital or private clinic set up.",
      "Calm composure under high pressure with immaculate diagnostic interpretation.",
    ]
  },
  "osteopath-consultant": {
    title: "Consultant Osteopath & Chiropractor",
    type: "Consultant / Part-time",
    department: "Clinical",
    location: "Bandra West, Mumbai",
    salary: "₹1,500 – ₹2,500 / hr",
    desc: "Bring exceptional neuromuscular adjustments and alignment practices directly to our elite athletic and outpatient cohorts in Bandra West.",
    responsibilities: [
      "Perform holistic assessments of musculo-skeletal systems and alignments.",
      "Conduct specialized osteopathic sessions, deep adjustments, and manual alignment therapy.",
      "Design personalized physical conditioning blueprints to prevent repetitive stress injuries.",
    ],
    requirements: [
      "Certified Osteopath / Chiropractor credentialed by a recognized international or national body.",
      "5+ years practicing with high-performance athletes or premium private client bases.",
    ]
  },
  "patient-relations-manager": {
    title: "VIP Patient Relations Manager",
    type: "Full-time",
    department: "Administration",
    location: "Jubilee Hills, Hyderabad",
    salary: "₹6,00,000 – ₹8,50,000 / yr",
    desc: "Deliver five-star luxury hospitality management and smooth operational pathways for VIP patients accessing therapeutic programs.",
    responsibilities: [
      "Serve as the exclusive, dedicated concierge for VIP patients, managing scheduling, updates, and feedback.",
      "Supervise daily outpatient reception protocols to ensure zero-wait delays.",
      "Handle billing configurations, private healthcare claims, and post-discharge feedback cycles.",
    ],
    requirements: [
      "Degree in Healthcare Administration, Hospitality, or Luxury PR Management.",
      "3+ years of experience within premium hotel chains, luxury travel, or high-tier clinical hospitality.",
      "Impeccable communication, etiquette, and conflict-resolution abilities.",
    ]
  },
  "clinic-administrator": {
    title: "Chief Clinic Administrator",
    type: "Full-time",
    department: "Administration",
    location: "Chanakyapuri, New Delhi",
    salary: "₹10,00,000 – ₹14,00,000 / yr",
    desc: "Oversee operational workflow, logistics, standard conformity, and financial balances of our premium clinical spaces.",
    responsibilities: [
      "Optimize administrative workflows, staff scheduling, and coordinate clinic logistics.",
      "Maintain strict financial records, resource supplies, and equipment lifecycles.",
      "Lead clinical audits ensuring perfect compliance with regulatory norms.",
    ],
    requirements: [
      "MBA in Healthcare Management or equivalent specialized administrative degree.",
      "5+ years of clinical administration experience managing diverse paramedic cohorts.",
    ]
  },
  "rehabilitation-assistant": {
    title: "Rehabilitation & Sports Assistant",
    type: "Full-time",
    department: "Allied Health",
    location: "Indiranagar, Bengaluru",
    salary: "₹5,00,000 – ₹7,50,000 / yr",
    desc: "Assist senior physical therapists in staging recovery drills, maintaining clinical tools, and providing direct patient care.",
    responsibilities: [
      "Prepare treatment zones, clinical layouts, and thermal/electrical therapy instruments.",
      "Guide patients through basic mobility drills, stretching, and prescribed exercises.",
      "Track patient session timelines and update daily activity cards.",
    ],
    requirements: [
      "Bachelor of Physiotherapy (BPT) graduate or diploma holder in physical therapy.",
      "Entry-level candidates with excellent energetic drive and coachable mindset are highly welcome.",
    ]
  }
};

export default function CareerDetail() {
  const { slug } = useParams();
  const job = openings[slug];

  // Application Form State
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [aiNote, setAiNote] = useState("");

  if (!job) {
    return (
      <div className="bg-[#FAF8F5] min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center p-10 bg-white rounded-[40px] border border-[#E3DEC9]/60 shadow-xl shadow-[#092116]/[0.02]">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6 text-red-500">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-3xl font-display font-light tracking-tight text-[#1A2421] mb-3">Position Unlisted</h1>
          <p className="text-[#5A6360] text-sm font-light mb-8">This opening may have been closed or is temporarily offline.</p>
          <Link 
            to="/careers" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#092116] hover:bg-[#14422B] text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#092116]/10"
          >
            <ArrowLeft size={14} />
            <span>View Active Roles</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleApply = async (e) => {
    e.preventDefault();
    setApplyError("");
    setIsSubmitting(true);
    try {
      const result = await submitCareerApplication({
        jobSlug: slug,
        jobTitle: job.title,
        requirements: job.requirements,
        ...formData,
      });
      setAiNote(result.aiNote || "");
      setIsSubmitted(true);
    } catch (err) {
      setApplyError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A2421] selection:bg-[#EAE5D9] overflow-x-hidden">
      
      {/* Dynamic Back Navigation */}
      <div className="container-x max-w-6xl mx-auto pt-8">
        <Link 
          to="/careers" 
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5A6360] hover:text-[#092116] transition-colors duration-300"
        >
          <span className="w-8 h-8 rounded-full border border-[#E3DEC9] flex items-center justify-center group-hover:bg-[#092116] group-hover:border-[#092116] group-hover:text-white transition-all duration-300">
            <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
          </span>
          <span>Back to Opportunities</span>
        </Link>
      </div>

      {/* 1. ULTRA HERO BANNER: Gigantic Heading with Hover Glow Effects */}
      <header className="container-x max-w-6xl mx-auto pt-12 pb-16 md:pb-24">
        <div className="relative rounded-[40px] bg-[#092116] text-[#FAF8F5] p-8 md:p-20 overflow-hidden border border-[#1A382B] shadow-2xl shadow-[#092116]/10 group/hero">
          {/* Subtle slow moving gold and emerald gradient nodes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1A3A2C]/40 blur-[130px] group-hover/hero:bg-[#C5A368]/15 transition-all duration-1000 pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="px-3 py-1 bg-[#123123] border border-[#1E4935] text-[#A1D4B9] rounded-full font-mono text-[9px] tracking-widest font-bold uppercase">
                {job.department}
              </span>
              <span className="text-[#AEC2B7] text-xs font-mono">{job.type}</span>
            </div>

            {/* Giant Title with Hover Reveal Text Animation */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light tracking-tight leading-[1.05] text-white">
              <span className="group-hover/hero:text-[#C5A368] transition-colors duration-500">{job.title}</span>
            </h1>

            <p className="text-[#AEC2B7] text-base md:text-xl font-light leading-relaxed max-w-2xl pt-2">
              {job.desc}
            </p>

            {/* Micro Metadata Badges */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-6 border-t border-[#1D3E30] text-[#FAF8F5]/80 text-sm font-light">
              <div className="flex items-center gap-2 group/meta cursor-default">
                <div className="w-8 h-8 rounded-full bg-[#123123] border border-[#1E4935] flex items-center justify-center text-[#C5A368] group-hover/meta:bg-[#C5A368] group-hover/meta:text-[#092116] transition-all duration-300">
                  <MapPin size={14} />
                </div>
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 group/meta cursor-default">
                <div className="w-8 h-8 rounded-full bg-[#123123] border border-[#1E4935] flex items-center justify-center text-[#C5A368] group-hover/meta:bg-[#C5A368] group-hover/meta:text-[#092116] transition-all duration-300">
                  <Clock size={14} />
                </div>
                <span>40 Hours / Week</span>
              </div>
              <div className="flex items-center gap-2 group/meta cursor-default text-white font-medium">
                <div className="w-8 h-8 rounded-full bg-[#123123] border border-[#1E4935] flex items-center justify-center text-[#C5A368] group-hover/meta:bg-[#C5A368] group-hover/meta:text-[#092116] transition-all duration-300">
                  <IndianRupee size={14} />
                </div>
                <span>{job.salary}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. BODY CONTENT & INTERACTIVE FORM */}
      <section className="container-x max-w-6xl mx-auto pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Requirements & Responsibilities */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Responsibilities Block */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-[#1A2421]">Responsibilities</h2>
              <ul className="space-y-4">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start group/li">
                    <span className="w-2 h-2 rounded-full bg-[#C5A368] mt-2.5 shrink-0 group-hover/li:scale-125 transition-transform" />
                    <p className="text-[#5A6360] text-sm md:text-base font-light leading-relaxed group-hover/li:text-[#1A2421] transition-colors">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements Block */}
            <div className="space-y-6 pt-6 border-t border-[#E3DEC9]/60">
              <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-[#1A2421]">Experience & Credentials</h2>
              <ul className="space-y-4">
                {job.requirements.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start group/li">
                    <span className="w-2 h-2 rounded-full bg-[#14422B] mt-2.5 shrink-0 group-hover/li:scale-125 transition-transform" />
                    <p className="text-[#5A6360] text-sm md:text-base font-light leading-relaxed group-hover/li:text-[#1A2421] transition-colors">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medical Ethics Notice */}
            <div className="p-6 bg-[#F5F1E8]/50 rounded-2xl border border-[#E3DEC9]/40 flex gap-4 items-start">
              <ShieldCheck className="text-[#14422B] shrink-0 mt-0.5" size={20} />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-[#1A2421]">Affirmative Practice Standards</h4>
                <p className="text-[#5A6360] text-xs font-light leading-relaxed">
                  Mediso is committed to creating equal medical development tracks. We actively ensure fair work, gender balance, and competitive pay levels in sync with national benchmarks.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Application Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[36px] border border-[#E3DEC9]/60 p-8 md:p-10 shadow-xl shadow-[#092116]/[0.01] sticky top-8">
              
              {!isSubmitted ? (
                <form onSubmit={handleApply} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-light">Apply for this Role</h3>
                    <p className="text-[#5A6360] text-xs font-light leading-relaxed">
                      Complete this rapid clinical expression of interest. Our board will reach out in 48 hours.
                    </p>
                  </div>

                  {/* Input - Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest uppercase text-[#5A6360] font-bold">Your Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., Dr. Ananya Sharma" 
                      className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#C5A368] focus:bg-white text-sm text-[#1A2421] placeholder-[#5A6360]/40 px-5 py-3.5 rounded-xl transition-all duration-300 outline-none"
                    />
                  </div>

                  {/* Input - Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest uppercase text-[#5A6360] font-bold">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="ananya.sharma@mediso.in" 
                      className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#C5A368] focus:bg-white text-sm text-[#1A2421] placeholder-[#5A6360]/40 px-5 py-3.5 rounded-xl transition-all duration-300 outline-none"
                    />
                  </div>

                  {/* Input - Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest uppercase text-[#5A6360] font-bold">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 98765 43210" 
                      className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#C5A368] focus:bg-white text-sm text-[#1A2421] placeholder-[#5A6360]/40 px-5 py-3.5 rounded-xl transition-all duration-300 outline-none"
                    />
                  </div>

                  {/* Message/Experience Abstract */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest uppercase text-[#5A6360] font-bold">Brief Experience Abstract</label>
                    <textarea 
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Outline your active specializations or key clinical work..." 
                      className="w-full bg-[#FAF8F5] border border-transparent focus:border-[#C5A368] focus:bg-white text-sm text-[#1A2421] placeholder-[#5A6360]/40 px-5 py-3.5 rounded-xl transition-all duration-300 outline-none resize-none"
                    />
                  </div>

                  {applyError && (
                    <p className="text-xs font-semibold text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      {applyError}
                    </p>
                  )}

                  {/* Submit Button with Hover Effects */}
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#092116] hover:bg-[#14422B] disabled:bg-[#092116]/80 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#092116]/10"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        <span>Send Application</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success Success Screen Animation */
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#E8F1EC] text-[#14422B] flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-light">Application Sent</h3>
                    <p className="text-[#5A6360] text-sm font-light leading-relaxed">
                      {aiNote ||
                        `Thank you for applying, ${formData.name.split(" ")[0]}. Our recruiting managers are evaluating your credentials and will reach back shortly.`}
                    </p>
                  </div>
                  <button 
                    onClick={() => { setIsSubmitted(false); setAiNote(""); setFormData({ name: "", email: "", phone: "", message: "" }); }}
                    className="text-xs font-semibold uppercase tracking-wider text-[#14422B] border-b border-[#14422B]/30 hover:border-[#14422B] pb-0.5"
                  >
                    Submit another response
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}