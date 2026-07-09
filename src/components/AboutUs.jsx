import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Terminal, Shield, Zap, AlertTriangle, Layers, Code2, Activity, Database, Cloud } from 'lucide-react';

const StepCard = ({ step, index, isLeft }) => {
  const nodeRef = useRef(null);
  // Extremely tight trigger window: Only middle 4% of the viewport (matching the RT circle position)
  const isInView = useInView(nodeRef, { margin: "-48% 0px -48% 0px", once: false });

  return (
    <div className={`mb-40 relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block w-5/12"></div>
      
      {/* Static Timeline Node attached to useInView ref */}
      <div ref={nodeRef} className="absolute left-0 md:relative md:left-auto md:mx-auto z-20 w-8 h-8 flex items-center justify-center rounded-full bg-cyber-blue/30 border border-cyber-blue shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all duration-300">
        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isInView ? 'bg-white shadow-[0_0_10px_#fff]' : 'bg-cyber-blue'}`}></div>
      </div>
      
      {/* Content Card - Controlled strictly by the Node's visibility */}
      <motion.div 
        initial={false}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: isLeft ? 150 : -150, scale: 0.8 }} 
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="w-full md:w-5/12 pl-20 md:pl-0 mt-4 md:mt-0"
      >
        <div className={`p-8 border-2 border-cyber-blue/30 bg-black/80 backdrop-blur-md rounded-xl hover:border-cyber-blue transition-all relative overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.8)]`}>
          <div className="absolute top-0 right-0 p-24 bg-cyber-blue/10 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-cyber-blue/20 transition-colors pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-[12px] font-black tracking-[0.2em] text-cyber-blue uppercase">{step.year}</div>
            <div className="flex-grow h-px bg-cyber-blue/30"></div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
          <p className="text-sm text-cyber-blue/80 leading-relaxed relative z-10">{step.desc}</p>
        </div>
      </motion.div>
    </div>
  );
};

