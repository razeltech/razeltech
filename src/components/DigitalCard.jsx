import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  Globe,
  User,
  Briefcase,
  MapPin,
  Share2,
  Download,
  QrCode,
  Check,
  ArrowLeft,
  Cpu,
  Compass
} from 'lucide-react';
import BorderGlow from './BorderGlow';
import { Link } from 'react-router-dom';

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export default function DigitalCard() {
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState('Copy URL');
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Card-specific metadata
  const contact = {
    fullName: "Raja Vamsi Dhar V",
    orgName: "Razel Tech",
    roleName: "Founder & CEO // Lead Systems Architect",
    email: "razeltech.in@gmail.com",
    phone: "", // Temporarily hidden until new number is available
    website: "https://razeltech.github.io/razeltech/",
    linkedin: "https://www.linkedin.com/in/raja-vamsi-dhar-vallabhapurapu-71b10475/",
    githubPersonal: "https://github.com/razeltech",
    githubOrg: "https://github.com/razeltech",
    address: "Andhra Pradesh, India"
  };

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${contact.fullName} | ${contact.orgName} Digital Business Card`;
    return () => {
      document.title = originalTitle;
    };
  }, [contact.fullName, contact.orgName]);

  const cardUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=00f3ff&bgcolor=050505&data=${encodeURIComponent(cardUrl)}`;

  const handleDownloadVcard = () => {
    // Generate vCard format content
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${contact.fullName.split(' ').reverse().join(';')};;;`,
      `FN:${contact.fullName}`,
      `ORG:${contact.orgName}`,
      `TITLE:${contact.roleName}`,
      `EMAIL;TYPE=PREF,INTERNET:${contact.email}`,
      ...(contact.phone ? [`TEL;TYPE=CELL,VOICE:${contact.phone}`] : []),
      `URL:${contact.website}`,
      `X-SOCIALPROFILE;TYPE=linkedin:${contact.linkedin}`,
      `X-SOCIALPROFILE;TYPE=github:${contact.githubPersonal}`,
      `X-SOCIALPROFILE;TYPE=github:${contact.githubOrg}`,
      `ADR;TYPE=WORK:;;;${contact.address};;;`,
      'REV:' + new Date().toISOString(),
      'END:VCARD'
    ].join('\r\n');

    // Create file blob and download trigger
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${contact.fullName.replace(/\s+/g, '_')}_RazelTech.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${contact.fullName} - ${contact.orgName}`,
          text: `Save my digital card:`,
          url: cardUrl
        });
      } catch (err) {
        console.log('Share canceled or failed', err);
      }
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      setCopiedText('Copied!');
      setTimeout(() => {
        setCopied(false);
        setCopiedText('Copy URL');
      }, 2000);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 md:p-8 space-y-12">
      <div className="w-full max-w-md relative">
        {/* Back Link to Systems Hub */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-[10px] font-bold tracking-widest text-cyber-blue hover:text-white mb-6 uppercase transition-colors"
        >
          <ArrowLeft size={12} />
          <span>Return_to_Core_Systems</span>
        </Link>

        <BorderGlow
          borderRadius={24}
          glowRadius={8}
          edgeSensitivity={30}
          glowIntensity={0.6}
          fillOpacity={0}
          glowColor="180 100 80"
          backgroundColor="#050505"
          colors={['#00f3ff', '#39ff14', '#00f3ff']}
        >
          {/* Main Card Container */}
          <div className="bg-obsidian border border-cyber-blue/15 rounded-[24px] p-6 md:p-8 relative overflow-hidden backdrop-blur-xl flex flex-col items-center">

            {/* Tech Aesthetic Sub-labels */}
            <div className="w-full flex justify-between items-center mb-6 text-[8px] font-bold text-cyber-blue/40 tracking-widest uppercase">
              <span>SYSTEMS::VCARD_ONLINE</span>
              <span>VER_2.5_SECURE</span>
            </div>

            {/* Glowing Avatar Frame */}
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyber-blue to-cyber-green opacity-40 blur-md animate-pulse" />
              <div className="w-24 h-24 rounded-full bg-[#dcdcdc] border-2 border-cyber-blue flex items-center justify-center relative z-10 overflow-hidden">
                <img
                  src="./logo.png"
                  alt="RazelTech Logo"
                  className="w-full h-full object-contain p-0 animate-pulse"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 items-center justify-center bg-[#dcdcdc]">
                  <Cpu className="text-obsidian w-10 h-10" />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center w-full mb-6">
              <h2 className="text-2xl font-black tracking-tight uppercase italic text-white mb-1">
                {contact.fullName}
              </h2>
              <p className="text-[10px] font-bold text-cyber-green uppercase tracking-widest mb-3">
                {contact.orgName}
              </p>
              <div className="inline-block px-3 py-1 border border-cyber-blue/20 bg-cyber-blue/5 rounded text-[8px] font-bold tracking-widest text-cyber-blue uppercase mb-4">
                {contact.roleName}
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="w-full space-y-3 mb-8">
              {/* Direct Actions */}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center p-3 rounded-lg border border-cyber-blue/10 bg-cyber-blue/5 hover:border-cyber-blue/40 hover:bg-cyber-blue/10 transition-all group"
                >
                  <div className="p-2 rounded bg-cyber-blue/10 text-cyber-blue mr-3 group-hover:scale-110 transition-transform">
                    <Phone size={16} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-[8px] text-cyber-blue/40 font-bold tracking-wider uppercase">Direct Voice Line</div>
                    <div className="text-xs font-bold text-white font-mono">{contact.phone}</div>
                  </div>
                </a>
              )}

              <a
                href={`mailto:${contact.email}`}
                className="flex items-center p-3 rounded-lg border border-cyber-blue/10 bg-cyber-blue/5 hover:border-cyber-blue/40 hover:bg-cyber-blue/10 transition-all group"
              >
                <div className="p-2 rounded bg-cyber-blue/10 text-cyber-blue mr-3 group-hover:scale-110 transition-transform">
                  <Mail size={16} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[8px] text-cyber-blue/40 font-bold tracking-wider uppercase">Direct Mail Link</div>
                  <div className="text-xs font-bold text-white font-mono">{contact.email}</div>
                </div>
              </a>



              <div className="flex items-center p-3 rounded-lg border border-cyber-blue/10 bg-cyber-blue/5">
                <div className="p-2 rounded bg-cyber-blue/10 text-cyber-blue mr-3">
                  <MapPin size={16} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[8px] text-cyber-blue/40 font-bold tracking-wider uppercase">Operations Hub</div>
                  <div className="text-xs font-bold text-white">{contact.address}</div>
                </div>
              </div>
            </div>

            {/* Main Interactive Action Buttons */}
            <div className="w-full grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={handleDownloadVcard}
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-cyber-blue text-black font-black text-[10px] tracking-wider uppercase rounded-lg hover:bg-white hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-lg shadow-cyber-blue/20"
              >
                <Download size={14} />
                <span>Save Contact</span>
              </button>

              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center space-x-2 py-3.5 border border-cyber-blue/30 text-cyber-blue font-black text-[10px] tracking-wider uppercase rounded-lg hover:bg-cyber-blue/10 hover:border-cyber-blue active:scale-95 transition-all cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Share2 size={14} />}
                <span>{copiedText}</span>
              </button>
            </div>

            {/* Secondary Option: QR Code Scan Toggle */}
            <button
              onClick={() => setShowQr(!showQr)}
              className="w-full flex items-center justify-center space-x-2 py-3 border border-cyber-green/20 text-cyber-green font-bold text-[9px] tracking-widest uppercase rounded-lg hover:bg-cyber-green/10 hover:border-cyber-green/50 transition-all cursor-pointer"
            >
              <QrCode size={12} />
              <span>{showQr ? "Hide QR Code" : "Show Client QR Code"}</span>
            </button>

            {/* QR Modal / Drawer */}
            <AnimatePresence>
              {showQr && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full flex flex-col items-center mt-6 pt-6 border-t border-cyber-blue/10 overflow-hidden"
                >
                  <p className="text-[8px] font-bold text-cyber-blue/60 uppercase tracking-widest text-center mb-4 leading-relaxed">
                    Let a client scan this QR with their mobile camera<br />to instantly pull up your digital card!
                  </p>
                  <div className="p-3 bg-black border border-cyber-blue/30 rounded-xl flex items-center justify-center">
                    <img
                      src={qrCodeUrl}
                      alt="vCard QR Code Link"
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                  <div className="mt-4 text-[8px] font-mono text-cyber-blue/30 select-all max-w-xs break-all text-center">
                    {cardUrl}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Grid Section */}
            <div className="w-full mt-8 pt-6 border-t border-cyber-blue/10 flex justify-center items-center space-x-6">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-cyber-blue/20 bg-cyber-blue/5 text-cyber-blue/60 hover:text-cyber-blue hover:border-cyber-blue hover:scale-115 transition-all"
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={contact.githubPersonal}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-cyber-blue/20 bg-cyber-blue/5 text-cyber-blue/60 hover:text-cyber-blue hover:border-cyber-blue hover:scale-115 transition-all"
                title="GitHub (razeltech)"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={contact.githubOrg}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-cyber-green/20 bg-cyber-green/5 text-cyber-green/60 hover:text-cyber-green hover:border-cyber-green hover:scale-115 transition-all"
                title="Corporate GitHub (razeltech)"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-cyber-blue/20 bg-cyber-blue/5 text-cyber-blue/60 hover:text-cyber-blue hover:border-cyber-blue hover:scale-115 transition-all"
                title="Company Portal"
              >
                <Compass size={18} />
              </a>
            </div>

            {/* Footer Tag */}
            <div className="w-full text-center mt-6 text-[7px] text-cyber-blue/25 font-mono uppercase tracking-[0.25em]">
              MSME CERTIFIED BUSINESS CARD // RAZELTECH SECURE ENGINE
            </div>

          </div>
        </BorderGlow>
      </div>

      {/* Interactive Tactile Business Card Preview */}
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="text-center mb-6">
          <div className="text-[8px] font-black text-cyber-green/60 tracking-[0.4em] uppercase mb-1">
            // INTERACTIVE_TACTILE_CARD
          </div>
          <p className="text-[9px] font-bold text-cyber-blue/40 tracking-wider uppercase flex items-center justify-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green"></span>
            Tap card to flip between Front and Back
          </p>
        </div>

        <div
          onClick={() => setIsCardFlipped(!isCardFlipped)}
          className="w-full aspect-[1.75] cursor-pointer flip-card relative"
          style={{ height: '230px' }}
        >
          <div className={`w-full h-full relative flip-card-inner duration-500 transform-gpu ${isCardFlipped ? 'flipped' : ''}`}>

            {/* FRONT SIDE */}
            <div className="flip-card-front rounded-[20px] bg-obsidian border border-cyber-blue/30 p-6 flex flex-col justify-between overflow-hidden shadow-2xl hover:shadow-cyber-blue/10 transition-all select-none">
              <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/[0.03] to-transparent pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-1.5 bg-cyber-blue/10 rounded border border-cyber-blue/20 flex items-center justify-between px-1.5 opacity-50">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue/50" />
              </div>

              {/* Front Logo / Branding */}
              <div className="flex-1 flex flex-col items-center justify-center mt-2">
                <div className="w-16 h-16 rounded-full bg-[#dcdcdc] border-2 border-cyber-blue flex items-center justify-center overflow-hidden mb-3 shadow-lg shadow-cyber-blue/10">
                  <img src="./logo.png" alt="Razel Tech Logo" className="w-full h-full object-contain p-0" />
                </div>
                <h3 className="text-xl font-black italic tracking-wider text-white leading-none mb-1">
                  RAZEL TECH
                </h3>
                <div className="text-[7px] font-mono font-bold tracking-[0.4em] text-cyber-blue/60 uppercase">
                  MISSION-CRITICAL SYSTEMS
                </div>
              </div>

              {/* Bottom Chip / System status */}
              <div className="flex justify-between items-end text-[6px] font-mono font-bold text-cyber-blue/30 tracking-widest uppercase">
                <span>EST_2025 // RAZEL_HQ</span>
                <span>SECURE_CHIP_v2.5</span>
              </div>
            </div>

            {/* BACK SIDE */}
            <div className="flip-card-back rounded-[20px] bg-obsidian border border-cyber-green/30 p-6 flex flex-col justify-between overflow-hidden shadow-2xl hover:shadow-cyber-green/10 transition-all select-none">
              <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/[0.02] to-transparent pointer-events-none" />

              {/* Back Top Header */}
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <h4 className="text-sm font-black tracking-tight text-white uppercase italic leading-none mb-1">
                    {contact.fullName}
                  </h4>
                  <div className="text-[7px] font-bold text-cyber-green uppercase tracking-widest leading-none mt-0.5">
                    {contact.roleName}
                  </div>
                </div>
                <div className="w-8 h-8 rounded bg-[#dcdcdc] border border-cyber-green/20 flex items-center justify-center overflow-hidden shrink-0">
                  <img src="./logo.png" alt="Mini Logo" className="w-full h-full object-contain p-0" />
                </div>
              </div>

              {/* Back Content Grid */}
              <div className="my-3 space-y-1 text-[8px] font-bold tracking-widest text-cyber-blue/60 uppercase text-left">
                {contact.phone && (
                  <div className="flex items-center space-x-2">
                    <span className="text-cyber-green w-8 shrink-0">TEL:</span>
                    <span className="text-white font-mono">{contact.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-cyber-green w-8 shrink-0">MAIL:</span>
                  <span className="text-white font-mono">{contact.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-cyber-green w-8 shrink-0">WEB:</span>
                  <span className="text-white font-mono lowercase">{contact.website.replace('https://', '')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-cyber-green w-8 shrink-0">LOC:</span>
                  <span className="text-white">{contact.address}</span>
                </div>
              </div>

              {/* Back Bottom footer */}
              <div className="flex justify-between items-end border-t border-cyber-blue/15 pt-2">
                <div className="text-left">
                  <span className="text-[6px] font-mono font-bold text-cyber-blue/20 tracking-wider uppercase block">
                    MSME_REG::UDYAM-AP-04-0112603
                  </span>
                  <span className="text-[6.5px] font-bold text-cyber-green animate-pulse uppercase mt-0.5 block">
                    ● SYSTEMS_OPERATIONAL
                  </span>
                </div>

                {/* Visual mock QR Server placeholder */}
                <div className="w-8 h-8 bg-black border border-cyber-green/30 p-0.5 rounded shrink-0 flex items-center justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&color=39ff14&bgcolor=050505&data=${encodeURIComponent(cardUrl)}`}
                    alt="Scan Card"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Global Embedded Styles */}
        <style>{`
          .flip-card {
            perspective: 1000px;
          }
          .flip-card-inner {
            transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            transform-style: preserve-3d;
          }
          .flipped {
            transform: rotateY(180deg);
          }
          .flip-card-front, .flip-card-back {
            backface-visibility: hidden;
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .flip-card-back {
            transform: rotateY(180deg);
          }
        `}</style>
      </div>
    </div>
  );
}
