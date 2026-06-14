import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Globe, 
  Code2, 
  Box, 
  Zap, 
  ChevronUp
} from 'lucide-react';
const CyberGrid = lazy(() => import('./components/CyberGrid'));
const ShapeGrid = lazy(() => import('./components/ShapeGrid'));
const DigitalCard = lazy(() => import('./components/DigitalCard'));
const CapabilityDeck = lazy(() => import('./components/CapabilityDeck'));
import DotField from './components/DotField';
import BorderGlow from './components/BorderGlow';
import ScrollReveal from './components/ScrollReveal';

// --- DATA ---
const PROJECTS = [
  {
    id: 't4s-sim',
    title: 'T4S_TACTICAL_SIM',
    type: 'LOGIC_DATA',
    tags: ['Unity', 'HLA_RTI', 'Defense'],
    description: 'Tank Troop Tactical Training Simulator. Multi-user tactical environment supporting 50+ concurrent trainees using Portico RTI and HLA protocols.',
    link: '#',
    status: 'MISSION_CRITICAL'
  },
  {
    id: 'aglsds-sim',
    title: 'AGLSDS_HARDWARE',
    type: 'LOGIC_DATA',
    tags: ['Unity', 'Hardware', 'Defense', 'Embedded'],
    description: 'Anti-Guided Missile Launcher Simulator with hardware-embedded integration. Real-world weapon system interface simulation.',
    link: '#',
    status: 'DEPLOYED'
  },
  {
    id: 'motion-sims',
    title: '6DOF_MOTION_SIMULATORS',
    type: 'LOGIC_DATA',
    tags: ['Unity', 'Sockets', 'Hardware'],
    description: 'Hardware-integrated simulator projects involving low-level socket programming and real-world 3DOF/6DOF motion controls.',
    link: '#',
    status: 'ACTIVE'
  },
  {
    id: 'razel-studio',
    title: 'RAZEL_STUDIO_XR',
    type: 'CORE_ENGINE',
    tags: ['Unity', 'Configurator', 'XR'],
    description: 'Interior Texture & Paint Configurator. Advanced real-time material swapping and spatial visualization framework.',
    link: 'https://r2dapps.github.io/RazelStudio/',
    status: 'ACTIVE'
  },
  {
    id: 'painter-pro',
    title: 'PAINTER_PRO_STUDIO',
    type: 'CORE_ENGINE',
    tags: ['WebGL', 'Interior', 'Visualizer'],
    description: 'Professional interior painting demonstration platform with high-fidelity color accuracy.',
    link: 'https://r2dapps.github.io/PainterProStudio/',
    status: 'STABLE'
  },
  {
    id: 'contenthub',
    title: 'CONTENT_HUB_OS',
    type: 'LABS',
    tags: ['React', 'Firebase', 'Marketing', 'Automation'],
    description: 'The Multi-Tenant Marketing OS. A secure, premium marketing suite designed to centralize media assets, automate multi-platform scheduling, and facilitate collaboration.',
    link: 'https://contenthub-demo.vercel.app/',
    status: 'OPERATIONAL'
  },
  {
    id: 'moodstreak',
    title: 'MOODSTREAK_JOURNAL',
    type: 'LABS',
    tags: ['React', 'Mindfulness', 'Canvas', 'PWA'],
    description: 'Premium minimalist digital journaling application designed for mindfulness and creative expression. Supports rich text, voice recordings, and sketches.',
    link: 'https://moodstreak.vercel.app/',
    status: 'ACTIVE'
  },
  {
    id: 'showroom-os',
    title: 'SHOWROOM_OS_CRM',
    type: 'LABS',
    tags: ['Next.js', 'CRM', 'Automotive'],
    description: 'Enterprise Sales CRM for Hyundai dealerships. Real-time lead tracking, inventory management, and revenue analytics for high-volume showrooms.',
    link: 'https://showroomos.vercel.app/',
    status: 'OPERATIONAL'
  },
  {
    id: 'medicore-pro',
    title: 'MEDICORE_PRO_SaaS',
    type: 'LABS',
    tags: ['React', 'Clinical', 'Analytics'],
    description: 'Enterprise healthcare intelligence dashboard. Mission-critical patient management and data visualization.',
    link: 'https://medi-core-pro.vercel.app/',
    status: 'OPERATIONAL'
  },
  {
    id: 'medicore-demo',
    title: 'CLINIC_APP_DEMO',
    type: 'LABS',
    tags: ['React', 'Healthcare', 'Demo'],
    description: 'Sales and demonstration platform for the MediCorePro healthcare ecosystem.',
    link: 'https://r2dapps.github.io/ClinicAppDemo/',
    status: 'ACTIVE'
  },
  {
    id: 'bim-web',
    title: 'INDUSTRIAL_BIM_CORE',
    type: 'CORE_ENGINE',
    tags: ['Unity', 'BIM', 'Industrial'],
    description: 'Real-time WebGL visualization for complex Building Information Modeling data.',
    link: 'https://r2dapps.github.io/BimWebDemo/',
    status: 'STABLE'
  },
  {
    id: 'webar-demo',
    title: 'WebAR_SYSTEMS',
    type: 'CORE_ENGINE',
    tags: ['AR', 'Web', 'Visualizer'],
    description: 'Web-based Augmented Reality visualization systems for instant spatial interaction.',
    link: 'https://r2dapps.github.io/webAR/',
    status: 'EXPERIMENTAL'
  },
  {
    id: 'resume-react',
    title: 'RESUME_ENGINE_REACT',
    type: 'LABS',
    tags: ['React', 'PDF', 'Printing'],
    description: 'High-fidelity resume builder with 100% print parity and hardened A4 layouts.',
    link: 'https://r2dapps.github.io/react-resume-builder/',
    status: 'STABLE'
  },
  {
    id: 'resume-basic',
    title: 'RESUME_BUILDER_V1',
    type: 'LABS',
    tags: ['HTML', 'CSS', 'JS'],
    description: 'Foundational web-based resume builder using core web technologies.',
    link: 'https://r2dapps.github.io/ResumeBuilder/',
    status: 'LEGACY'
  }
];

