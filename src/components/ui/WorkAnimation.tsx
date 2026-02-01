'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const WorkAnimation = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Code lines for the DEVELOP monitor
  const codeLines = [
    { text: "import { motion } from 'framer';", color: "#FF79C6" },
    { text: "const App = () => {", color: "#50FA7B" },
    { text: "  const [data, setData] = useState([]);", color: "#8BE9FD" },
    { text: "  useEffect(() => {", color: "#FFB86C" },
    { text: "    fetchProjects().then(setData);", color: "#F1FA8C" },
    { text: "  }, []);", color: "#FFB86C" },
    { text: "  return <Canvas3D data={data} />;", color: "#FF79C6" },
    { text: "};", color: "#50FA7B" },
  ];

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Floating particles
  const particles = useMemo(() => {
    if (!hasMounted) return [];
    return [...Array(18)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5
    }));
  }, [hasMounted]);

  if (!hasMounted) {
    return (
      <div className="w-full flex items-center justify-center py-16 overflow-hidden">
        <div className="relative w-full max-w-5xl opacity-0" style={{ aspectRatio: '16/9' }} />
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center py-0 px-4 overflow-hidden">
      <div className="relative w-full max-w-5xl" style={{ aspectRatio: isMobile ? '9/16' : '16/9' }}>

        {/* CSS for flowing line animation */}
        <style jsx>{`
          @keyframes flowRight {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -24; }
          }
          .flow-line {
            stroke-dasharray: 6 4;
            animation: flowRight 0.8s linear infinite;
          }
        `}</style>

        <svg
          viewBox={isMobile ? "0 0 400 700" : "0 0 900 420"}
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.1))' }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>

            <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0d0d1a" />
              <stop offset="100%" stopColor="#050510" />
            </linearGradient>

            <linearGradient id="deskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>

            <linearGradient id="monitorFrame" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a2a2a" />
              <stop offset="50%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0d0d0d" />
            </linearGradient>

            <linearGradient id="underglow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
              <stop offset="30%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="screenGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="ambientGlow" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </radialGradient>

            {/* Filters */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="softGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background particles */}
          {particles.map((p, i) => (
            <motion.circle
              key={i}
              r={p.size}
              fill="#D4AF37"
              opacity={0.12}
              initial={{ cx: `${p.x}%`, cy: `${p.y}%` }}
              animate={{
                cy: [`${p.y}%`, `${(p.y + 30) % 100}%`],
                opacity: [0.08, 0.2, 0.08]
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear",
                delay: p.delay
              }}
            />
          ))}

          {isMobile ? (
            /* ===================== MOBILE LAYOUT ===================== */
            <g>
              {/* DESIGN Monitor */}
              <g transform="translate(100, 40)">
                <Monitor width={200} height={130} label="DESIGN" content={<DesignContent />} />
              </g>

              {/* Flow line 1 */}
              <path d="M 200 185 L 200 220" stroke="#D4AF37" strokeWidth="2" fill="none" className="flow-line" filter="url(#softGlow)" />
              <text x="210" y="205" fill="#D4AF37" fontSize="12" opacity="0.6">↓</text>

              {/* DEVELOP Monitor */}
              <g transform="translate(100, 250)">
                <Monitor width={200} height={130} label="DEVELOP" content={<DevelopContent codeLines={codeLines} />} isPrimary />
              </g>

              {/* Flow line 2 */}
              <path d="M 200 395 L 200 430" stroke="#D4AF37" strokeWidth="2" fill="none" className="flow-line" filter="url(#softGlow)" />
              <text x="210" y="415" fill="#D4AF37" fontSize="12" opacity="0.6">↓</text>

              {/* DELIVER Monitor */}
              <g transform="translate(100, 460)">
                <Monitor width={200} height={130} label="DELIVER" content={<DeliverContent />} />
              </g>

              {/* Desk */}
              <rect x="60" y="620" width="280" height="6" rx="2" fill="url(#deskGradient)" />
              <rect x="90" y="620" width="220" height="2" fill="url(#underglow)" filter="url(#glow)" />

              {/* Coming Soon */}
              <text x="200" y="660" fill="#D4AF37" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="2" opacity="0.4">
                MORE PROJECTS COMING SOON
              </text>
            </g>
          ) : (
            /* ===================== DESKTOP LAYOUT - HORIZONTAL ===================== */
            <g>
              {/* ===== LEFT MONITOR (DESIGN) ===== */}
              <g transform="translate(40, 85)">
                <Monitor width={210} height={140} label="DESIGN" content={<DesignContent />} />
              </g>

              {/* ===== CENTER MONITOR (DEVELOP) - Larger & elevated ===== */}
              <g transform="translate(325, 50)">
                <Monitor width={250} height={165} label="DEVELOP" content={<DevelopContent codeLines={codeLines} />} isPrimary />
              </g>

              {/* ===== RIGHT MONITOR (DELIVER) ===== */}
              <g transform="translate(650, 85)">
                <Monitor width={210} height={140} label="DELIVER" content={<DeliverContent />} />
              </g>

              {/* ===== FLOWING CONNECTIONS ===== */}
              <g>
                <path d="M 250 155 Q 288 145 325 150" stroke="#333" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3" />
                <path d="M 250 155 Q 288 145 325 150" stroke="#D4AF37" strokeWidth="2" fill="none" strokeLinecap="round" className="flow-line" filter="url(#softGlow)" />

                <path d="M 575 150 Q 612 145 650 155" stroke="#333" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3" />
                <path d="M 575 150 Q 612 145 650 155" stroke="#D4AF37" strokeWidth="2" fill="none" strokeLinecap="round" className="flow-line" filter="url(#softGlow)" />
              </g>

              {/* ===== BOTTOM TEXT ===== */}
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
                <text x="450" y="320" fill="#D4AF37" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="4" opacity="0.4">
                  MORE PROJECTS COMING SOON
                </text>
                <line x1="320" y1="330" x2="580" y2="330" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.2" />
              </motion.g>
            </g>
          )}
        </svg>
      </div>
    </div >
  );
};

