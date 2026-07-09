import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Cloud, Layers, Workflow, Shield, Zap, Box, Code2, Activity, Terminal } from 'lucide-react';

const customApps = [
  {
    title: 'Clinic Medicorepro',
    reason: 'Why it was built: The industry focuses solely on large hospitals, leaving private clinics drowning in paper. Razel Tech provided a clean, digital OPD system tailored for clinics at just ₹1000/month.',
    icon: <Activity size={24} className="text-cyber-green" />,
    links: [
      { label: 'Promo Site', url: 'https://r2dapps.github.io/ClinicAppDemo/' },
      { label: 'Actual Site', url: 'https://medi-core-pro.vercel.app/' }
    ]
  },
  {
    title: 'RazelStudio',
    reason: 'Why it was built: Traditional AEC pipelines require massive subscriptions. Razel Tech built a clean pipeline from Revit to Unity IFC, allowing stakeholders to view interior paints and textures dynamically on a budget.',
    icon: <Layers size={24} className="text-cyber-blue" />,
    links: [
      { label: 'Platform Demo', url: 'https://r2dapps.github.io/RazelStudio/' }
    ]
  },
  {
    title: 'InvoiceVault',
    reason: 'Why it was built: SMBs were struggling with scattered accounting. InvoiceVault acts as a mini-ERP with direct GST ledgers (GSTR-1, 3B) and Excel exports straight from direct bills and inventory.',
    icon: <Terminal size={24} className="text-white" />,
    links: [
      { label: 'Platform', url: 'https://razeltech.github.io/InvoiceVaultDemo/' }
    ]
  },
  {
    title: 'ContentHub',
    reason: 'Why it was built: Digital marketing teams were still using messy Excel sheets. Razel Tech built a dedicated dashboard to centralize content marketing data and analytics.',
    icon: <Cloud size={24} className="text-cyber-blue" />,
    links: [
      { label: 'Platform', url: 'https://contenthub-demo.vercel.app/' }
    ]
  },
  {
    title: 'Resume Builder Suite',
    reason: 'Why it was built: Too many job platforms charge for basic resume exports, locking out candidates who cannot afford them. Razel Tech built a free builder with 15+ templates as a community utility.',
    icon: <Code2 size={24} className="text-cyber-green" />,
    links: [
      { label: 'V1 App', url: 'https://r2dapps.github.io/react-resume-builder/' },
      { label: 'V2 App', url: 'https://r2dapps.github.io/ResumeBuilder/' }
    ]
  }
];

const techIcons = [
  { id: 'unity', name: 'Unity 3D', icon: 'https://img.icons8.com/ios-filled/50/00f3ff/unity.png', desc: 'Core real-time engine for simulation & rendering.' },
  { id: 'sim', name: 'Simulations', icon: 'https://img.icons8.com/ios-filled/50/00f3ff/virtual-machine.png', desc: 'Defense-grade physics & multi-agent systems.' },
  { id: 'vr', name: 'AR / VR', icon: 'https://img.icons8.com/ios-filled/50/00f3ff/virtual-reality.png', desc: 'Immersive spatial computing interfaces.' },
  { id: 'bim', name: 'Digital Twins', icon: 'https://img.icons8.com/ios-filled/50/00f3ff/blueprint.png', desc: 'BIM/IFC data visualization & facility management.' },
  { id: 'saas', name: 'SaaS Products', icon: 'https://img.icons8.com/ios-filled/50/00f3ff/cloud-sync.png', desc: 'Scalable cloud dashboards & business logic.' },
];

