import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileDown,
  ArrowLeft,
  Cpu,
  Layers,
  Globe,
  Shield,
  Terminal,
  User,
  Zap,
  ChevronRight,
  ChevronLeft,
  Users,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import BorderGlow from './BorderGlow';

// Custom Unity Logo SVG
const UnityLogo = ({ size = 18, className = "" }) => (
  <svg
    viewBox="0 0 256 256"
    fill="currentColor"
    className={`${className}`}
    style={{ width: size, height: size, display: 'inline-block' }}
  >
    <path d="M128 0L24.8 59.6v119.2L128 256l103.2-59.6V77.2L128 0zm79.4 171.3l-55.8 32.2V136.2l55.8-32.2v67.3zm-103 32.2l-55.8-32.2V104l55.8 32.2v67.3zm79.4-114.7l-55.8 32.2V56.6l55.8-32.2v67.3zm-103 32.2l-55.8-32.2V24.4l55.8 32.2v67.3z" />
  </svg>
);

export default function CapabilityDeck() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeArsenalTab, setActiveArsenalTab] = useState('unity');
  const [isExporting, setIsExporting] = useState(false);
  const [pdfTheme, setPdfTheme] = useState('dark');
  
  const tBg = pdfTheme === 'dark' ? '#020b14' : '#ffffff';
  const tBgImage = pdfTheme === 'dark' ? 'radial-gradient(circle at 20% 20%, rgba(0, 68, 204, 0.15), transparent 60%), radial-gradient(circle at 80% 80%, rgba(13, 25, 41, 0.9), transparent 60%)' : 'none';
  const tText1 = pdfTheme === 'dark' ? '#ffffff' : '#0f172a';
  const tText2 = pdfTheme === 'dark' ? '#8892b0' : '#334155';
  const tText3 = pdfTheme === 'dark' ? '#e2e8f0' : '#475569';
  const tCardBg = pdfTheme === 'dark' ? 'rgba(2, 11, 20, 0.6)' : 'rgba(248, 250, 252, 0.9)';
  const tBorder = pdfTheme === 'dark' ? 'rgba(0, 102, 255, 0.2)' : 'rgba(0, 102, 255, 0.3)';

  const [exportProgress, setExportProgress] = useState('');
  const [systemLogs, setSystemLogs] = useState([]);

  // Terminal log simulation
  useEffect(() => {
    const logs = [
      'SYS_INIT::CAPABILITY_DECK_SIMULATOR_V2.0',
      'AUTHENTICATING_USER::RAZEL_FOUNDER_CORE',
      'STATUS::SECURE_CONNECTION_ESTABLISHED',
    ];
    setSystemLogs(logs);
  }, []);

  const addLog = (message) => {
    setSystemLogs(prev => [...prev.slice(-4), `&gt; ${message}`]);
  };

  const handleNextSlide = () => {
    setActiveSlide(prev => {
      const next = (prev + 1) % SLIDES.length;
      addLog(`SLIDE_NAVIGATED::INDEX_0${next + 1}`);
      return next;
    });
  };

  const handlePrevSlide = () => {
    setActiveSlide(prev => {
      const next = (prev - 1 + SLIDES.length) % SLIDES.length;
      addLog(`SLIDE_NAVIGATED::INDEX_0${next + 1}`);
      return next;
    });
  };

  const handleSelectSlide = (idx) => {
    setActiveSlide(idx);
    addLog(`SLIDE_NAVIGATED::INDEX_0${idx + 1}`);
  };

  const handleDownloadPDF = async (theme = 'dark') => {
    setPdfTheme(theme);
    await new Promise(r => setTimeout(r, 200)); // Wait for theme to apply

    try {
      setIsExporting(true);
      setExportProgress('Initializing engine...');
      addLog('PDF_COMPILER::INITIALIZING_JSPDF');

      const pdf = new jsPDF({
        orientation: 'landscape', // Landscape orientation for presentation slides
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pages = ['brochure-page-1', 'brochure-page-2', 'brochure-page-3', 'brochure-page-4', 'brochure-page-5', 'brochure-page-6', 'brochure-page-7', 'brochure-page-8'];

      const exportContainer = document.getElementById('pdf-export-container');
      if (exportContainer) {
        exportContainer.style.height = 'auto';
        exportContainer.style.overflow = 'visible';
      }

      for (let i = 0; i < pages.length; i++) {
        setExportProgress(`Compiling Page ${i + 1} (4K Quality)...`);
        addLog(`PDF_COMPILER::CAPTURING_PAGE_0${i + 1}_HR`);
        const element = document.getElementById(pages[i]);
        if (!element) continue;

        const canvas = await html2canvas(element, {
          scale: 4, // 4x scale for high resolution (4K detail parity)
          useCORS: true,
          backgroundColor: '#050505',
          logging: false,
          scrollY: -window.scrollY // Fixes vertical offsets causing page bleeding
        });


        const imgData = canvas.toDataURL('image/png'); // Lossless PNG
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, 0, 297, 210, undefined, 'FAST');

        // --- ADD CLICKABLE LINKS ---
        const links = element.querySelectorAll('[data-pdf-link]');
        const containerRect = element.getBoundingClientRect();

        links.forEach(linkEl => {
          const rect = linkEl.getBoundingClientRect();
          const url = linkEl.getAttribute('data-pdf-link');

          // Calculate relative coordinates inside the 1123x794 container
          const relX = rect.left - containerRect.left;
          const relY = rect.top - containerRect.top;

          // Map to 297x210 mm PDF dimensions
          const ratioX = 297 / 1123;
          const ratioY = 210 / 794;

          pdf.link(relX * ratioX, relY * ratioY, rect.width * ratioX, rect.height * ratioY, { url });
        });
        // ---------------------------

      }

      setExportProgress('Generating brochure...');
      addLog('PDF_COMPILER::SAVING_FILE');
      pdf.save('RazelTech_Capability_Deck.pdf');

      if (exportContainer) {
        exportContainer.style.height = '0px';
        exportContainer.style.overflow = 'hidden';
      }

      setExportProgress('');
      setIsExporting(false);
      addLog('PDF_COMPILER::EXPORT_SUCCESSFUL');
    } catch (error) {
      const exportContainer = document.getElementById('pdf-export-container');
      if (exportContainer) {
        exportContainer.style.height = '0px';
        exportContainer.style.overflow = 'hidden';
      }
      console.error('PDF generation error:', error);
      setExportProgress('Error generating PDF.');
      addLog('PDF_COMPILER::ERROR_COMPILER_FAILED');
      setTimeout(() => {
        setExportProgress('');
        setIsExporting(false);
      }, 3000);
    }
  };

  // Slides data
  const SLIDES = [
    {
      title: 'FOUNDER_MISSION_PROFILE',
      subtitle: 'Executive overview & architectural vision',
      type: 'PROFILE'
    },
    {
      title: 'TECHNICAL_ARSENAL',
      subtitle: 'Core systems & tech stack breakdown',
      type: 'STACK'
    },
    {
      title: 'SIMULATOR_DOSSIERS',
      subtitle: 'Defense training & hardware environments',
      type: 'SIMULATION'
    },
    {
      title: 'ENTERPRISE_SAAS_&_BIM',
      subtitle: 'SaaS platforms & real-time WebGL engines',
      type: 'SAAS'
    }
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 md:px-6 py-20 relative">

      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-[10px] font-bold tracking-widest text-cyber-blue hover:text-white mb-4 uppercase transition-colors"
          >
            <ArrowLeft size={12} />
            <span>Return_to_Core_Systems</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tight flex items-center gap-3">
            CAPABILITY<span className="text-cyber-blue">_DECK_SIMULATOR</span>
          </h1>
          <p className="text-[10px] font-mono text-cyber-blue/40 tracking-widest uppercase mt-1">
            interactive dashboard // systems brochure center
          </p>
        </div>

        {/* PDF Exporter Button */}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleDownloadPDF('dark')}
            disabled={isExporting}
            className="flex items-center space-x-3 px-6 py-3.5 bg-cyber-blue text-black font-black text-[10px] tracking-widest uppercase rounded-lg hover:bg-white hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-lg shadow-cyber-blue/20 disabled:opacity-50 disabled:cursor-not-allowed z-25"
          >
            <FileDown size={14} className={isExporting ? "animate-bounce" : ""} />
            <span>{isExporting ? exportProgress : "PDF (Dark)"}</span>
          </button>
          
          <button
            onClick={() => handleDownloadPDF('light')}
            disabled={isExporting}
            className="flex items-center space-x-3 px-6 py-3.5 bg-white text-[#0066ff] border border-[#0066ff] font-black text-[10px] tracking-widest uppercase rounded-lg hover:bg-gray-100 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#0066ff]/20 disabled:opacity-50 disabled:cursor-not-allowed z-25"
          >
            <FileDown size={14} className={isExporting ? "animate-bounce" : ""} />
            <span>{isExporting ? exportProgress : "PDF (Light)"}</span>
          </button>
        </div>

      </div>

      {/* Main Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* Left Side: System Logs & Navigation Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">

          {/* Deck Selector Menu */}
          <BorderGlow
            borderRadius={16}
            glowRadius={5}
            edgeSensitivity={30}
            glowIntensity={0.4}
            fillOpacity={0.05}
            glowColor="180 100 80"
            backgroundColor="#050505"
            colors={['#00f3ff', '#39ff14', '#00f3ff']}
          >
            <div className="p-6 bg-cyber-blue/5 border border-cyber-blue/10 rounded-xl space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center">
                  <img src="./logo.png" alt="Razel Tech" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase italic tracking-wider">RAZEL TECH</h3>
                  <span className="text-[7.5px] font-bold text-cyber-green uppercase tracking-widest">MSME-AP-04-0112603</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="text-[8px] font-black text-cyber-blue/40 tracking-widest uppercase">// DECK_INDEX</div>
                <div className="flex flex-col space-y-2">
                  {SLIDES.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSlide(idx)}
                      className={`text-left p-3 rounded-lg border text-[9.5px] font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-between group cursor-pointer ${activeSlide === idx ? 'bg-cyber-blue/10 border-cyber-blue text-cyber-blue' : 'bg-transparent border-cyber-blue/10 text-cyber-blue/50 hover:border-cyber-blue/30 hover:text-white'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-[8px] text-cyber-blue/30 font-bold">0{idx + 1}.</span>
                        <span>{slide.title.replace(/_/g, ' ')}</span>
                      </div>
                      <ChevronRight size={12} className={`transition-transform duration-300 ${activeSlide === idx ? 'translate-x-1 text-cyber-blue' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-white/50'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </BorderGlow>

          {/* Real-time system diagnostics simulator terminal */}
          <div className="bg-black/80 border border-cyber-blue/15 p-5 rounded-xl font-mono text-[9px] uppercase leading-relaxed text-cyber-blue/50 flex-1 flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="text-[9.5px] font-black text-cyber-blue/70 tracking-widest mb-3 border-b border-cyber-blue/10 pb-1.5 flex items-center justify-between">
                <span>[ TERMINAL_DIAGNOSTICS ]</span>
                <span className="text-cyber-green animate-pulse">● online</span>
              </div>
              <div className="space-y-1">
                {systemLogs.map((log, idx) => (
                  <p key={idx} className={log.includes('SUCCESS') || log.includes('online') ? 'text-cyber-green/80' : ''} dangerouslySetInnerHTML={{ __html: log }} />
                ))}
              </div>
            </div>
            <div className="border-t border-cyber-blue/5 pt-2 mt-4 text-cyber-blue/30 text-[8px] font-bold flex justify-between">
              <span>ACTIVE_NODE::SLIDE_0{activeSlide + 1}</span>
              <span>PORT::5173</span>
            </div>
          </div>

        </div>

        {/* Right Side: The Interactive Slide Screen */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-cyber-blue/5 border border-cyber-blue/15 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">

          {/* Diagnostic Overlay Lines */}
          <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-1.5 bg-cyber-blue/10 rounded-bl border-l border-b border-cyber-blue/20 flex items-center justify-around px-2 py-0.5 opacity-40">
            <span className="w-1 h-1 rounded-full bg-cyber-blue" />
            <span className="w-1 h-1 rounded-full bg-cyber-green" />
            <span className="w-1 h-1 rounded-full bg-cyber-blue" />
          </div>

          {/* Active slide display */}
          <div className="flex-1 my-6 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >

                {/* Slide Header */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 text-cyber-green text-[8.5px] font-mono font-black tracking-widest uppercase">
                    <span>SYSTEM_DOSSIER // SLIDE_0{activeSlide + 1}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black italic uppercase text-white mt-1">
                    {SLIDES[activeSlide].title.replace(/_/g, ' ')}
                  </h2>
                  <p className="text-[10px] text-cyber-blue/60 font-medium tracking-wide uppercase mt-0.5">
                    {SLIDES[activeSlide].subtitle}
                  </p>
                </div>

                {/* Slide Content Dynamic Renderer */}
                <div className="flex-1">
                  {activeSlide === 0 && (
                    // Slide 1: Mission Profile & About Me
                    <div className="space-y-6">
                      <p className="text-sm md:text-base text-cyber-blue/80 font-mono leading-relaxed uppercase">
                        &gt; Principal Systems Architect with over a decade of experience creating reliable software for complex real-world challenges. My journey began in 2014 building simulation systems for the Indian Army. During that period, I contributed to more than six defense training simulators involving multiplayer networking, VR, embedded hardware integration, and 6DOF motion platforms.
                        <br/><br/>
                        &gt; Working in such a demanding space shaped my engineering mindset—systems must be stable, precise, and dependable. In 2025, I founded Razel Tech to help businesses create software that matches their actual workflows instead of adapting to generic solutions. Technology is not the destination—it is the medium. We engineer premium, scalable solutions with an emphasis on lean, cost-effective architectures that eliminate traditional enterprise bloat.
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-cyber-blue/10">
                        <div className="bg-black/40 border border-cyber-blue/10 p-4 rounded-lg">
                          <span className="text-[8px] font-mono font-bold text-cyber-blue/40 uppercase block mb-1">ENGINEERING</span>
                          <span className="text-lg font-black italic text-white block">12+ YRS</span>
                        </div>
                        <div className="bg-black/40 border border-cyber-blue/10 p-4 rounded-lg">
                          <span className="text-[8px] font-mono font-bold text-cyber-blue/40 uppercase block mb-1">SECTOR FOCUS</span>
                          <span className="text-lg font-black italic text-cyber-green block">DEFENSE_R&D</span>
                        </div>
                        <div className="bg-black/40 border border-cyber-blue/10 p-4 rounded-lg">
                          <span className="text-[8px] font-mono font-bold text-cyber-blue/40 uppercase block mb-1">ENGINES</span>
                          <span className="text-lg font-black italic text-cyber-blue block">UNITY_CORE</span>
                        </div>
                        <div className="bg-black/40 border border-cyber-blue/10 p-4 rounded-lg">
                          <span className="text-[8px] font-mono font-bold text-cyber-blue/40 uppercase block mb-1">COMPLIANCE</span>
                          <span className="text-lg font-black italic text-white block">MSME_SECURE</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSlide === 1 && (
                    // Slide 2: Technical Arsenal (Expertise tabs)
                    <div className="space-y-6">

                      {/* Arsenal tabs menu */}
                      <div className="flex flex-wrap gap-2 border-b border-cyber-blue/10 pb-4">
                        {['unity', 'xr', 'networking', 'saas'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => {
                              setActiveArsenalTab(tab);
                              addLog(`ARSENAL_NODE_CHANGED::${tab.toUpperCase()}`);
                            }}
                            className={`px-4 py-2 border text-[9px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer ${activeArsenalTab === tab ? 'bg-cyber-blue text-black border-cyber-blue font-bold' : 'bg-transparent border-cyber-blue/20 text-cyber-blue/60 hover:border-cyber-blue/50 hover:text-white'}`}
                          >
                            {tab === 'unity' && 'Unity & C#'}
                            {tab === 'xr' && 'VR & AR Tools'}
                            {tab === 'networking' && 'Multiplayer & RTI'}
                            {tab === 'saas' && 'Enterprise SaaS'}
                          </button>
                        ))}
                      </div>

                      {/* Tab description content */}
                      <div className="min-h-[160px] bg-black/35 border border-cyber-blue/10 p-5 rounded-xl">
                        {activeArsenalTab === 'unity' && (
                          <div className="space-y-3 font-mono text-xs uppercase leading-relaxed text-cyber-blue/80">
                            <h4 className="text-white font-black italic text-sm flex items-center gap-2">
                              <UnityLogo size={16} className="text-cyber-blue animate-pulse" />
                              <span>Unity Engine Core & Optimization</span>
                            </h4>
                            <p className="text-[10px] text-cyber-blue/40">// Hardware performance pipeline architectures</p>
                            <ul className="list-disc pl-4 space-y-1 text-[11px]">
                              <li>Unity 2021.3 LTS enterprise development and pipeline rendering.</li>
                              <li>C# 9.0 performance coding, optimized memory allocations, GC reduction.</li>
                              <li>Advanced editor customizations & utility automation tools.</li>
                              <li>Material Property Blocks to prevent memory leaks and instancing breaks.</li>
                            </ul>
                          </div>
                        )}

                        {activeArsenalTab === 'xr' && (
                          <div className="space-y-3 font-mono text-xs uppercase leading-relaxed text-cyber-blue/80">
                            <h4 className="text-white font-black italic text-sm flex items-center gap-2">
                              <Compass size={16} className="text-cyber-blue" />
                              <span>VR, AR & Spatial Systems</span>
                            </h4>
                            <p className="text-[10px] text-cyber-blue/40">// Immersive visualization & interactive configurators</p>
                            <ul className="list-disc pl-4 space-y-1 text-[11px]">
                              <li>XR Interaction Toolkit for cross-platform VR immersion.</li>
                              <li>AR Foundation (ARKit/ARCore) for web and mobile spatial solutions.</li>
                              <li>High-fidelity WebAR systems for direct browser integrations.</li>
                              <li>Real-time WebGL Building Information Modeling (BIM) core rendering.</li>
                            </ul>
                          </div>
                        )}

                        {activeArsenalTab === 'networking' && (
                          <div className="space-y-3 font-mono text-xs uppercase leading-relaxed text-cyber-blue/80">
                            <h4 className="text-white font-black italic text-sm flex items-center gap-2">
                              <Users size={16} className="text-cyber-blue" />
                              <span>Multiplayer Netcode & Hardware Sockets</span>
                            </h4>
                            <p className="text-[10px] text-cyber-blue/40">// Anti-lag, high-volume real-time sync systems</p>
                            <ul className="list-disc pl-4 space-y-1 text-[11px]">
                              <li>Unity Mirror & Photon engines for robust multiplayer integrations.</li>
                              <li>Anti-lag client-side prediction and server reconciliation netcode.</li>
                              <li>HLA (High Level Architecture) and Portico RTI for defense simulations.</li>
                              <li>Low-level TCP/UDP socket coding for serial/PLC hardware integration.</li>
                            </ul>
                          </div>
                        )}

                        {activeArsenalTab === 'saas' && (
                          <div className="space-y-3 font-mono text-xs uppercase leading-relaxed text-cyber-blue/80">
                            <h4 className="text-white font-black italic text-sm flex items-center gap-2">
                              <Layers size={16} className="text-cyber-blue" />
                              <span>Enterprise SaaS & Web Dashboards</span>
                            </h4>
                            <p className="text-[10px] text-cyber-blue/40">// Secure data layers and analytics portals</p>
                            <ul className="list-disc pl-4 space-y-1 text-[11px]">
                              <li>React 19 + Vite dashboard architectures for extreme loading speed.</li>
                              <li>Next.js databases with backend integrations and CRM logic.</li>
                              <li>Lean, cost-effective infrastructure designed to maximize ROI and eliminate bloat.</li>
                              <li>Print-ready resume and brochure rendering engines with 100% PDF parity.</li>
                              <li>Tailwind-styled premium dark-mode, cyberpunk dashboards.</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeSlide === 2 && (
                    // Slide 3: Simulators
                    <div className="space-y-4">

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-cyber-blue/10 bg-black/45 p-4 rounded-xl relative group hover:border-cyber-blue/30 transition-all flex flex-col md:flex-row gap-4 items-stretch">
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5 mb-1">
                              <UnityLogo size={14} className="text-cyber-blue" />
                              <span className="text-[7px] font-mono text-cyber-blue/40 uppercase">UNITY</span>
                            </div>
                            <h4 className="text-xs font-black text-white uppercase italic mb-0.5">T4S_TACTICAL_SIMULATOR</h4>
                            <span className="text-[7.5px] font-mono text-cyber-green block tracking-wider uppercase font-bold">Role: Lead Network Architect</span>
                            <p className="text-[9px] text-cyber-blue/60 leading-normal uppercase mt-2">
                              Tank Troop Simulator. Network synchronization layer built using Unity, Portico RTI, and HLA. Synchronized controls, trajectories, and visual layouts for 50+ concurrent military users.
                            </p>
                          </div>
                          <div className="w-full md:w-32 h-20 rounded-lg overflow-hidden border border-cyber-blue/20 bg-black/60 shrink-0 self-center md:self-start">
                            <img src="./t4s_simulator.png" alt="T4S Screenshot" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        </div>

                        <div className="border border-cyber-blue/10 bg-black/45 p-4 rounded-xl relative group hover:border-cyber-blue/30 transition-all flex flex-col md:flex-row gap-4 items-stretch">
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5 mb-1">
                              <UnityLogo size={14} className="text-cyber-blue" />
                              <span className="text-[7px] font-mono text-cyber-blue/40 uppercase">UNITY</span>
                            </div>
                            <h4 className="text-xs font-black text-white uppercase italic mb-0.5">AGLSDS_MISSILE_SIMULATOR</h4>
                            <span className="text-[7.5px] font-mono text-cyber-green block tracking-wider uppercase font-bold">Role: Systems Tech Lead</span>
                            <p className="text-[9px] text-cyber-blue/60 leading-normal uppercase mt-2">
                              Anti-Guided Missile Simulator with direct embedded system telemetry. Programmed physical weapon control handshakes, custom ballistics matrices, and real-time training scopes.
                            </p>
                          </div>
                          <div className="w-full md:w-32 h-20 rounded-lg overflow-hidden border border-cyber-blue/20 bg-black/60 shrink-0 self-center md:self-start">
                            <img src="./aglsds_launcher.png" alt="AGLSDS Screenshot" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        </div>

                        <div className="border border-cyber-blue/10 bg-black/45 p-4 rounded-xl relative group hover:border-cyber-blue/30 transition-all flex flex-col md:flex-row gap-4 items-stretch">
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5 mb-1">
                              <UnityLogo size={14} className="text-cyber-blue" />
                              <span className="text-[7px] font-mono text-cyber-blue/40 uppercase">UNITY</span>
                            </div>
                            <h4 className="text-xs font-black text-white uppercase italic mb-0.5">6DOF_MOTION_SIMULATORS</h4>
                            <span className="text-[7.5px] font-mono text-cyber-green block tracking-wider uppercase font-bold">Role: Driver Integrator</span>
                            <p className="text-[9px] text-cyber-blue/60 leading-normal uppercase mt-2">
                              Low-level socket systems for physical 3DOF/6DOF motion cabins. Decoupled latency between Unity physics engines and physical hydraulic actuator controllers.
                            </p>
                          </div>
                          <div className="w-full md:w-32 h-20 rounded-lg overflow-hidden border border-cyber-blue/20 bg-black/60 shrink-0 self-center md:self-start">
                            <img src="./t4s_simulator.png" alt="6DOF Simulation Cabin" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        </div>

                        <div className="border border-cyber-blue/10 bg-black/45 p-4 rounded-xl relative group hover:border-cyber-blue/30 transition-all flex flex-col md:flex-row gap-4 items-stretch">
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5 mb-1">
                              <UnityLogo size={14} className="text-cyber-blue" />
                              <span className="text-[7px] font-mono text-cyber-blue/40 uppercase">UNITY</span>
                            </div>
                            <h4 className="text-xs font-black text-white uppercase italic mb-0.5">RAZEL_STUDIO_XR</h4>
                            <span className="text-[7.5px] font-mono text-cyber-green block tracking-wider uppercase font-bold">Role: Core 3D Architect</span>
                            <p className="text-[9px] text-cyber-blue/60 leading-normal uppercase mt-2">
                              High-fidelity VR paint configurator using Unity XR Toolkit and custom PBR shaders, delivering real-time material swappings and spatial architectural visualization.
                            </p>
                          </div>
                          <div className="w-full md:w-32 h-20 rounded-lg overflow-hidden border border-cyber-blue/20 bg-black/60 shrink-0 self-center md:self-start">
                            <img src="./razel_studio.png" alt="Razel Studio Configurator" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {activeSlide === 3 && (
                    // Slide 4: SaaS & Web
                    <div className="space-y-4">

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                        <div className="border border-cyber-blue/10 bg-black/45 p-4 rounded-xl relative group hover:border-cyber-blue/30 transition-all flex flex-col gap-3">
                          <div className="w-full h-24 rounded-lg overflow-hidden border border-cyber-blue/20 bg-black/60 shrink-0">
                            <img src="./invoicevault.png" alt="InvoiceVault Screenshot" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-white uppercase italic mb-0.5">INVOICE_VAULT_PRO</h4>
                            <span className="text-[7px] font-mono text-cyber-blue/40 block tracking-widest uppercase mb-1">Desktop Billing Software</span>
                            <p className="text-[9px] text-cyber-blue/60 leading-normal uppercase">
                              Offline GST billing and business management platform. Complete with GSTR-1/3B generation and automated ledger tracking.
                            </p>
                          </div>
                        </div>
                        <div className="border border-cyber-blue/10 bg-black/45 p-4 rounded-xl relative group hover:border-cyber-blue/30 transition-all flex flex-col gap-3">
                          <div className="w-full h-24 rounded-lg overflow-hidden border border-cyber-blue/20 bg-black/60 shrink-0">
                            <img src="./saas_dashboard.png" alt="MediCorePro Screenshot" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-white uppercase italic mb-0.5">MEDICOREPRO_SaaS</h4>
                            <span className="text-[7px] font-mono text-cyber-blue/40 block tracking-widest uppercase mb-1">Clinical dashboard</span>
                            <p className="text-[9px] text-cyber-blue/60 leading-normal uppercase">
                              Clinical intelligence suite. Real-time patient telemetry trackers, medical charts, and diagnostics tables. Optimized for load times.
                            </p>
                          </div>
                        </div>

                        <div className="border border-cyber-blue/10 bg-black/45 p-4 rounded-xl relative group hover:border-cyber-blue/30 transition-all flex flex-col gap-3">
                          <div className="w-full h-24 rounded-lg overflow-hidden border border-cyber-blue/20 bg-black/60 shrink-0">
                            <img src="./saas_dashboard.png" alt="ShowroomOS Screenshot" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-white uppercase italic mb-0.5">SHOWROOMOS_CRM</h4>
                            <span className="text-[7px] font-mono text-cyber-blue/40 block tracking-widest uppercase mb-1">Automotive Sales CRM</span>
                            <p className="text-[9px] text-cyber-blue/60 leading-normal uppercase">
                              Operational management CRM built for Hyundai dealerships. Handles live lead data grids, auto analytics, and dealership pipelines.
                            </p>
                          </div>
                        </div>

                        <div className="border border-cyber-blue/10 bg-black/45 p-4 rounded-xl relative group hover:border-cyber-blue/30 transition-all flex flex-col gap-3">
                          <div className="w-full h-24 rounded-lg overflow-hidden border border-cyber-blue/20 bg-black/60 shrink-0">
                            <img src="./razel_studio.png" alt="BIM Core Screenshot" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-white uppercase italic mb-0.5">INDUSTRIAL_BIM_CORE</h4>
                            <span className="text-[7px] font-mono text-cyber-blue/40 block tracking-widest uppercase mb-1">WebGL BIM Viewer</span>
                            <p className="text-[9px] text-cyber-blue/60 leading-normal uppercase">
                              High-fidelity real-time WebGL viewer for rendering complex structural datasets directly in web browsers.
                            </p>
                          </div>
                        </div>

                      </div>

                    </div>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Deck Nav Footer controls */}
          <div className="border-t border-cyber-blue/10 pt-4 flex justify-between items-center relative z-10">
            <button
              onClick={handlePrevSlide}
              className="flex items-center space-x-2 px-4 py-2 border border-cyber-blue/30 text-cyber-blue text-[9px] font-black uppercase tracking-widest rounded hover:bg-cyber-blue/10 cursor-pointer"
            >
              <ChevronLeft size={12} />
              <span>PREV_NODE</span>
            </button>

            <div className="flex space-x-2">
              {SLIDES.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => handleSelectSlide(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${activeSlide === idx ? 'bg-cyber-blue w-4' : 'bg-cyber-blue/30 hover:bg-cyber-blue/60'}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              className="flex items-center space-x-2 px-4 py-2 bg-cyber-blue text-black text-[9px] font-black uppercase tracking-widest rounded hover:bg-white cursor-pointer"
            >
              <span>NEXT_NODE</span>
              <ChevronRight size={12} />
            </button>
          </div>

        </div>

      </div>

      {/* 
        ========================================================================
        PDF EXPORT TEMPLATE CONTAINER (OFF-SCREEN)
        ========================================================================
        We explicitly use inline styles with simple Hex/RGB color values to prevent 
        html2canvas from failing on Tailwind CSS v4 oklab/oklch colors.
      */}
      <div id="pdf-export-container" style={{ position: 'absolute', top: 0, left: '-9999px', width: '1123px', height: 0, overflow: 'hidden' }}>

        {/* PAGE 1: HERO SECTION */}
        <div id="brochure-page-1" className="brochure-export-page" style={{
          width: '1123px', height: '794px',
          backgroundColor: tBg, backgroundImage: tBgImage,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box', overflow: 'hidden', position: 'relative',
          padding: '60px'
        }}>
          <img src="./MainPage_logo.png" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }} alt="Razel Tech Cover" />
        </div>

        {/* PAGE 2: WHO WE ARE */}
        <div id="brochure-page-2" className="brochure-export-page" style={{
          width: '1123px', height: '794px', padding: '60px 80px',
          backgroundColor: tBg, backgroundImage: tBgImage,
          color: tText1, boxSizing: 'border-box',
          fontFamily: '"Inter", "Roboto", sans-serif', overflow: 'hidden', position: 'relative'
        }}>
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ height: '140px', marginBottom: '20px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#0066ff', letterSpacing: '2px', fontFamily: 'Consolas, Monaco, monospace' }}>01 // WHO WE ARE</span>
              <h2 style={{ fontSize: '56px', fontWeight: '900', margin: '10px 0 5px 0', color: tText1, letterSpacing: '-1px' }}>ENGINEERING BEYOND CODE</h2>
              <p style={{ fontSize: '20px', color: tText2, margin: 0, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>A Systems Engineering Approach to Modern Software</p>
            </div>

            <div style={{ backgroundColor: tCardBg, border: `1px solid ${tBorder}`, borderRadius: '16px', padding: '50px', display: 'flex', flexDirection: 'column', gap: '30px', backdropFilter: 'blur(10px)' }}>
              <p style={{ fontSize: '18px', color: tText3, lineHeight: '1.7', margin: 0 }}>
                Razel Tech was founded in 2025 by a Systems Architect with over a decade of experience creating reliable software for complex real-world challenges. Our journey began in 2014 building simulation systems for the Indian Army, involving multiplayer networking, VR, embedded hardware, and 6DOF motion platforms.
                <br /><br />
                Working in such a demanding space shaped our engineering mindset—systems must be stable, precise, and dependable.
                <br /><br />
                <strong style={{ color: '#0066ff' }}>We believe technology is not the destination—it is the medium. The real focus is understanding the need, choosing the right approach, and creating something valuable that lasts.</strong>
                <br /><br />
                Today, we help businesses create custom software that matches their actual workflows instead of adapting to generic solutions. Whether it's enterprise SaaS, BIM pipelines, or real-time WebGL, we engineer premium solutions with lean, cost-effective architectures.
              </p>
            </div>
          </div>
        </div>

        {/* PAGE 3: ENGINEERING CAPABILITIES */}
        <div id="brochure-page-3" className="brochure-export-page" style={{
          width: '1123px', height: '794px', padding: '60px 80px',
          backgroundColor: tBg, backgroundImage: tBgImage,
          color: tText1, boxSizing: 'border-box',
          fontFamily: '"Inter", "Roboto", sans-serif', overflow: 'hidden', position: 'relative'
        }}>
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <div style={{ height: '140px', marginBottom: '20px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#0066ff', letterSpacing: '2px', fontFamily: 'Consolas, Monaco, monospace' }}>02 // WHAT WE BUILD</span>
              <h2 style={{ fontSize: '48px', fontWeight: '900', margin: '10px 0 5px 0', color: tText1, letterSpacing: '-1px' }}>ENGINEERING CAPABILITIES</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div style={{ backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '35px', borderRadius: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: '900', color: tText1, display: 'block', marginBottom: '10px' }}>1. Real-Time 3D, XR & Simulation</span>
                <p style={{ fontSize: '14px', color: tText2, lineHeight: '1.5', marginBottom: '15px' }}>Building interactive experiences where performance and reliability matter.</p>
                <p style={{ fontSize: '14px', color: tText3, lineHeight: '1.8', margin: 0 }}>Unity Development, AR/VR Applications, Multiplayer Systems, WebAR Experiences, Hardware Integration.</p>
              </div>

              <div style={{ backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '35px', borderRadius: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: '900', color: tText1, display: 'block', marginBottom: '10px' }}>2. BIM & Digital Twin Solutions</span>
                <p style={{ fontSize: '14px', color: tText2, lineHeight: '1.5', marginBottom: '15px' }}>Transforming complex spatial data into interactive real-time environments.</p>
                <p style={{ fontSize: '14px', color: tText3, lineHeight: '1.8', margin: 0 }}>IFC to Unity Pipelines, BIM Visualization, Digital Twin Platforms, Metadata Preservation, 3D Model Optimization.</p>
              </div>

              <div style={{ backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '35px', borderRadius: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: '900', color: tText1, display: 'block', marginBottom: '10px' }}>3. Enterprise Software & SaaS Platforms</span>
                <p style={{ fontSize: '14px', color: tText2, lineHeight: '1.5', marginBottom: '15px' }}>Custom applications designed around your business workflows.</p>
                <p style={{ fontSize: '14px', color: tText3, lineHeight: '1.8', margin: 0 }}>Enterprise Dashboards, CRM Systems, Business Automation, Billing Platforms, Workflow Management.</p>
              </div>

              <div style={{ backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '35px', borderRadius: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: '900', color: tText1, display: 'block', marginBottom: '10px' }}>4. Custom Software Engineering</span>
                <p style={{ fontSize: '14px', color: tText2, lineHeight: '1.5', marginBottom: '15px' }}>When existing tools cannot solve your requirements.</p>
                <p style={{ fontSize: '14px', color: tText3, lineHeight: '1.8', margin: 0 }}>Software Architecture, Full-Stack Applications, System Integrations, Product Development, Technical Consulting.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 4: WHY RAZEL TECH */}
        <div id="brochure-page-4" className="brochure-export-page" style={{
          width: '1123px', height: '794px', padding: '60px 80px',
          backgroundColor: tBg, backgroundImage: tBgImage,
          color: tText1, boxSizing: 'border-box',
          fontFamily: '"Inter", "Roboto", sans-serif', overflow: 'hidden', position: 'relative'
        }}>
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ height: '140px', marginBottom: '20px', borderBottom: `1px solid ${tBorder}` }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#0066ff', letterSpacing: '2px', fontFamily: 'Consolas, Monaco, monospace' }}>03 // METHODOLOGY</span>
              <h2 style={{ fontSize: '48px', fontWeight: '900', margin: '10px 0 5px 0', color: tText1, letterSpacing: '-1px' }}>WHY RAZEL TECH</h2>
              <p style={{ fontSize: '16px', color: tText2, margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Engineering Mindset, Not Just Development</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', gap: '30px' }}>
                <div style={{ flex: 1, backgroundColor: tCardBg, borderLeft: '4px solid #0066ff', padding: '30px', borderRadius: '0 8px 8px 0' }}>
                  <h4 style={{ fontSize: '22px', fontWeight: 'bold', color: tText1, margin: '0 0 10px 0' }}>Understand Before Building</h4>
                  <p style={{ fontSize: '16px', color: tText3, lineHeight: '1.6', margin: 0 }}>We invest time understanding your domain, workflow, and challenges before choosing the right approach.</p>
                </div>
                <div style={{ flex: 1, backgroundColor: tCardBg, borderLeft: '4px solid #0066ff', padding: '30px', borderRadius: '0 8px 8px 0' }}>
                  <h4 style={{ fontSize: '22px', fontWeight: 'bold', color: tText1, margin: '0 0 10px 0' }}>Built For Real Usage</h4>
                  <p style={{ fontSize: '16px', color: tText3, lineHeight: '1.6', margin: 0 }}>Our experience comes from systems where stability, performance, and reliability were absolutely essential.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '30px' }}>
                <div style={{ flex: 1, backgroundColor: tCardBg, borderLeft: '4px solid #0066ff', padding: '30px', borderRadius: '0 8px 8px 0' }}>
                  <h4 style={{ fontSize: '22px', fontWeight: 'bold', color: tText1, margin: '0 0 10px 0' }}>Adaptable Engineering</h4>
                  <p style={{ fontSize: '16px', color: tText3, lineHeight: '1.6', margin: 0 }}>Every project brings unique challenges. We learn the domain, understand the requirements, and create solutions around real needs.</p>
                </div>
                <div style={{ flex: 1, backgroundColor: tCardBg, borderLeft: '4px solid #0066ff', padding: '30px', borderRadius: '0 8px 8px 0' }}>
                  <h4 style={{ fontSize: '22px', fontWeight: 'bold', color: tText1, margin: '0 0 10px 0' }}>Long-Term Thinking</h4>
                  <p style={{ fontSize: '16px', color: tText3, lineHeight: '1.6', margin: 0 }}>We focus on maintainable systems that continue delivering value and remain structurally sound long beyond the initial launch.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 5: FEATURED WORK */}
        <div id="brochure-page-5" className="brochure-export-page" style={{
          width: '1123px', height: '794px', padding: '60px 80px',
          backgroundColor: tBg, backgroundImage: tBgImage,
          color: tText1, boxSizing: 'border-box',
          fontFamily: '"Inter", "Roboto", sans-serif', overflow: 'hidden', position: 'relative'
        }}>
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ height: '140px', marginBottom: '20px', borderBottom: `1px solid ${tBorder}` }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#0066ff', letterSpacing: '2px', fontFamily: 'Consolas, Monaco, monospace' }}>04 // PROOF OF CONCEPT</span>
              <h2 style={{ fontSize: '48px', fontWeight: '900', margin: '10px 0 5px 0', color: tText1, letterSpacing: '-1px' }}>FEATURED WORK</h2>
            </div>

            <div style={{ display: 'flex', gap: '30px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                <div style={{ backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '25px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0066ff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '15px' }}>Real-Time Simulation & Defence</h3>
                  <ul style={{ fontSize: '15px', color: tText3, lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '10px' }}><strong>T4S Tactical Simulator</strong><br /><span style={{ fontSize: '13px', color: tText2 }}>Tactical Multiplayer Training Simulators</span></li>
                    <li style={{ marginBottom: '10px' }}><strong>AGLSDS Hardware</strong><br /><span style={{ fontSize: '13px', color: tText2 }}>Hardware-Integrated Simulation Platforms</span></li>
                    <li><strong>6DOF Motion Simulators</strong><br /><span style={{ fontSize: '13px', color: tText2 }}>Embedded Hardware Communication</span></li>
                  </ul>
                </div>

                <div style={{ backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '25px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0066ff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '15px' }}>XR & Digital Experiences</h3>
                  <ul style={{ fontSize: '15px', color: tText3, lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '10px' }}><strong>Razel Studio XR</strong><br /><span style={{ fontSize: '13px', color: tText2 }}>Interactive interior & material configurator</span></li>
                    <li style={{ marginBottom: '10px' }}><strong>Industrial BIM Core</strong><br /><span style={{ fontSize: '13px', color: tText2 }}>Real-time workflows for structural datasets</span></li>
                    <li><strong>WebAR Systems</strong><br /><span style={{ fontSize: '13px', color: tText2 }}>Instant spatial interactions</span></li>
                  </ul>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                <div style={{ backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '25px', borderRadius: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0066ff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '15px' }}>Enterprise Applications</h3>
                  <ul style={{ fontSize: '15px', color: tText3, lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '10px' }}><strong>MediCorePro</strong><br /><span style={{ fontSize: '13px', color: tText2 }}>Clinical intelligence & patient management platform</span></li>
                    <li style={{ marginBottom: '10px' }}><strong>Invoice Vault Pro</strong><br /><span style={{ fontSize: '13px', color: tText2 }}>Offline GST billing & business management</span></li>
                    <li><strong>Content Hub OS</strong><br /><span style={{ fontSize: '13px', color: tText2 }}>Multi-tenant marketing workflow platform</span></li>
                  </ul>
                </div>

                <div style={{ backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '25px', borderRadius: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0066ff', margin: '0 0 10px 0' }}>Built for Scale</h3>
                  <p style={{ fontSize: '16px', color: tText2, lineHeight: '1.6', margin: 0, maxWidth: '80%' }}>We specialize in developing robust enterprise and SaaS software capable of handling complex integrations and long-term scalability.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 6: OUR DEVELOPMENT APPROACH */}
        <div id="brochure-page-6" className="brochure-export-page" style={{
          width: '1123px', height: '794px', padding: '60px 80px',
          backgroundColor: tBg, backgroundImage: tBgImage,
          color: tText1, boxSizing: 'border-box',
          fontFamily: '"Inter", "Roboto", sans-serif', overflow: 'hidden', position: 'relative'
        }}>
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <div style={{ height: '140px', marginBottom: '20px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#0066ff', letterSpacing: '2px', fontFamily: 'Consolas, Monaco, monospace' }}>05 // EXECUTION</span>
              <h2 style={{ fontSize: '48px', fontWeight: '900', margin: '10px 0 5px 0', color: tText1, letterSpacing: '-1px' }}>DEVELOPMENT APPROACH</h2>
              <p style={{ fontSize: '16px', color: tText2, margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>From Idea To Working System</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '20px 30px', borderRadius: '12px' }}>
                <span style={{ fontSize: '36px', fontWeight: '900', color: '#0066ff', opacity: 0.5 }}>1</span>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: tText1, margin: '0 0 5px 0' }}>Discovery</h4>
                  <p style={{ fontSize: '14px', color: tText3, margin: 0 }}>Understanding your business goals, challenges, and core technical requirements before writing a single line of code.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '20px 30px', borderRadius: '12px' }}>
                <span style={{ fontSize: '36px', fontWeight: '900', color: '#0066ff', opacity: 0.5 }}>2</span>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: tText1, margin: '0 0 5px 0' }}>Architecture</h4>
                  <p style={{ fontSize: '14px', color: tText3, margin: 0 }}>Designing the right technical foundation, data pipelines, and infrastructure tailored specifically for implementation.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '20px 30px', borderRadius: '12px' }}>
                <span style={{ fontSize: '36px', fontWeight: '900', color: '#0066ff', opacity: 0.5 }}>3</span>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: tText1, margin: '0 0 5px 0' }}>Development</h4>
                  <p style={{ fontSize: '14px', color: tText3, margin: 0 }}>Building, testing, and refining the solution through iterative development and continuous active collaboration.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '20px 30px', borderRadius: '12px' }}>
                <span style={{ fontSize: '36px', fontWeight: '900', color: '#0066ff', opacity: 0.5 }}>4</span>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: tText1, margin: '0 0 5px 0' }}>Deployment & Growth</h4>
                  <p style={{ fontSize: '14px', color: tText3, margin: 0 }}>Successfully launching the product, while actively supporting improvements, scaling operations, and future enhancements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 7: WHO WE WORK WITH */}
        <div id="brochure-page-7" className="brochure-export-page" style={{
          width: '1123px', height: '794px', padding: '60px 80px',
          backgroundColor: tBg, backgroundImage: tBgImage,
          color: tText1, boxSizing: 'border-box',
          fontFamily: '"Inter", "Roboto", sans-serif', overflow: 'hidden', position: 'relative'
        }}>
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ height: '140px', marginBottom: '20px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#0066ff', letterSpacing: '2px', fontFamily: 'Consolas, Monaco, monospace' }}>06 // PARTNERSHIPS</span>
              <h2 style={{ fontSize: '48px', fontWeight: '900', margin: '10px 0 5px 0', color: tText1, letterSpacing: '-1px' }}>WHO WE WORK WITH</h2>
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ backgroundColor: tCardBg, border: `1px solid ${tBorder}`, padding: '50px', borderRadius: '16px', width: '100%' }}>
                <h3 style={{ fontSize: '24px', color: tText2, marginBottom: '30px' }}>We collaborate seamlessly with:</h3>
                <ul style={{ fontSize: '20px', color: tText3, lineHeight: '2.4', margin: 0, paddingLeft: '20px', listStyleType: 'square' }}>
                  <li><strong>Businesses</strong> needing custom software solutions designed for their specific workflows.</li>
                  <li><strong>AEC teams</strong> building digital twin architectures and spatial tracking pipelines.</li>
                  <li><strong>Industrial companies</strong> requiring robust visualization systems and dashboards.</li>
                  <li><strong>Startups</strong> building technically complex SaaS products that must scale securely.</li>
                  <li><strong>Organizations</strong> facing complex software engineering challenges that demand stability.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>


        {/* PAGE 8: FINAL CTA & CONTACT */}
        <div id="brochure-page-8" className="brochure-export-page" style={{
          width: '1123px', height: '794px',
          backgroundColor: tBg, backgroundImage: tBgImage,
          boxSizing: 'border-box',
          fontFamily: '"Inter", "Roboto", sans-serif', overflow: 'hidden', position: 'relative',
          display: 'flex', flexDirection: 'column'
        }}>
          
          {/* Top Banner (Contained cleanly) */}
          <div style={{ height: '600px', width: '100%', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
            <img src="./banner_RT_Services.png" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }} alt="Razel Tech Services" />
          </div>

          {/* Bottom Contact Bar */}
          <div style={{ height: '194px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', boxSizing: 'border-box' }}>
            {/* Contact / Social Hub (Icons Only) */}
            <div style={{ display: 'flex', gap: '40px', padding: '20px 40px', backgroundColor: pdfTheme === 'dark' ? 'rgba(2, 11, 20, 0.8)' : 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', borderRadius: '100px', border: `1px solid ${tBorder}`, boxShadow: `0 10px 40px ${tBorder}` }}>

              <div data-pdf-link="https://razeltech.github.io/" style={{ color: tText1, cursor: 'pointer', padding: '10px' }}>
                <Globe size={32} />
              </div>

              <div data-pdf-link="mailto:razeltech.in@gmail.com" style={{ color: tText1, cursor: 'pointer', padding: '10px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>

              <div data-pdf-link="https://www.linkedin.com/company/razel-tech" style={{ color: tText1, cursor: 'pointer', padding: '10px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </div>

              <div data-pdf-link="https://www.linkedin.com/in/raja-vamsi-dhar-vallabhapurapu-71b10475/" style={{ color: '#0066ff', cursor: 'pointer', padding: '10px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </div>

              <div data-pdf-link="https://github.com/razeltech" style={{ color: tText1, cursor: 'pointer', padding: '10px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


