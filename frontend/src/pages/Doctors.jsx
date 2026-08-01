import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { doctors as initialDoctors } from "../data/content";
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  Calendar, 
  HelpCircle, 
  ChevronDown, 
  UserPlus 
} from "lucide-react";

// Fallback high-quality local structure mappings
const SPECIALIST_IMAGES = {
  cardiology: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000",
  dermatology: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=1000",
  neurology: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1000",
  pediatrics: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000",
  general: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=1000"
};

export default function Doctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFAQ, setActiveFAQ] = useState({});

  // Ensure default premium portraits are bound behind-the-scenes
  const doctorsList = initialDoctors.map(doc => {
    if (doc.image) return doc;
    const roleLower = doc.role?.toLowerCase() || "";
    let fallbackImage = SPECIALIST_IMAGES.general;
    
    if (roleLower.includes("cardio")) fallbackImage = SPECIALIST_IMAGES.cardiology;
    else if (roleLower.includes("derm") || roleLower.includes("skin")) fallbackImage = SPECIALIST_IMAGES.dermatology;
    else if (roleLower.includes("neuro") || roleLower.includes("brain")) fallbackImage = SPECIALIST_IMAGES.neurology;
    else if (roleLower.includes("pediatric") || roleLower.includes("child")) fallbackImage = SPECIALIST_IMAGES.pediatrics;

    return { ...doc, image: fallbackImage };
  });

  const filteredDoctors = doctorsList.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (doctorSlug, faqIndex) => {
    const key = `${doctorSlug}-${faqIndex}`;
    setActiveFAQ(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#14231C] pb-36 relative overflow-hidden">
      {/* Decorative Warm Cream Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#E6DFD3]/30 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-[#DFD9CE]/40 blur-[130px] pointer-events-none" />

      <PageHero
        eyebrow="Primary Physicians & Specialists"
        title="Meet Our Care Team"
        subtitle="Uncompromising excellence, tailored treatment pathways, and exceptional clinical specialists dedicated to your longevity."
      />

      <section className="max-w-6xl mx-auto mt-16 px-6 sm:px-8 relative z-10">
        
        {/* Luxury Search & Filter Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#14231C]/10 pb-8 mb-20">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#14231C]/60">
            <Sparkles size={14} className="text-[#2D5A43]" />
            Active Clinical Staff ({filteredDoctors.length})
          </div>

          <div className="relative w-full max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#14231C]/40">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search by name, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F3EFE7] border border-[#14231C]/10 focus:border-[#2D5A43] text-[#14231C] placeholder-[#14231C]/40 text-sm px-11 py-3.5 rounded-2xl outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Alternating Hero Rows */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-20 bg-[#F3EFE7] rounded-[32px] border border-[#14231C]/5">
            <p className="text-[#14231C]/50 font-serif italic">No medical specialists match your search criteria.</p>
          </div>
        ) : (
          <div className="space-y-28 md:space-y-36">
            {filteredDoctors.map((d, index) => {
              const isEven = index % 2 === 0;
              
              // Custom doctor Q&A data mock
              const doctorFAQs = [
                {
                  q: "What is your core medical approach?",
                  a: `I emphasize early diagnostic screeners combined with customized lifestyle therapy to reduce systemic risk before issues escalate.`
                },
                {
                  q: "What should I expect during a first consult?",
                  a: "A comprehensive assessment reviewing current biochemical baselines, clinical history, and a co-designed metabolic target blueprint."
                }
              ];

              return (
                <div 
                  key={d.slug}
                  className={`flex flex-col lg:items-center gap-10 lg:gap-16 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  
                  {/* Big Bold Image Section (Left / Right Alternating) */}
                  <div className="w-full lg:w-[45%] shrink-0">
                    <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-[40px] overflow-hidden shadow-xl border border-[#14231C]/5 bg-[#ECE7DE]">
                      <img 
                        src={d.image} 
                        alt={d.name} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#14231C]">
                        {d.role}
                      </div>
                    </div>
                  </div>

                  {/* Comprehensive Profile Description Section (Right / Left Alternating) */}
                  <div className="w-full lg:w-[55%] space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-[#14231C]">
                        {d.name}
                      </h2>
                      <p className="text-sm font-semibold tracking-wider uppercase text-[#2D5A43]">
                        Board Certified Specialist — {d.experience || "12+"} Years Active Experience
                      </p>
                    </div>

                    <div className="h-[1px] bg-[#14231C]/10 w-full" />

                    {/* Highly Visible Doctor Bio Description */}
                    <p className="text-base sm:text-lg text-[#14231C]/75 leading-relaxed font-light">
                      {d.about || `Dedicated to advancing global medical standards, ${d.name} blends cutting-edge diagnostics with warm, patient-first attention, creating structured pathways built around your individual longevity goals.`}
                    </p>

                    {/* Question & Answer Accordion Component */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[#14231C]/50 flex items-center gap-2">
                        <HelpCircle size={14} /> Frequently Asked Questions
                      </h4>
                      
                      <div className="space-y-2">
                        {doctorFAQs.map((faq, faqIdx) => {
                          const isOpen = activeFAQ[`${d.slug}-${faqIdx}`];
                          return (
                            <div 
                              key={faqIdx}
                              className="bg-[#F3EFE7] rounded-2xl overflow-hidden border border-[#14231C]/5 transition-all duration-300"
                            >
                              <button
                                onClick={() => toggleFAQ(d.slug, faqIdx)}
                                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#EAE4D9]/50 transition-colors duration-200"
                              >
                                <span className="text-sm font-bold text-[#14231C]">{faq.q}</span>
                                <ChevronDown 
                                  size={16} 
                                  className={`text-[#14231C]/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                                />
                              </button>
                              
                              <div 
                                className={`transition-all duration-300 ease-in-out ${
                                  isOpen ? "max-h-40 border-t border-[#14231C]/5" : "max-h-0"
                                } overflow-hidden`}
                              >
                                <p className="p-5 text-xs sm:text-sm text-[#14231C]/70 leading-relaxed bg-[#FAF8F5]/30">
                                  {faq.a}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Integrated Appointment and Patient Registration Links */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Link
                        to={`/doctors/${d.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#2D5A43] hover:bg-[#1C3E2C] text-white text-sm font-bold rounded-2xl py-4 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <Calendar size={16} />
                        Book Appointment
                      </Link>
                      
                      <Link
                        to="/register"
                        className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#F3EFE7] hover:bg-[#E6DFD3] text-[#14231C] text-sm font-bold rounded-2xl py-4 border border-[#14231C]/10 transition-all duration-300"
                      >
                        <UserPlus size={16} />
                        Register as New Patient
                      </Link>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}