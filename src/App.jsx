import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Globe, 
  Code2, 
  Box, 
  Zap, 
  ChevronRight, 
  Github, 
  Linkedin,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

// --- DATA ---
const PROJECTS = [
  {
    id: 'medicore',
    title: 'MEDICORE_PRO',
    type: 'LOGIC_DATA',
    tags: ['React', 'Clinical AI', 'Healthcare'],
    description: 'Clinical intelligence dashboard for professional medical environments. Features complex data visualization and role-based access.',
    link: 'https://medi-core-pro.vercel.app/',
    status: 'OPERATIONAL'
  },
  {
    id: 'resume',
    title: 'RESUME_ENGINE',
    type: 'LABS',
    tags: ['React', 'PDF_Engine', 'High_Fidelity'],
    description: 'Print-perfect resume builder with 100% parity between preview and physical document. Zero-margin A4 hardening.',
    link: 'https://r2dapps.github.io/react-resume-builder/',
    status: 'ACTIVE'
  },
  {
    id: 'bim',
    title: 'BIM_VISUALIZATION',
    type: 'CORE_ENGINE',
    tags: ['Unity', 'WebGL', 'Industrial'],
    description: 'High-performance WebGL visualization for Building Information Modeling. Interactive industrial spatial data.',
    link: 'https://r2dapps.github.io/BimWebDemo/',
    status: 'STABLE'
  },
  {
    id: 'razelstudio',
    title: 'RAZEL_STUDIO_XR',
    type: 'CORE_ENGINE',
    tags: ['VR', 'AR', 'Defense_Sim'],
    description: 'Specialized VR/AR simulations for defense and industrial training. Expert-level multiplayer and simulation physics.',
    link: 'https://r2dapps.github.io/RazelStudio/',
    status: 'CLASSIFIED'
  }
];