const CAREER_LOG = [
  {
    year: '2025 - PRESENT',
    role: 'PRINCIPAL_SYSTEMS_ENGINEER',
    company: 'RAZEL TECH',
    description: 'Leading a specialized MSME studio focused on defense-grade Unity simulations, high-fidelity BIM visualization, and custom AR/VR frameworks.',
    type: 'STRATEGIC_LEAD'
  },
  {
    year: '2014 - 2025',
    role: 'LEAD UNITY DEVELOPER / TECH LEAD',
    company: 'GREEN VISION SOLUTIONS (GVS)',
    description: 'Architecture and delivery of 10+ mission-critical tactical simulators for the Indian Army. Specializing in HLA/RTI networking and 6DOF motion hardware.',
    type: 'DEFENSE_ENGINEERING'
  }
];

// --- COMPONENTS ---

const TypewriterText = ({ text, delay = 0.05 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, delay * 1000);
    return () => clearInterval(timer);
  }, [text, delay]);

  return <span>{displayedText}<span className="animate-pulse">_</span></span>;
};

const Layout = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [rawMouse, setRawMouse] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const springConfig = { damping: 25, stiffness: 700 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
    setRawMouse({ x: clientX, y: clientY });
    document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
  };

  return (
    <div onMouseMove={handleMouseMove} className="min-h-screen relative overflow-x-hidden selection:bg-cyber-blue selection:text-black cursor-none">
      {/* Base Background Color Layer */}
      <div className="fixed inset-0 -z-20 bg-obsidian" />

      {/* RAZEL_ENGINE::Composite_Background_Layer */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-obsidian" />}>
          <ShapeGrid 
            speed={0.2} 
            squareSize={50}
            direction='diagonal'
            borderColor='rgba(0, 243, 255, 0.08)'
            hoverFillColor='rgba(0, 243, 255, 0.15)'
            hoverTrailAmount={10}
          />
          <div className="absolute inset-0">
            <CyberGrid />
          </div>
        </Suspense>
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.9)_100%)] pointer-events-none" />
      </div>

      <div className="scanline" />
      <CustomCursor mouseX={smoothX} mouseY={smoothY} />
      
      <div className="relative z-10">
        <nav className="px-4 py-3 md:px-6 md:py-6 border-b border-cyber-blue/20 flex justify-between items-center backdrop-blur-md fixed top-0 left-0 w-full z-[100] bg-obsidian/80 transform-gpu">
          <Link to="/" className="flex items-center space-x-1.5 md:space-x-3 group shrink-0" onClick={() => setIsMenuOpen(false)}>
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded overflow-hidden transition-transform duration-300 group-hover:scale-110">
              <img src="./logo.png" alt="RazelTech Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-black tracking-tighter text-base sm:text-lg md:text-2xl terminal-text group-hover:text-white transition-colors uppercase">RAZEL TECH</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 text-[10px] font-bold tracking-widest text-cyber-blue/60 uppercase">
            <Link to="/core" className="hover:text-cyber-blue transition-colors border-b border-transparent hover:border-cyber-blue pb-1">[ CORE_ENGINES ]</Link>
            <Link to="/logic" className="hover:text-cyber-blue transition-colors border-b border-transparent hover:border-cyber-blue pb-1">[ LOGIC_DATA ]</Link>
            <Link to="/labs" className="hover:text-cyber-blue transition-colors border-b border-transparent hover:border-cyber-blue pb-1">[ LABS ]</Link>
            <Link to="/deck" className="hover:text-cyber-blue transition-colors border-b border-transparent hover:border-cyber-blue pb-1">[ CAPABILITY_DECK ]</Link>
            <Link to="/vcard" className="hover:text-cyber-blue transition-colors border-b border-transparent hover:border-cyber-blue pb-1">[ VCARD ]</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              className="p-2 text-white bg-cyber-blue/10 hover:bg-cyber-blue/20 rounded-lg transition-all z-[60]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl md:hidden pt-24 px-6"
            >
              <div className="flex flex-col space-y-8 text-center">
                <Link 
                  to="/core" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black tracking-[0.2em] text-cyber-blue uppercase"
                >
                  [ CORE_ENGINES ]
                </Link>
                <Link 
                  to="/logic" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black tracking-[0.2em] text-cyber-blue uppercase"
                >
                  [ LOGIC_DATA ]
                </Link>
                <Link 
                  to="/labs" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black tracking-[0.2em] text-cyber-blue uppercase"
                >
                  [ LABS ]
                </Link>
                <Link 
                  to="/deck" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black tracking-[0.2em] text-cyber-blue uppercase"
                >
                  [ CAPABILITY_DECK ]
                </Link>
                <Link 
                  to="/vcard" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black tracking-[0.2em] text-cyber-blue uppercase"
                >
                  [ VCARD ]
                </Link>
                <div className="pt-12 border-t border-cyber-blue/10">
                  <div className="text-[10px] text-cyber-blue/40 tracking-widest uppercase mb-4">Secure_Session_Active</div>
                  <div className="flex justify-center space-x-6">
                    <a href="https://linkedin.com" className="text-cyber-blue/60 hover:text-white transition-colors"><LinkedinIcon size={20} /></a>
                    <a href="https://github.com" className="text-cyber-blue/60 hover:text-white transition-colors"><GithubIcon size={20} /></a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative z-10 pt-[53px] md:pt-[88px] transform-gpu">{children}</main>
        <ScrollToTop />
        <footer className="p-8 md:p-12 border-t border-cyber-blue/10 text-center text-[8px] md:text-[10px] text-cyber-blue/40 tracking-[0.2em] md:tracking-[0.3em] uppercase">
          <div className="mb-4 text-cyber-blue/20">SYSTEM_ACCESS::AUTHENTICATED // BUFFER_STATUS::SYNCED</div>
          <div className="mb-2 text-cyber-blue/10 flex flex-col md:flex-row items-center justify-center gap-2">
            <span>MSME_REG::UDYAM-AP-04-0112603</span>
            <div className="flex items-center space-x-2">
              <img src="./verified_badge.png" alt="Verified" className="w-3 h-3 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-help" title="MSME Certified" />
              <span className="md:hidden opacity-40">//</span>
            </div>
            <span>RAZEL_TECH_SOLUTIONS // ANDHRA_PRADESH</span>
          </div>
          © RAZELTECH // SYSTEMS_EST_2025 // ALL_RIGHTS_RESERVED
        </footer>
      </div>
    </div>
  );
};

