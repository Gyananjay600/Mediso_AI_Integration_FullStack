import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Briefcase, IndianRupee, Sparkles, HeartHandshake, Award, FileText, Search, ChevronRight } from "lucide-react";

// Expanded postings matching premium medical sectors in India
const openings = [
  { 
    slug: "senior-physical-therapist", 
    title: "Senior Consultant Physical Therapist", 
    type: "Full-time", 
    department: "Clinical",
    location: "Chanakyapuri, New Delhi",
    salary: "₹12,00,000 – ₹16,50,000 / yr",
    experience: "4+ Years Exp",
    highlights: ["NABL Accredited", "Continuing Ed Stipend", "Retention Bonus"]
  },
  { 
    slug: "critical-care-nurse", 
    title: "Critical Care Nurse Specialist", 
    type: "Full-time", 
    department: "Clinical",
    location: "Indiranagar, Bengaluru",
    salary: "₹8,50,000 – ₹12,00,000 / yr",
    experience: "2+ Years Exp",
    highlights: ["Relocation Allowance", "Premium Health Cover"]
  },
  { 
    slug: "osteopath-consultant", 
    title: "Consultant Osteopath & Chiropractor", 
    type: "Consultant / Part-time", 
    department: "Clinical",
    location: "Bandra West, Mumbai",
    salary: "₹1,500 – ₹2,500 / hr",
    experience: "5+ Years Exp",
    highlights: ["Flexible Hours", "Elite Athlete Practice"]
  },
  { 
    slug: "patient-relations-manager", 
    title: "VIP Patient Relations Manager", 
    type: "Full-time", 
    department: "Administration",
    location: "Jubilee Hills, Hyderabad",
    salary: "₹6,00,000 – ₹8,50,000 / yr",
    experience: "3+ Years Exp",
    highlights: ["Performance Incentives", "Luxury Hospitality Exp"]
  },
  { 
    slug: "clinic-administrator", 
    title: "Chief Clinic Administrator", 
    type: "Full-time", 
    department: "Administration",
    location: "Chanakyapuri, New Delhi",
    salary: "₹10,00,000 – ₹14,00,000 / yr",
    experience: "5+ Years Exp",
    highlights: ["Annual Equity Option", "Gratuity & PF"]
  },
  { 
    slug: "rehabilitation-assistant", 
    title: "Rehabilitation & Sports Assistant", 
    type: "Full-time", 
    department: "Allied Health",
    location: "Indiranagar, Bengaluru",
    salary: "₹5,00,000 – ₹7,50,000 / yr",
    experience: "Entry Level / 1 Yr",
    highlights: ["Mentor Program", "Gym Membership"]
  },
];

