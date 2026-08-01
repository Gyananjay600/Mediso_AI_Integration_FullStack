import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ShieldAlert, 
  Share2, 
  Bookmark, 
  Heart,
  ChevronRight,
  BookOpen,
  Check
} from "lucide-react";
import PageHero from "../components/PageHero";
import { articles } from "../data/content";

// High-resolution clinical background images corresponding to potential topics
const ARTICLE_HERO_IMAGES = {
  cardio: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=1200",
  nutrition: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200",
  sleep: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?auto=format&fit=crop&q=80&w=1200",
  mental: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=1200",
  default: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200"
};

export default function BlogDetail() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  
  // Custom states for interactive features
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12);

  // Monitor scroll height for premium top progress indicator bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="bg-[#FAF8F2] min-h-screen flex items-center justify-center text-center px-4">
        <div className="max-w-md p-8 bg-white border border-[#E6DEC0] rounded-[32px] shadow-sm">
          <h1 className="text-3xl font-display font-light text-[#1C1A17] mb-4">Article Not Found</h1>
          <p className="text-[#8C8675] text-sm mb-6">The medical resource or article you are searching for does not exist or has been archived.</p>
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white bg-[#2F6F4F] hover:bg-[#25573E] px-6 py-3 rounded-full transition-all"
          >
            <ArrowLeft size={16} /> Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  // Resolve dynamic hero image based on slug keyword
  const slugLower = slug?.toLowerCase() || "";
  let heroImage = ARTICLE_HERO_IMAGES.default;
  if (slugLower.includes("heart") || slugLower.includes("cardio")) heroImage = ARTICLE_HERO_IMAGES.cardio;
  else if (slugLower.includes("diet") || slugLower.includes("nutrition") || slugLower.includes("eat")) heroImage = ARTICLE_HERO_IMAGES.nutrition;
  else if (slugLower.includes("sleep") || slugLower.includes("rest")) heroImage = ARTICLE_HERO_IMAGES.sleep;
  else if (slugLower.includes("stress") || slugLower.includes("mental") || slugLower.includes("anxiety")) heroImage = ARTICLE_HERO_IMAGES.mental;

  return (
    <div className="bg-[#FAF8F2] min-h-screen text-[#1C1A17] selection:bg-[#EAE5D9] overflow-x-hidden pb-24">
      
      {/* Dynamic Smooth Scrolling Glowing Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-[#E6DEC0] z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#2F6F4F] via-[#4CAF75] to-[#2D6A4F] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 1. Page Hero with Editorial Overlay */}
      <div className="relative bg-[#FAF8F5] border-b border-[#ECE6D9] overflow-hidden">
        {/* Soft luxury background aura */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full bg-[#D4E8DD]/25 blur-[120px] mix-blend-multiply pointer-events-none" />
        
        <div className="container-x pt-8 relative z-10">
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#2F6F4F] hover:text-[#1C1A17] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Publications
          </Link>
        </div>

        <PageHero 
          eyebrow={`PUBLISHED ON ${article.date}`} 
          title={article.title} 
          subtitle="Carefully compiled, reviewed, and published by the Mediso Specialist Council to assure accurate medical education." 
        />
      </div>

      {/* 2. Article Canvas */}
      <div className="container-x py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT SIDEBAR: Meta actions & Credibility Validation Panel */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 order-2 lg:order-1">
            
            {/* Physician Verification Card */}
            <div className="bg-white border border-[#E6DEC0] rounded-[32px] p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E6DEC0]/65">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#2F6F4F] font-bold flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-[#2F6F4F]" /> Peer Verified
                </span>
                <span className="text-[10px] text-[#8C8675] uppercase font-mono">MD Approved</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#2F6F4F]/10 border border-[#E6DEC0] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300" 
                    alt="Doctor Reviewer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1A17]">Dr. Evelyn Vane, MD</h4>
                  <p className="text-[11px] text-[#8C8675]">Chief Medical Reviewer</p>
                  <p className="text-[11px] text-[#2F6F4F] font-medium">Cardiology Fellowship</p>
                </div>
              </div>
              
              <p className="text-xs text-[#5C574A] leading-relaxed font-light bg-[#FAF8F2] p-4 rounded-2xl border border-[#E6DEC0]/50">
                "This publication has been cross-referenced against current clinical trials and guidelines to ensure safe, practical patient wellness advice."
              </p>
            </div>

            {/* Quick Share / Like / Bookmark Actions Panel */}
            <div className="bg-white border border-[#E6DEC0]/75 rounded-[24px] p-5 flex items-center justify-around shadow-[0_4px_20px_rgba(28,26,23,0.01)]">
              <button 
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
                }}
                className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors py-2 px-3.5 rounded-xl ${
                  isLiked ? "text-[#2F6F4F] bg-[#E3EFE9]" : "text-[#8C8675] hover:text-[#2F6F4F]"
                }`}
              >
                <Heart size={15} fill={isLiked ? "#2F6F4F" : "none"} />
                <span>{likeCount}</span>
              </button>

              <div className="w-px h-6 bg-[#E6DEC0]" />

              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors py-2 px-3.5 rounded-xl ${
                  isBookmarked ? "text-[#2F6F4F] bg-[#E3EFE9]" : "text-[#8C8675] hover:text-[#2F6F4F]"
                }`}
              >
                <Bookmark size={15} fill={isBookmarked ? "#2F6F4F" : "none"} />
                <span>{isBookmarked ? "Saved" : "Save"}</span>
              </button>

              <div className="w-px h-6 bg-[#E6DEC0]" />

              <button className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C8675] hover:text-[#2F6F4F] transition-colors py-2 px-3.5 rounded-xl">
                <Share2 size={15} />
                <span>Share</span>
              </button>
            </div>

          </div>

          {/* RIGHT SIDEBAR: Primary Editorial Article Text */}
          <div className="lg:col-span-8 space-y-10 order-1 lg:order-2">
            
            {/* Ultra Premium Main Hero Image with subtle zooming motion */}
            <div className="relative rounded-[40px] overflow-hidden border border-[#E6DEC0] h-[300px] md:h-[460px] bg-white group shadow-md">
              <img 
                src={heroImage} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out scale-100 group-hover:scale-102"
              />
              {/* Soft overlay vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Quick Insights Takeaway Block (Clears Patient Confusion Fast) */}
            <div className="bg-[#E3EFE9]/30 border border-[#2F6F4F]/20 rounded-[32px] p-8 space-y-4">
              <h4 className="font-display font-medium text-lg text-[#2F6F4F] flex items-center gap-2">
                <BookOpen size={18} /> Direct Key Takeaways
              </h4>
              <p className="text-sm text-[#1C1A17]/85 leading-relaxed font-light">
                For patients looking for swift, actionable guidance, here are the vital points of this scientific review:
              </p>
              <ul className="grid grid-cols-1 gap-3 pt-2">
                {[
                  "Health optimization relies on systematic routines, not instantaneous shifts.",
                  "Underlying biological factors dictate individual sleep and metabolic styles.",
                  "Always consult with a qualified physician before self-administering supplement stacks."
                ].map((point, index) => (
                  <li key={index} className="flex gap-3 items-start text-xs text-[#5C574A] leading-relaxed">
                    <span className="h-4.5 w-4.5 rounded-full bg-[#2F6F4F] text-white flex items-center justify-center shrink-0 text-[9px] mt-0.5">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Editorial Body Content */}
            <div className="space-y-6 text-[#1C1A17]/80 text-base md:text-lg leading-relaxed font-light">
              <p>
                Maintaining good health is a lifelong journey shaped by daily habits. In this clinical guide, our medical team shares practical, evidence-based guidance to help you build routines that support long-term metabolic, cardiovascular, and neurological well-being.
              </p>
              
              <h3 className="font-display text-2xl md:text-3xl font-light text-[#1C1A17] tracking-tight pt-6">
                Understanding Biological Compounds
              </h3>
              
              <p>
                Small, consistent changes—from restorative deep-stage sleep cycles to regular resistance movement—can compound into significant improvements in how you feel every day. When we study longevity biomarkers, we consistently see that sustainable longevity is built in micrometers, not massive leaps.
              </p>

              {/* Patient Confusion Support Warning Highlight */}
              <div className="bg-white border border-[#E6DEC0] rounded-[32px] p-6 md:p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-2.5 text-[#2F6F4F] font-mono text-xs font-bold tracking-widest">
                  <ShieldAlert size={16} /> Patient Caution Notice
                </div>
                <h5 className="font-display text-base font-semibold">When should I seek direct clinical testing?</h5>
                <p className="text-xs md:text-sm text-[#8C8675] leading-relaxed font-light">
                  While lifestyle frameworks are incredibly powerful as preventative medicine, they should not replace diagnostic labs if you are suffering from chronic lethargy, systemic pain, or sudden vascular spikes. A targeted, 15-minute diagnostic panel can immediately pinpoint baseline metrics.
                </p>
              </div>

              <p>
                Whether you are managing existing symptoms or systematically optimizing your biological output, our expert practitioners recommend tracking active metrics and maintaining open dialogue with your assigned specialty department to assure clean, calculated oversight.
              </p>
            </div>

            {/* Bottom Navigation */}
            <div className="pt-8 border-t border-[#E6DEC0]/65 flex justify-between items-center">
              <Link 
                to="/blogs" 
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#2F6F4F] hover:text-[#1C1A17] transition-colors"
              >
                <ArrowLeft size={14} /> Back to Library
              </Link>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold bg-[#2F6F4F] text-white hover:bg-[#25573E] px-5 py-3 rounded-full transition-all shadow-md shadow-[#2F6F4F]/10"
              >
                Schedule Consultation <ChevronRight size={14} />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}