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
    <path d="M128 0L24.8 59.6v119.2L128 256l103.2-59.6V77.2L128 0zm79.4 171.3l-55.8 32.2V136.2l55.8-32.2v67.3zm-103 32.2l-55.8-32.2V104l55.8 32.2v67.3zm79.4-114.7l-55.8 32.2V56.6l55.8-32.2v67.3zm-103 32.2l-55.8-32.2V24.4l55.8 32.2v67.3z"/>
  </svg>
);

export default function CapabilityDeck() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeArsenalTab, setActiveArsenalTab] = useState('unity');
  const [isExporting, setIsExporting] = useState(false);
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

  const handleDownloadPDF = async () => {
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

      const pages = ['brochure-page-0', 'brochure-page-1', 'brochure-page-2', 'brochure-page-3'];
      
      for (let i = 0; i < pages.length; i++) {
        setExportProgress(`Compiling Page ${i + 1} (4K Quality)...`);
        addLog(`PDF_COMPILER::CAPTURING_PAGE_0${i + 1}_HR`);
        const element = document.getElementById(pages[i]);
        if (!element) continue;
        
        const canvas = await html2canvas(element, {
          scale: 4, // 4x scale for high resolution (4K detail parity)
          useCORS: true,
          backgroundColor: '#050505',
          logging: false
        });
        
        const imgData = canvas.toDataURL('image/png'); // Lossless PNG
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, 0, 297, 210, undefined, 'FAST');
      }

      setExportProgress('Generating brochure...');
      addLog('PDF_COMPILER::SAVING_FILE');
      pdf.save('RazelTech_Capability_Deck.pdf');
      
      setExportProgress('');
      setIsExporting(false);
      addLog('PDF_COMPILER::EXPORT_SUCCESSFUL');
    } catch (error) {
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
        <button
          onClick={handleDownloadPDF}
          disabled={isExporting}
          className="flex items-center space-x-3 px-6 py-3.5 bg-cyber-blue text-black font-black text-[10px] tracking-widest uppercase rounded-lg hover:bg-white hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-lg shadow-cyber-blue/20 disabled:opacity-50 disabled:cursor-not-allowed z-25"
        >
          <FileDown size={14} className={isExporting ? "animate-bounce" : ""} />
          <span>{isExporting ? exportProgress : "Download PDF Brochure"}</span>
        </button>
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
                        &gt; Principal Systems Architect and Lead Unity Developer with 12+ years of professional engineering tenure. Specializing in bridging the gap between embedded hardware integrations and interactive software ecosystems. Dedicated to delivering high-performance defense configurations, spatial analytics, and robust enterprise SaaS infrastructures.
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
      <div style={{ position: 'absolute', left: '-9999px', top: '0' }}>
        
        {/* SLIDE 0: MISSION PROFILE */}
        <div id="brochure-page-0" className="brochure-export-page" style={{ 
          width: '1123px', height: '794px', padding: '60px 80px', 
          backgroundColor: '#050505', color: '#ffffff', boxSizing: 'border-box', 
          fontFamily: 'Consolas, Monaco, monospace', overflow: 'hidden', position: 'relative' 
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'linear-gradient(#00f3ff 1px, transparent 1px), linear-gradient(90deg, #00f3ff 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '40px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#39ff14', letterSpacing: '2px' }}>SYSTEM_DOSSIER // SLIDE_01</span>
              <h2 style={{ fontSize: '48px', fontWeight: '900', fontStyle: 'italic', margin: '10px 0 0 0', color: '#ffffff' }}>FOUNDER MISSION PROFILE</h2>
              <p style={{ fontSize: '16px', color: '#607d8b', margin: '5px 0 0 0', textTransform: 'uppercase' }}>Executive overview & architectural vision</p>
            </div>
            
            <div style={{ flex: 1, backgroundColor: 'rgba(0, 243, 255, 0.05)', border: '1px solid rgba(0, 243, 255, 0.15)', borderRadius: '16px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <p style={{ fontSize: '20px', color: '#a0aec0', lineHeight: '1.6', textTransform: 'uppercase', margin: 0 }}>
                &gt; Principal Systems Architect and Lead Unity Developer with 12+ years of professional engineering tenure. Specializing in bridging the gap between embedded hardware integrations and interactive software ecosystems. Dedicated to delivering high-performance defense configurations, spatial analytics, and robust enterprise SaaS infrastructures.
              </p>
              
              <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid rgba(0, 243, 255, 0.1)', paddingTop: '30px' }}>
                <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '20px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#607d8b', display: 'block', marginBottom: '8px' }}>ENGINEERING</span>
                  <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', fontStyle: 'italic' }}>12+ YRS</span>
                </div>
                <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '20px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#607d8b', display: 'block', marginBottom: '8px' }}>SECTOR FOCUS</span>
                  <span style={{ fontSize: '24px', fontWeight: '900', color: '#39ff14', fontStyle: 'italic' }}>DEFENSE_R&D</span>
                </div>
                <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '20px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#607d8b', display: 'block', marginBottom: '8px' }}>ENGINES</span>
                  <span style={{ fontSize: '24px', fontWeight: '900', color: '#00f3ff', fontStyle: 'italic' }}>UNITY_CORE</span>
                </div>
                <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '20px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#607d8b', display: 'block', marginBottom: '8px' }}>COMPLIANCE</span>
                  <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', fontStyle: 'italic' }}>MSME_SECURE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 1: TECHNICAL ARSENAL */}
        <div id="brochure-page-1" className="brochure-export-page" style={{ 
          width: '1123px', height: '794px', padding: '60px 80px', 
          backgroundColor: '#050505', color: '#ffffff', boxSizing: 'border-box', 
          fontFamily: 'Consolas, Monaco, monospace', overflow: 'hidden', position: 'relative' 
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'linear-gradient(#00f3ff 1px, transparent 1px), linear-gradient(90deg, #00f3ff 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '30px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#39ff14', letterSpacing: '2px' }}>SYSTEM_DOSSIER // SLIDE_02</span>
              <h2 style={{ fontSize: '48px', fontWeight: '900', fontStyle: 'italic', margin: '10px 0 0 0', color: '#ffffff' }}>TECHNICAL ARSENAL</h2>
              <p style={{ fontSize: '16px', color: '#607d8b', margin: '5px 0 0 0', textTransform: 'uppercase' }}>Core systems & tech stack breakdown</p>
            </div>
            
            <div style={{ flex: 1, backgroundColor: 'rgba(0, 243, 255, 0.05)', border: '1px solid rgba(0, 243, 255, 0.15)', borderRadius: '16px', padding: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: '900', color: '#00f3ff', display: 'block', marginBottom: '10px' }}>UNITY ENGINE & C#</span>
                <p style={{ fontSize: '14px', color: '#607d8b', margin: '0 0 15px 0' }}>// Hardware performance pipeline architectures</p>
                <div style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>• Unity 2021.3 LTS enterprise development.<br/>• C# 9.0 performance coding, optimized allocations.<br/>• Advanced editor tools & utility automation.<br/>• Material Property Blocks for memory stability.</div>
              </div>
              
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: '900', color: '#00f3ff', display: 'block', marginBottom: '10px' }}>VR, AR & SPATIAL SYSTEMS</span>
                <p style={{ fontSize: '14px', color: '#607d8b', margin: '0 0 15px 0' }}>// Immersive visualization & interactive configurators</p>
                <div style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>• XR Interaction Toolkit for cross-platform VR.<br/>• AR Foundation for web and mobile spatial solutions.<br/>• High-fidelity WebAR systems for browser integration.<br/>• Real-time WebGL BIM core rendering.</div>
              </div>
              
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: '900', color: '#00f3ff', display: 'block', marginBottom: '10px' }}>MULTIPLAYER & NETCODE</span>
                <p style={{ fontSize: '14px', color: '#607d8b', margin: '0 0 15px 0' }}>// Anti-lag, high-volume real-time sync systems</p>
                <div style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>• Unity Mirror & Photon engines for robust integration.<br/>• Client-side prediction and server reconciliation.<br/>• HLA and Portico RTI for defense simulations.<br/>• Low-level TCP/UDP sockets for PLC hardware.</div>
              </div>
              
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '25px', borderRadius: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: '900', color: '#00f3ff', display: 'block', marginBottom: '10px' }}>ENTERPRISE SAAS DASHBOARDS</span>
                <p style={{ fontSize: '14px', color: '#607d8b', margin: '0 0 15px 0' }}>// Secure data layers and analytics portals</p>
                <div style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>• React 19 + Vite dashboard architectures.<br/>• Next.js databases with backend integrations.<br/>• Print-ready resume and brochure rendering engines.<br/>• Tailwind-styled premium dark-mode UI.</div>
              </div>

            </div>
          </div>
        </div>

        {/* SLIDE 2: SIMULATORS */}
        <div id="brochure-page-2" className="brochure-export-page" style={{ 
          width: '1123px', height: '794px', padding: '60px 80px', 
          backgroundColor: '#050505', color: '#ffffff', boxSizing: 'border-box', 
          fontFamily: 'Consolas, Monaco, monospace', overflow: 'hidden', position: 'relative' 
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'linear-gradient(#00f3ff 1px, transparent 1px), linear-gradient(90deg, #00f3ff 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '30px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#39ff14', letterSpacing: '2px' }}>SYSTEM_DOSSIER // SLIDE_03</span>
              <h2 style={{ fontSize: '48px', fontWeight: '900', fontStyle: 'italic', margin: '10px 0 0 0', color: '#ffffff' }}>SIMULATOR DOSSIERS</h2>
              <p style={{ fontSize: '16px', color: '#607d8b', margin: '5px 0 0 0', textTransform: 'uppercase' }}>Defense training & hardware environments</p>
            </div>
            
            <div style={{ flex: 1, backgroundColor: 'rgba(0, 243, 255, 0.05)', border: '1px solid rgba(0, 243, 255, 0.15)', borderRadius: '16px', padding: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '20px', borderRadius: '8px', display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px', color: '#00f3ff', letterSpacing: '1px' }}>UNITY</span>
                  <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#ffffff', margin: '5px 0', fontStyle: 'italic' }}>T4S_TACTICAL_SIMULATOR</h4>
                  <span style={{ fontSize: '10px', color: '#39ff14', fontWeight: 'bold' }}>ROLE: LEAD NETWORK ARCHITECT</span>
                  <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '10px', lineHeight: '1.4' }}>Tank Troop Simulator. Network synchronization layer built using Unity, Portico RTI, and HLA. Synchronized controls, trajectories, and visual layouts for 50+ concurrent military users.</p>
                </div>
                <div style={{ width: '160px', height: '120px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(0,243,255,0.2)', backgroundColor: '#000' }}>
                  <img src="./t4s_simulator.png" alt="T4S" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '20px', borderRadius: '8px', display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px', color: '#00f3ff', letterSpacing: '1px' }}>UNITY</span>
                  <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#ffffff', margin: '5px 0', fontStyle: 'italic' }}>AGLSDS_MISSILE_SIMULATOR</h4>
                  <span style={{ fontSize: '10px', color: '#39ff14', fontWeight: 'bold' }}>ROLE: SYSTEMS TECH LEAD</span>
                  <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '10px', lineHeight: '1.4' }}>Anti-Guided Missile Simulator with direct embedded system telemetry. Programmed physical weapon control handshakes, custom ballistics matrices, and real-time training scopes.</p>
                </div>
                <div style={{ width: '160px', height: '120px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(0,243,255,0.2)', backgroundColor: '#000' }}>
                  <img src="./aglsds_launcher.png" alt="AGLSDS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '20px', borderRadius: '8px', display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px', color: '#00f3ff', letterSpacing: '1px' }}>UNITY</span>
                  <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#ffffff', margin: '5px 0', fontStyle: 'italic' }}>6DOF_MOTION_SIMULATORS</h4>
                  <span style={{ fontSize: '10px', color: '#39ff14', fontWeight: 'bold' }}>ROLE: DRIVER INTEGRATOR</span>
                  <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '10px', lineHeight: '1.4' }}>Low-level socket systems for physical 3DOF/6DOF motion cabins. Decoupled latency between Unity physics engines and physical hydraulic actuator controllers.</p>
                </div>
                <div style={{ width: '160px', height: '120px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(0,243,255,0.2)', backgroundColor: '#000' }}>
                  <img src="./t4s_simulator.png" alt="6DOF" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '20px', borderRadius: '8px', display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '10px', color: '#00f3ff', letterSpacing: '1px' }}>UNITY</span>
                  <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#ffffff', margin: '5px 0', fontStyle: 'italic' }}>RAZEL_STUDIO_XR</h4>
                  <span style={{ fontSize: '10px', color: '#39ff14', fontWeight: 'bold' }}>ROLE: CORE 3D ARCHITECT</span>
                  <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '10px', lineHeight: '1.4' }}>High-fidelity VR paint configurator using Unity XR Toolkit and custom PBR shaders, delivering real-time material swappings and spatial architectural visualization.</p>
                </div>
                <div style={{ width: '160px', height: '120px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(0,243,255,0.2)', backgroundColor: '#000' }}>
                  <img src="./razel_studio.png" alt="Razel Studio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SLIDE 3: SAAS */}
        <div id="brochure-page-3" className="brochure-export-page" style={{ 
          width: '1123px', height: '794px', padding: '60px 80px', 
          backgroundColor: '#050505', color: '#ffffff', boxSizing: 'border-box', 
          fontFamily: 'Consolas, Monaco, monospace', overflow: 'hidden', position: 'relative' 
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'linear-gradient(#00f3ff 1px, transparent 1px), linear-gradient(90deg, #00f3ff 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '30px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#39ff14', letterSpacing: '2px' }}>SYSTEM_DOSSIER // SLIDE_04</span>
              <h2 style={{ fontSize: '48px', fontWeight: '900', fontStyle: 'italic', margin: '10px 0 0 0', color: '#ffffff' }}>ENTERPRISE SAAS & BIM</h2>
              <p style={{ fontSize: '16px', color: '#607d8b', margin: '5px 0 0 0', textTransform: 'uppercase' }}>SaaS platforms & real-time WebGL engines</p>
            </div>
            
            <div style={{ flex: 1, backgroundColor: 'rgba(0, 243, 255, 0.05)', border: '1px solid rgba(0, 243, 255, 0.15)', borderRadius: '16px', padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '140px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(0,243,255,0.2)', backgroundColor: '#000', marginBottom: '15px' }}>
                  <img src="./invoicevault.png" alt="InvoiceVault" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#ffffff', margin: '0 0 5px 0', fontStyle: 'italic' }}>INVOICE_VAULT_PRO</h4>
                <span style={{ fontSize: '10px', color: '#00f3ff', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>DESKTOP BILLING</span>
                <p style={{ fontSize: '12px', color: '#a0aec0', margin: 0, lineHeight: '1.4' }}>Offline GST billing and business management platform. Complete with GSTR-1/3B generation and automated ledger tracking.</p>
              </div>

              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '140px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(0,243,255,0.2)', backgroundColor: '#000', marginBottom: '15px' }}>
                  <img src="./saas_dashboard.png" alt="MediCorePro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#ffffff', margin: '0 0 5px 0', fontStyle: 'italic' }}>MEDICOREPRO_SAAS</h4>
                <span style={{ fontSize: '10px', color: '#00f3ff', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>CLINICAL DASHBOARD</span>
                <p style={{ fontSize: '12px', color: '#a0aec0', margin: 0, lineHeight: '1.4' }}>Clinical intelligence suite. Real-time patient telemetry trackers, medical charts, and diagnostics tables. Optimized for load times.</p>
              </div>

              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '140px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(0,243,255,0.2)', backgroundColor: '#000', marginBottom: '15px' }}>
                  <img src="./saas_dashboard.png" alt="ShowroomOS" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#ffffff', margin: '0 0 5px 0', fontStyle: 'italic' }}>SHOWROOMOS_CRM</h4>
                <span style={{ fontSize: '10px', color: '#00f3ff', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>AUTO SALES CRM</span>
                <p style={{ fontSize: '12px', color: '#a0aec0', margin: 0, lineHeight: '1.4' }}>Operational management CRM built for Hyundai dealerships. Handles live lead data grids, auto analytics, and dealership pipelines.</p>
              </div>

              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,243,255,0.1)', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '140px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(0,243,255,0.2)', backgroundColor: '#000', marginBottom: '15px' }}>
                  <img src="./razel_studio.png" alt="BIM Core" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#ffffff', margin: '0 0 5px 0', fontStyle: 'italic' }}>INDUSTRIAL_BIM_CORE</h4>
                <span style={{ fontSize: '10px', color: '#00f3ff', letterSpacing: '1px', marginBottom: '10px', display: 'block' }}>WEBGL BIM VIEWER</span>
                <p style={{ fontSize: '12px', color: '#a0aec0', margin: 0, lineHeight: '1.4' }}>High-fidelity real-time WebGL viewer for rendering complex structural datasets directly in web browsers.</p>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
