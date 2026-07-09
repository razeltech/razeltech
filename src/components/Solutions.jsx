import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Cloud, Layers, Workflow, Shield, Zap, Box, Code2 } from 'lucide-react';

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
          We don't sell templates. We deliver highly customized software architecture tailored to complex industrial, defense, and enterprise workflows. Below are the four core pillars of our technical capabilities.
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
          <h2 className="text-2xl font-black uppercase text-white mb-4">Simulation & Multiplayer</h2>
          <p className="text-cyber-blue/60 mb-6 leading-relaxed min-h-[100px]">
            Drawing from our extensive background in defense-grade tactical simulators, we build highly robust networked environments. Whether it's HLA/RTI integrations or scalable multi-user sessions, we ensure zero-latency synchronization.
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
          <h2 className="text-2xl font-black uppercase text-white mb-4">Enterprise SaaS</h2>
          <p className="text-cyber-blue/60 mb-6 leading-relaxed min-h-[100px]">
            We design secure, scalable cloud dashboards and CRM systems that map directly to your business logic. We focus on 'No Bloatware'—meaning faster load times, optimized databases, and an interface that your team will actually want to use.
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
          <h2 className="text-2xl font-black uppercase text-white mb-4">Spatial & 3D Visualization</h2>
          <p className="text-cyber-blue/60 mb-6 leading-relaxed min-h-[100px]">
            Elevate your product presentation and facility management. We integrate WebGL, AR/VR, and Digital Twins (BIM/IFC) directly into the browser, allowing your clients and engineers to interact with your assets in real-time.
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
          <h2 className="text-2xl font-black uppercase text-white mb-4">Systems Architecture & Custom Dev</h2>
          <p className="text-cyber-blue/60 mb-6 leading-relaxed min-h-[100px]">
            When off-the-shelf tools fail to meet your operational requirements, we step in. We offer end-to-end full-stack development, database architecture consulting, and legacy system modernization with a focus on long-term maintainability.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-sm text-cyber-blue/80"><Code2 size={14} className="text-cyber-green mr-3" /> React, Next.js, and Unity Integrations</li>
            <li className="flex items-center text-sm text-cyber-blue/80"><Code2 size={14} className="text-cyber-green mr-3" /> Database Schema Optimization</li>
            <li className="flex items-center text-sm text-cyber-blue/80"><Code2 size={14} className="text-cyber-green mr-3" /> Cross-Platform PWA Delivery</li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-32 p-12 bg-cyber-blue/5 border border-cyber-blue/20 rounded-xl text-center">
        <h2 className="text-3xl font-black uppercase italic text-white mb-4">Ready to Build Your System?</h2>
        <p className="text-cyber-blue/70 max-w-2xl mx-auto mb-8">Stop adapting to bloatware. Let's architect a solution that is as precise as your business demands.</p>
        <a href="mailto:razeltech.in@gmail.com" className="inline-block px-10 py-5 bg-cyber-blue text-black font-black uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,243,255,0.3)]">
          INITIATE_CONTACT
        </a>
      </motion.div>
    </div>
  );
};

export default Solutions;
