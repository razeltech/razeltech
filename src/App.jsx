import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Globe, 
  Code2, 
  Box, 
  Zap, 
  ExternalLink,
  ShieldAlert,
  ChevronUp,
  Github,
  Linkedin
} from 'lucide-react';
import CyberGrid from './components/CyberGrid';
import ShapeGrid from './components/ShapeGrid';
import DotField from './components/DotField';
import BorderGlow from './components/BorderGlow';
import ScrollReveal from './components/ScrollReveal';

// --- DATA ---
const PROJECTS = [
  {
    id: 'army-sim',
    title: 'DEFENSE_COMMAND_X',
    type: 'CORE_ENGINE',
    tags: ['Unity', 'Multiplayer', 'Defense'],
    description: 'Mission-critical multiplayer simulations for Indian Army programs. Real-time tactical coordination and high-stakes simulation logic.',
    link: '#',
    status: 'CLASSIFIED'
  },
  {
    id: 'razelstudio',
    title: 'RAZEL_STUDIO_XR',
    type: 'CORE_ENGINE',
    tags: ['VR', 'AR', 'Simulation'],
    description: 'Advanced VR/AR simulation framework for industrial training. Expert-level spatial interactions and multiplayer physics.',
    link: 'https://r2dapps.github.io/RazelStudio/',
    status: 'ACTIVE'
  },
  {
    id: 'bim',
    title: 'BIM_VISUALIZATION',
    type: 'CORE_ENGINE',
    tags: ['Unity', 'BIM', 'Industrial'],
    description: 'Real-time WebGL visualization for complex Building Information Modeling data. Seamless industrial spatial data integration.',
    link: 'https://r2dapps.github.io/BimWebDemo/',
    status: 'STABLE'
  },
  {
    id: 'medicore-app',
    title: 'MEDICORE_PRO_LIVE',
    type: 'LOGIC_DATA',
    tags: ['React', 'SaaS', 'Clinical'],
    description: 'Enterprise clinical intelligence dashboard. Features complex data visualization and mission-critical patient management.',
    link: 'https://medi-core-pro.vercel.app/',
    status: 'OPERATIONAL'
  },
  {
    id: 'medicore-demo',
    title: 'MEDICORE_PRO_SHOWCASE',
    type: 'LOGIC_DATA',
    tags: ['React', 'SaaS', 'Sales'],
    description: 'Professional sales and demonstration platform for the MediCorePro healthcare ecosystem.',
    link: 'https://r2dapps.github.io/ClinicAppDemo/',
    status: 'ACTIVE'
  },
  {
    id: 'resume',
    title: 'RESUME_ENGINE',
    type: 'LABS',
    tags: ['React', 'Utility', 'PDF'],
    description: 'High-fidelity resume builder with 100% print parity. Engineered for zero-margin A4 hardened layouts.',
    link: 'https://r2dapps.github.io/react-resume-builder/',
    status: 'STABLE'
  }
];

