import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Fingerprint, 
  Zap, 
  Layers, 
  Cpu, 
  Anchor, 
  Target, 
  Box, 
  Share2, 
  Play,
  Terminal,
  FileText,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Check,
  Calendar,
  Download,
  Loader2,
  ArrowLeft,
  FileDown,
  Lock
} from 'lucide-react';

/**
 * --- DATA: SUB-TOPIC CONTENT ---
 */
const TOPIC_DATA = {
  // CLARITY MODULES
  "self-clarity": {
    title: "Self-Clarity Protocol",
    subtitle: "Module 1.1: Identity Architecture",
    icon: Fingerprint,
    description: "You cannot build a skyscraper on a swamp. Before students can lead others, they must map their own internal foundation.",
    points: [
      { head: "Blindspot Audit", body: "Identifying unconscious behavioral patterns that limit performance." },
      { head: "Values Encryption", body: "Defining the non-negotiable core values that drive decision making." },
      { head: "Strength Diagnostics", body: "Moving beyond 'good at math' to specific cognitive advantages." }
    ],
    outcome: "Student graduates with a clear 'User Manual' for their own personality."
  },
  "thought-clarity": {
    title: "Thought Clarity",
    subtitle: "Module 1.2: Cognitive Processor",
    icon: Cpu,
    description: "Upgrading the operating system of the mind. Moving from rote memorization to first-principles thinking.",
    points: [
      { head: "Bias Detection", body: "Recognizing cognitive biases (Confirmation, Sunk Cost) in real-time." },
      { head: "Logic Frameworks", body: "Applying mental models like Inversion and Second-Order Thinking." },
      { head: "Information Filtering", body: "Techniques to separate signal from noise in a digital age." }
    ],
    outcome: "Ability to deconstruct complex problems into solvable component parts."
  },
  "direction-clarity": {
    title: "Direction Clarity",
    subtitle: "Module 1.3: The Compass",
    icon: Box,
    description: "Replacing vague ambition with calculated trajectory. Designing a future based on intrinsic drive, not external pressure.",
    points: [
      { head: "North Star Design", body: "Setting high-level vision metrics beyond just career titles." },
      { head: "Reverse Engineering", body: "Working backward from the goal to the immediate next step." },
      { head: "Opportunity Cost", body: "Learning what to say 'no' to in order to protect the path." }
    ],
    outcome: "A vivid, actionable 5-year roadmap tailored to the student's DNA."
  },
  "action-clarity": {
    title: "Action Clarity",
    subtitle: "Module 1.4: Execution Engine",
    icon: Anchor,
    description: "Turning abstract intent into concrete daily reality. The bridge between 'wanting' and 'doing'.",
    points: [
      { head: "Atomic Habit Stacking", body: "Building behavioral chains that require zero willpower." },
      { head: "Deep Work Protocols", body: "Training focus stamina for high-intensity output." },
      { head: "Resilience Subroutines", body: "Pre-planned responses for failure and setbacks." }
    ],
    outcome: "A reliable daily system that ensures progress regardless of motivation levels."
  },

  // CREATIVE MODULES
  "divergent-thinking": {
    title: "Divergent Thinking",
    subtitle: "Module 2.1: Ideation Engine",
    icon: Zap,
    description: "Breaking rigid neural pathways. Most schools teach convergent thinking (one right answer). We teach divergent thinking (many possible answers).",
    points: [
      { head: "Constraint Removal", body: "Exercises to temporarily suspend the laws of physics/logic to find novelty." },
      { head: "Association Matrices", body: "Connecting unrelated concepts to spawn original ideas." },
      { head: "Quantity over Quality", body: "Training the brain to produce volume before filtering for value." }
    ],
    outcome: "The ability to generate 100 bad ideas to find the 1 brilliant one."
  },
  "structural-planning": {
    title: "Structural Planning",
    subtitle: "Module 2.2: Idea Architecture",
    icon: Layers,
    description: "Converting a messy cloud of ideas into a executable blueprint. The transition from artist to architect.",
    points: [
      { head: "System Mapping", body: "Visualizing how different parts of a project interact." },
      { head: "Resource Allocation", body: "Estimating time, energy, and tools required for the build." },
      { head: "Scope Definition", body: "Defining exactly what the project is—and what it is not." }
    ],
    outcome: "A clear project spec sheet ready for construction."
  },
  "rapid-prototyping": {
    title: "Rapid Prototyping",
    subtitle: "Module 2.3: MVP Build",
    icon: Target,
    description: "Bias towards action. Moving from theory to tangible reality in the shortest time possible.",
    points: [
      { head: "Minimum Viable Product", body: "Building the simplest version that proves the concept." },
      { head: "Feedback Loops", body: "Testing early versions to gather data for iteration." },
      { head: "Iteration Speed", body: "Learning to fail fast and improve faster." }
    ],
    outcome: "A working physical or digital prototype of the student's vision."
  },
  "narrative-design": {
    title: "Narrative Design",
    subtitle: "Module 2.4: The Interface",
    icon: Share2,
    description: "If you build it but can't explain it, it doesn't exist. The art of persuasive communication.",
    points: [
      { head: "Story Arc Construction", body: "Structuring a pitch using the Hero's Journey framework." },
      { head: "Visual Rhetoric", body: "Designing slides and visuals that amplify, not distract." },
      { head: "Public Presence", body: "Mastering tone, pace, and body language for high-stakes delivery." }
    ],
    outcome: "A TED-style presentation of the student's final project."
  }
};

