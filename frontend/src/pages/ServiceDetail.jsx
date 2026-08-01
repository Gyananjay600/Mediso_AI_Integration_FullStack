import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, ShieldCheck, HeartPulse, Clock, Sparkles, Stethoscope, Award } from "lucide-react";
import PageHero from "../components/PageHero";
import { services } from "../data/content";

// High-resolution premium clinical specialty images to map dynamically
const DEPARTMENT_IMAGES = {
  cardiology: "https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=1000",
  dermatology: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000",
  neurology: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000",
  pediatrics: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000",
  general: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000"
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="bg-[#FAF8F2] min-h-screen flex items-center justify-center text-center px-4">
        <div className="max-w-md p-8 bg-white border border-[#E6DEC0] rounded-[32px] shadow-sm">
          <h1 className="text-3xl font-display font-light text-[#1C1A17] mb-4">Department Not Found</h1>
          <p className="text-[#8C8675] text-sm mb-6">The medical specialty you are looking for does not exist or has been relocated.</p>
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white bg-[#2F6F4F] hover:bg-[#25573E] px-6 py-3 rounded-full transition-all"
          >
            <ArrowLeft size={16} /> Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  // Resolve specialty background image dynamically
  const slugLower = slug?.toLowerCase() || "";
  let serviceImg = DEPARTMENT_IMAGES.general;
  if (slugLower.includes("cardio")) serviceImg = DEPARTMENT_IMAGES.cardiology;
  else if (slugLower.includes("derm") || slugLower.includes("skin")) serviceImg = DEPARTMENT_IMAGES.dermatology;
  else if (slugLower.includes("neuro")) serviceImg = DEPARTMENT_IMAGES.neurology;
  else if (slugLower.includes("pediat")) serviceImg = DEPARTMENT_IMAGES.pediatrics;

  return (
    <div className="bg-[#FAF8F2] min-h-screen text-[#1C1A17] selection:bg-[#EAE5D9] overflow-x-hidden">
      
      {/* 1. Page Hero with Green Glowing Effects & Breadcrumb */}
      <div className="relative bg-[#FAF8F5] border-b border-[#ECE6D9] overflow-hidden">
        {/* Soft luxury green glow elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-[#D4E8DD]/30 blur-[120px] mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[10%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] rounded-full bg-[#E3EFE9]/40 blur-[100px] mix-blend-multiply pointer-events-none" />
        
        <div className="container-x pt-8 relative z-10">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#2F6F4F] hover:text-[#1C1A17] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Specialties
          </Link>
        </div>

        <PageHero 
          eyebrow="Department Specialty" 
          title={service.title} 
          subtitle="Learn about our medical excellence, advanced clinical technologies, and expert staff dedicated to your care." 
        />
      </div>

      {/* 2. Editorial Detail Canvas */}
      <section className="container-x py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Clean Minimalist Image Frame & Details */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            
            {/* Premium, image frame with smooth hovering zoom effect */}
            <div className="relative overflow-hidden rounded-[40px] border border-[#E6DEC0] bg-[#F2ECE0] h-[340px] md:h-[450px] flex items-end shadow-lg group">
              
              {/* Dynamic Specialty Background Image */}
              <img 
                src={serviceImg} 
                alt={`${service.title} Specialty Room`}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 mix-blend-multiply transition-all duration-[1000ms] ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
              />

              {/* Labeled department badge inside the image block */}
              <div className="absolute top-6 left-6 bg-[#FAF8F2]/90 backdrop-blur-md border border-[#E6DEC0] px-4 py-2 rounded-full shadow-sm z-20">
                <span className="font-mono text-[10px] tracking-widest text-[#2F6F4F] font-bold uppercase flex items-center gap-1.5">
                  <Sparkles size={11} className="animate-pulse" /> Mediso Certified
                </span>
              </div>

              {/* Overlaid Modern Minimal Glass Card bottom overlay */}
              <div className="w-full p-6 relative z-10">
                <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-xl translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 rounded-xl bg-[#2F6F4F]/10 text-[#2F6F4F]">
                      <HeartPulse size={18} />
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#2F6F4F]">
                      Core Department
                    </span>
                  </div>
                  <h4 className="text-lg font-display text-[#1C1A17] font-medium leading-snug">
                    {service.title} Unit
                  </h4>
                </div>
              </div>
            </div>

            {/* Micro Specs Card */}
            <div className="bg-white border border-[#E6DEC0]/75 rounded-[32px] p-8 space-y-6 shadow-[0_10px_40px_rgba(47,111,79,0.015)]">
              <h4 className="font-display font-medium text-lg">Department Features</h4>
              <div className="grid grid-cols-1 gap-4">
                
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#E3EFE9] flex items-center justify-center text-[#2F6F4F] transition-colors duration-300 group-hover:bg-[#2F6F4F] group-hover:text-white">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[#8C8675] font-mono uppercase tracking-wider">Clinical Standards</p>
                    <p className="text-sm font-medium text-[#1C1A17]">FDA Approved & Gold Standard</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#E3EFE9] flex items-center justify-center text-[#2F6F4F] transition-colors duration-300 group-hover:bg-[#2F6F4F] group-hover:text-white">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-[#8C8675] font-mono uppercase tracking-wider">Availability</p>
                    <p className="text-sm font-medium text-[#1C1A17]">24/7 Emergency Admissions</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Premium Typography, Interactive Timeline & Content */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Header intro */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#2F6F4F] font-semibold flex items-center gap-1.5">
                <Stethoscope size={13} /> Clinical Overview
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-light tracking-tight leading-tight">
                Dedicated specialists committed to providing comprehensive, evidence-based care.
              </h2>
            </div>

            {/* Main copy */}
            <div className="space-y-6 text-[#5C574A] text-base md:text-lg leading-relaxed font-light">
              <p>
                Our {service.title.toLowerCase()} department is equipped with state-of-the-art diagnostic and treatment technology. We prioritize patient comfort and outcomes, working collaboratively to ensure a seamless, professional experience.
              </p>
              <p className="border-l-2 border-[#2F6F4F] pl-6 py-3 text-stone-700 italic bg-[#E3EFE9]/25 rounded-r-xl">
                "{service.desc}"
              </p>
              <p>
                Whether you are visiting for an initial consultation, routine screening, or specialized therapy, our expert practitioners will guide you step-by-step through a personalized recovery track engineered specifically for you.
              </p>
            </div>

            {/* Premium Vertical Clinical Process Timeline */}
            <div className="space-y-6 pt-4 border-t border-[#ECE6D9]">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#2F6F4F] font-bold flex items-center gap-2">
                <Award size={14} /> Care Delivery Roadmap
              </h4>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Comprehensive Diagnostics", text: "Immediate, state-of-the-art molecular screening to confirm root physical targets." },
                  { step: "02", title: "Holistic Path Review", text: "Review of custom therapy maps engineered explicitly by a lead specialist." },
                  { step: "03", title: "Continuous Monitoring", text: "Active check-ins with integrated telemetry systems to verify constant progression." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group/row">
                    <span className="h-8 w-8 rounded-lg bg-white border border-[#E6DEC0] flex items-center justify-center font-mono font-bold text-xs text-[#2F6F4F] group-hover/row:bg-[#2F6F4F] group-hover/row:text-white transition-colors duration-300">
                      {item.step}
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-[#1C1A17]">{item.title}</h5>
                      <p className="text-xs text-[#8C8675] mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Call to Action Block */}
            <div className="bg-white border border-[#E6DEC0] rounded-[32px] p-8 md:p-10 shadow-xl shadow-[#1C1A17]/[0.01] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#2F6F4F] tracking-widest font-bold">START YOUR JOURNEY</span>
                <h4 className="font-display text-xl md:text-2xl font-light">Schedule your private evaluation</h4>
              </div>
              
              <Link 
                to="/contact" 
                className="group relative inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-white bg-[#2F6F4F] hover:bg-[#25573E] px-8 py-4 rounded-full transition-all duration-300 shadow-md shadow-[#2F6F4F]/10 overflow-hidden"
              >
                {/* Micro green glowing particle effect inside button on hover */}
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Calendar size={18} />
                <span>Book Appointment</span>
              </Link>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}