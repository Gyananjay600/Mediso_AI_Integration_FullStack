import { Link } from "react-router-dom";
import { useState } from "react";
import doctorHero from "../assets/HeroPageDoctor.png";
import CountUp from "react-countup";
import { Users, Stethoscope, Award, HeartHandshake } from "lucide-react";
import {
  Star,
  Search,
  Shield,
  Eye,
  Video,
  Heart,
  Check,
  ArrowRight,
  Activity,
  ArrowUpRight,
  HeartPulse,
  ShieldAlert,
  Sparkles,
  Leaf,
} from "lucide-react";
import {
  stats,
  visionFeatures,
  services,
  doctors,
  testimonials,
  articles,
} from "../data/content";

const featureIcons = [HeartPulse, Sparkles, Leaf];

export default function Home() {
  console.log(CountUp);
  return (
    <div>
      {/* Hero */}
      <section className="container-x pt-14 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Side */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-black/10 text-sm">
                <Star size={14} className="fill-primary text-primary" />
                <span className="font-medium">4.7</span>
                <span className="text-ink/50">| 3,460 Reviews</span>
              </div>
            </div>

            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-normal max-w-3xl">
              A modern, <span className="text-primary">safe</span> and effective
              approach to <span className="text-primary">well being</span>
            </h1>

            <div className="flex gap-4 mt-8">
              <Link to="/contact" className="btn-primary">
                Book Now
              </Link>

              <Link to="/about" className="btn-outline">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative flex justify-center items-center group">
              {/* Glow Effect */}
              <div className="absolute w-[420px] h-[420px] rounded-full bg-blue-600/30 blur-3xl -z-20"></div>

              {/* Blue Rounded Background */}
              <div className="absolute w-[480px] h-[560px] rounded-[70px] bg-[#4083c7] -z-10"></div>

              {/* Doctor Image */}
              <img
                src={doctorHero}
                alt="Doctor"
                className="
      w-full
      max-w-[820px]
      object-contain
      drop-shadow-[0_30px_50px_rgba(0,0,0,0.18)]
    "
              />

              {/* Bottom Gradient (Hides Cut Fingers) */}
              <div
                className="
      absolute
      bottom-0
      left-0
      right-0
      h-40
      bg-gradient-to-t
      from-white
      via-white/90
      to-transparent
      pointer-events-none
    "
              ></div>
            </div>
          </div>
        </div>

        {/* Existing Doctor Cards */}
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {doctors.slice(0, 2).map((doc) => (
            <div key={doc.slug} className="card p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center text-primary font-display font-semibold text-lg shrink-0">
                {doc.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div>
                <p className="text-xs text-primary font-medium mb-0.5">
                  Available Doctors
                </p>
                <p className="font-semibold text-ink">{doc.name}</p>
                <p className="text-sm text-ink/50">{doc.role}</p>
              </div>
            </div>
          ))}

          <div className="card p-5 flex items-center gap-3">
            <Search size={20} className="text-primary" />
            <span className="text-ink/70">Search for a Doctor</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden py-24 bg-[#F8F3E9]">
        {/* Background Decoration */}
        <div className="absolute -top-24 left-0 w-80 h-80 bg-[#DDF0E4] rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 right-0 w-96 h-96 bg-[#EAF5EF] rounded-full blur-3xl opacity-60"></div>

        <div className="container-x relative z-10">
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-[#EAF5EF] px-5 py-2 text-sm font-semibold text-[#2F6F4F] border border-[#D8E4DB]">
              Our Achievements
            </span>

            <h2 className="mt-5 text-4xl md:text-5xl font-display font-bold text-[#1F2D27]">
              Trusted by Thousands of Patients
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-lg text-[#647067]">
              Delivering exceptional healthcare with experienced doctors, modern
              facilities, and compassionate care.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, index) => {
              const icons = [Users, Stethoscope, HeartHandshake, Award];

              const Icon = icons[index % icons.length];

              return (
                <div
                  key={s.label}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-[#E3E8E2] p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                >
                  {/* Shine */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#F4F8F5] to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Icon */}
                  <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#EAF5EF] flex items-center justify-center text-[#2F6F4F] transition-all duration-500 group-hover:bg-[#2F6F4F] group-hover:text-white group-hover:rotate-6">
                    <Icon size={34} />
                  </div>

                  {/* Number */}
                  <h3 className="relative z-10 text-5xl font-bold text-[#1F2D27] mb-3 transition-all duration-500 group-hover:scale-110">
                    {s.value}
                  </h3>

                  {/* Label */}
                  <p className="relative z-10 text-[#6D756F] text-lg">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="container-x py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          {/* Left Side */}
          <div>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-5 py-2 text-primary font-semibold text-sm mb-8">
              Our Vision
            </span>

            <h2 className="font-display font-bold text-5xl lg:text-6xl leading-[1.1] text-ink max-w-xl">
              Finding health
              <br />
              solutions with
              <br />
              top <span className="text-primary">Experts</span>
            </h2>

            <p className="mt-8 text-lg text-ink/60 leading-8 max-w-lg">
              We combine experienced healthcare professionals with modern
              technology to deliver trusted, personalized, and accessible
              medical services for everyone.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-3 mt-10 bg-primary text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              About Us
              <ArrowUpRight size={18} />
            </Link>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {visionFeatures.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];

              return (
                <div
                  key={f.title}
                  className="group bg-white border border-slate-200 rounded-[28px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <Icon size={26} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-semibold text-ink mb-3">
                        {f.title}
                      </h3>

                      <p className="text-ink/60 text-lg leading-8">{f.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {visionFeatures.map((f, i) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <div key={f.title} className="card p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-ink/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      
      {/* Services */}
      <section className="relative py-28 bg-[#FCF8F1] overflow-hidden">
        {/* Background Blur */}
        <div className="absolute -top-24 left-0 w-80 h-80 rounded-full bg-[#E8F5ED] blur-3xl opacity-60"></div>
        <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-[#F5F9F7] blur-3xl opacity-70"></div>

        <div className="container-x relative z-10">
          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="inline-flex items-center rounded-full bg-[#EAF5EF] px-5 py-2 border border-[#D8E4DB] text-[#2F6F4F] text-sm font-semibold">
              Our Services
            </span>

            <h2 className="mt-6 text-5xl md:text-6xl font-display font-bold text-[#1F2D27] leading-tight">
              Comprehensive Healthcare
              <span className="block text-[#2F6F4F]">Designed Around You</span>
            </h2>

            <p className="mt-6 text-lg text-[#68746C] leading-8 max-w-2xl mx-auto">
              We offer specialized healthcare services with experienced doctors,
              advanced technology, and compassionate care for every patient.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group relative overflow-hidden rounded-[30px] bg-white border border-[#E7ECE8] p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2F6F4F]/5 via-transparent to-[#2F6F4F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Shine */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#EAF5EF] flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-[#2F6F4F]">
                  <ArrowUpRight
                    size={28}
                    className="text-[#2F6F4F] group-hover:text-white group-hover:rotate-45 transition-all duration-500"
                  />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-2xl font-display font-bold text-[#1F2D27] mb-4 group-hover:text-[#2F6F4F] transition-colors">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-[#6B746F] leading-8">
                  {s.desc}
                </p>

                {/* Bottom Line */}
                <div className="relative z-10 mt-8 flex items-center gap-2 font-semibold text-[#2F6F4F]">
                  Learn More
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

  <section className="bg-[#F8F6F0] py-24 sm:py-32 relative overflow-hidden text-[#0B1E15] font-sans">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-[#2D6A4F]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[400px] h-[400px] rounded-full bg-[#3D8B5B]/5 blur-[100px] pointer-events-none" />

      <div className="container-x max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-xs font-bold text-[#2D6A4F] uppercase tracking-widest">
            <Sparkles size={12} /> Specialized Care Models
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Tailored healthcare designed around your life
          </h2>
          <p className="text-[#0B1E15]/60 text-sm sm:text-base leading-relaxed">
            Whether you prefer the comfort of home consultations or dedicated structured wellness programs, we bring world-class medicine to you.
          </p>
        </div>

        {/* Asymmetric Premium Dual Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Card 1: Virtual Care (Immersive Forest Green) */}
          <div className="group relative flex flex-col justify-between p-8 sm:p-12 bg-[#0B1E15] text-[#F8F6F0] rounded-3xl overflow-hidden shadow-xl hover:shadow-[#0B1E15]/15 hover:-translate-y-2 transition-all duration-500 ease-out border border-[#2D6A4F]/10">
            {/* Hover card glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#2D6A4F]/20 rounded-full blur-[60px] group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
            
            <div className="relative space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-xl bg-[#2D6A4F]/25 text-[#4CAF75] border border-[#2D6A4F]/20">
                  <Video size={20} />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#4CAF75]">
                  Virtual Clinic
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
                Comprehensive Telemedicine Services
              </h3>

              <ul className="space-y-4 pt-2">
                {[
                  "Virtual consultations from home",
                  "Remote vital signs monitoring",
                  "24/7 priority medical support"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-[#F8F6F0]/80">
                    <span className="h-5 w-5 rounded-full bg-[#2D6A4F]/30 border border-[#2D6A4F]/30 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-[#4CAF75]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative pt-10">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#F8F6F0] hover:text-[#4CAF75] transition-colors duration-300 group/btn"
              >
                <span>Learn more about virtual care</span>
                <span className="h-8 w-8 rounded-full border border-[#F8F6F0]/20 flex items-center justify-center group-hover/btn:border-[#4CAF75] group-hover/btn:translate-x-1.5 transition-all duration-300">
                  <ArrowRight size={14} className="group-hover/btn:text-[#4CAF75]" />
                </span>
              </Link>
            </div>
          </div>

          {/* Card 2: Total Wellness (Warm Off-White Sand Card) */}
          <div className="group relative flex flex-col justify-between p-8 sm:p-12 bg-white text-[#0B1E15] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(11,30,21,0.01)] hover:shadow-[0_24px_50px_rgb(11,30,21,0.04)] hover:-translate-y-2 transition-all duration-500 ease-out border border-[#0B1E15]/5">
            {/* Hover card glow */}
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#2D6A4F]/5 rounded-full blur-[40px] group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

            <div className="relative space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 rounded-xl bg-[#2D6A4F]/10 text-[#2D6A4F]">
                  <Heart size={20} />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#2D6A4F]">
                  Total Wellness
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
                Integrated Wellness Programs
              </h3>

              <ul className="space-y-4 pt-2">
                {[
                  "Regular digital health screenings",
                  "Custom clinic-grade nutrition plans",
                  "Direct access mental health counseling"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-[#0B1E15]/75">
                    <span className="h-5 w-5 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-[#2D6A4F]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative pt-10">
              <Link 
                to="/contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2D6A4F] hover:bg-[#1E4835] text-white font-semibold rounded-xl px-6 py-3.5 transition-all duration-300 shadow-md shadow-[#2D6A4F]/10 hover:shadow-[#2D6A4F]/20 hover:-translate-y-0.5 active:translate-y-0 text-sm"
              >
                Get started
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>

      {/* Doctors */}
      <section className="bg-white py-24">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">Doctors</span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold">
              Meet our expert medical team of dedicated specialists
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {doctors.map((d) => (
              <Link
                key={d.slug}
                to={`/doctors/${d.slug}`}
                className="card p-8 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/15 flex items-center justify-center text-primary font-display font-semibold text-2xl mb-4">
                  {d.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <p className="text-sm text-primary font-medium mb-1">
                  {d.role}
                </p>
                <h3 className="font-display font-semibold text-lg">{d.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F8F6F0] py-24 sm:py-32 border-b border-[#0B1E15]/5 relative overflow-hidden font-sans text-[#0B1E15]">
        <div className="container-x max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Text Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#2D6A4F]">
                  <Sparkles size={12} className="animate-pulse" /> Digital Health Frontiers
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-serif italic leading-tight max-w-xl">
                  Comprehensive Telemedicine Services
                </h2>
                <p className="text-[#0B1E15]/60 text-base max-w-lg leading-relaxed">
                  Skip the waiting rooms. Connect securely with premier clinical experts through lag-free encryption lines directly from your private living spaces.
                </p>
              </div>

              {/* Flat Minimalist Feature Rows */}
              <div className="space-y-4 max-w-md">
                {[
                  { title: "Virtual consultations", desc: "Face-to-face secure diagnostics from your home environment." },
                  { title: "Remote vital tracking", desc: "Live integration with wearable diagnostic infrastructure." },
                  { title: "24/7 Medical support", desc: "Direct, on-call operational assistance for emergency questions." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <span className="h-6 w-6 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors duration-300">
                      <Check size={12} className="text-[#2D6A4F] group-hover:text-white" />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm tracking-tight">{item.title}</h4>
                      <p className="text-xs text-[#0B1E15]/50 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-[#2D6A4F] group"
                >
                  <span>Learn more about virtual clinic models</span>
                  <span className="p-2.5 rounded-full bg-[#2D6A4F] text-white group-hover:translate-x-2 transition-transform duration-300 shadow-md shadow-[#2D6A4F]/20">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Premium Image Container (5 Cols) */}
            <div className="lg:col-span-5 relative group">
              <div className="relative w-full aspect-[4/5] bg-[#0B1E15] rounded-[2rem] overflow-hidden shadow-2xl z-10 transition-transform duration-700 group-hover:-translate-y-2">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                  alt="Telemedicine Services" 
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
                {/* Fallback abstract design patterns if image fails to load */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1E15] via-[#163527] to-[#2D6A4F] flex items-center justify-center p-8 -z-10">
                  <Activity size={48} className="text-[#4CAF75]/30 animate-pulse" />
                </div>
              </div>
              
              {/* Offset design floating frame border animation */}
              <div className="absolute inset-0 border border-[#2D6A4F]/20 rounded-[2rem] translate-x-4 translate-y-4 -z-0 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 ease-out" />
            </div>

          </div>
        </div>
      </section>

      {/* --- Section 2: Clinical Wellness Ecosystem --- */}
      <section className="bg-[#F8F6F0] py-24 sm:py-32 relative overflow-hidden font-sans text-[#0B1E15]">
        
        {/* Soft dynamic ambient aura structures */}
        <div className="absolute top-1/3 right-[-10%] w-[500px] h-[500px] rounded-full bg-[#4CAF75]/5 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 left-[-5%] w-[400px] h-[400px] rounded-full bg-[#2D6A4F]/5 blur-[90px] pointer-events-none" />

        <div className="container-x max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* --- Left Image Column (5 Cols) --- */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative group">
              
              {/* The Floating Frame Aesthetic */}
              <div className="w-full aspect-[4/5] bg-white rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(11,30,21,0.02)] border border-[#0B1E15]/5 transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(45,106,79,0.08)] group-hover:-translate-y-1">
                <div className="w-full h-full rounded-[2rem] overflow-hidden bg-[#EAE7DF] relative">
                  
                  <img 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" 
                    alt="Wellness Programs" 
                    className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  
                  {/* Fallback pattern window if image fails to load */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#EAE7DF] via-[#F8F6F0] to-white flex items-center justify-center -z-10">
                    <Leaf size={40} className="text-[#2D6A4F]/20 group-hover:rotate-12 transition-transform duration-500" />
                  </div>

                  {/* Overlaid Modern Minimal Glass Badge */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#2D6A4F] block mb-0.5">Preventative Architecture</span>
                    <h4 className="text-sm font-bold tracking-tight text-[#0B1E15]">Active Human Optimization Blueprint</h4>
                  </div>
                </div>
              </div>

              {/* Micro background visual tag line element */}
              <div className="absolute -top-6 -right-6 h-20 w-20 border-t-2 border-r-2 border-[#2D6A4F]/20 rounded-tr-[2rem] pointer-events-none group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            </div>

            {/* --- Right Content Column (7 Cols) --- */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-8 lg:pl-6">
              
              {/* Header Messaging */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#0B1E15]/5 text-xs text-[#2D6A4F] font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles size={12} className="text-[#4CAF75]" /> Total Wellness Ecosystem
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0B1E15] leading-tight">
                  Integrated Clinical Wellness Programs
                </h2>
                <p className="text-[#0B1E15]/60 text-base max-w-xl leading-relaxed">
                  True health isn’t merely reactive emergency intervention—it is the calculated, continuous optimization of your body’s unique daily biometrics.
                </p>
              </div>

              {/* Custom Interactive Vertical Walkway Path */}
              <div className="space-y-6 pt-2">
                {[
                  { metric: "01", title: "Regular Preventive Screenings", text: "Proactive deep molecular frameworks and continuous health trend diagnostics." },
                  { metric: "02", title: "Custom Clinical Nutrition plans", text: "Targeted macro architecture frameworks explicitly mapped to your unique metabolic style." },
                  { metric: "03", title: "Direct Mental Health Counseling", text: "Instant unhindered communication channels to premium psychological advisors." }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex gap-5 items-start p-4 rounded-2xl hover:bg-white border border-transparent hover:border-[#0B1E15]/5 transition-all duration-300 group/row hover:shadow-[0_10px_30px_rgba(11,30,21,0.01)]"
                  >
                    <span className="h-10 w-10 rounded-xl bg-white group-hover/row:bg-[#0B1E15] group-hover/row:text-white text-[#2D6A4F] font-serif font-bold text-sm flex items-center justify-center border border-[#0B1E15]/5 shadow-sm shrink-0 transition-all duration-300">
                      {item.metric}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm tracking-tight text-[#0B1E15] group-hover/row:text-[#2D6A4F] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#0B1E15]/50 leading-relaxed max-w-lg">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Callout Button */}
              <div className="pt-4">
                <Link 
                  to="/contact" 
                  className="relative inline-flex items-center justify-center gap-3 bg-[#0B1E15] hover:bg-[#2D6A4F] text-[#F8F6F0] font-semibold rounded-2xl px-8 py-4.5 transition-all duration-300 shadow-xl shadow-[#0B1E15]/10 hover:shadow-[#2D6A4F]/20 hover:-translate-y-0.5 active:translate-y-0 text-sm group overflow-hidden"
                >
                  {/* Clean white interior sweep animation line */}
                  <div className="absolute inset-0 w-1/2 h-full bg-white/5 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                  
                  <span>Initiate Program Enrollment</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x my-32 max-w-6xl mx-auto px-6 sm:px-8 relative overflow-hidden font-sans text-[#0B1E15]">
      {/* Dynamic ambient halo element behind the shield */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#2D6A4F]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Main Container - Switched to Premium Neutral Cream Paper Sheet */}
      <div className="relative bg-white text-[#0B1E15] rounded-[2.5rem] p-8 sm:p-14 lg:p-20 overflow-hidden shadow-[0_15px_50px_rgba(11,30,21,0.03)] border border-[#0B1E15]/5 group transition-all duration-500 hover:border-[#2D6A4F]/20">
        
        {/* Organic Corner Accent Glow */}
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-gradient-to-bl from-[#2D6A4F]/10 via-transparent to-transparent rounded-full blur-[60px] group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
        
        {/* Large abstract line-art watermark */}
        <div className="absolute -bottom-12 -left-12 opacity-[0.03] text-[#0B1E15] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none select-none">
          <HeartPulse size={280} className="stroke-[1]" />
        </div>

        {/* Asymmetric Responsive Grid */}
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Block: Modern Micro-Typography & Content (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D6A4F]/10 border border-[#2D6A4F]/10 text-xs font-bold text-[#2D6A4F] uppercase tracking-widest animate-fade-in">
              <Sparkles size={12} className="text-[#2D6A4F] animate-pulse" /> Begin Your Journey
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B1E15] leading-tight max-w-2xl">
              Ready to take complete charge of your health and future?
            </h2>
            
            <p className="text-[#0B1E15]/60 text-sm sm:text-base max-w-lg leading-relaxed">
              Join thousands of individuals who trust our clinical ecosystem to deliver precision care, remote metric analysis, and dedicated wellness pathways.
            </p>
          </div>

          {/* Right Block: High-Contrast Dynamic Button (4 cols) */}
          <div className="lg:col-span-4 flex lg:justify-end items-center">
            <Link
              to="/contact"
              className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0B1E15] hover:bg-[#2D6A4F] text-[#F8F6F0] font-semibold rounded-2xl px-8 py-5 transition-all duration-300 shadow-xl shadow-[#0B1E15]/10 hover:shadow-[#2D6A4F]/30 hover:-translate-y-1 active:translate-y-0 text-sm tracking-wide group/btn overflow-hidden"
            >
              {/* Subtle glass sweep effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000 ease-out" />
              
              <span>Initialize Consultation</span>
              <span className="p-1 rounded-lg bg-white/10 text-white group-hover/btn:translate-x-1.5 transition-transform duration-300">
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>

        </div>

        {/* Minimalist Border Accents at the very bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2D6A4F]/20 to-transparent" />
      </div>
    </section>
    </div>
  );
}
