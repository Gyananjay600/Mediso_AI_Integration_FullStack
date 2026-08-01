import { Link } from "react-router-dom";
import {
  ShieldCheck,
  HeartPulse,
  Award,
  ArrowRight,
  Stethoscope,
  Activity,
  ArrowUpRight,
  Microscope,
  CreditCard,
  UserRoundCheck,
  CheckCircle2,
} from "lucide-react";

import AboutImage from "../assets/doctorsImages/doctor2.jpg";
import HealthCare from "../assets/doctorsImages/completeHealthCare.jpg";

// Place your own images in src/assets/about/ and uncomment these two lines.
// If the files don't exist yet, keep them commented — the placeholder
// blocks below will render instead so the page still compiles.
// import aboutImage from "../assets/about/about-doctor.png";
// import healthcareImage from "../assets/about/healthcare-team.jpg";

export default function About() {
  return (
    <>
      {/* ===================== ABOUT INTRO ===================== */}
      <section className="relative overflow-hidden bg-[#FCF8F1] py-24 lg:py-32">
        {/* Background Blur */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#DDF2E5] blur-3xl opacity-70" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#EAF6EF] blur-3xl opacity-80" />

        <div className="container-x relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* LEFT CONTENT */}
            <div>
              <span className="inline-flex items-center rounded-full border border-[#D8E5DB] bg-[#EAF5EF] px-5 py-2 text-sm font-semibold text-[#2F6F4F]">
                About Mediso
              </span>

              <h2 className="mt-6 text-4xl md:text-6xl font-display font-bold leading-tight text-[#1F2D27]">
                Caring For Your
                <span className="block text-[#2F6F4F]">
                  Health With Excellence
                </span>
              </h2>

              <p className="mt-8 text-lg leading-8 text-[#68746C]">
                At <span className="font-semibold text-[#2F6F4F]">Mediso</span>,
                we believe that healthcare should be compassionate, affordable,
                and accessible for everyone. Our experienced doctors, advanced
                medical technology, and patient-first philosophy help us deliver
                exceptional healthcare services every single day.
              </p>

              {/* Features */}
              <div className="mt-10 grid gap-5">
                <div className="flex items-start gap-4 rounded-2xl border border-[#E5ECE7] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF5EF] text-[#2F6F4F]">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-[#1F2D27]">
                      Trusted Healthcare
                    </h4>
                    <p className="mt-2 text-[#6C746F] leading-7">
                      Delivering quality treatment through modern technology,
                      ethical practices, and experienced healthcare
                      professionals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-[#E5ECE7] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF5EF] text-[#2F6F4F]">
                    <HeartPulse size={28} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-[#1F2D27]">
                      Patient First
                    </h4>
                    <p className="mt-2 text-[#6C746F] leading-7">
                      Every treatment plan is designed around the needs,
                      comfort, and well-being of our patients.
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  to="/contact"
                  className="rounded-full bg-[#2F6F4F] px-8 py-4 text-white font-semibold transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Book Appointment
                </Link>

                <Link
                  to="/services"
                  className="group inline-flex items-center gap-3 rounded-full border border-[#D7E4DA] bg-white px-8 py-4 font-semibold text-[#2F6F4F] transition duration-300 hover:border-[#2F6F4F] hover:bg-[#F5FBF7]"
                >
                  Explore Services
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <div className="overflow-hidden rounded-[40px] border border-[#E7ECE8] bg-white shadow-2xl h-[420px] flex items-center justify-center bg-[#EAF5EF]">
                <img
                  src={AboutImage}
                  alt="About Mediso"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Floating Experience Card */}
              <div className="absolute -left-10 top-12 rounded-3xl bg-white p-6 shadow-2xl border border-[#E8ECE8]">
                <Award className="text-[#2F6F4F]" size={34} />
                <h3 className="mt-3 text-4xl font-bold text-[#1F2D27]">30+</h3>
                <p className="text-[#6C746F]">Years Experience</p>
              </div>

              {/* Floating Trust Card */}
              <div className="absolute -right-8 bottom-10 rounded-3xl bg-[#2F6F4F] p-6 text-white shadow-2xl">
                <h3 className="text-3xl font-bold">98%</h3>
                <p className="mt-2 text-white/80">Patient Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== HEALTH PRIORITY ===================== */}
      <section className="relative py-28 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#EAF5EF] blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-[#F5FAF7] blur-3xl opacity-70" />

        <div className="container-x relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex rounded-full border border-[#DCE8E0] bg-[#EAF5EF] px-5 py-2 text-sm font-semibold text-[#2F6F4F]">
              Why Choose Us
            </span>
            <h2 className="mt-6 text-4xl md:text-6xl font-display font-bold text-[#1F2D27] leading-tight">
              Your Health Is
              <span className="block text-[#2F6F4F]">Our Top Priority</span>
            </h2>
            <p className="mt-6 text-lg text-[#66736B] leading-8">
              We combine compassionate healthcare, cutting-edge technology, and
              experienced medical professionals to deliver exceptional treatment
              with a patient-first approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">
            {[
              {
                icon: HeartPulse,
                bg: "bg-[#FCF8F1]",
                title: "Compassionate Care",
                desc: "Every patient receives personalized care, empathy, and dedicated medical attention throughout their journey.",
              },
              {
                icon: ShieldCheck,
                bg: "bg-white",
                title: "Safe Treatment",
                desc: "Following international healthcare standards, ensuring every treatment is safe, reliable, and transparent.",
              },
              {
                icon: Stethoscope,
                bg: "bg-[#FCF8F1]",
                title: "Expert Specialists",
                desc: "Our experienced doctors provide evidence-based diagnosis and treatment for every patient.",
              },
              {
                icon: Activity,
                bg: "bg-white",
                title: "Advanced Technology",
                desc: "Equipped with modern healthcare technology for faster diagnosis and better patient outcomes.",
              },
            ].map(({ icon: Icon, bg, title, desc }) => (
              <div
                key={title}
                className={`group relative overflow-hidden rounded-[32px] ${bg} border border-[#E7ECE8] p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2F6F4F]/5 via-transparent to-[#2F6F4F]/10 opacity-0 group-hover:opacity-100 transition" />
                <div className="w-16 h-16 rounded-2xl bg-[#EAF5EF] flex items-center justify-center text-[#2F6F4F] group-hover:bg-[#2F6F4F] group-hover:text-white transition duration-500">
                  <Icon size={32} />
                </div>
                <h3 className="mt-8 text-2xl font-display font-bold text-[#1F2D27]">
                  {title}
                </h3>
                <p className="mt-4 text-[#66736B] leading-8">{desc}</p>
                <div className="mt-8 flex items-center gap-2 font-semibold text-[#2F6F4F]">
                  Learn More
                  <ArrowUpRight
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                    size={18}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPLETE HEALTHCARE SOLUTION ================= */}
      <section className="relative overflow-hidden py-28 bg-[#FCF8F1]">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#EAF5EF] blur-3xl opacity-70" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#E2F3E8] blur-3xl opacity-60" />

        <div className="container-x relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* LEFT IMAGE */}
            <div className="relative">
              <div className="overflow-hidden rounded-[40px] shadow-2xl border border-[#E5ECE7] h-[380px] flex items-center justify-center bg-[#EAF5EF]">
                <img
                  src={HealthCare}
                  alt="About Us"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="absolute -bottom-8 -right-8 rounded-3xl bg-white shadow-2xl p-8 border border-[#E5ECE7]">
                <h2 className="text-5xl font-bold text-[#2F6F4F]">30+</h2>
                <p className="mt-2 text-[#68746C]">
                  Years of Medical Excellence
                </p>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <span className="inline-flex rounded-full bg-[#EAF5EF] border border-[#DDE9E0] px-5 py-2 text-sm font-semibold text-[#2F6F4F]">
                Complete Healthcare
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-display font-bold leading-tight text-[#1F2D27]">
                Complete Healthcare Solution
                <span className="block text-[#2F6F4F]">
                  For Our Valuable Patients
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-[#67736B]">
                We provide world-class healthcare services with modern medical
                equipment, experienced doctors, qualified nurses, and an easy
                patient management system designed to make every visit
                comfortable and stress-free.
              </p>

              <div className="mt-12 space-y-6">
                {[
                  {
                    icon: Microscope,
                    title: "Modern Instruments",
                    desc: "Diagnosy always provides advanced healthcare equipment for accurate diagnosis and better treatment outcomes.",
                    tag: "Latest Medical Technology",
                  },
                  {
                    icon: CreditCard,
                    title: "Easy Billing System",
                    desc: "Our simplified billing process makes healthcare payments transparent, quick and convenient for every patient.",
                    tag: "Fast & Secure Payments",
                  },
                  {
                    icon: UserRoundCheck,
                    title: "Qualified Nurses & Staff",
                    desc: "Our experienced nurses and healthcare staff ensure compassionate care, patient safety, and continuous support throughout treatment.",
                    tag: "Experienced Medical Professionals",
                  },
                ].map(({ icon: Icon, title, desc, tag }) => (
                  <div
                    key={title}
                    className="group flex gap-6 rounded-3xl bg-white p-6 border border-[#E7ECE8] shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-[#EAF5EF] flex items-center justify-center text-[#2F6F4F] group-hover:bg-[#2F6F4F] group-hover:text-white transition shrink-0">
                      <Icon size={30} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-[#1F2D27]">
                        {title}
                      </h3>
                      <p className="mt-3 text-[#68746C] leading-7">{desc}</p>
                      <div className="mt-4 flex items-center gap-2 text-[#2F6F4F] font-medium">
                        <CheckCircle2 size={18} />
                        {tag}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
