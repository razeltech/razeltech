import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Terminal,
  Cpu,
  Globe,
  Code2,
  Box,
  Zap,
  ChevronUp,
  Activity,
  Glasses,
  Copy,
  Building,
  Network,
  Cloud,
  Layers,
  Workflow,
  Server,
  Database,
  Shield,
  ShieldCheck,
  Lock,
  CircleDollarSign
} from 'lucide-react';
const CyberGrid = lazy(() => import('./components/CyberGrid'));
const ShapeGrid = lazy(() => import('./components/ShapeGrid'));
const DigitalCard = lazy(() => import('./components/DigitalCard'));
const CapabilityDeck = lazy(() => import('./components/CapabilityDeck'));
const Solutions = lazy(() => import('./components/Solutions'));
const AboutUs = lazy(() => import('./components/AboutUs'));
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
    status: 'MISSION_CRITICAL',
    images: ['projects/t4s-sim/dashboard.png', 'projects/t4s-sim/tank.png']
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
    status: 'ACTIVE',
    images: ['projects/razel-studio/dashboard.png', 'projects/razel-studio/materials.png']
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
    id: 'invoicevault',
    title: 'INVOICE_VAULT_PRO',
    type: 'LABS',
    tags: ['React', 'Desktop', 'Billing', 'Offline'],
    description: 'Offline GST billing and business management software for Indian SMBs. Complete with GSTR-1 & 3B generation, inventory tracking, and automated ledger management.',
    link: 'https://razeltech.github.io/InvoiceVaultDemo/',
    status: 'OPERATIONAL',
    images: ['projects/invoicevault/dashboard.png', 'projects/invoicevault/login.png']
  },
  {
    id: 'contenthub',
    title: 'CONTENT_HUB_OS',
    type: 'LABS',
    tags: ['React', 'Firebase', 'Marketing', 'Automation'],
    description: 'The Multi-Tenant Marketing OS. A secure, premium marketing suite designed to centralize media assets, automate multi-platform scheduling, and facilitate collaboration.',
    link: 'https://contenthub-demo.vercel.app/',
    status: 'OPERATIONAL',
    images: ['projects/contenthub/dashboard.png', 'projects/contenthub/workflow.png']
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
  const location = useLocation();
  const hideFooter = location.pathname === '/vcard' || location.pathname === '/deck';
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [rawMouse, setRawMouse] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const springConfig = { damping: 20, stiffness: 1500 };
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
            <Link to="/" className="hover:text-cyber-blue transition-colors border-b border-transparent hover:border-cyber-blue pb-1">[ HOME ]</Link>
            <Link to="/about" className="hover:text-cyber-blue transition-colors border-b border-transparent hover:border-cyber-blue pb-1">[ ABOUT_US ]</Link>
            <Link to="/solutions" className="hover:text-cyber-blue transition-colors border-b border-transparent hover:border-cyber-blue pb-1">[ SOLUTIONS ]</Link>
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
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black tracking-[0.2em] text-cyber-blue uppercase"
                >
                  [ HOME ]
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black tracking-[0.2em] text-cyber-blue uppercase"
                >
                  [ ABOUT_US ]
                </Link>
                <Link
                  to="/solutions"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black tracking-[0.2em] text-cyber-blue uppercase"
                >
                  [ SOLUTIONS ]
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
                    <a href="https://www.linkedin.com/company/razel-tech" target="_blank" rel="noopener noreferrer" className="text-cyber-blue/60 hover:text-white transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative z-10 pt-[53px] md:pt-[88px] transform-gpu">{children}</main>
        <ScrollToTop />
        {!hideFooter && (
          <footer className="border-t border-cyber-blue/10 bg-black/80 backdrop-blur-md pt-16 pb-8 px-6 lg:px-12 relative overflow-hidden mt-32">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 mb-16 relative z-10">
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <img src="./logo.png" alt="RazelTech" className="w-8 h-8 object-contain" />
                  <span className="font-black tracking-tighter text-xl text-white uppercase">RAZEL TECH</span>
                </div>
                <p className="text-xs text-cyber-blue/60 leading-relaxed mb-6 font-mono">
                  Mission-critical software architecture for defense, industrial, and enterprise operations.
                </p>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/company/razel-tech" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-cyber-blue/30 flex items-center justify-center text-cyber-blue/60 hover:bg-cyber-blue hover:text-black hover:border-cyber-blue transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-[10px] font-black uppercase text-white tracking-[0.2em] mb-6">Site Index</h4>
                <ul className="space-y-4 text-xs font-mono text-cyber-blue/60">
                  <li><Link to="/" className="hover:text-cyber-blue transition-colors">Home</Link></li>
                  <li><Link to="/about" className="hover:text-cyber-blue transition-colors">About Us</Link></li>
                  <li><Link to="/deck" className="hover:text-cyber-blue transition-colors">Capability Deck</Link></li>
                  <li><Link to="/vcard" className="hover:text-cyber-blue transition-colors">VCard</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-[10px] font-black uppercase text-white tracking-[0.2em] mb-6">Firm Capabilities</h4>
                <ul className="space-y-4 text-xs font-mono text-cyber-blue/60">
                  <li><Link to="/solutions#simulation" className="hover:text-cyber-blue transition-colors">Simulation Systems</Link></li>
                <li><Link to="/solutions#saas" className="hover:text-cyber-blue transition-colors">Enterprise SaaS</Link></li>
                <li><Link to="/solutions#spatial" className="hover:text-cyber-blue transition-colors">Spatial & Digital Twins</Link></li>
                <li><Link to="/solutions#architecture" className="hover:text-cyber-blue transition-colors">Systems Architecture</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase text-white tracking-[0.2em] mb-6">Headquarters</h4>
                <ul className="space-y-4 text-xs font-mono text-cyber-blue/60">
                  <li>Guntur, Andhra Pradesh (Reg)</li>
                  <li>Hyderabad / Vijayawada (Ops)</li>
                  <li className="pt-2 text-cyber-blue hover:text-white transition-colors">
                    <a href="mailto:razeltech.in@gmail.com">razeltech.in@gmail.com</a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase text-white tracking-[0.2em] mb-6">Compliance</h4>
                <ul className="space-y-4 text-xs font-mono text-cyber-blue/60 flex flex-col items-start">
                  <li className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-cyber-blue/40">MSME UDYAM REGISTRATION</span>
                    <span className="text-white">UDYAM-AP-04-0112603</span>
                  </li>
                  <li className="flex flex-col gap-1 pt-2">
                    <span className="text-[9px] uppercase tracking-widest text-cyber-blue/40">AP SHOPS & ESTTS ACT</span>
                    <span className="text-white">AP-07-27-002-04080705</span>
                  </li>
                  <li className="pt-4 flex items-center space-x-2 text-cyber-green text-[9px] uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse"></span>
                    <span>VERIFIED_FIRM</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-cyber-blue/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-cyber-blue/40 tracking-[0.2em] uppercase font-mono relative z-10">
              <div>© RAZELTECH // SYSTEMS_EST_2025</div>
              <div className="flex space-x-6">
                <Link to="/deck" className="hover:text-cyber-blue transition-colors">CAPABILITY_DECK</Link>
                <Link to="/vcard" className="hover:text-cyber-blue transition-colors">VCARD</Link>
              </div>
              <div>STATUS::OPERATIONAL</div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-blue/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          </footer>
        )}
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
  <div className="max-w-7xl mx-auto px-6 py-40 text-center flex flex-col items-center">
    <div className="relative mb-12">
      <div className="absolute inset-0 bg-red-600/40 blur-[80px] rounded-full animate-pulse"></div>
      <div className="inline-flex items-center space-x-2 text-red-500 text-[10px] font-black tracking-[0.4em] uppercase relative z-10 border border-red-500/50 px-6 py-2 bg-black/80 backdrop-blur-md rounded shadow-[0_0_15px_rgba(239,68,68,0.5)]">
        <ShieldAlertIcon size={14} className="animate-ping" />
        <span>CRITICAL_ERROR // 404 // ACCESS_DENIED</span>
      </div>
    </div>

    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 italic uppercase relative group cursor-crosshair leading-tight">
      <span className="opacity-40 absolute inset-0 text-red-500 blur-md translate-x-2 translate-y-2 animate-pulse">404 Error</span>
      <ScrambledText text="Tech Glitch" /><br />
      <span className="text-red-500 terminal-text relative inline-block mt-4">
        <span className="absolute -inset-1 bg-red-500/30 blur-lg animate-pulse"></span>
        <ScrambledText text="404 Not Found the Page" />
      </span>
    </h1>

    <div className="w-full max-w-lg mb-12 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

    <p className="text-red-400 font-mono text-sm md:text-base tracking-widest mb-12 uppercase flex flex-col gap-2 font-bold max-w-xl text-center">
      <span>&gt; FATAL: Requested_Endpoint_Not_Found.</span>
      <span className="text-red-500 animate-pulse">&gt; Awaiting_New_Coordinates...</span>
    </p>

    <Link to="/" className="group relative px-10 py-5 border-2 border-red-500/50 text-red-500 text-xs font-black tracking-widest uppercase overflow-hidden transition-all hover:border-red-500 hover:text-black hover:bg-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.8)]">
      <span className="relative flex items-center justify-center gap-3">
        <Terminal size={16} />
        EMERGENCY_OVERRIDE_TO_BASE
      </span>
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
            <a href="https://github.com/razeltech" target="_blank" rel="noreferrer" className="p-1.5 hover:text-cyber-blue transition-colors">
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
          <div className="absolute top-0 right-0 z-20">
            <div className={`group/blip relative flex items-center justify-end h-6 w-6 cursor-help`}>
              <div className={`overflow-hidden absolute right-0 w-6 group-hover/blip:w-[100px] transition-all duration-300 ease-out h-6 rounded-full border border-transparent ${project.status === 'CLASSIFIED' ? 'group-hover/blip:border-red-500/30 group-hover/blip:bg-red-500/10' : 'group-hover/blip:border-cyber-green/30 group-hover/blip:bg-cyber-green/10'} flex items-center justify-center`}>
                <span className={`absolute right-1 w-4 h-4 flex items-center justify-center`}>
                  <span className={`absolute w-3 h-3 rounded-full animate-ping opacity-75 ${project.status === 'CLASSIFIED' ? 'bg-red-500' : 'bg-cyber-green'}`}></span>
                  <span className={`relative w-1.5 h-1.5 rounded-full ${project.status === 'CLASSIFIED' ? 'bg-red-500' : 'bg-cyber-green'}`}></span>
                </span>
                <span className={`pr-5 whitespace-nowrap text-[8px] font-black tracking-widest uppercase opacity-0 group-hover/blip:opacity-100 transition-opacity duration-300 delay-75 ${project.status === 'CLASSIFIED' ? 'text-red-500' : 'text-cyber-green'}`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-cyber-blue/40 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{project.type}</div>
            <h3 className="text-2xl font-black tracking-tight group-hover:text-cyber-blue transition-colors italic">
              <ScrambledText text={project.title} />
            </h3>
          </div>

          <p className="text-sm text-cyber-blue/60 mb-8 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map(tag => (
              <span key={tag} className="text-[9px] font-bold border border-cyber-blue/20 px-2 py-1 rounded text-cyber-blue/40">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Link
              to={`/project/${project.id}`}
              className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-cyber-blue hover:text-black border border-cyber-blue/30 hover:bg-cyber-blue px-4 py-2 rounded transition-all w-full sm:w-auto justify-center"
            >
              <span>Access_Brochure</span>
            </Link>

            {project.link !== '#' ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest bg-cyber-blue text-black hover:bg-white hover:text-black px-4 py-2 rounded transition-all w-full sm:w-auto"
              >
                <span>Launch_WebSite</span>
                <ExternalLinkIcon size={12} />
              </a>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest text-red-500/50 w-full sm:w-auto">
                <ShieldAlertIcon size={12} />
                <span>Restricted</span>
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

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    return <NotFound />;
  }

  const sections = [
    {
      title: 'SYSTEM_OVERVIEW',
      text: project.description,
      image: project.images?.[0]
    },
    {
      title: 'CORE_CAPABILITIES',
      text: `Integrated logic systems and framework tools utilized in this architecture: ${project.tags.join(', ')}. Engineered for maximum stability and performance in operational environments.`,
      image: project.images?.[1]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <button
        onClick={() => navigate(-1)}
        className="mb-12 text-[10px] font-bold tracking-widest text-cyber-blue hover:text-white transition-colors uppercase flex items-center space-x-2"
      >
        <span>&lt; Return_To_Previous</span>
      </button>

      <div className="mb-16 border-b border-cyber-blue/20 pb-16">
        <div className="inline-flex items-center space-x-2 text-cyber-blue/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
          <Terminal size={12} />
          <span>{project.type} // {project.status}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 italic uppercase">
          <ScrambledText text={project.title} />
        </h1>

        {project.link !== '#' && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-3 text-[12px] font-black uppercase tracking-widest text-black bg-cyber-blue hover:bg-white px-8 py-4 rounded transition-all mt-4"
          >
            <span>Launch_Platform</span>
            <ExternalLinkIcon size={16} />
          </a>
        )}
      </div>

      <div className="space-y-24">
        {sections.map((section, idx) => {
          const isReversed = idx % 2 !== 0;

          return (
            <div key={idx} className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
              {/* Text Column */}
              <div className="w-full md:w-1/2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-8 h-px bg-cyber-blue/50"></div>
                  <h2 className="text-2xl font-black tracking-tighter uppercase italic text-white">
                    {section.title}
                  </h2>
                </div>
                <p className="text-sm md:text-base text-cyber-blue/70 leading-relaxed text-justify">
                  {section.text}
                </p>
                {idx === 0 && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold border border-cyber-blue/30 bg-cyber-blue/5 px-3 py-1.5 rounded text-cyber-blue">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Image Column */}
              <div className="w-full md:w-1/2">
                <div className="border border-cyber-blue/20 bg-cyber-blue/5 p-2 rounded-lg group h-full flex items-center justify-center min-h-[300px]">
                  {section.image ? (
                    <div className="relative overflow-hidden rounded w-full h-full">
                      <img
                        src={`./${section.image}`}
                        alt={`${project.title} visual data`}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 rounded"
                      />
                      <div className="absolute inset-0 bg-cyber-blue/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-cyber-blue/30 p-12 text-center w-full h-full bg-black/40 rounded">
                      <Code2 size={48} className="mb-4 opacity-50" />
                      <div className="text-[10px] font-mono tracking-widest uppercase mb-2">
                        [ VISUAL_DATA_UNAVAILABLE ]
                      </div>
                      <div className="text-[8px] uppercase tracking-wider opacity-60">
                        Image matrix not found for this sector.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};



const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    { quote: "Razel Tech delivered an incredibly stable system where generic software failed. Their 'no bloatware' approach saved us massive server costs.", author: "InvisionXR Studios", role: "Partners" },
    { quote: "The architectural precision and reliability is unmatched. Their defense-grade background truly translates into how they write enterprise code.", author: "Elements3D", role: "Partners" },
    { quote: "A rare breed of engineering. They didn't just write code, they fixed our fundamental business logic before building the SaaS product.", author: "Green Vision Solutions (GVS)", role: "Simulation Clients" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative mb-32 py-16 bg-cyber-blue/5 border-y border-cyber-blue/10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyber-blue/5 rounded-full blur-[80px]"></div>
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="text-[10px] font-black text-cyber-blue/40 tracking-[0.3em] uppercase mb-12">Client Feedback // System Validation</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-[150px] flex flex-col justify-center"
          >
            <p className="text-xl md:text-3xl font-medium italic text-white mb-8 leading-relaxed">"{testimonials[currentIndex].quote}"</p>
            <div>
              <div className="text-sm font-black text-cyber-blue uppercase tracking-widest">{testimonials[currentIndex].author}</div>
              <div className="text-[10px] font-mono text-cyber-blue/50 uppercase">{testimonials[currentIndex].role}</div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center space-x-3 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-12 h-1 transition-all ${idx === currentIndex ? 'bg-cyber-blue' : 'bg-cyber-blue/20 hover:bg-cyber-blue/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SystemTopology = () => {
  const [activeNode, setActiveNode] = useState(null);

  const Tooltip = ({ title, stack }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 5, scale: 0.95 }}
        className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-black/90 border border-cyber-blue/40 px-3 py-2 rounded shadow-[0_0_15px_rgba(0,243,255,0.2)] z-50 pointer-events-none min-w-max text-center"
      >
        <div className="text-[10px] font-black text-white mb-1">{title}</div>
        <div className="text-[8px] font-mono text-cyber-blue/70">{stack}</div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <div className="absolute -right-[10%] md:right-[-5%] lg:right-[5%] xl:right-[10%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] xl:w-[500px] xl:h-[500px] opacity-15 md:opacity-30 lg:opacity-100">
        {/* Spinning Rings */}
        <div className="absolute inset-0 border border-cyber-blue/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute inset-8 border border-cyber-blue/20 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
        <div className="absolute inset-20 border border-cyber-blue/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
        
        {/* Center Node */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 bg-black border border-cyber-blue rounded-xl flex items-center justify-center shadow-[0_0_40px_rgba(0,243,255,0.3)] z-20 pointer-events-auto cursor-crosshair transition-colors hover:bg-cyber-blue/10"
          onMouseEnter={() => setActiveNode('core')}
          onMouseLeave={() => setActiveNode(null)}
        >
          <span className="font-black text-2xl md:text-3xl text-cyber-blue tracking-tighter">RT</span>
          <div className="absolute -bottom-6 text-[7px] md:text-[8px] font-mono text-cyber-blue tracking-widest whitespace-nowrap">RAZEL_TECH</div>
          {activeNode === 'core' && <Tooltip title="CORE_ENGINE" stack="Precision Systems & Architecture" />}
        </div>

        {/* Orbiting Artifacts */}
        {[
          { id: 'react', angle: 0, icon: <img src="https://cdn.simpleicons.org/react/00f3ff" className="w-5 h-5 md:w-6 md:h-6" alt="React" />, title: 'FRONTEND_SaaS', stack: 'React / WebGL / Three.js' },
          { id: 'unity', angle: 60, icon: <img src="https://cdn.simpleicons.org/unity/00f3ff" className="w-5 h-5 md:w-6 md:h-6" alt="Unity" />, title: 'CORE_ENGINE', stack: 'Unity3D / C# / Physics' },
          { id: 'vr', angle: 120, icon: <Glasses size={18} className="text-cyber-blue" />, title: 'XR_MODULE', stack: 'OpenXR / Spatial Computing' },
          { id: 'git', angle: 180, icon: <img src="https://cdn.simpleicons.org/git/00f3ff" className="w-5 h-5 md:w-6 md:h-6" alt="Git" />, title: 'VERSION_CONTROL', stack: 'Git / CI/CD Pipelines' },
          { id: 'unreal', angle: 240, icon: <img src="https://cdn.simpleicons.org/unrealengine/00f3ff" className="w-5 h-5 md:w-6 md:h-6" alt="Unreal" />, title: 'AAA_ENGINE', stack: 'Unreal Engine 5 / C++' },
          { id: 'finance', angle: 300, icon: <CircleDollarSign size={18} className="text-cyber-blue" />, title: 'FINTECH_LEDGER', stack: 'Secure Billing / Analytics' },
        ].map((node) => (
          <motion.div 
            key={node.id}
            className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none z-20"
            style={{ x: '-50%', y: '-50%' }}
            animate={{ rotate: [node.angle, node.angle + 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 md:-mt-6 w-10 h-10 md:w-12 md:h-12 bg-black/80 backdrop-blur-sm border border-cyber-blue/50 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.2)] pointer-events-auto cursor-crosshair transition-colors hover:bg-cyber-blue/10"
              animate={{ rotate: [-node.angle, -(node.angle + 360)] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {node.icon}
              {activeNode === node.id && (
                <div className="absolute top-0 left-0">
                   <Tooltip title={node.title} stack={node.stack} />
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="mb-20 md:mb-32 relative min-h-[70vh] flex flex-col justify-center">
        <SystemTopology />
        
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl relative z-10 pointer-events-none">
          <div className="inline-flex items-center space-x-2 text-cyber-green text-[7px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] mb-6 uppercase max-w-full pointer-events-auto border border-cyber-green/30 bg-cyber-green/5 px-3 py-1 rounded-full">
            <ShieldAlertIcon size={12} className="shrink-0 animate-pulse" />
            <span className="truncate">Defense-Grade Systems For Modern Business</span>
          </div>
          
          <h1 className="sr-only">Custom Enterprise Software Development Company</h1>
          
          <div aria-hidden="true" className="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[5rem] font-black tracking-tighter mb-4 leading-[0.9] italic uppercase w-full pointer-events-auto">
            <span className="inline-block"><ScrambledText text="ARCHITECTING" /></span><br />
            <span className="text-cyber-blue terminal-text inline-block mt-2">
              <ScrambledText text="PRECISION_SYSTEMS" />
            </span>
          </div>

          <div className="mb-10 font-mono text-cyber-blue/80 text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] uppercase pointer-events-auto border-l-2 border-cyber-blue pl-4 py-1 leading-relaxed">
            Enterprise Software <span className="text-cyber-green mx-1 sm:mx-2">•</span> Digital Twins <span className="text-cyber-green mx-1 sm:mx-2">•</span> Unity Engineering <span className="text-cyber-green mx-1 sm:mx-2">•</span> AI Systems
          </div>
          
          <div className="relative max-w-lg xl:max-w-xl mb-16 pointer-events-auto space-y-6">
            <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed">
              Stop changing your workflow to fit generic software.
            </p>
            <p className="text-base md:text-lg text-white/70 font-medium leading-relaxed">
              Razel Tech engineers custom, zero-bloat architecture around your actual business processes—not templates.
            </p>
            <p className="text-base md:text-lg text-cyber-blue font-bold leading-relaxed">
              Flexible SaaS solutions & full-ownership custom IP tailored for scale.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pointer-events-auto mb-16">
            <a href="mailto:razeltech.in@gmail.com" className="px-8 py-4 bg-cyber-blue text-black text-[10px] font-black tracking-widest uppercase hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)] text-center">
              SCHEDULE_SYSTEM_AUDIT
            </a>
            <Link to="/deck" className="px-8 py-4 border border-cyber-blue/30 bg-black/60 backdrop-blur text-cyber-blue text-[10px] font-black tracking-widest uppercase hover:border-cyber-blue hover:bg-cyber-blue/10 transition-colors text-center">
              VIEW_CAPABILITY_DECK
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 pointer-events-auto text-[10px] md:text-xs font-mono tracking-widest uppercase text-cyber-blue/80">
            <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-cyber-green"/> 12+ Years Eng.</span>
            <span className="flex items-center gap-2"><Cpu size={14} className="text-cyber-green"/> Defense-Grade Core</span>
            <span className="flex items-center gap-2"><Network size={14} className="text-cyber-green"/> Zero Vendor Lock-in</span>
            <span className="flex items-center gap-2"><Lock size={14} className="text-cyber-green"/> 100% Ownership</span>
          </div>
        </div>
      </section>

      {/* Anti-Bloatware Strip */}
      <div className="w-full border-y border-cyber-blue/10 bg-cyber-blue/5 py-8 mb-32 -mx-6 px-6 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,243,255,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
        <div className="text-center relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-12 text-[10px] md:text-[14px] font-black uppercase tracking-[0.3em] text-white/80">
          <span>Managed Cloud & SaaS</span>
          <span className="hidden md:block w-1.5 h-1.5 bg-cyber-blue rounded-full"></span>
          <span>100% Custom Code</span>
          <span className="hidden md:block w-1.5 h-1.5 bg-cyber-blue rounded-full"></span>
          <span className="text-cyber-blue text-[12px] md:text-[16px]">Enterprise Grade</span>
        </div>
      </div>



      {/* Systems Built Showcase */}
      <section className="mb-32">
        <div className="text-[10px] font-black text-cyber-blue/40 tracking-[0.4em] uppercase mb-12 text-center">// Systems_Constructed</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-0">
          <div className="bg-black/60 border border-cyber-blue/20 p-6 hover:border-cyber-blue/50 transition-colors group">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-blue transition-colors">Healthcare Platform</h3>
            <p className="text-cyber-blue/60 text-[10px] tracking-widest uppercase font-mono mb-4">Enterprise SaaS</p>
            <div className="h-px w-full bg-cyber-blue/20 mb-4"></div>
            <p className="text-xs text-white/60 leading-relaxed">HIPAA compliant, highly secure multi-tenant architecture processing real-time patient data.</p>
          </div>
          
          <div className="bg-black/60 border border-cyber-blue/20 p-6 hover:border-cyber-blue/50 transition-colors group">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-blue transition-colors">Industrial Digital Twin</h3>
            <p className="text-cyber-blue/60 text-[10px] tracking-widest uppercase font-mono mb-4">Unity + IFC + BIM</p>
            <div className="h-px w-full bg-cyber-blue/20 mb-4"></div>
            <p className="text-xs text-white/60 leading-relaxed">High-fidelity 3D facility tracking with live sensor data integration for manufacturing.</p>
          </div>

          <div className="bg-black/60 border border-cyber-blue/20 p-6 hover:border-cyber-blue/50 transition-colors group">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-blue transition-colors">Defense Simulation</h3>
            <p className="text-cyber-blue/60 text-[10px] tracking-widest uppercase font-mono mb-4">Real-Time Visualization</p>
            <div className="h-px w-full bg-cyber-blue/20 mb-4"></div>
            <p className="text-xs text-white/60 leading-relaxed">Multi-agent deterministic physics environments for critical path and resource analysis.</p>
          </div>

          <div className="bg-black/60 border border-cyber-blue/20 p-6 hover:border-cyber-blue/50 transition-colors group">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-blue transition-colors">AI Workflow Engine</h3>
            <p className="text-cyber-blue/60 text-[10px] tracking-widest uppercase font-mono mb-4">Custom LLM Integration</p>
            <div className="h-px w-full bg-cyber-blue/20 mb-4"></div>
            <p className="text-xs text-white/60 leading-relaxed">Local-hosted, isolated RAG pipelines automating proprietary internal business logic.</p>
          </div>
        </div>
      </section>

      {/* Solution Domains (Poster Bottom Row) */}
      <section id="solutions" className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black italic uppercase text-white mb-4">Business & Industrial Solutions</h2>
          <p className="text-cyber-blue/60 max-w-2xl mx-auto text-sm">Architecting scalable, maintainable systems for specialized sectors.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-8 border border-cyber-blue/20 bg-black/40 rounded-xl hover:border-cyber-blue/50 transition-colors group">
            <div className="bg-cyber-blue/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyber-blue/20 transition-colors">
              <Network size={24} className="text-cyber-blue" />
            </div>
            <h3 className="text-lg font-black uppercase mb-3 text-white">Simulation & Multiplayer</h3>
            <p className="text-sm text-cyber-blue/60 leading-relaxed">Defense-grade tactical simulators, motion platform integrations, and high-volume real-time network programming.</p>
          </div>
          <div className="p-8 border border-cyber-blue/20 bg-black/40 rounded-xl hover:border-cyber-blue/50 transition-colors group">
            <div className="bg-cyber-blue/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyber-blue/20 transition-colors">
              <Cloud size={24} className="text-cyber-blue" />
            </div>
            <h3 className="text-lg font-black uppercase mb-3 text-white">Enterprise SaaS</h3>
            <p className="text-sm text-cyber-blue/60 leading-relaxed">Custom cloud dashboards, CRM platforms, offline billing systems, and strict business automation pipelines.</p>
          </div>
          <div className="p-8 border border-cyber-blue/20 bg-black/40 rounded-xl hover:border-cyber-blue/50 transition-colors group">
            <div className="bg-cyber-blue/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyber-blue/20 transition-colors">
              <Layers size={24} className="text-cyber-blue" />
            </div>
            <h3 className="text-lg font-black uppercase mb-3 text-white">Spatial & 3D Visualization</h3>
            <p className="text-sm text-cyber-blue/60 leading-relaxed">Interactive product configurators, digital twin environments, and optimized BIM rendering for web and XR.</p>
          </div>
          <div className="p-8 border border-cyber-blue/20 bg-black/40 rounded-xl hover:border-cyber-blue/50 transition-colors group lg:col-span-3 lg:w-2/3 mx-auto flex flex-col md:flex-row items-center gap-6">
            <div className="bg-cyber-blue/10 w-16 h-16 shrink-0 rounded-lg flex items-center justify-center group-hover:bg-cyber-blue/20 transition-colors">
              <Workflow size={32} className="text-cyber-blue" />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase mb-2 text-white">Systems Architecture & Custom Dev</h3>
              <p className="text-sm text-cyber-blue/60 leading-relaxed">When existing tools cannot solve your requirements. Razel Tech provides end-to-end software architecture consulting and full-stack development focused on long-term maintainability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="core" className="mb-32">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-12 h-px bg-cyber-blue/30"></div>
          <h2 className="text-2xl font-black tracking-tighter uppercase italic text-white">
            Proof of Execution // Featured Systems
          </h2>
        </div>
        <ProjectGrid />
      </section>

      {/* Thematic Testimonial Slider */}
      <TestimonialSlider />

      {/* Engineering Mindset / Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-cyber-blue/10 py-12">
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-cyber-blue rounded-full"></span> Engineering_Tenure
          </div>
          <div className="text-2xl sm:text-3xl font-black italic text-white">12+ YEARS</div>
        </div>
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-cyber-blue rounded-full"></span> Core_Philosophy
          </div>
          <div className="text-xl sm:text-2xl font-black italic text-cyber-green">COST_EFFECTIVE</div>
        </div>
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-cyber-blue rounded-full"></span> Methodology
          </div>
          <div className="text-xl sm:text-2xl font-black italic text-white">NO_BLOATWARE</div>
        </div>
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-cyber-blue rounded-full"></span> Systems_Built
          </div>
          <div className="text-2xl sm:text-3xl font-black italic text-cyber-blue underline decoration-cyber-blue/30 underline-offset-8">STABLE_&_PRECISE</div>
        </div>
      </div>

      {/* Leadership Profile */}
      <section className="mb-32 flex flex-col items-center">
        <div className="text-center mb-16">
          <div className="text-[10px] font-black text-cyber-blue/40 tracking-[0.5em] uppercase mb-4">// Technical_Leadership //</div>
          <h2 className="text-3xl font-black italic uppercase text-white">Meet The Architect</h2>
        </div>
        <div className="w-full flex justify-center">
          <ProfileCard />
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
          <Route path="/solutions" element={<Suspense fallback={<div className="min-h-screen bg-obsidian flex items-center justify-center text-cyber-blue font-mono animate-pulse">LOADING_SYSTEMS...</div>}><Solutions /></Suspense>} />
          <Route path="/core" element={<DossierPage title="CORE_ENGINES" type="CORE_ENGINE" />} />
          <Route path="/logic" element={<DossierPage title="LOGIC_DATA" type="LOGIC_DATA" />} />
          <Route path="/labs" element={<DossierPage title="LABS" type="LABS" />} />
          <Route path="/deck" element={<CapabilityDeck />} />
          <Route path="/vcard" element={<DigitalCard />} />
          <Route path="/about" element={<Suspense fallback={<div className="min-h-screen bg-obsidian flex items-center justify-center text-cyber-blue font-mono animate-pulse">LOADING_ABOUT...</div>}><AboutUs /></Suspense>} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