/**
 * --- ANIMATION UTILS ---
 */

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target); 
      }
    }, { threshold: 0.1 }); 
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transform transition-all duration-700 ease-out ${
        visible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      } ${className}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Button = ({ children, variant = "primary", className = "", icon: Icon, onClick, type = "button", disabled = false }) => {
  const styles = {
    primary: "bg-white text-black hover:bg-neutral-200 border border-transparent shadow-[0px_2px_0px_0px_rgba(255,255,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-transparent text-white border border-neutral-700 hover:bg-neutral-900 disabled:opacity-50",
    ghost: "bg-transparent text-neutral-400 hover:text-white border-transparent"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 group active:translate-y-0.5 ${styles[variant]} ${className}`}
    >
      {children}
      {Icon && <Icon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </button>
  );
};

/**
 * --- MODALS & SUB-PAGES ---
 */

const DeployModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-neutral-900 w-full max-w-4xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 border border-white/10 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black">
           <div className="flex items-center gap-2 text-white">
             <Terminal size={16} />
             <span className="font-mono text-sm">System Deployment Protocol</span>
           </div>
           <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
             <X size={20} />
           </button>
        </div>
        <div className="flex-1 bg-white">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLScVqOcJpZ__TXaxCAcFfG20RlWJ1XmaoM_dlSzA9w2eVroEWQ/viewform?embedded=true" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            marginHeight="0" 
            marginWidth="0"
            title="Deploy Form"
            sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
          >
            Loading system interface...
          </iframe>
        </div>
      </div>
    </div>
  );
};

const CalendlyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
       <div className="relative bg-white w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-500 flex flex-col">
         <div className="flex justify-between items-center p-4 bg-black border-b border-white/10 text-white">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="font-mono text-sm">Schedule Concept Call</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
         </div>
         <div className="flex-1 bg-white">
            <iframe 
              src="https://calendly.com/ninedreamsss/30min" 
              width="100%" 
              height="100%" 
              frameBorder="0"
              title="Calendly Scheduling"
              sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
            ></iframe>
         </div>
       </div>
    </div>
  );
};

// SUB-PAGE: TOPIC DETAIL
const TopicDetailPage = ({ topicId, onBack }) => {
  const data = TOPIC_DATA[topicId];
  if (!data) return null;

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 animate-in slide-in-from-right duration-700 ease-[0.22,1,0.36,1]">
      <div className="max-w-4xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-neutral-500 hover:text-white mb-12 transition-colors font-mono text-xs uppercase tracking-widest group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Return to Dashboard
        </button>

        <div className="border-l-2 border-white/10 pl-8 mb-16">
          <div className="flex items-center gap-3 mb-4 text-green-500 font-mono text-xs uppercase tracking-widest">
             <data.icon size={16} />
             {data.subtitle}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">{data.title}</h1>
          <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">{data.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {data.points.map((point, i) => (
            <div key={i} className="bg-neutral-900/50 border border-white/10 p-8 rounded-xl hover:border-white/30 transition-colors">
              <div className="text-white font-bold mb-3 flex items-center gap-2">
                <span className="text-neutral-600 font-mono text-xs">0{i+1}</span>
                {point.head}
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex items-center gap-6">
           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
             <Check className="text-black" size={24} />
           </div>
           <div>
             <div className="text-neutral-500 font-mono text-xs uppercase tracking-widest mb-1">Module Outcome</div>
             <div className="text-white font-medium text-lg">{data.outcome}</div>
           </div>
        </div>
      </div>
    </div>
  );
};

// DOWNLOAD PAGE
const DownloadPage = ({ onBack }) => {
  // Using the new Google Drive ID from your link: 1j8RZEQ7nXJNe4vivE9UQ7whvc0h5F2iL
  const driveEmbedUrl = "https://drive.google.com/file/d/1j8RZEQ7nXJNe4vivE9UQ7whvc0h5F2iL/preview"; 
  const directDownloadUrl = "https://drive.google.com/uc?export=download&id=1j8RZEQ7nXJNe4vivE9UQ7whvc0h5F2iL";

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 animate-in slide-in-from-right duration-700 ease-[0.22,1,0.36,1]">
      <div className="max-w-6xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-neutral-500 hover:text-white mb-8 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Return to System
        </button>
        
        <div className="grid lg:grid-cols-12 gap-12 h-[calc(100vh-200px)]">
          
          {/* Left: Content & Context */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="space-y-8">
              <div>
                <div className="inline-block px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-xs font-mono mb-4">/// SYSTEM DOCUMENTATION</div>
                <h1 className="text-3xl font-bold text-white mb-4">The Other Half Terminal.</h1>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  This document contains the full architecture of the Human OS, including the Clarity Kernel and Creativity Engine protocols. 
                </p>
              </div>

              <div className="p-6 bg-neutral-900/50 rounded-xl border border-white/10">
                <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                  <Terminal size={14} className="text-green-500"/> Document Contents
                </h3>
                <ul className="space-y-3">
                   {[{title: "The Silent Crisis", page: "02"}, {title: "Hardware vs Software", page: "03"}, {title: "Core Architecture", page: "06"}, {title: "Implementation Logs", page: "09"}].map((item, i) => (
                     <li key={i} className="flex justify-between items-center text-xs border-b border-white/5 pb-2 last:border-0">
                        <span className="text-neutral-300">{item.title}</span>
                        <span className="text-neutral-600 font-mono">Pg {item.page}</span>
                     </li>
                   ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
               <a 
                 href={directDownloadUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="block w-full"
               >
                 <Button variant="primary" className="w-full justify-center" icon={FileDown}>
                   Direct Download (PDF)
                 </Button>
               </a>
               <p className="text-neutral-600 text-xs text-center mt-3 font-mono">Secure Connection • 2.4 MB</p>
            </div>
          </div>

          {/* Right: Google Drive Embed */}
          <div className="lg:col-span-8 h-full bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
             <div className="absolute top-0 w-full h-10 bg-black border-b border-white/10 flex items-center px-4 gap-2">
               <div className="flex gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
               </div>
               <div className="ml-4 px-3 py-0.5 bg-neutral-800 rounded text-[10px] text-neutral-400 font-mono flex items-center gap-2">
                 <Lock size={8} /> terminal_v2.pdf
               </div>
             </div>
             {/* IFRAME FOR GOOGLE DRIVE PREVIEW */}
             <iframe 
               src={driveEmbedUrl}
               width="100%" 
               height="100%" 
               className="pt-10"
               allow="autoplay"
               title="PDF Viewer"
               sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
             ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
};

const FilmPage = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col animate-in slide-in-from-right duration-700 ease-[0.22,1,0.36,1]">
      <div className="absolute top-0 w-full z-20 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
           <ArrowLeft size={16} /> Exit Theater Mode
        </button>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
           <span className="text-xs font-mono text-white/70 tracking-widest">LIVE FEED</span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-0 md:p-12 relative">
        <div className="absolute inset-0 bg-neutral-900 overflow-hidden"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-white/5 blur-[150px] rounded-full pointer-events-none"></div></div>
        <div className="relative w-full max-w-7xl aspect-video bg-black shadow-2xl rounded-lg overflow-hidden border border-white/10 z-10">
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950">
             <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center mb-6 relative group cursor-pointer hover:bg-white/10 transition-colors">
                <Play className="text-white fill-white ml-2 group-hover:scale-110 transition-transform" size={40} />
                <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-20"></div>
             </div>
             <h2 className="text-3xl font-bold text-white tracking-tight mb-2">The Other Half</h2>
             <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">Official Brand Film • 02:14</p>
           </div>
        </div>
      </div>
      <div className="p-12 border-t border-white/10 bg-neutral-950 relative z-10">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div><h3 className="text-white font-bold text-lg">Ready to complete the human?</h3><p className="text-neutral-500 text-sm">Join the 500+ schools transforming education.</p></div>
            <Button variant="primary" icon={ArrowRight}>Deploy System</Button>
         </div>
      </div>
    </div>
  );
};


/**
 * --- SECTIONS (MAIN PAGE) ---
 */

const Navbar = ({ onDeploy, onDownload, onViewChange }) => (
  <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
      <button onClick={() => onViewChange('home')} className="flex items-center gap-2">
        <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
          <Terminal size={12} className="text-black" />
        </div>
        <span className="font-bold tracking-tight text-white text-sm">The Other Half_</span>
      </button>
      <div className="hidden md:flex items-center gap-6 text-xs font-mono text-neutral-400">
        <a href="#clarity" className="hover:text-white transition-colors">Clarity</a>
        <a href="#creative" className="hover:text-white transition-colors">Creative</a>
        <a href="#plugins" className="hover:text-white transition-colors flex items-center gap-1">
          <CheckCircle2 size={12}/> Select Plugins
        </a>
        <div className="h-4 w-px bg-neutral-800 mx-2"></div>
        <button onClick={onDownload} className="hover:text-white transition-colors flex items-center gap-1">
          <FileText size={12}/> Download Concept
        </button>
        <Button onClick={onDeploy} variant="primary" className="!py-1.5 !px-3 !text-xs">Deploy in School</Button>
      </div>
    </div>
  </nav>
);

const Hero = ({ onDeploy, onWatch, onDownload }) => (
  <section className="relative min-h-[85vh] flex flex-col justify-center bg-black pt-20 border-b border-white/10 overflow-hidden">
    <div className="relative z-10 max-w-5xl mx-auto px-6 w-full text-center pb-20">
      <Reveal>
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-neutral-800 bg-neutral-900 rounded-md mb-8">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">System Operational</span>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[1.1] md:leading-[0.95]">
          Install the <span className="text-neutral-500">Human OS.</span>
        </h1>
      </Reveal>

      <Reveal delay={200}>
        <div className="max-w-2xl mx-auto mb-10 p-4 border-l-2 border-neutral-800 bg-neutral-900/30 text-left">
          <p className="text-lg text-neutral-300 font-light leading-relaxed font-mono text-sm">
            {'>'} Initializing clarity protocols... <br/>
            {'>'} Loading creativity engine... <br/>
            {'>'} <span className="text-white">Education builds the hardware. We code the software (Identity, Confidence, Capability).</span>
          </p>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={onDeploy} variant="primary" icon={ArrowRight}>Deploy in Your School</Button>
          <Button onClick={onWatch} variant="secondary" icon={Play}>Watch Film</Button>
          <Button onClick={onDownload} variant="ghost" icon={FileText} className="hidden sm:flex">Download Detailed Concept</Button>
        </div>
      </Reveal>
    </div>

    <div className="absolute bottom-0 w-full border-t border-white/10 bg-neutral-950/50 backdrop-blur-sm py-3 z-0">
      <div className="flex gap-12 whitespace-nowrap animate-marquee text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
         <span>/// SYSTEM STATUS: OPTIMAL</span>
         <span>/// LATENCY: 0MS</span>
         <span>/// CLARITY CORE: ONLINE</span>
         <span>/// CREATIVITY ENGINE: ONLINE</span>
         <span>/// DEPLOYING TO 500+ SCHOOLS</span>
         <span>/// SYSTEM STATUS: OPTIMAL</span>
         <span>/// LATENCY: 0MS</span>
         <span>/// CLARITY CORE: ONLINE</span>
      </div>
    </div>
  </section>
);

const ClarityModule = ({ onSelectTopic }) => {
  const layers = [
    { id: "self-clarity", title: "Layer 1: Self-Clarity", sub: "The Mirror", desc: "Helping students map their internal architecture. We audit strengths, values, and personality so they can lead themselves.", icon: Fingerprint },
    { id: "thought-clarity", title: "Layer 2: Thought Clarity", sub: "The Processor", desc: "Teaching students how to process data, not just store it. We introduce frameworks for clear, logical decision making.", icon: Cpu },
    { id: "direction-clarity", title: "Layer 3: Direction Clarity", sub: "The Compass", desc: "Moving from random motion to calculated direction. Students design a personal roadmap based on intrinsic motivation.", icon: Box },
    { id: "action-clarity", title: "Layer 4: Action Clarity", sub: "The Execution", desc: "Turning abstract intent into concrete daily habits. We build the discipline and resilience protocols needed for the real world.", icon: Anchor }
  ];

  return (
    <section id="clarity" className="bg-black py-40 border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <Reveal>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                <Fingerprint className="text-black" size={24} />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">The Clarity Kernel.</h2>
              <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
                Most students run on autopilot. We install the self-awareness protocols required to navigate complex environments.
              </p>
              <div className="p-5 bg-neutral-900/30 rounded-xl border border-neutral-800 text-sm font-mono text-neutral-500 backdrop-blur-sm">
                <div className="flex justify-between mb-3 border-b border-neutral-800 pb-2"><span>System Status:</span><span className="text-green-500 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> Online</span></div>
                <div className="flex justify-between"><span>Version:</span><span>2.4.0 (Stable)</span></div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 grid gap-6 content-center">
            {layers.map((layer, i) => (
              <Reveal key={i} delay={i * 100}>
                <div 
                  onClick={() => onSelectTopic(layer.id)}
                  className="group p-8 bg-neutral-950 border border-neutral-800 rounded-2xl hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-500 flex items-start gap-6 cursor-pointer hover:translate-x-2"
                >
                  <div className="mt-1 text-neutral-500 group-hover:text-white transition-colors duration-500"><layer.icon size={24} /></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{layer.title}</h3>
                    <p className="text-neutral-400 text-base leading-relaxed">{layer.desc}</p>
                  </div>
                  <ChevronRight className="self-center ml-auto text-neutral-700 group-hover:text-white transition-all duration-500 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0" size={20} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CreativeModule = ({ onSelectTopic }) => {
  const items = [
    { id: "divergent-thinking", title: "Divergent Thinking", tags: ["Curiosity", "Ideation"], desc: "Breaking rigid neural pathways to solve non-linear problems." },
    { id: "structural-planning", title: "Structural Planning", tags: ["Logic", "Architecture"], desc: "Converting abstract concepts into executable blueprints." },
    { id: "rapid-prototyping", title: "Rapid Prototyping", tags: ["Build", "Ship"], desc: "Bias towards action. Building MVP versions of ideas." },
    { id: "narrative-design", title: "Narrative Design", tags: ["Pitch", "Story"], desc: "The interface between product and user. Persuasive communication." }
  ];

  return (
    <section id="creative" className="bg-white text-black py-40">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="max-w-2xl mb-20">
            <div className="flex items-center gap-2 mb-6"><Zap size={24} /><span className="font-mono text-xs uppercase tracking-widest">Input / Output</span></div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">Creative Architecture.</h2>
            <p className="text-xl text-neutral-600 leading-relaxed">Moving from passive consumption (Read-Only) to active creation (Read-Write).</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div 
                onClick={() => onSelectTopic(item.id)}
                className="group h-full p-10 bg-neutral-50 border border-neutral-200 rounded-2xl hover:shadow-2xl hover:border-black transition-all duration-500 hover:-translate-y-2 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0"><ArrowRight size={24} /></div>
                <div className="flex gap-2 mb-6">{item.tags.map(tag => (<span key={tag} className="px-2.5 py-1 bg-white border border-neutral-200 rounded text-[10px] uppercase tracking-wide font-medium text-neutral-500 group-hover:border-black group-hover:text-black transition-colors duration-300">{tag}</span>))}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-base group-hover:text-neutral-800 transition-colors duration-300">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CustomTracksConfigurator = ({ onDeploy }) => {
  const [selectedPlugin, setSelectedPlugin] = useState("Python & AI Logic");
  const plugins = ["Python & AI Logic", "Financial Literacy & Markets", "Public Speaking & Debate", "Startup Entrepreneurship", "Video Editing & Content", "Robotics & Electronics"];
  return (
    <section id="plugins" className="py-32 bg-black border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-neutral-800 pb-10">
            <div><span className="font-mono text-xs text-neutral-500 uppercase mb-3 block">System Configuration</span><h2 className="text-4xl font-bold text-white tracking-tight">Select Custom Plugin</h2><p className="text-neutral-400 mt-4 text-sm max-w-md">Choose the single specialized track for your cohort (Grades 8-12).</p></div>
            <div className="mt-6 md:mt-0 font-mono text-xs bg-neutral-900 px-4 py-2 rounded text-neutral-400 border border-neutral-800">1 Selection Allowed</div>
          </div>
        </Reveal>
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden">
           {plugins.map((plugin, i) => {
             const isSelected = selectedPlugin === plugin;
             return (
               <Reveal key={i} delay={i * 50}>
                 <div onClick={() => setSelectedPlugin(plugin)} className="flex items-center gap-5 p-6 border-b border-neutral-800 cursor-pointer hover:bg-neutral-900/50 transition-colors duration-300 group select-none last:border-0">
                   <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-white border-white scale-110' : 'border-neutral-700 bg-transparent group-hover:border-neutral-500'}`}>{isSelected && <div className="w-2 h-2 rounded-full bg-black" />}</div>
                   <span className={`text-base font-medium transition-colors duration-300 ${isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>{plugin}</span>
                   {isSelected && <span className="ml-auto text-[10px] font-mono text-green-500 uppercase tracking-widest hidden sm:block animate-pulse">Selected</span>}
                 </div>
               </Reveal>
             );
           })}
        </div>
        <Reveal delay={300}><div className="mt-12 flex justify-end"><Button onClick={onDeploy} variant="primary" icon={ArrowRight}>Confirm: {selectedPlugin}</Button></div></Reveal>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-32 bg-neutral-950 border-t border-white/10">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal><div className="flex items-center gap-3 mb-16"><MessageSquare size={18} className="text-neutral-500" /><span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">System Logs (Testimonials)</span></div></Reveal>
      <div className="grid md:grid-cols-2 gap-8">
        {[
          {quote: "The Clarity protocols changed our 10th-grade culture entirely. Students are navigating stress with tools we never had.", author: "Sarah Jenkins", role: "Principal, Westview Academy"},
          {quote: "We installed the Creative Engine in January. By March, students were pitching real startups. The latency between idea and execution is zero.", author: "Dr. Aris Thorne", role: "Director, Future Schools Trust"}
        ].map((item, i) => (
          <Reveal key={i} delay={i * 150}>
            <div className="p-10 bg-black border border-neutral-800 rounded-2xl hover:border-neutral-600 transition-all duration-500 hover:-translate-y-1">
              <p className="text-xl text-neutral-300 leading-relaxed font-light mb-8">"{item.quote}"</p>
              <div className="flex items-center gap-4"><div className="w-10 h-10 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center font-bold text-white text-sm">{item.author[0]}</div><div><div className="text-white text-sm font-bold">{item.author}</div><div className="text-neutral-500 text-xs font-mono">{item.role}</div></div></div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Footer = ({ onDeploy, onBookCall }) => (
  <footer className="bg-neutral-950 py-24 border-t border-white/10 text-sm">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-6"><Terminal size={16} className="text-white" /><span className="font-bold text-white">The Other Half_</span></div>
        <p className="text-neutral-500 max-w-xs mb-8">Engineering the human capability layer for the next generation.</p>
        <div className="flex gap-4"><Button onClick={onDeploy} variant="primary" className="!py-2 !px-4">Deploy System</Button><Button onClick={onBookCall} variant="secondary" className="!py-2 !px-4">Book a Call</Button></div>
      </div>
      <div><h4 className="font-bold text-white mb-4">System</h4><ul className="space-y-2 text-neutral-500"><li><a href="#" className="hover:text-white transition-colors duration-200">Clarity Core</a></li><li><a href="#" className="hover:text-white transition-colors duration-200">Creative Engine</a></li><li><a href="#" className="hover:text-white transition-colors duration-200">Plugin Library</a></li><li><a href="#" className="hover:text-white transition-colors duration-200">Changelog</a></li></ul></div>
      <div><h4 className="font-bold text-white mb-4">Connect</h4><ul className="space-y-2 text-neutral-500"><li><button onClick={onBookCall} className="hover:text-white transition-colors duration-200">Book a Demo</button></li><li><a href="#" className="hover:text-white transition-colors duration-200">Twitter / X</a></li><li><a href="#" className="hover:text-white transition-colors duration-200">LinkedIn</a></li><li><a href="#" className="hover:text-white transition-colors duration-200">Email</a></li></ul></div>
    </div>
    <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex justify-between text-xs text-neutral-600 font-mono"><span>© 2025 The Other Half Inc.</span><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-900"/> All Systems Normal</span></div>
  </footer>
);

// --- MAIN APP ---
const App = () => {
  const [view, setView] = useState('home'); // 'home', 'download', 'film', 'topic:id'
  const [showDeploy, setShowDeploy] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const scrollRef = useRef(0); 
  const [homeTransition, setHomeTransition] = useState("animate-in fade-in duration-700 ease-out"); // Default initial

  const handleViewChange = (newView) => {
    if (view === 'home' && newView !== 'home') {
      if (typeof window !== 'undefined') {
        scrollRef.current = window.scrollY;
      }
      // Prepare home to slide in from left when returning
      setHomeTransition("animate-in slide-in-from-left duration-700 ease-[0.22,1,0.36,1]"); 
    }
    setView(newView);
    
    if (typeof window !== 'undefined') {
      if (newView === 'home') {
        setTimeout(() => window.scrollTo(0, scrollRef.current), 0);
      } else {
        window.scrollTo(0, 0); 
      }
    }
  };

  if (view === 'download') return <DownloadPage onBack={() => handleViewChange('home')} />;
  if (view === 'film') return <FilmPage onBack={() => handleViewChange('home')} />;
  if (view.startsWith('topic:')) {
    const topicId = view.split(':')[1];
    return <TopicDetailPage topicId={topicId} onBack={() => handleViewChange('home')} />;
  }

  // Home View
  return (
    <div className={`bg-black min-h-screen text-white font-sans antialiased selection:bg-neutral-800 selection:text-white ${homeTransition}`}>
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[100]" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 40s linear infinite; } html { scroll-behavior: smooth; }`}</style>

      <DeployModal isOpen={showDeploy} onClose={() => setShowDeploy(false)} />
      <CalendlyModal isOpen={showCalendly} onClose={() => setShowCalendly(false)} />

      <Navbar onDeploy={() => setShowDeploy(true)} onDownload={() => handleViewChange('download')} onViewChange={handleViewChange} />
      <Hero onDeploy={() => setShowDeploy(true)} onWatch={() => handleViewChange('film')} onDownload={() => handleViewChange('download')} />
      <ClarityModule onSelectTopic={(id) => handleViewChange(`topic:${id}`)} />
      <CreativeModule onSelectTopic={(id) => handleViewChange(`topic:${id}`)} />
      <CustomTracksConfigurator onDeploy={() => setShowDeploy(true)} />
      <Testimonials />
      <Footer onDeploy={() => setShowDeploy(true)} onBookCall={() => setShowCalendly(true)} />
    </div>
  );
};

export default App;