const ScrambledText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState(text);
  const chars = 'ABCDEF0123456789<>-_\\/[]{}!@#$%^&*+';
  
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayedText(prev => 
        text.split('').map((char, index) => {
          if (index < iteration) return text[index];
          // Use fixed-width space for non-visible characters to prevent layout shift
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    scramble();
  }, [text]);

  return (
    <span 
      onMouseEnter={scramble} 
      className="cursor-pointer inline-block font-mono max-w-full break-all sm:break-normal transform-gpu"
      style={{ minWidth: `${text.length}ch`, textAlign: 'left' }}
    >
      {displayedText}
    </span>
  );
};

const NotFound = () => (
  <div className="max-w-7xl mx-auto px-6 py-40 text-center">
    <div className="inline-flex items-center space-x-2 text-red-500 text-[10px] font-black tracking-[0.4em] mb-12 uppercase">
      <ShieldAlertIcon size={14} />
      <span>Error_404 // Access_Denied // Connection_Lost</span>
    </div>
    <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-12 italic uppercase">
      LINK<br />
      <span className="text-red-500 terminal-text">SEVERED</span>
    </h1>
    <p className="text-cyber-blue/40 font-mono text-xs tracking-widest mb-12 uppercase">
      Requested_Endpoint_Not_Found_in_Core_Dossier.
    </p>
    <Link to="/" className="px-8 py-3 border border-cyber-blue/30 text-cyber-blue text-[10px] font-black tracking-widest uppercase hover:bg-cyber-blue hover:text-black transition-all">
      Re-Establish_Connection
    </Link>
  </div>
);

