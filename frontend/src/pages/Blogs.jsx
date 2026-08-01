import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Clock, HelpCircle, ChevronDown, Sparkles, Filter } from "lucide-react";
import PageHero from "../components/PageHero";
import { articles } from "../data/content";

// Premium high-res medical stock photos mapping to dynamic clinical topics
const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000", // Medical discussion
  "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1000", // Doctor consulting
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000", // Clinical health tech
  "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=1000", // Heart rate stethoscope
  "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=1000"  // General healthcare ward
];

// Interactive FAQ desk to clear patient confusion directly on the blog landing page
const PATIENT_FAQS = [
  {
    q: "How do I determine which medical specialty department I need?",
    a: "If you are experiencing a new or unclassified physical symptom, we recommend scheduling an initial consultation with our General Medicine department. Our primary care specialists will perform preliminary blood panels and diagnostics before seamlessly referring you directly to the correct specialized department."
  },
  {
    q: "Are clinical diagnostic tests and scans covered by standard insurance?",
    a: "Mediso partners with over 45 major global and local insurance providers. Prior to your scheduled clinical scan (such as MRI, CT, or Echocardiogram), our dedicated administrative Desk handles all pre-authorization submissions on your behalf to guarantee maximum coverage."
  },
  {
    q: "How can I securely request a second opinion on an active diagnosis?",
    a: "We believe in complete clinical transparency. You can request a secondary peer review by selecting any doctor from our listings and choosing 'Second Opinion Consultation' during booking. We will securely transfer your medical scans and lab history within our encrypted portal."
  }
];

export default function Blogs() {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedTag, setSelectedTag] = useState("all");

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#FAF8F2] min-h-screen text-[#1C1A17] selection:bg-[#EAE5D9] overflow-x-hidden pb-24">
      
      {/* 1. Page Hero with luxury visual flow */}
      <div className="relative bg-[#FAF8F5] border-b border-[#ECE6D9] overflow-hidden">
        {/* Luxury glowing backgrounds */}
        <div className="absolute top-[-20%] right-[-15%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full bg-[#D4E8DD]/25 blur-[140px] mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[#E3EFE9]/30 blur-[110px] mix-blend-multiply pointer-events-none" />
        
        <PageHero
          title="Curated Medical Insights & Patient Resources"
          subtitle="Comprehensive, physician-reviewed articles designed to demystify complex treatments and guide your wellness journey."
        />
      </div>

      {/* 2. Editorial Category Filter Controls */}
      <div className="container-x mt-12">
        <div className="flex flex-wrap items-center gap-3 border-b border-[#ECE6D9] pb-6">
          <span className="text-xs uppercase tracking-widest text-[#8C8675] flex items-center gap-1.5 mr-2 font-mono">
            <Filter size={12} /> Filter Insights:
          </span>
          {["all", "clinical wellness", "preventative care", "cardiac health"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedTag === tag 
                  ? "bg-[#2F6F4F] text-white shadow-md shadow-[#2F6F4F]/15" 
                  : "bg-white border border-[#E6DEC0] text-[#1C1A17]/70 hover:border-[#2F6F4F] hover:text-[#2F6F4F]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Luxury Articles Grid */}
      <section className="container-x py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a, idx) => {
            // Pick a high-res image cyclically
            const imgUrl = BLOG_IMAGES[idx % BLOG_IMAGES.length];
            // Simulate dynamic tags/read-times for realism
            const readTime = `${4 + (idx % 3)} min read`;
            const articleTag = idx % 2 === 0 ? "Clinical Wellness" : "Preventative Care";

            return (
              <article
                key={a.slug}
                className="group relative bg-white border border-[#E6DEC0]/80 rounded-[32px] overflow-hidden shadow-[0_10px_35px_rgba(28,26,23,0.01)] hover:shadow-xl hover:shadow-[#1C1A17]/[0.03] transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1.5"
                style={{
                  animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.15}s both`
                }}
              >
                {/* Visual Image Frame */}
                <div className="relative h-56 w-full overflow-hidden bg-[#F2ECE0]">
                  <img
                    src={imgUrl}
                    alt={a.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-[#E6DEC0]/60 px-3.5 py-1.5 rounded-full shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2F6F4F]">
                      {articleTag}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs font-mono text-[#8C8675] mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} /> {a.date}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E6DEC0]" />
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} /> {readTime}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-light text-[#1C1A17] tracking-tight leading-snug group-hover:text-[#2F6F4F] transition-colors duration-300 mb-3">
                      {a.title}
                    </h3>

                    <p className="text-sm text-[#5C574A] leading-relaxed font-light line-clamp-3 mb-6">
                      Explore this physician-reviewed breakdown regarding diagnostic pathways, immediate care guidelines, and recommended next steps directly from the Mediso Clinical Panel.
                    </p>
                  </div>

                  {/* Elegant Link Callout */}
                  <Link
                    to={`/blogs/${a.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#2F6F4F] group-hover:text-[#1C1A17] transition-colors duration-300 mt-auto pt-4 border-t border-[#FAF8F5]"
                  >
                    Read Detailed Article <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. Interactive Patient Clarification Desk (FAQ Section) */}
      <section className="container-x mt-12">
        <div className="max-w-4xl mx-auto bg-white border border-[#E6DEC0] rounded-[40px] p-8 md:p-14 shadow-xl shadow-[#1C1A17]/[0.01]">
          
          <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2F6F4F] font-semibold flex items-center justify-center gap-1.5">
              <HelpCircle size={14} /> Patient Help Desk
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-light text-[#1C1A17] tracking-tight">
              Clearing clinical confusion and anxieties
            </h2>
            <p className="text-xs text-[#8C8675]">
              Quick-reference guidance addressing our clinical flow, scheduling processes, and insurance criteria.
            </p>
          </div>

          <div className="space-y-4">
            {PATIENT_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`border border-[#E6DEC0]/85 rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? "bg-[#E3EFE9]/15 border-[#2F6F4F]/30" : "bg-white hover:border-[#2F6F4F]/40"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="font-display font-medium text-sm md:text-base text-[#1C1A17] pr-4">
                      {faq.q}
                    </span>
                    <span className={`p-1.5 rounded-full bg-[#FAF8F2] border border-[#E6DEC0] text-[#2F6F4F] transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#2F6F4F] text-white" : ""}`}>
                      <ChevronDown size={14} />
                    </span>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-40 border-t border-[#E6DEC0]/50" : "max-h-0"
                    }`}
                  >
                    <p className="p-6 text-xs md:text-sm text-[#5C574A] leading-relaxed font-light">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Embedded CSS for Entrance Fade-in-up animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}