const AboutUs = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const journeySteps = [
    {
      year: '2014',
      title: 'The Foundation',
      desc: 'Started as a fresher at Green Vision Solutions (GVS). Learned Unity from scratch through YouTube tutorials and began building defense simulations for the Indian Army directly at the client location, entirely offline without internet access.',
      icon: <Terminal size={20} className="text-black" />
    },
    {
      year: '2018 - 2022',
      title: 'Developer to Tech Manager',
      desc: 'Climbing the ranks at GVS to Technical Manager. Led the development of numerous complex defense simulations and Proof-of-Concepts (POCs) while taking on rigorous independent architectural projects and freelance Unity work on the side.',
      icon: <Shield size={20} className="text-black" />
    },
    {
      year: 'September 2025',
      title: 'Razel Tech Established',
      desc: 'Frustrated by agencies intentionally leaving bugs and charging massive fees, Razel Tech was officially launched. The mission: to cut the bloat, reject expensive subscriptions, and deliver robust, highly customized architecture.',
      icon: <Zap size={20} className="text-black" />
    },
    {
      year: 'December 2025',
      title: 'Clinic Medicorepro & RazelStudio',
      desc: 'Launched the first proprietary offline-first systems. Clinic Medicorepro provided private clinics with an affordable digital OPD, while RazelStudio proved that AEC pipelines didn\'t require ₹3L/month Autodesk subscriptions by linking Revit to Unity WebGL.',
      icon: <Activity size={20} className="text-black" />
    },
    {
      year: 'Early 2026',
      title: 'ContentHub & Resume Suite',
      desc: 'Expanded into multi-tenant cloud logic. ContentHub replaced messy Excel sheets for marketing agencies with a centralized dashboard. The Resume Builder Suite was launched as a free community utility to combat predatory job platforms.',
      icon: <Cloud size={20} className="text-black" />
    },
    {
      year: 'Present',
      title: 'InvoiceVault Mini-ERP',
      desc: 'Released the ultimate offline GST billing platform for Indian SMBs. InvoiceVault acts as a mini-ERP with direct GSTR-1 and 3B generation, eliminating the need for scattered accounting tools.',
      icon: <Database size={20} className="text-black" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
        
        {/* The Manifesto Header */}
        <div className="mb-24">
          <div className="inline-flex items-center space-x-2 text-cyber-blue text-[10px] font-bold tracking-[0.2em] mb-6 uppercase border border-cyber-blue/30 bg-cyber-blue/5 px-4 py-1.5 rounded-full">
            <AlertTriangle size={12} className="text-cyber-green animate-pulse" />
            <span>The Firm Manifesto</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-8 leading-tight">
            Stop Paying for <br/> <span className="text-cyber-blue">Bloatware</span>
          </h1>
          <div className="max-w-4xl mx-auto text-left space-y-8">
            <p className="text-cyber-blue/70 text-lg md:text-xl leading-relaxed border-l-2 border-cyber-blue pl-6 italic">
              "The enterprise software industry is broken. Agencies charge exorbitant retainers for bloated templates, intentionally ignore fundamental business logic, and trap clients in massive monthly subscriptions."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-black/40 border border-cyber-blue/20 rounded-xl hover:border-cyber-blue transition-colors">
                <Shield size={24} className="text-cyber-blue mb-4" />
                <h3 className="text-white font-bold mb-2 uppercase">No Templates</h3>
                <p className="text-sm text-cyber-blue/60">Razel Tech engineers custom logic from the ground up to match the exact workflows of the enterprise.</p>
              </div>
              <div className="p-6 bg-black/40 border border-cyber-blue/20 rounded-xl hover:border-cyber-green transition-colors">
                <Code2 size={24} className="text-cyber-green mb-4" />
                <h3 className="text-white font-bold mb-2 uppercase">Zero Bloat</h3>
                <p className="text-sm text-cyber-blue/60">No unnecessary features. No hidden retainer fees. Just lean, high-performance architecture that solves the problem.</p>
              </div>
              <div className="p-6 bg-black/40 border border-cyber-blue/20 rounded-xl hover:border-white transition-colors">
                <Layers size={24} className="text-white mb-4" />
                <h3 className="text-white font-bold mb-2 uppercase">Defense Grade</h3>
                <p className="text-sm text-cyber-blue/60">Backed by a decade of building offline military simulations, Razel Tech systems are built for absolute stability.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-cyber-blue/20 mb-32 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-obsidian px-4 text-[10px] tracking-widest text-cyber-blue/50 uppercase">Firm History & Product Deployment</div>
        </div>

        {/* The Journey Section - Alternating Timeline */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto py-12 text-left min-h-[1200px]">
          
          {/* Static Center Line Background */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-cyber-blue/10"></div>
          
          {/* Animated Glowing Center Line */}
          <motion.div 
            style={{ height: lineHeight }} 
            className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 w-[2px] bg-cyber-blue shadow-[0_0_15px_#00f3ff]"
          ></motion.div>

          {/* Animated RT Circle traveling down the line */}
          <motion.div 
            style={{ top: lineHeight }}
            className="absolute left-6 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black border-[3px] border-cyber-blue flex items-center justify-center shadow-[0_0_25px_rgba(0,243,255,0.8)]"
          >
            <span className="text-[14px] font-black text-cyber-blue tracking-tighter">RT</span>
          </motion.div>

          {journeySteps.map((step, index) => (
            <StepCard key={index} step={step} index={index} isLeft={index % 2 === 0} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-32 p-12 border border-cyber-blue/20 bg-cyber-blue/5 rounded-xl relative overflow-hidden group hover:border-cyber-blue transition-all max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 p-32 bg-cyber-blue/10 rounded-full blur-3xl -ml-16 -mt-16 pointer-events-none transition-all group-hover:bg-cyber-blue/20"></div>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-white mb-4 relative z-10">Secure Engineering Operations</h2>
          <p className="text-cyber-blue/60 mb-8 max-w-xl mx-auto relative z-10">
            Headquartered in Guntur, Andhra Pradesh with operational centers across Hyderabad and Vijayawada. Stop paying for bloat. Let Razel Tech architect exactly what you need.
          </p>
          <a href="mailto:razeltech.in@gmail.com" className="relative z-10 inline-block px-10 py-5 bg-cyber-blue text-black font-black uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all text-[12px] shadow-[0_0_30px_rgba(0,243,255,0.3)]">
            INITIATE_COMMUNICATION
          </a>
        </div>
        
      </motion.div>
    </div>
  );
};

export default AboutUs;