const CustomCursor = ({ mouseX, mouseY }) => {
  return (
    <div className="hidden lg:block crosshair">
      <motion.div className="crosshair-h" style={{ top: mouseY }} />
      <motion.div className="crosshair-v" style={{ left: mouseX }} />
      <motion.div className="crosshair-dot" style={{ left: mouseX, top: mouseY }} />
    </div>
  );
};

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const ShieldAlertIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);

const ExternalLinkIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 p-4 bg-cyber-blue/10 border border-cyber-blue/40 text-cyber-blue rounded-full backdrop-blur-md z-50 hover:bg-cyber-blue/30 transition-all shadow-lg shadow-cyber-blue/20"
        >
          <ChevronUp size={24} />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            UP_LINK
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const ProfileCard = () => (
  <BorderGlow 
    borderRadius={16} 
    glowRadius={6} 
    edgeSensitivity={40} 
    glowIntensity={0.5}
    fillOpacity={0}
    glowColor="180 100 80" 
    backgroundColor="#050505"
    colors={['#00f3ff', '#39ff14', '#00f3ff']}
  >
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyber-blue/5 border border-cyber-blue/10 p-8 rounded-lg backdrop-blur-md w-full lg:w-80 relative overflow-hidden"
    >
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center rounded-lg shrink-0">
          <Cpu className="text-cyber-blue" size={24} />
        </div>
        <div>
          <div className="text-[10px] font-bold text-cyber-blue/60 uppercase tracking-widest mb-1">Founder & CEO // Lead_Systems_Architect</div>
          <div className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-white leading-none">RAJA VAMSI DHAR V</div>
        </div>
      </div>

      <div className="space-y-4 text-[10px] font-bold tracking-widest text-cyber-blue/60 uppercase">
        <div className="flex items-center space-x-3">
          <Globe size={14} className="text-cyber-blue" />
          <span>Andhra Pradesh, India</span>
        </div>
        <div className="flex items-center space-x-3">
          <Terminal size={14} className="text-cyber-blue" />
          <span>razeltech.in@gmail.com</span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-cyber-blue/10">
         <div className="flex justify-between items-center mb-4">
            <div className="text-[9px] font-black text-cyber-green animate-pulse uppercase">● Systems_Operational</div>
            <div className="flex space-x-2">
               <a href="https://www.linkedin.com/in/raja-vamsi-dhar-vallabhapurapu-71b10475/" target="_blank" rel="noreferrer" className="p-1.5 hover:text-cyber-blue transition-colors">
                  <LinkedinIcon size={16} />
               </a>
               <a href="https://github.com/r2dapps" target="_blank" rel="noreferrer" className="p-1.5 hover:text-cyber-blue transition-colors">
                  <GithubIcon size={16} />
               </a>
            </div>
         </div>
         <div className="text-[8px] font-bold text-cyber-blue/40 tracking-widest uppercase text-center border border-cyber-blue/10 py-2 rounded">
            MSME_REG::UDYAM-AP-04-0112603 // LICENSED_STUDIO
         </div>
          <Link 
            to="/deck" 
            className="mt-3 block text-[8px] font-black text-center text-cyber-blue hover:text-white border border-cyber-blue/30 hover:bg-cyber-blue/15 py-2.5 rounded transition-all tracking-[0.2em] uppercase"
          >
             [ VIEW_CAPABILITY_DECK ]
          </Link>
          <Link 
            to="/vcard" 
            className="mt-2 block text-[8px] font-black text-center text-cyber-blue hover:text-white border border-cyber-blue/30 hover:bg-cyber-blue/15 py-2.5 rounded transition-all tracking-[0.2em] uppercase"
          >
             [ INITIALIZE_DIGITAL_VCARD ]
          </Link>
      </div>
    </motion.div>
  </BorderGlow>
);

