import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Zap, Target } from 'lucide-react';

const AboutUs = () => {
  const journeySteps = [
    {
      year: '2023',
      title: 'The Core Engine',
      desc: 'Began architecting defense-grade tactical simulators and HLA/RTI integrations for heavy industrial use-cases.',
      icon: <Terminal size={20} className="text-cyber-blue" />
    },
    {
      year: '2024',
      title: 'Enterprise Logic Expansion',
      desc: 'Translated our low-latency simulation expertise into scalable cloud SaaS platforms, focusing on zero-bloat CRM and ERP dashboards.',
      icon: <Zap size={20} className="text-cyber-green" />
    },
    {
      year: '2025',
      title: 'Razel Tech Established',
      desc: 'Officially registered as a verified MSME (UDYAM-AP-04-0112603) headquartered in Guntur, formalizing our mission to build mission-critical systems.',
      icon: <Shield size={20} className="text-white" />
    },
    {
      year: 'Future',
      title: 'Spatial Computing',
      desc: 'Expanding our capabilities in Digital Twins, WebGL, and AR/VR to bring physical operations into the digital realm.',
      icon: <Target size={20} className="text-cyber-blue" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-32 text-center min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        
        {/* Header Section */}
        <div className="mb-24">
          <div className="inline-flex items-center space-x-2 text-cyber-blue text-[10px] font-bold tracking-[0.2em] mb-6 uppercase border border-cyber-blue/30 bg-cyber-blue/5 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse"></span>
            <span>Firm Heritage</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-6">
            System <span className="text-cyber-blue">Architects</span>
          </h1>
          <p className="text-cyber-blue/70 text-lg leading-relaxed max-w-3xl mx-auto">
            We are a specialized engineering firm dedicated to building mission-critical software, defense-grade simulations, and enterprise SaaS platforms without the bloatware. We do not sell templates; we architect precise solutions.
          </p>
        </div>

        {/* The Journey Section */}
        <div className="text-left max-w-4xl mx-auto">
          <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-white mb-12 text-center border-b border-cyber-blue/10 pb-6">The Architectural Journey</h2>
          
          <div className="relative border-l border-cyber-blue/20 ml-4 md:ml-8 space-y-12 pb-12">
            {journeySteps.map((step, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index} 
                className="relative pl-10 md:pl-16 group"
              >
                {/* Timeline Node */}
                <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-obsidian border border-cyber-blue/30 flex items-center justify-center group-hover:border-cyber-blue group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(0,243,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                  {step.icon}
                </div>
                
                {/* Content */}
                <div className="p-6 border border-cyber-blue/10 bg-black/40 rounded-lg group-hover:border-cyber-blue/50 group-hover:bg-cyber-blue/5 transition-all">
                  <div className="text-[10px] font-black tracking-[0.3em] text-cyber-blue/60 mb-2 uppercase">{step.year}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-cyber-blue/70 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 p-12 border border-cyber-blue/20 bg-cyber-blue/5 rounded-xl relative overflow-hidden group hover:border-cyber-blue transition-all">
          <div className="absolute top-0 right-0 p-32 bg-cyber-blue/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <h2 className="text-2xl font-black uppercase text-white mb-4">Secure Engineering Operations</h2>
          <p className="text-cyber-blue/60 mb-8 max-w-xl mx-auto">
            Headquartered in Guntur, Andhra Pradesh with operational centers across Hyderabad and Vijayawada. We are ready to architect your next core system.
          </p>
          <a href="mailto:razeltech.in@gmail.com" className="inline-block px-10 py-5 bg-cyber-blue text-black font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all text-[12px] shadow-[0_0_30px_rgba(0,243,255,0.2)]">
            INITIATE_COMMUNICATION
          </a>
        </div>
        
      </motion.div>
    </div>
  );
};

export default AboutUs;
