import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../components/PageHero";
import { services } from "../data/content";

export default function Services() {
  // Keep track of which service is currently hovered to drive the visual experience
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="bg-[#FAF8F2] min-h-screen text-[#1C1A17] selection:bg-[#EAE5D9] overflow-x-hidden">
      
      {/* 1. Page Hero with Premium Green Glowing Effects on Cream Background */}
      <div className="relative bg-[#FAF8F5] border-b border-[#ECE6D9] overflow-hidden">
        {/* Abstract luxury green glowing elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-[#D4E8DD]/30 blur-[120px] mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[10%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] rounded-full bg-[#E3EFE9]/40 blur-[100px] mix-blend-multiply pointer-events-none" />
        
        <PageHero
          eyebrow="Departments"
          title="Our Specialized Healthcare Services"
          subtitle="Explore our range of medical departments, staffed by leading practitioners committed to clinical excellence."
        />
      </div>

      {/* 2. Interactive Canvas */}
      <section className="container-x py-20 md:py-28">
        {/* Split Screen Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT PANEL: The Interactive Visual Anchor (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
            <div className="relative h-[300px] md:h-[400px] w-full bg-[#F2ECE0] rounded-[32px] p-10 overflow-hidden flex flex-col justify-between border border-[#E6DEC0]/50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
              
              {/* Subtle background glow that animates depending on active item */}
              <div 
                className="absolute inset-0 bg-[#ECE5D7] transition-transform duration-1000 ease-out -z-10"
                style={{ transform: `translateY(${activeIdx * 10}%) scale(${1 + activeIdx * 0.05})` }}
              />

              {/* Dynamic Number Index & Premium Status Beacon (Blinking DEPT Indicator) */}
              <div className="flex items-start justify-between">
                <div className="overflow-hidden h-20">
                  <div 
                    className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] font-display text-7xl md:text-8xl font-light text-[#1C1A17]/10"
                    style={{ transform: `translateY(-${activeIdx * 80}px)` }}
                  >
                    {services.map((_, i) => (
                      <div key={i} className="h-20 flex items-center">
                        {(i + 1).toString().padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Blinking Premium Status Beacon */}
                <div className="flex items-center gap-2 bg-[#FAF8F2]/80 backdrop-blur-sm border border-[#E6DEC0] px-3 py-1.5 rounded-full shadow-sm">
                  <span className="relative flex h-2 w-2">
                    {/* Pulsing ring */}
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F6F4F] opacity-75"></span>
                    {/* Solid core */}
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F6F4F]"></span>
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-[#2F6F4F] font-bold animate-pulse">
                    LIVE
                  </span>
                </div>
              </div>

              {/* Dynamic Information Display */}
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#8C8675] font-semibold">
                  Currently Viewing
                </p>
                <div className="overflow-hidden h-10">
                  <div 
                    className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-display text-xl md:text-2xl font-normal text-[#1C1A17]"
                    style={{ transform: `translateY(-${activeIdx * 40}px)` }}
                  >
                    {services.map((s, i) => (
                      <div key={i} className="h-10 flex items-center truncate">
                        {s.title}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro Progress Bar */}
                <div className="h-[2px] bg-[#E6DEC0] w-full rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#2F6F4F] transition-all duration-500 ease-out"
                    style={{ width: `${((activeIdx + 1) / services.length) * 100}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT PANEL: Interactive Service List */}
          <div className="lg:col-span-7 space-y-4">
            {services.map((s, idx) => {
              const isActive = activeIdx === idx;

              return (
                <div
                  key={s.slug}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`group relative rounded-[24px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border ${
                    isActive 
                      ? "bg-white border-[#E6DEC0] shadow-xl shadow-[#1C1A17]/[0.02] p-8 md:p-10" 
                      : "bg-transparent border-transparent hover:border-[#E6DEC0]/40 p-8 md:p-10"
                  }`}
                >
                  <Link to={`/services/${s.slug}`} className="block">
                    <div className="flex items-start justify-between gap-6">
                      
                      {/* Left: Typography Content */}
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-4">
                          <span className={`font-mono text-xs transition-colors duration-500 ${
                            isActive ? "text-[#1C1A17] font-semibold" : "text-[#8C8675]"
                          }`}>
                            {(idx + 1).toString().padStart(2, "0")}
                          </span>
                          <span className={`w-1.5 h-1.5 rounded-full bg-[#2F6F4F] transition-all duration-500 ${
                            isActive ? "scale-100" : "scale-0"
                          }`} />
                        </div>

                        <h3 className={`font-display text-2xl md:text-3xl font-light tracking-tight transition-colors duration-500 ${
                          isActive ? "text-[#1C1A17]" : "text-[#8C8675] group-hover:text-[#1C1A17]"
                        }`}>
                          {s.title}
                        </h3>

                        {/* Collapsible Content Area - Only displays cleanly when active */}
                        <div 
                          className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="text-[#5C574A] text-sm md:text-base leading-relaxed pt-2 max-w-xl">
                              {s.desc}
                            </p>
                            <span className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-widest font-semibold text-[#1C1A17] border-b border-[#1C1A17]/30 pb-0.5 hover:border-[#1C1A17] transition-all">
                              Learn more about our practice
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* Right: Circular Arrow Action Indicator */}
                      <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? "bg-[#1C1A17] border-[#1C1A17] text-[#FAF9F6]" 
                          : "border-[#E6DEC0] text-[#8C8675] group-hover:bg-[#1C1A17] group-hover:border-[#1C1A17] group-hover:text-[#FAF9F6]"
                      }`}>
                        <ArrowUpRight 
                          size={20} 
                          className={`transition-transform duration-500 ${isActive ? "rotate-45" : ""}`} 
                        />
                      </div>

                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}