/* ============================================ */
/* MONITOR COMPONENT */
/* ============================================ */
interface MonitorProps {
  width: number;
  height: number;
  label: string;
  content: React.ReactNode;
  isPrimary?: boolean;
}

const Monitor: React.FC<MonitorProps> = ({ width, height, label, content, isPrimary = false }) => {
  const bezelWidth = 6;
  const screenWidth = width - bezelWidth * 2;
  const screenHeight = height - bezelWidth * 2 - 10;

  return (
    <g>
      {/* Shadow */}
      <ellipse cx={width / 2} cy={height + 10} rx={width / 2.5} ry={5} fill="#000" opacity="0.35" />

      {/* Stand */}
      <rect x={width / 2 - 10} y={height - 2} width={20} height={12} fill="url(#monitorFrame)" />
      <ellipse cx={width / 2} cy={height + 8} rx={25} ry={5} fill="url(#monitorFrame)" stroke="#333" strokeWidth="0.5" />

      {/* Monitor body */}
      <rect x={0} y={0} width={width} height={height} rx={5} fill="url(#monitorFrame)" stroke={isPrimary ? "#D4AF37" : "#3a3a3a"} strokeWidth={isPrimary ? "1" : "0.5"} />

      {/* Top bezel with camera */}
      <rect x={0} y={0} width={width} height={9} rx={5} fill="#1a1a1a" />
      <circle cx={width / 2} cy={4.5} r={1.5} fill="#222" />
      <motion.circle cx={width / 2} cy={4.5} r={0.8} fill="#4ade80"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Screen */}
      <rect x={bezelWidth} y={bezelWidth + 7} width={screenWidth} height={screenHeight} rx={2} fill="url(#screenGradient)" />
      <rect x={bezelWidth} y={bezelWidth + 7} width={screenWidth} height={screenHeight} rx={2} fill="url(#screenGlow)" />

      {/* Screen content */}
      <g transform={`translate(${bezelWidth}, ${bezelWidth + 7})`}>
        <svg width={screenWidth} height={screenHeight} viewBox={`0 0 ${screenWidth} ${screenHeight}`}>
          {content}
        </svg>
      </g>

      {/* Label */}
      <motion.text x={width / 2} y={height + 28} fill="#D4AF37" fontSize={isPrimary ? 11 : 9} fontWeight="bold" textAnchor="middle" letterSpacing="2" filter="url(#softGlow)"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {label}
      </motion.text>
    </g>
  );
};