const CAREER_LOG = [
  {
    year: '2024 - PRESENT',
    role: 'FOUNDER & ARCHITECT',
    company: 'RAZEL TECH',
    description: 'Spearheading the Binary Core initiative. Developing high-fidelity BIM to Unity pipelines and enterprise SaaS intelligence.',
    type: 'STRATEGIC_COMMAND'
  },
  {
    year: '2021 - 2024',
    role: 'TECHNICAL LEAD',
    company: 'IMMERSIVE_SYS',
    description: 'Led engineering for defense-grade simulations and large-scale industrial VR training modules.',
    type: 'ENGINEERING_LEAD'
  },
  {
    year: '2017 - 2021',
    role: 'SR. UNITY DEVELOPER',
    company: 'CORE_VIZ',
    description: 'Architected real-time visualization engines for architectural BIM data integration.',
    type: 'CORE_DEVELOPMENT'
  },
  {
    year: '2014 - 2017',
    role: 'SOFTWARE ENGINEER',
    company: 'TECH_FOUNDRY',
    description: 'Systems programming and interactive 3D application development for industrial clients.',
    type: 'FOUNDATION'
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

const Layout = ({ children }) => (
  <div className="min-h-screen grid-bg relative overflow-hidden selection:bg-cyber-blue selection:text-black">
    <div className="scanline" />
    <nav className="p-6 border-b border-cyber-blue/20 flex justify-between items-center backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-cyber-blue flex items-center justify-center rounded">
          <Terminal size={18} className="text-black" />
        </div>
        <span className="font-black tracking-tighter text-xl terminal-text">RAZELTECH_HUB</span>
      </div>
      <div className="hidden md:flex space-x-8 text-[10px] font-bold tracking-widest text-cyber-blue/60 uppercase">
        <a href="#timeline" className="hover:text-cyber-blue transition-colors">[ CAREER_LOG ]</a>
        <a href="#core" className="hover:text-cyber-blue transition-colors">[ CORE_LOGIC ]</a>
        <a href="#sim" className="hover:text-cyber-blue transition-colors">[ SIM_ENGINES ]</a>
        <a href="#labs" className="hover:text-cyber-blue transition-colors">[ LABS ]</a>
      </div>
    </nav>
    <main>{children}</main>
    <footer className="p-12 border-t border-cyber-blue/10 text-center text-[10px] text-cyber-blue/40 tracking-[0.3em] uppercase">
      © RAZELTECH // SYSTEMS_EST_2014 // ALL_RIGHTS_RESERVED
    </footer>
  </div>
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
              <div className="text-cyber-blue/30 font-mono text-[9px] font-bold">
                LOG_ENTRY_{index.toString(16).padStart(2, '0').toUpperCase()}
              </div>
            </div>

            <h3 className="text-2xl font-black tracking-tight italic mb-1">{item.role}</h3>
            <div className="text-cyber-green text-[11px] font-bold tracking-widest mb-4 uppercase">@ {item.company}</div>
            
            <p className="text-sm text-cyber-blue/60 max-w-2xl leading-relaxed">
              {item.description}
            </p>

            {/* Visual connector for desktop */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-24 h-px bg-gradient-to-r from-cyber-blue/20 to-transparent" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="mb-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-cyber-green text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
            <Zap size={12} />
            <span>Connection_Established // raja_vamsi_dhar // hyderabad_in</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none italic">
            TECHNICAL<br />
            <span className="text-cyber-blue terminal-text">LEAD</span>
          </h1>
          <p className="text-lg md:text-xl text-cyber-blue/60 max-w-2xl font-medium leading-relaxed">
            <TypewriterText text="Founder @ Razel Tech. Unity Technical Lead with 10+ years experience. Architecting production-grade BIM to Unity pipelines and mission-critical Defense Simulations." />
          </p>
          <div className="mt-12 flex flex-wrap gap-6">
              <div className="flex items-center space-x-4">
                <a href="https://linkedin.com/in/rajavamsidhar" target="_blank" rel="noreferrer" className="p-3 bg-cyber-blue/10 border border-cyber-blue/30 rounded hover:bg-cyber-blue/20 transition-all text-cyber-blue">
                   <Linkedin size={20} />
                </a>
                <a href="https://github.com/r2dapps" target="_blank" rel="noreferrer" className="p-3 bg-cyber-blue/10 border border-cyber-blue/30 rounded hover:bg-cyber-blue/20 transition-all text-cyber-blue">
                   <Github size={20} />
                </a>
              </div>
          </div>
        </div>
      </section>

      {/* Stats / Capabilities */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-cyber-blue/10 py-12">
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2">Service_Period</div>
          <div className="text-3xl font-black">10+ YRS</div>
        </div>
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2">Systems_Deployed</div>
          <div className="text-3xl font-black italic underline decoration-cyber-blue/30 underline-offset-8">25+ CORE</div>
        </div>
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2">Expertise_Primary</div>
          <div className="text-3xl font-black text-cyber-green">BIM_UNITY_PIPELINES</div>
        </div>
        <div>
          <div className="text-cyber-blue/40 text-[10px] font-bold uppercase tracking-widest mb-2">Logic_Layer</div>
          <div className="text-3xl font-black text-cyber-blue">REACT_SAAS</div>
        </div>
      </div>

      {/* Career Timeline */}
      <CareerTimeline />

      {/* Project Grid */}
      <section id="core">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-12 h-px bg-cyber-blue/30"></div>
          <h2 className="text-xl font-black tracking-tighter uppercase italic">System_Showcase</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <motion.div 
              key={project.id}
              whileHover={{ scale: 1.02 }}
              className="glow-border p-8 bg-cyber-blue/5 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <div className={`text-[9px] font-black px-2 py-1 rounded ${project.status === 'CLASSIFIED' ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-cyber-green/20 text-cyber-green border border-cyber-green/50'}`}>
                   {project.status}
                </div>
              </div>

              <div className="mb-6">
                <div className="text-cyber-blue/40 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{project.type}</div>
                <h3 className="text-2xl font-black tracking-tight group-hover:text-cyber-blue transition-colors italic">{project.title}</h3>
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

              <div className="flex justify-between items-center">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-cyber-blue hover:text-white transition-all"
                >
                  <span>Initialize_Interface</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Hover Scan Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-blue/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Terminal Footer */}
      <section className="mt-32 p-8 bg-black border border-cyber-blue/20 rounded-lg font-mono text-xs">
         <div className="flex items-center space-x-2 text-cyber-green mb-4">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
            <span className="font-bold">STATUS: RAZELTECH_ENGINE_LIVE</span>
         </div>
         <div className="text-cyber-blue/60 space-y-1">
            <p className="text-white">&gt; INITIALIZING_DASHBOARD...</p>
            <p>&gt; SCANNING_SIMULATION_LAYERS... [SUCCESS]</p>
            <p>&gt; CONNECTING_SAAS_LOGIC... [CONNECTED]</p>
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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