export default function Careers() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Clean, unified filtering logic for Search + Department Categories
  const filteredOpenings = openings.filter(job => {
    const matchesCategory = activeFilter === "All" || job.department === activeFilter;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A2421] selection:bg-[#EAE5D9] overflow-x-hidden">
      
      {/* 1. HERO BANNER: Cohesive Royal Emerald & Sandalwood Gold */}
      <section className="relative bg-[#092116] text-[#FAF8F5] py-28 md:py-36 overflow-hidden border-b border-[#1A382B]">
        {/* Harmonized radial glow elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full bg-[#1A3A2C] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[#C5A368]/10 blur-[120px] pointer-events-none" />
        
        <div className="container-x relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#123123] border border-[#1E4935] px-4 py-1.5 rounded-full text-[#A1D4B9] font-mono text-[10px] tracking-widest font-bold uppercase">
                🇮🇳 CAREERS @ MEDISO INDIA
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-light tracking-tight leading-[1.1]">
                Shape the vanguard of <span className="text-[#C5A368] italic font-normal">healing</span>.
              </h1>
              <p className="text-[#AEC2B7] text-sm md:text-base leading-relaxed max-w-xl font-light">
                Join an elite family of practitioners, therapists, and coordinators setting new benchmarks in clinical excellence across Delhi NCR, Mumbai, and Bengaluru.
              </p>
              
              {/* Dynamic Live Counter Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#1D3E30] max-w-lg">
                <div>
                  <p className="font-display text-2xl md:text-3xl text-[#C5A368] font-light">{openings.length}</p>
                  <p className="text-[#AEC2B7] text-[11px] font-mono uppercase tracking-widest mt-1">Open Positions</p>
                </div>
                <div>
                  <p className="font-display text-2xl md:text-3xl text-white font-light">4</p>
                  <p className="text-[#AEC2B7] text-[11px] font-mono uppercase tracking-widest mt-1">Key Hubs</p>
                </div>
                <div>
                  <p className="font-display text-2xl md:text-3xl text-white font-light">NABL</p>
                  <p className="text-[#AEC2B7] text-[11px] font-mono uppercase tracking-widest mt-1">Accredited</p>
                </div>
              </div>
            </div>

            {/* Right Action Card (Button Effect) */}
            <div className="lg:col-span-5 flex lg:justify-end">
              <div className="w-full max-w-md p-8 bg-[#123123]/40 backdrop-blur-md border border-[#1E4935] rounded-[36px] space-y-6">
                <span className="inline-block px-3 py-1 bg-[#1A3A2C] border border-[#2B5442] text-[#A1D4B9] text-[9px] font-mono tracking-widest uppercase rounded-full">
                  Direct Channel
                </span>
                <h3 className="font-display text-xl text-white font-light leading-snug">
                  Have a highly specialized medical practice or research portfolio?
                </h3>
                <p className="text-[#AEC2B7] text-xs font-light leading-relaxed">
                  Submit a direct application to our executive clinical board for non-listed consultancies.
                </p>
                
                <a 
                  href="mailto:medicalboard@mediso.in"
                  className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-full bg-[#C5A368] hover:bg-[#B79255] text-[#092116] font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#C5A368]/15"
                >
                  <FileText size={15} />
                  <span>Send Credentials</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE POSITIONS SECTION (Brushed Sandalwood & Alabaster Palette) */}
      <section className="container-x py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <div className="space-y-3 mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#14422B] font-bold">Current Opportunities</span>
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight">Select Your Specialty</h2>
          </div>

          {/* Interactive Navigation/Search Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[#E3DEC9] pb-8 mb-12">
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {["All", "Clinical", "Allied Health", "Administration"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setSearchQuery(""); // Reset search on category toggle
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-[#092116] text-white shadow-md shadow-[#092116]/10"
                      : "bg-[#F5F1E8] text-[#5A6360] hover:bg-[#EDE7DB] hover:text-[#092116]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Micro-Search Bar */}
            <div className="relative w-full md:w-80">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A6360]/50">
                <Search size={16} />
              </span>
              <input 
                type="text" 
                placeholder="Search by title or hub..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F5F1E8] border border-transparent focus:border-[#C5A368] focus:bg-white text-sm text-[#1A2421] placeholder-[#5A6360]/50 pl-11 pr-4 py-2.5 rounded-full transition-all duration-300 outline-none"
              />
            </div>
          </div>

          {/* Premium List Segment */}
          <div className="space-y-4">
            {filteredOpenings.length > 0 ? (
              filteredOpenings.map((job, idx) => {
                const isHovered = hoveredIdx === idx;
                
                return (
                  <div
                    key={job.slug}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`group relative rounded-[32px] border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isHovered 
                        ? "bg-white border-[#C5A368]/60 shadow-xl shadow-[#092116]/[0.02]" 
                        : "bg-transparent border-[#E3DEC9]/50"
                    }`}
                  >
                    <Link to={`/careers/${job.slug}`} className="block p-8 md:p-10">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        
                        {/* Left Block: Basic Details */}
                        <div className="space-y-4 flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="px-3 py-1 bg-[#E8F1EC] text-[#14422B] rounded-full font-mono text-[9px] tracking-widest font-bold uppercase">
                              {job.department}
                            </span>
                            <span className="text-[#5A6360] text-xs font-mono">{job.type}</span>
                          </div>

                          <h3 className="font-display text-2xl font-light tracking-tight text-[#1A2421] group-hover:translate-x-1 transition-transform duration-300">
                            {job.title}
                          </h3>

                          {/* Interactive Metadata Grid */}
                          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[#5A6360] text-sm font-light">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-[#14422B]" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase size={14} className="text-[#14422B]" />
                              <span>{job.experience}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#1A2421] font-medium">
                              <IndianRupee size={14} className="text-[#14422B]" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Block: Dynamic Highlights & Link Arrow */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:self-center shrink-0">
                          {/* Dynamic Tag Reveal on hover */}
                          <div className={`hidden sm:flex items-center gap-2 transition-all duration-500 ${
                            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
                          }`}>
                            {job.highlights.slice(0, 2).map((highlight, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1.5 bg-[#F5F1E8] text-[#5A6360] border border-[#E3DEC9]/40 rounded-xl text-xs"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>

                          {/* Dynamic Interaction Button */}
                          <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${
                            isHovered 
                              ? "bg-[#092116] border-[#092116] text-white shadow-md rotate-45" 
                              : "bg-white border-[#E3DEC9] text-[#5A6360]"
                          }`}>
                            <ArrowUpRight size={22} className="transition-transform duration-500" />
                          </div>
                        </div>

                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 border border-dashed border-[#E3DEC9] rounded-[32px] bg-white">
                <p className="text-[#5A6360] font-light">No positions match your current search criteria.</p>
                <button 
                  onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                  className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#14422B] border-b border-[#14422B]/30 hover:border-[#14422B] pb-0.5"
                >
                  View All Roles
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. COHESIVE VALUE PROPOSITION SEGMENT (Clean White Canvas) */}
      <section className="border-t border-[#E3DEC9]/60 py-24 md:py-32 bg-white">
        <div className="container-x max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#14422B] font-bold">Standard of Excellence</span>
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight">The Mediso Environment</h2>
            <p className="text-[#5A6360] text-sm leading-relaxed font-light">
              We empower our clinical and administrative teams with modern, uncompromised workspaces to practice elite care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Advantage 1 */}
            <div className="p-8 bg-[#FAF8F5] rounded-[32px] border border-[#E3DEC9]/40 hover:border-[#C5A368] transition-all duration-300 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F1EC] flex items-center justify-center text-[#14422B]">
                <Sparkles size={20} />
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-medium text-lg text-[#1A2421]">Advanced Infrastructure</h4>
                <p className="text-[#5A6360] text-sm leading-relaxed font-light">
                  Practice with state-of-the-art diagnostic utilities, elite gyms, and premium custom therapeutic platforms.
                </p>
              </div>
            </div>

            {/* Advantage 2 */}
            <div className="p-8 bg-[#FAF8F5] rounded-[32px] border border-[#E3DEC9]/40 hover:border-[#C5A368] transition-all duration-300 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F1EC] flex items-center justify-center text-[#14422B]">
                <HeartHandshake size={20} />
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-medium text-lg text-[#1A2421]">Holistic Security</h4>
                <p className="text-[#5A6360] text-sm leading-relaxed font-light">
                  Tailored corporate health covers, comprehensive personal accident safety networks, and transparent structures.
                </p>
              </div>
            </div>

            {/* Advantage 3 */}
            <div className="p-8 bg-[#FAF8F5] rounded-[32px] border border-[#E3DEC9]/40 hover:border-[#C5A368] transition-all duration-300 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F1EC] flex items-center justify-center text-[#14422B]">
                <Award size={20} />
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-medium text-lg text-[#1A2421]">Academic Funding</h4>
                <p className="text-[#5A6360] text-sm leading-relaxed font-light">
                  Up to 100% funding for international medical seminars, specialized cert courses, and clinical publications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}