const CAREER_LOG = [
  {
    year: '2025 - PRESENT',
    role: 'FOUNDER & PRINCIPAL SYSTEMS ENGINEER',
    company: 'RAZEL TECH',
    description: 'Building real-time Unity solutions for simulation, XR, and industrial systems. MSME registered studio focusing on high-fidelity defense simulations.',
    type: 'STRATEGIC_COMMAND'
  },
  {
    year: '2023 - 2025',
    role: 'PROJECT MANAGER',
    company: 'CODECHAI TECH PVT LTD',
    description: 'Managed international development pipelines and complex systems integration for enterprise clients.',
    type: 'MANAGEMENT_LOGIC'
  },
  {
    year: '2018 - 2025',
    role: 'TECHNICAL MANAGER',
    company: 'GREEN VISION SOLUTIONS INC',
    description: 'Led technical delivery for mission-critical Unity simulations for Indian Army programs, specializing in multiplayer and embedded systems.',
    type: 'DEFENSE_SIMULATION'
  },
  {
    year: '2014 - 2018',
    role: 'UNITY 3D DEVELOPER',
    company: 'GREEN VISION SOLUTIONS INC',
    description: 'Developed high-performance interactive 3D applications and simulation engines for industrial use.',
    type: 'CORE_ENGINEERING'
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
        <ShapeGrid 
          speed={0.2} 
          squareSize={50}
          direction='diagonal'
          borderColor='rgba(0, 243, 255, 0.08)'
          hoverFillColor='rgba(0, 243, 255, 0.15)'
          hoverTrailAmount={10}
        />
        {/* <div className="absolute inset-0">
          <DotField 
            mouseX={rawMouse.x} 
            mouseY={rawMouse.y}
            dotSpacing={30}
            dotRadius={1.2}
            glowColor="rgba(0, 243, 255, 0.3)"
          />
        </div> */}
        <div className="absolute inset-0">
          <CyberGrid />
        </div>
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.9)_100%)] pointer-events-none" />
      </div>

      <div className="scanline" />
      <CustomCursor mouseX={smoothX} mouseY={smoothY} />
      
      <div className="relative z-10">
        <nav className="p-6 border-b border-cyber-blue/20 flex justify-between items-center backdrop-blur-sm sticky top-0 z-50 bg-obsidian/80">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 flex items-center justify-center rounded overflow-hidden transition-transform duration-300 group-hover:scale-110">
              <img src="/src/assets/logo_white.png" alt="RazelTech Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-black tracking-tighter text-2xl terminal-text group-hover:text-white transition-colors uppercase">RAZEL TECH</span>
          </Link>
          <div className="hidden md:flex space-x-8 text-[10px] font-bold tracking-widest text-cyber-blue/60 uppercase">
            <Link to="/core" className="hover:text-cyber-blue transition-colors border-b border-transparent hover:border-cyber-blue pb-1">[ CORE_ENGINES ]</Link>
            <Link to="/logic" className="hover:text-cyber-blue transition-colors border-b border-transparent hover:border-cyber-blue pb-1">[ LOGIC_DATA ]</Link>
            <Link to="/labs" className="hover:text-cyber-blue transition-colors border-b border-transparent hover:border-cyber-blue pb-1">[ LABS ]</Link>
          </div>
        </nav>
        <main className="relative z-10">{children}</main>
        <ScrollToTop />
        <footer className="p-12 border-t border-cyber-blue/10 text-center text-[10px] text-cyber-blue/40 tracking-[0.3em] uppercase">
          <div className="mb-4 text-cyber-blue/20">SYSTEM_ACCESS::AUTHENTICATED // BUFFER_STATUS::SYNCED</div>
          <div className="mb-2 text-cyber-blue/10 flex items-center justify-center space-x-2">
            <span>MSME_REG::UDYAM-AP-04-0112603</span>
            <img src="/src/assets/verified_badge.png" alt="Verified" className="w-3 h-3 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-help" title="MSME Certified" />
            <span>// RAZEL_TECH_SOLUTIONS</span>
          </div>
          © RAZELTECH // SYSTEMS_EST_2025 // ALL_RIGHTS_RESERVED
        </footer>
      </div>
    </div>
  );
};