const CareerTimeline = () => {
  return (
    <section id="timeline" className="mb-32">
      <div className="flex items-center space-x-4 mb-16">
        <div className="w-12 h-px bg-cyber-blue/30"></div>
        <h2 className="text-xl font-black tracking-tighter uppercase italic">
          <ScrambledText text="Career_Log" />
        </h2>
      </div>

      <div className="relative border-l border-cyber-blue/20 ml-4 md:ml-8 space-y-12 pb-8">
        {CAREER_LOG.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Node */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-obsidian border-2 border-cyber-blue rounded-full z-10">
               <div className="absolute inset-0 bg-cyber-blue animate-pulse rounded-full" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div className="text-cyber-blue font-black tracking-widest text-[10px] uppercase mb-1 md:mb-0">
                {item.year} // {item.type}
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-cyber-green/50 font-mono text-[9px] font-bold">
                  STATUS::STABLE
                </div>
                <div className="text-cyber-blue/30 font-mono text-[9px] font-bold">
                  LOG_ENTRY_{index.toString(16).padStart(2, '0').toUpperCase()}
                </div>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-black tracking-tight italic mb-1 break-words">
              <ScrambledText text={item.role} />
            </h3>
            <div className="text-cyber-green text-[11px] font-bold tracking-widest mb-4 uppercase">@ {item.company}</div>
            
            <ScrollReveal baseOpacity={0.15} blurStrength={3} containerClassName="max-w-2xl">
              {item.description}
            </ScrollReveal>

            {/* Visual connector for desktop */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-24 h-px bg-gradient-to-r from-cyber-blue/20 to-transparent" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProjectGrid = ({ filter = null }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  
  const currentFilter = filter || activeFilter;
  
  const filteredProjects = currentFilter 
    ? PROJECTS.filter(p => p.type === currentFilter) 
    : PROJECTS;

  return (
    <div>
      {/* Sim-vs-SaaS Toggle */}
      {!filter && (
        <div className="flex justify-center mb-12 w-full">
          <div className="bg-obsidian/50 border border-cyber-blue/20 p-1 rounded-full flex overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setActiveFilter(null)}
              className={`px-4 md:px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all whitespace-nowrap flex items-center space-x-2 ${!activeFilter ? 'bg-cyber-blue text-black' : 'text-cyber-blue/60 hover:text-white'}`}
            >
              <Globe size={14} />
              <span className="hidden md:inline">ALL_SYSTEMS</span>
            </button>
            <button 
              onClick={() => setActiveFilter('CORE_ENGINE')}
              className={`px-4 md:px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all whitespace-nowrap flex items-center space-x-2 ${activeFilter === 'CORE_ENGINE' ? 'bg-cyber-blue text-black' : 'text-cyber-blue/60 hover:text-white'}`}
            >
              <Box size={14} />
              <span className="hidden md:inline">UNITY_PROJECTS</span>
            </button>
            <button 
              onClick={() => setActiveFilter('LOGIC_DATA')}
              className={`px-4 md:px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all whitespace-nowrap flex items-center space-x-2 ${activeFilter === 'LOGIC_DATA' ? 'bg-cyber-blue text-black' : 'text-cyber-blue/60 hover:text-white'}`}
            >
              <Terminal size={14} />
              <span className="hidden md:inline">SIMULATORS</span>
            </button>
            <button 
              onClick={() => setActiveFilter('LABS')}
              className={`px-4 md:px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all whitespace-nowrap flex items-center space-x-2 ${activeFilter === 'LABS' ? 'bg-cyber-blue text-black' : 'text-cyber-blue/60 hover:text-white'}`}
            >
              <Zap size={14} />
              <span className="hidden md:inline">SAAS_DASHBOARDS</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SpotlightCard = ({ project }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <BorderGlow 
      borderRadius={12} 
      glowRadius={6} 
      edgeSensitivity={40} 
      glowIntensity={0.5}
      fillOpacity={0}
      glowColor="180 100 80" 
      backgroundColor="#050505"
      colors={['#00f3ff', '#39ff14', '#00f3ff']}
    >
      <motion.div 
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.01 }}
        className="p-8 bg-cyber-blue/5 border border-cyber-blue/10 relative group overflow-hidden spotlight-card h-full"
      >
        <motion.div 
          className="spotlight-glow"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 243, 255, 0.1), transparent 40%)`
            )
          }}
        />
        
        <div className="relative z-10">
          <div className="absolute top-0 right-0">
            <div className={`text-[9px] font-black px-2 py-1 rounded ${project.status === 'CLASSIFIED' ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-cyber-green/20 text-cyber-green border border-cyber-green/50'}`}>
               {project.status}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-cyber-blue/40 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{project.type}</div>
            <h3 className="text-2xl font-black tracking-tight group-hover:text-cyber-blue transition-colors italic">
              <ScrambledText text={project.title} />
            </h3>
          </div>
          
          <ScrollReveal baseOpacity={0.2} blurStrength={5} textClassName="text-sm text-cyber-blue/60 mb-8 leading-relaxed line-clamp-3">
            {project.description}
          </ScrollReveal>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map(tag => (
              <span key={tag} className="text-[9px] font-bold border border-cyber-blue/20 px-2 py-1 rounded text-cyber-blue/40">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center">
            {project.link !== '#' ? (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-cyber-blue hover:text-white transition-all"
              >
                <span>Initialize_Interface</span>
                <ExternalLinkIcon size={14} />
              </a>
            ) : (
              <div className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-red-500/50">
                <ShieldAlertIcon size={14} />
                <span>Access_Restricted</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </BorderGlow>
  );
};

const DossierPage = ({ title, type }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-px bg-cyber-blue/30"></div>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">
            Dossier::<ScrambledText text={title} />
          </h2>
        </div>
        <div className="text-[10px] font-mono text-cyber-blue/30 tracking-widest">
          ACCESS_LEVEL::LVL_04 // SCAN_TIME::0.003ms
        </div>
      </div>
      <ProjectGrid filter={type} />
      
      <div className="mt-20">
         <Link to="/" className="text-[10px] font-bold tracking-widest text-cyber-blue hover:text-white transition-colors uppercase">
            &lt; Return_to_Core_Systems
         </Link>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="mb-24 md:mb-32">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 text-cyber-green text-[7px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] mb-6 uppercase max-w-full">
            <Zap size={12} className="shrink-0" />
            <span className="truncate">Secure_Link_Established // razel_tech // industrial_division</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-6 leading-[0.9] italic uppercase w-full">
            <span className="inline-block"><ScrambledText text="PRECISION" /></span><br />
            <span className="text-cyber-blue terminal-text inline-block mt-2">
              <ScrambledText text="SYSTEMS_ENGINEERING" />
            </span>
          </h1>
          <div className="mb-10 flex items-center space-x-4">
             <div className="h-px w-12 bg-cyber-blue/50"></div>
             <span className="text-cyber-blue/60 font-bold tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[12px] uppercase">Razel Tech // Mission-Critical Simulators & Industrial AR/VR</span>
          </div>
          <p className="text-lg md:text-2xl text-cyber-blue/80 max-w-3xl font-medium leading-relaxed mb-12">
            <TypewriterText text="Specializing in defense-grade tactical simulators, high-fidelity BIM pipelines, and spatial intelligence systems. We bridge the gap between complex hardware and immersive software ecosystems." />
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#core" className="px-8 py-4 bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue text-[10px] font-black tracking-widest uppercase hover:bg-cyber-blue hover:text-black transition-all">
              View_System_Dossiers
            </a>
            <div className="px-8 py-4 border border-cyber-blue/10 text-cyber-blue/40 text-[10px] font-black tracking-widest uppercase">
              EST_2025 // AP_REGION
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Capabilities */}
      <section className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border border-cyber-blue/10 bg-cyber-blue/5 rounded-lg">
          <div className="text-cyber-blue mb-4"><Cpu size={32} /></div>
          <h3 className="text-lg font-black uppercase mb-2">Defense_Simulations</h3>
          <p className="text-xs text-cyber-blue/60 leading-relaxed uppercase tracking-wider">Tactical training environments, AGLSDS hardware integration, and multi-user HLA platforms.</p>
        </div>
        <div className="p-8 border border-cyber-blue/10 bg-cyber-blue/5 rounded-lg">
          <div className="text-cyber-blue mb-4"><Box size={32} /></div>
          <h3 className="text-lg font-black uppercase mb-2">Industrial_SaaS</h3>
          <p className="text-xs text-cyber-blue/60 leading-relaxed uppercase tracking-wider">ShowroomOS automotive CRM, MediCorePro clinical intelligence, and enterprise healthcare dashboards.</p>
        </div>
        <div className="p-8 border border-cyber-blue/10 bg-cyber-blue/5 rounded-lg">
          <div className="text-cyber-blue mb-4"><Zap size={32} /></div>
          <h3 className="text-lg font-black uppercase mb-2">XR_Configurators</h3>
          <p className="text-xs text-cyber-blue/60 leading-relaxed uppercase tracking-wider">Razel Studio interior configurators, Painter Pro Studio, and high-fidelity WebAR visualizers.</p>
        </div>
      </section>

      {/* Stats / Capabilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32 border-y border-cyber-blue/10 py-12">
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-cyber-blue rounded-full"></span> Service_Tenure
          </div>
          <div className="text-2xl sm:text-3xl font-black italic">12+ YEARS</div>
        </div>
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-cyber-blue rounded-full"></span> Production_Deployments
          </div>
          <div className="text-2xl sm:text-3xl font-black italic underline decoration-cyber-blue/30 underline-offset-8">25+ CORE</div>
        </div>
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-cyber-blue rounded-full"></span> Sector_Focus
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyber-green italic">DEFENSE_R&D</div>
        </div>
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-cyber-blue rounded-full"></span> Platform_Lead
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyber-blue italic">UNITY_SYSTEMS</div>
        </div>
      </div>

      {/* Career Timeline */}
      <CareerTimeline />

      {/* Featured Projects */}
      <section id="core" className="mb-32">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-12 h-px bg-cyber-blue/30"></div>
          <h2 className="text-xl font-black tracking-tighter uppercase italic">
            <ScrambledText text="Mission_Operational_Systems" />
          </h2>
        </div>
        <ProjectGrid />
      </section>

      {/* Leadership Profile */}
      <section className="mb-32 flex flex-col items-center">
        <div className="text-center mb-16">
          <div className="text-[10px] font-black text-cyber-blue/40 tracking-[0.5em] uppercase mb-4">// System_Leadership //</div>
          <h2 className="text-3xl font-black italic uppercase">CEO & Founder Profile</h2>
        </div>
        <div className="w-full flex justify-center">
          <ProfileCard />
        </div>
      </section>

      {/* Terminal Footer */}
      <section className="mt-32 p-8 bg-black border border-cyber-blue/20 rounded-lg font-mono text-xs">
         <div className="flex items-center space-x-2 text-cyber-green mb-4">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
            <span className="font-bold">STATUS: RAZEL_TECH_STUDIO_LIVE</span>
         </div>
         <div className="text-cyber-blue/60 space-y-1">
            <p className="text-white">&gt; INITIALIZING_DASHBOARD...</p>
            <p>&gt; SCANNING_SIMULATION_LAYERS... [SUCCESS]</p>
            <p>&gt; CONNECTING_SAAS_LOGIC... [CONNECTED]</p>
            <p>&gt; MSME_LICENSING_VERIFIED... [READY]</p>
            <p>&gt; RAZEL_STUDIO_READY_FOR_ENGAGEMENT.</p>
         </div>
      </section>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/core" element={<DossierPage title="CORE_ENGINES" type="CORE_ENGINE" />} />
          <Route path="/logic" element={<DossierPage title="LOGIC_DATA" type="LOGIC_DATA" />} />
          <Route path="/labs" element={<DossierPage title="LABS" type="LABS" />} />
          <Route path="/vcard" element={<DigitalCard />} />
          <Route path="/deck" element={<CapabilityDeck />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