/* ============================================ */
/* DESIGN SCREEN CONTENT */
/* ============================================ */
const DesignContent: React.FC = () => (
  <g>
    {/* Window chrome */}
    <rect x="0" y="0" width="100%" height="9" fill="#1e1e1e" />
    <circle cx="7" cy="4.5" r="1.8" fill="#FF5F56" />
    <circle cx="14" cy="4.5" r="1.8" fill="#FFBD2E" />
    <circle cx="21" cy="4.5" r="1.8" fill="#27CA40" />

    {/* Sidebar */}
    <rect x="0" y="9" width="20" height="200" fill="#151515" />
    {[0, 1, 2, 3, 4].map(i => (
      <motion.rect key={i} x="4" y={15 + i * 11} width="12" height="7" rx="1.5" fill={i === 1 ? "#D4AF37" : "#2a2a2a"}
        animate={i === 1 ? { opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    ))}

    {/* Canvas */}
    <rect x="24" y="13" width="105" height="80" fill="#0a0a0a" stroke="#252525" strokeWidth="0.5" />

    {/* Design card */}
    <motion.g animate={{ y: [-1.5, 1.5, -1.5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <rect x="35" y="22" width="45" height="32" rx="3" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="0.5" />
      <rect x="40" y="26" width="28" height="4" fill="#333" rx="1" />
      <rect x="40" y="33" width="35" height="2" fill="#252525" rx="0.5" />
      <rect x="40" y="38" width="30" height="2" fill="#252525" rx="0.5" />
      <motion.rect x="40" y="45" width="18" height="5" rx="1.5" fill="#D4AF37"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.g>

    {/* Second card */}
    <motion.g animate={{ y: [1.5, -1.5, 1.5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
      <rect x="90" y="28" width="32" height="40" rx="3" fill="#1a1a1a" stroke="#444" strokeWidth="0.3" />
      <circle cx="106" cy="40" r="7" fill="#252525" />
      <rect x="94" y="52" width="24" height="2" fill="#333" rx="0.5" />
      <rect x="97" y="58" width="18" height="2" fill="#252525" rx="0.5" />
    </motion.g>

    {/* Right panel */}
    <rect x="133" y="9" width="55" height="200" fill="#151515" />
    {[0, 1, 2, 3, 4, 5].map(i => (
      <rect key={i} x="137" y={15 + i * 9} width="45" height="5" fill="#222" rx="1" />
    ))}
  </g>
);

/* ============================================ */
/* DEVELOP SCREEN CONTENT */
/* ============================================ */
interface DevelopContentProps {
  codeLines: { text: string; color: string }[];
}

const DevelopContent: React.FC<DevelopContentProps> = ({ codeLines }) => {
  const lineHeight = 12;
  const totalHeight = codeLines.length * lineHeight;

  return (
    <g>
      {/* Tab bar */}
      <rect x="0" y="0" width="100%" height="10" fill="#1e1e1e" />
      <text x="10" y="7" fontSize="4.5" fill="#aaa">main.tsx</text>
      <text x="45" y="7" fontSize="4.5" fill="#555">styles.css</text>

      {/* File explorer */}
      <rect x="0" y="10" width="24" height="200" fill="#181818" />
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x="3" y={16 + i * 12} width="18" height="8" fill="#252525" rx="1" />
      ))}

      {/* Code with scroll */}
      <g>
        <defs>
          <clipPath id="codeClip">
            <rect x="26" y="12" width="160" height="75" />
          </clipPath>
        </defs>

        <g clipPath="url(#codeClip)">
          <motion.g initial={{ y: 0 }} animate={{ y: [0, -totalHeight] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
            {codeLines.map((line, i) => (
              <g key={`l1-${i}`}>
                <text x="30" y={22 + i * lineHeight} fontSize="4.5" fill="#555">{i + 1}</text>
                <text x="42" y={22 + i * lineHeight} fontSize="5" fill={line.color} fontFamily="monospace">{line.text}</text>
              </g>
            ))}
            {codeLines.map((line, i) => (
              <g key={`l2-${i}`}>
                <text x="30" y={22 + totalHeight + i * lineHeight} fontSize="4.5" fill="#555">{i + 1}</text>
                <text x="42" y={22 + totalHeight + i * lineHeight} fontSize="5" fill={line.color} fontFamily="monospace">{line.text}</text>
              </g>
            ))}
          </motion.g>
        </g>
      </g>

      {/* Terminal */}
      <rect x="26" y="90" width="162" height="18" fill="#0d0d0d" />
      <rect x="26" y="88" width="162" height="3" fill="#1a1a1a" />
      <text x="30" y="96" fontSize="3.5" fill="#888">TERMINAL</text>
      <motion.text x="30" y="104" fontSize="4" fill="#4ade80" fontFamily="monospace"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        $ npm run build ✓
      </motion.text>
    </g>
  );
};

/* ============================================ */
/* DELIVER SCREEN CONTENT */
/* ============================================ */
const DeliverContent: React.FC = () => (
  <g>
    {/* Header */}
    <rect x="0" y="0" width="100%" height="10" fill="#0a1a0a" />
    <text x="6" y="7" fontSize="4.5" fill="#4ade80" fontWeight="bold">DEPLOYMENT</text>
    <motion.circle cx="170" cy="5" r="2.5" fill="#4ade80"
      animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    />

    {/* Pipeline */}
    <g transform="translate(6, 16)">
      {['BUILD', 'TEST', 'STAGE', 'PROD'].map((stage, i) => (
        <g key={stage} transform={`translate(${i * 42}, 0)`}>
          <rect x="0" y="0" width="38" height="18" rx="2" fill="#0d1f0d" stroke="#254525" strokeWidth="0.5" />
          <text x="19" y="12" fontSize="4.5" fill="#4ade80" textAnchor="middle" fontWeight="bold">{stage}</text>
          <motion.circle cx="33" cy="4" r="2" fill="#4ade80"
            animate={{ opacity: i < 3 ? 1 : [1, 0.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        </g>
      ))}
      {[0, 1, 2].map(i => (
        <motion.line key={i} x1={38 + i * 42} y1="9" x2={42 + i * 42} y2="9" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="2 2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </g>

    {/* Stats */}
    <g transform="translate(6, 42)">
      {[
        { label: 'UPTIME', value: '99.99%', color: '#4ade80' },
        { label: 'LATENCY', value: '42ms', color: '#60a5fa' },
        { label: 'REQUESTS', value: '1.2M', color: '#fbbf24' },
      ].map((stat, i) => (
        <g key={stat.label} transform={`translate(${i * 58}, 0)`}>
          <rect x="0" y="0" width="54" height="24" rx="2" fill="#0a0a0a" stroke="#252525" strokeWidth="0.5" />
          <text x="5" y="9" fontSize="3.5" fill="#666">{stat.label}</text>
          <motion.text x="5" y="19" fontSize="6" fill={stat.color} fontWeight="bold"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
          >
            {stat.value}
          </motion.text>
        </g>
      ))}
    </g>

    {/* Chart */}
    <g transform="translate(6, 72)">
      <rect x="0" y="0" width="170" height="24" fill="#050505" rx="2" stroke="#1a1a1a" strokeWidth="0.5" />
      {[0, 1, 2].map(i => (
        <line key={i} x1="5" y1={5 + i * 8} x2="162" y2={5 + i * 8} stroke="#151515" strokeWidth="0.5" />
      ))}
      <motion.polyline points="8,20 28,12 48,16 68,6 88,10 108,4 128,8 148,5 160,10" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
    </g>
  </g>
);

export default WorkAnimation;