const ScrambledText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayedText(prev => 
        text.split('').map((char, index) => {
          if (index < iteration) return text[index];
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

  return <span onMouseEnter={scramble} className="cursor-pointer">{displayedText}</span>;
};

const NotFound = () => (
  <div className="max-w-7xl mx-auto px-6 py-40 text-center">
    <div className="inline-flex items-center space-x-2 text-red-500 text-[10px] font-black tracking-[0.4em] mb-12 uppercase">
      <ShieldAlert size={14} />
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
        <div className="w-12 h-12 bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center rounded-lg">
          <Cpu className="text-cyber-blue" size={24} />
        </div>
        <div>
          <div className="text-[10px] font-bold text-cyber-blue/60 uppercase tracking-widest">Founder</div>
          <div className="text-sm font-black italic uppercase">Razel Tech</div>
        </div>
      </div>

      <div className="space-y-4 text-[10px] font-bold tracking-widest text-cyber-blue/60 uppercase">
        <div className="flex items-center space-x-3">
          <Globe size={14} className="text-cyber-blue" />
          <span>Hyderabad, India</span>
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
                  <Linkedin size={16} />
               </a>
               <a href="https://github.com/r2dapps" target="_blank" rel="noreferrer" className="p-1.5 hover:text-cyber-blue transition-colors">
                  <Github size={16} />
               </a>
            </div>
         </div>
         <div className="text-[8px] font-bold text-cyber-blue/40 tracking-widest uppercase text-center border border-cyber-blue/10 py-2 rounded">
            MSME_REG::UDYAM-AP-04-0112603 // LICENSED_STUDIO
         </div>
      </div>
    </motion.div>
  </BorderGlow>
);

const CareerTimeline = () => {
  return (
    <section id="timeline" className="mb-32">
      <div className="flex items-center space-x-4 mb-16">
        <div className="w-12 h-px bg-cyber-blue/30"></div>
        <h2 className="text-xl font-black tracking-tighter uppercase italic">Career_Log</h2>
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

            <h3 className="text-2xl font-black tracking-tight italic mb-1">{item.role}</h3>
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
  const filteredProjects = filter 
    ? PROJECTS.filter(p => p.type === filter)
    : PROJECTS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {filteredProjects.map((project) => (
        <SpotlightCard key={project.id} project={project} />
      ))}
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
                <ExternalLink size={14} />
              </a>
            ) : (
              <div className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-red-500/50">
                <ShieldAlert size={14} />
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
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">Dossier::{title}</h2>
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
      <section className="mb-32 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-cyber-green text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
            <Zap size={12} />
            <span>Connection_Established // raja_vamsi_dhar // system_lead</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none italic uppercase">
            <ScrambledText text="PRINCIPAL" /><br />
            <span className="text-cyber-blue terminal-text">
              <ScrambledText text="SYSTEMS_ENGINEER" />
            </span>
          </h1>
          <div className="mb-10 flex items-center space-x-4">
             <div className="h-px w-8 bg-cyber-blue/50"></div>
             <span className="text-cyber-blue/60 font-bold tracking-[0.3em] text-[10px] uppercase">Raja Vamsi Dhar // Defense Simulation Specialist</span>
          </div>
          <p className="text-lg md:text-xl text-cyber-blue/60 max-w-2xl font-medium leading-relaxed mb-12">
            <TypewriterText text="Architecting mission-critical Unity simulations and high-fidelity industrial BIM pipelines. Focused on zero-latency spatial intelligence and defense-grade immersive systems." />
          </p>
        </div>
        
        <div className="lg:mt-12">
          <ProfileCard />
        </div>
      </section>

      {/* Stats / Capabilities */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-cyber-blue/10 py-12">
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-cyber-blue rounded-full"></span> Service_Period
          </div>
          <div className="text-3xl font-black">12+ YRS</div>
        </div>
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-cyber-blue rounded-full"></span> Systems_Deployed
          </div>
          <div className="text-3xl font-black italic underline decoration-cyber-blue/30 underline-offset-8">25+ CORE</div>
        </div>
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-cyber-blue rounded-full"></span> Expertise_Primary
          </div>
          <div className="text-3xl font-black text-cyber-green">UNITY_DEFENSE</div>
        </div>
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-1 h-1 bg-cyber-blue rounded-full"></span> Logic_Layer
          </div>
          <div className="text-3xl font-black text-cyber-blue">REACT_SAAS</div>
        </div>
      </div>

      {/* Career Timeline */}
      <CareerTimeline />

      {/* Featured Projects */}
      <section id="core">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-12 h-px bg-cyber-blue/30"></div>
          <h2 className="text-xl font-black tracking-tighter uppercase italic">Featured_Systems</h2>
        </div>
        <ProjectGrid />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