const Solutions = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const yOffset = -120; // Account for fixed header
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 300); // Wait for Framer Motion to render the grid
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 pb-32">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-20 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 text-cyber-green text-[10px] font-bold tracking-[0.2em] mb-6 uppercase border border-cyber-green/30 bg-cyber-green/5 px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></span>
          <span>Enterprise Capabilities</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-6">
          Architecting <span className="text-cyber-blue">Business Systems</span>
        </h1>
        <p className="text-cyber-blue/70 text-lg md:text-xl leading-relaxed">
          Razel Tech does not sell templates. Razel Tech delivers highly customized software architecture tailored to complex industrial, defense, and enterprise workflows. Below are the four core pillars of the firm's technical capabilities.
        </p>
      </motion.div>

      {/* Tech Stack Bar */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20 pb-20 border-b border-cyber-blue/10 text-center">
        <div className="text-[10px] font-black text-cyber-blue/40 tracking-[0.3em] uppercase mb-12">Core Technology Stack</div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {techIcons.map((tech) => (
            <div key={tech.id} className="flex flex-col items-center w-24 group relative">
              <div className="w-16 h-16 rounded-full border border-cyber-blue/20 bg-black/40 flex items-center justify-center mb-4 group-hover:border-cyber-blue group-hover:bg-cyber-blue/10 transition-all cursor-crosshair">
                <img src={tech.icon} alt={tech.name} className="w-8 h-8 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all filter group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:hue-rotate-[140deg] group-hover:saturate-[500%]" style={tech.id === 'unity' ? {} : {filter: "brightness(0) saturate(100%) invert(84%) sepia(50%) saturate(4176%) hue-rotate(143deg) brightness(101%) contrast(106%)"}} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-cyber-blue/60 group-hover:text-cyber-blue transition-colors mb-2">{tech.name}</span>
              <span className="absolute top-[80px] w-48 text-[8px] font-mono text-cyber-blue/50 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 border border-cyber-blue/30 p-2 rounded z-20 pointer-events-none shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                {tech.desc}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.div variants={containerVars} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sim & Multiplayer */}
        <motion.div id="simulation" variants={itemVars} className="p-8 md:p-10 border border-cyber-blue/20 bg-black/40 rounded-xl hover:border-cyber-blue transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-cyber-blue/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-cyber-blue/10 transition-colors pointer-events-none"></div>
          <div className="bg-cyber-blue/10 w-16 h-16 rounded-lg flex items-center justify-center mb-8 group-hover:bg-cyber-blue border border-cyber-blue/30 group-hover:border-cyber-blue transition-all">
            <Network size={32} className="text-cyber-blue group-hover:text-black transition-colors" />
          </div>
          <h2 className="text-2xl font-black uppercase text-white mb-4">Defense-Grade Simulation</h2>
          <p className="text-cyber-blue/60 mb-6 leading-relaxed min-h-[100px]">
            Drawing from an extensive background in military-grade tactical simulators, Razel Tech builds highly robust networked environments. Whether it's complex HLA/RTI integrations using C++ or scalable multi-agent Unity systems, the firm engineers zero-latency synchronization.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-sm text-cyber-blue/80"><Zap size={14} className="text-cyber-green mr-3" /> Tactical Training Environments</li>
            <li className="flex items-center text-sm text-cyber-blue/80"><Zap size={14} className="text-cyber-green mr-3" /> 6DOF Motion Platform Integration</li>
            <li className="flex items-center text-sm text-cyber-blue/80"><Zap size={14} className="text-cyber-green mr-3" /> Real-time Physics Replication</li>
          </ul>
        </motion.div>

        {/* Enterprise SaaS */}
        <motion.div id="saas" variants={itemVars} className="p-8 md:p-10 border border-cyber-blue/20 bg-black/40 rounded-xl hover:border-cyber-blue transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-cyber-blue/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-cyber-blue/10 transition-colors pointer-events-none"></div>
          <div className="bg-cyber-blue/10 w-16 h-16 rounded-lg flex items-center justify-center mb-8 group-hover:bg-cyber-blue border border-cyber-blue/30 group-hover:border-cyber-blue transition-all">
            <Cloud size={32} className="text-cyber-blue group-hover:text-black transition-colors" />
          </div>
          <h2 className="text-2xl font-black uppercase text-white mb-4">Zero-Bloat Enterprise SaaS</h2>
          <p className="text-cyber-blue/60 mb-6 leading-relaxed min-h-[100px]">
            Razel Tech rejects the industry standard of bloated retainers and slow dashboards. The firm engineers lean, high-performance React and Node.js applications, local IndexedDB offline CRMs, and complex billing systems that integrate directly into actual business logic.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-sm text-cyber-blue/80"><Shield size={14} className="text-cyber-green mr-3" /> Secure Offline & Cloud Billing Systems</li>
            <li className="flex items-center text-sm text-cyber-blue/80"><Shield size={14} className="text-cyber-green mr-3" /> Automotive & Clinical CRM Platforms</li>
            <li className="flex items-center text-sm text-cyber-blue/80"><Shield size={14} className="text-cyber-green mr-3" /> Advanced Data Analytics Dashboards</li>
          </ul>
        </motion.div>

        {/* Spatial */}
        <motion.div id="spatial" variants={itemVars} className="p-8 md:p-10 border border-cyber-blue/20 bg-black/40 rounded-xl hover:border-cyber-blue transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-cyber-blue/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-cyber-blue/10 transition-colors pointer-events-none"></div>
          <div className="bg-cyber-blue/10 w-16 h-16 rounded-lg flex items-center justify-center mb-8 group-hover:bg-cyber-blue border border-cyber-blue/30 group-hover:border-cyber-blue transition-all">
            <Layers size={32} className="text-cyber-blue group-hover:text-black transition-colors" />
          </div>
          <h2 className="text-2xl font-black uppercase text-white mb-4">Digital Twins & Spatial Computing</h2>
          <p className="text-cyber-blue/60 mb-6 leading-relaxed min-h-[100px]">
            Elevating asset management. Razel Tech bridges the gap between physical and digital by engineering Unity WebGL, Three.js, and heavy BIM/IFC data directly into the browser, allowing stakeholders to interact with enterprise assets in real-time.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-sm text-cyber-blue/80"><Box size={14} className="text-cyber-green mr-3" /> Interactive Product Configurators</li>
            <li className="flex items-center text-sm text-cyber-blue/80"><Box size={14} className="text-cyber-green mr-3" /> Web-Based Augmented Reality</li>
            <li className="flex items-center text-sm text-cyber-blue/80"><Box size={14} className="text-cyber-green mr-3" /> Heavy BIM/IFC Data Rendering</li>
          </ul>
        </motion.div>

        {/* Architecture */}
        <motion.div id="architecture" variants={itemVars} className="p-8 md:p-10 border border-cyber-blue/20 bg-black/40 rounded-xl hover:border-cyber-blue transition-colors group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-cyber-blue/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-cyber-blue/10 transition-colors pointer-events-none"></div>
          <div className="bg-cyber-blue/10 w-16 h-16 rounded-lg flex items-center justify-center mb-8 group-hover:bg-cyber-blue border border-cyber-blue/30 group-hover:border-cyber-blue transition-all">
            <Workflow size={32} className="text-cyber-blue group-hover:text-black transition-colors" />
          </div>
          <h2 className="text-2xl font-black uppercase text-white mb-4">Mission-Critical Architecture</h2>
          <p className="text-cyber-blue/60 mb-6 leading-relaxed min-h-[100px]">
            When off-the-shelf subscriptions fail to meet operational requirements, Razel Tech architects custom logic. The firm offers absolute technical leadership, end-to-end SQL/NoSQL database optimization, and legacy system modernization.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-sm text-cyber-blue/80"><Code2 size={14} className="text-cyber-green mr-3" /> React, Next.js, and Unity Integrations</li>
            <li className="flex items-center text-sm text-cyber-blue/80"><Code2 size={14} className="text-cyber-green mr-3" /> Database Schema Optimization</li>
            <li className="flex items-center text-sm text-cyber-blue/80"><Code2 size={14} className="text-cyber-green mr-3" /> Cross-Platform PWA Delivery</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Case Studies / App Philosophy Section */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mt-40 mb-20 text-center">
        <h2 className="text-3xl font-black uppercase text-white mb-6 border-b border-cyber-blue/20 inline-block pb-4">Architectural Rationale</h2>
        <p className="text-cyber-blue/70 max-w-2xl mx-auto mb-16">
          Razel Tech does not build software just to build it. The firm builds it to replace bloated, expensive, or outdated systems. Here are a few examples of exactly why these specific solutions were engineered.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {customApps.map((app, idx) => (
            <div key={idx} className="p-8 border border-cyber-blue/10 bg-black/40 rounded-xl hover:border-cyber-blue transition-all group flex flex-col h-full">
              <div className="w-12 h-12 rounded-lg bg-cyber-blue/5 border border-cyber-blue/20 flex items-center justify-center mb-6 group-hover:bg-cyber-blue/20 transition-all shrink-0">
                {app.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{app.title}</h3>
              <p className="text-sm text-cyber-blue/60 leading-relaxed group-hover:text-cyber-blue/80 transition-colors mb-6 flex-grow">
                {app.reason}
              </p>
              {app.links && app.links.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-cyber-blue/10">
                  {app.links.map((link, lidx) => (
                    <a key={lidx} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-black transition-all">
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-32 p-12 bg-cyber-blue/5 border border-cyber-blue/20 rounded-xl text-center">
        <h2 className="text-3xl font-black uppercase italic text-white mb-4">Ready to Build Your System?</h2>
        <p className="text-cyber-blue/70 max-w-2xl mx-auto mb-8">Stop adapting to bloatware. Let Razel Tech architect a solution that is as precise as your business demands.</p>
        <a href="mailto:razeltech.in@gmail.com" className="inline-block px-10 py-5 bg-cyber-blue text-black font-black uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,243,255,0.3)]">
          INITIATE_CONTACT
        </a>
      </motion.div>
    </div>
  );
};

export default Solutions;
