'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const WorkAnimation = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeLine, setActiveLine] = useState(0);
  const [dataPoints, setDataPoints] = useState([15, 25, 18, 30]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    // Check mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const interval = setInterval(() => {
      setActiveLine(prev => (prev + 1) % 6);
    }, 2000);

    const dataInterval = setInterval(() => {
      setDataPoints(prev => prev.map(() => Math.random() * 25 + 10));
    }, 3000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
      clearInterval(dataInterval);
    };
  }, []);

  // Generate random particles only once on mount to avoid hydration mismatch
  const particles = useMemo(() => {
    if (!hasMounted) return [];
    return [...Array(30)].map((_, i) => ({
      r: Math.random() * 1.5 + 0.5,
      x: Math.random() * 800,
      y: Math.random() * 900,
      opacity: Math.random() * 0.3,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4
    }));
  }, [hasMounted]);

  // Use a stable initial render for SSR
  if (!hasMounted) {
    return (
      <div className="w-full flex items-center justify-center py-12 px-4 overflow-hidden">
        <div className="relative w-full max-w-4xl opacity-0" style={{ aspectRatio: '16/9' }} />
      </div>
    );
  }

  // Layout Config
  const viewWidth = isMobile ? 400 : 800;
  const viewHeight = isMobile ? 900 : 450;

  return (
    <div className="w-full flex items-center justify-center py-12 px-4 overflow-hidden">
      <div className="relative w-full max-w-4xl" style={{ aspectRatio: isMobile ? '4/9' : '16/9' }}>
        <svg
          key={isMobile ? 'mobile' : 'desktop'}
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#B8860B" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="screenGlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>

            <filter id="softGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="screenGlowFilter">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id="ambientLight">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient Background Particles */}
          {particles.map((p, i) => (
            <motion.circle
              key={i}
              r={p.r}
              fill="#D4AF37"
              initial={{ x: p.x, y: p.y, opacity: p.opacity }}
              animate={{
                y: [p.y, (p.y + 200) % viewHeight],
                opacity: [p.opacity, p.opacity + 0.1, p.opacity],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay
              }}
            />
          ))}

          {/* Connection Network */}
          <g opacity="0.4">
            {isMobile ? (
              <>
                <motion.path
                  d="M 200 250 Q 250 330 200 420"
                  stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#softGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 200 520 Q 150 600 200 690"
                  stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#softGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
              </>
            ) : (
              <>
                <motion.path
                  d="M 250 260 Q 320 200 390 270"
                  stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#softGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 460 270 Q 520 220 580 250"
                  stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#softGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
              </>
            )}
          </g>

          {/* Coder (Left or Top) */}
          <g transform={isMobile ? "translate(125, 120)" : "translate(160, 250)"}>
            <path d="M 0 35 L 110 -5 L 150 15 L 40 55 Z" fill="#0a0a0a" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6" />
            <g transform="translate(30, 0)">
              <path d="M 0 35 L 70 10 L 70 55 L 0 80 Z" fill="#050505" stroke="#D4AF37" strokeWidth="1.2" filter="url(#screenGlowFilter)" />
              <rect x="5" y="40" width="60" height="35" fill="url(#screenGlowGradient)" transform="skewY(-20)" />
              {[...Array(6)].map((_, i) => (
                <g key={i}>
                  <motion.line
                    x1="12" y1={45 + i * 6}
                    initial={{ x2: 12, opacity: 0.2 }}
                    stroke={i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#D4AF37" : "#B8860B"}
                    strokeWidth="1.8" strokeLinecap="round" transform="skewY(-20)"
                    animate={{
                      x2: i === activeLine ? [12, 57] : (i < activeLine ? 57 : 12),
                      opacity: i <= activeLine ? [0.4, 1, 0.7] : 0.2
                    }}
                    transition={{ duration: i === activeLine ? 1.2 : 0.3, ease: "easeOut" }}
                  />
                </g>
              ))}
            </g>
          </g>

          {/* Designer (Center) */}
          <g transform={isMobile ? "translate(125, 390)" : "translate(370, 265)"}>
            <path d="M 0 35 L 110 -5 L 150 15 L 40 55 Z" fill="#0a0a0a" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6" />
            <motion.g animate={{ y: [-5, 5, -5], rotate: [0, 2, -2, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <rect x="20" y="-45" width="22" height="22" fill="#D4AF37" rx="3" opacity="0.7" filter="url(#softGlow)" />
            </motion.g>
            {[...Array(4)].map((_, i) => (
              <motion.circle
                key={i} cx={75 + i * 14} cy={-20} r="5"
                initial={{ y: 0, scale: 1 }}
                fill={["#FFD700", "#D4AF37", "#F59E0B", "#FBBF77"][i]} opacity="0.7" filter="url(#softGlow)"
                animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
            <g transform="translate(30, 0)">
              <path d="M 0 35 L 70 10 L 70 55 L 0 80 Z" fill="#050505" stroke="#D4AF37" strokeWidth="1.2" filter="url(#screenGlowFilter)" />
              <rect x="8" y="42" width="54" height="30" fill="url(#screenGlowGradient)" transform="skewY(-20)" />
            </g>
          </g>

          {/* Reviewer (Right or Bottom) */}
          <g transform={isMobile ? "translate(115, 660)" : "translate(560, 245)"}>
            <path d="M 0 35 L 110 -5 L 150 15 L 40 55 Z" fill="#0a0a0a" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6" />
            <g transform="translate(15, -45)">
              <rect width="100" height="70" rx="2" fill="#050505" stroke="#D4AF37" strokeWidth="1.5" filter="url(#screenGlowFilter)" />
              {dataPoints.map((height, i) => (
                <motion.rect
                  key={i} x={15 + i * 12} width="8" fill="url(#goldGradient)" rx="1"
                  initial={{ height: 15, y: 35 }}
                  animate={{
                    height: [height, dataPoints[(i + 1) % 4] || height, height],
                    y: [50 - height, 50 - (dataPoints[(i + 1) % 4] || height), 50 - height]
                  }}
                  transition={{ duration: 3, repeat: Infinity }} filter="url(#softGlow)"
                />
              ))}
              <motion.path
                initial={{ d: "M 70 25 L 75 20 L 80 28 L 85 18 L 90 22" }}
                d="M 70 25 L 75 20 L 80 28 L 85 18 L 90 22" stroke="#FFD700" strokeWidth="2" fill="none" strokeLinecap="round" filter="url(#softGlow)"
                animate={{ d: ["M 70 25 L 75 20 L 80 28 L 85 18 L 90 22", "M 70 28 L 75 22 L 80 25 L 85 20 L 90 24", "M 70 25 L 75 20 L 80 28 L 85 18 L 90 22"] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </g>
          </g>
        </svg>

        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-gold-electric/60 text-xs font-display uppercase tracking-[0.4em] font-bold">
            More projects coming soon
          </p>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-electric/30 to-transparent mx-auto mt-4" />
        </motion.div>
      </div>
    </div>
  );
};

export default WorkAnimation;






// 'use client';

// import React, { useEffect, useState, useMemo } from 'react';
// import { motion } from 'framer-motion';

// const WorkAnimation = () => {
//   const [hasMounted, setHasMounted] = useState(false);
//   const [dataPoints, setDataPoints] = useState([20, 30, 22, 35, 28]);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);

//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);

//     const dataInterval = setInterval(() => {
//       setDataPoints(prev => prev.map(() => Math.random() * 25 + 15));
//     }, 3000);

//     return () => {
//       window.removeEventListener('resize', checkMobile);
//       clearInterval(dataInterval);
//     };
//   }, []);

//   // Floating particles
//   const particles = useMemo(() => {
//     if (!hasMounted) return [];
//     return [...Array(20)].map(() => ({
//       r: Math.random() * 1.5 + 0.5,
//       x: Math.random() * 1300,
//       y: Math.random() * 600,
//       opacity: Math.random() * 0.25 + 0.1,
//       duration: Math.random() * 12 + 10,
//       delay: Math.random() * 5
//     }));
//   }, [hasMounted]);

//   // Data flow particles
//   const DataFlowParticle = ({ path, delay, duration }: { path: string; delay: number; duration: number }) => (
//     <motion.circle
//       r="2.5"
//       fill="#FFD700"
//       filter="url(#particleGlow)"
//       initial={{ offsetDistance: '0%' }}
//       animate={{ offsetDistance: '100%' }}
//       transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
//       style={{ offsetPath: `path('${path}')` }}
//     />
//   );

//   if (!hasMounted) {
//     return (
//       <div className="w-full flex items-center justify-center py-16 px-4 overflow-hidden">
//         <div className="relative w-full max-w-7xl opacity-0" style={{ aspectRatio: '16/9' }} />
//       </div>
//     );
//   }

//   // Increased View Width for better spacing
//   const viewWidth = isMobile ? 450 : 1300;
//   const viewHeight = isMobile ? 1200 : 550;

//   // Connection paths - connectors
//   const connectionPath1 = isMobile
//     ? "M 225 350 C 300 430 150 490 225 570"
//     : "M 170 320 C 310 260 460 260 600 320";
//   const connectionPath2 = isMobile
//     ? "M 225 750 C 150 830 300 890 225 970"
//     : "M 600 320 C 740 260 890 280 1030 330";

//   // Code lines
//   const codeLines = [
//     { text: "const scene = new THREE.Scene();", color: "#FFD700" },
//     { text: "const camera = new THREE.", color: "#D4AF37" },
//     { text: "  PerspectiveCamera(75);", color: "#B8860B" },
//     { text: "const renderer = new THREE.", color: "#FFD700" },
//     { text: "  WebGLRenderer();", color: "#D4AF37" },
//     { text: "const geometry = new THREE.", color: "#B8860B" },
//     { text: "  BoxGeometry(1, 1, 1);", color: "#FFD700" },
//     { text: "mesh.rotation.x += 0.01;", color: "#D4AF37" },
//     { text: "mesh.rotation.y += 0.01;", color: "#B8860B" },
//     { text: "renderer.render(scene);", color: "#FFD700" },
//   ];

//   const lineHeight = 6;
//   const totalCodeHeight = codeLines.length * lineHeight;

//   return (
//     <div className="w-full flex items-center justify-center py-16 px-4 overflow-hidden">
//       <div className="relative w-full max-w-7xl" style={{ aspectRatio: isMobile ? '9/24' : '21/9' }}>
//         <svg
//           key={isMobile ? 'mobile' : 'desktop'}
//           viewBox={`0 0 ${viewWidth} ${viewHeight}`}
//           className="w-full h-full"
//         >
//           <defs>
//             {/* Gradients */}
//             <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
//               <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
//               <stop offset="100%" stopColor="#B8860B" stopOpacity="0.6" />
//             </linearGradient>

//             <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
//               <stop offset="100%" stopColor="#2979FF" stopOpacity="0.6" />
//             </linearGradient>

//             <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#00C853" stopOpacity="0.8" />
//               <stop offset="100%" stopColor="#64DD17" stopOpacity="0.6" />
//             </linearGradient>

//             <radialGradient id="screenGlow" cx="50%" cy="50%" r="60%">
//               <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
//               <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
//             </radialGradient>

//             <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
//               <stop offset="0%" stopColor="#FFD700" stopOpacity="0.1" />
//               <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.03" />
//               <stop offset="100%" stopColor="#000" stopOpacity="0" />
//             </radialGradient>

//             {/* Filters */}
//             <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
//               <feGaussianBlur stdDeviation="2" result="blur" />
//               <feMerge>
//                 <feMergeNode in="blur" />
//                 <feMergeNode in="SourceGraphic" />
//               </feMerge>
//             </filter>

//             <filter id="particleGlow" x="-200%" y="-200%" width="500%" height="500%">
//               <feGaussianBlur stdDeviation="3" result="blur" />
//               <feMerge>
//                 <feMergeNode in="blur" />
//                 <feMergeNode in="SourceGraphic" />
//               </feMerge>
//             </filter>

//             <clipPath id="canvasClip">
//               <rect x="0" y="0" width="110" height="56" />
//             </clipPath>
//             <clipPath id="screenClip3">
//               <rect x="0" y="0" width="110" height="56" />
//             </clipPath>
//           </defs>

//           {/* Floor Line */}
//           <line
//             x1="0"
//             y1={viewHeight - 30}
//             x2={viewWidth}
//             y2={viewHeight - 30}
//             stroke="#D4AF37"
//             strokeWidth="0.5"
//             opacity="0.2"
//           />

//           {/* Subtle Grid */}
//           <g opacity="0.04">
//             {[...Array(10)].map((_, i) => (
//               <line key={`h-${i}`} x1="0" y1={i * (viewHeight / 10)} x2={viewWidth} y2={i * (viewHeight / 10)} stroke="#D4AF37" strokeWidth="0.5" />
//             ))}
//             {[...Array(20)].map((_, i) => (
//               <line key={`v-${i}`} x1={i * (viewWidth / 20)} y1="0" x2={i * (viewWidth / 20)} y2={viewHeight} stroke="#D4AF37" strokeWidth="0.5" />
//             ))}
//           </g>

//           {/* Central Glow */}
//           <ellipse cx={viewWidth / 2} cy={viewHeight / 2} rx={viewWidth * 0.3} ry={viewHeight * 0.3} fill="url(#ambientGlow)" />

//           {/* Background Particles */}
//           {particles.map((p, i) => (
//             <motion.circle
//               key={i}
//               r={p.r}
//               fill="#D4AF37"
//               initial={{ x: p.x, y: p.y, opacity: p.opacity }}
//               animate={{
//                 y: [p.y, (p.y + 80) % viewHeight, p.y],
//                 opacity: [p.opacity, p.opacity + 0.1, p.opacity]
//               }}
//               transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
//             />
//           ))}

//           {/* Connection Paths with Data Flow */}
//           <g>
//             <motion.path
//               d={connectionPath1}
//               stroke="url(#goldGradient)"
//               strokeWidth="1.5"
//               fill="none"
//               strokeLinecap="round"
//               opacity={0.3}
//               initial={{ pathLength: 0 }}
//               animate={{ pathLength: 1 }}
//               transition={{ duration: 2, ease: "easeOut" }}
//             />
//             {[0, 1, 2].map((i) => (
//               <DataFlowParticle key={`p1-${i}`} path={connectionPath1} delay={i * 1.5} duration={4} />
//             ))}

//             <motion.path
//               d={connectionPath2}
//               stroke="url(#goldGradient)"
//               strokeWidth="1.5"
//               fill="none"
//               strokeLinecap="round"
//               opacity={0.3}
//               initial={{ pathLength: 0 }}
//               animate={{ pathLength: 1 }}
//               transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
//             />
//             {[0, 1, 2].map((i) => (
//               <DataFlowParticle key={`p2-${i}`} path={connectionPath2} delay={i * 1.5 + 0.5} duration={4} />
//             ))}
//           </g>

//           {/* ============================================ */}
//           {/* ===== DEVELOP WORKSTATION (Style 1) ===== */}
//           {/* ============================================ */}
//           <g transform={isMobile ? "translate(125, 150)" : "translate(50, 180)"}>

//             <ellipse cx="120" cy="200" rx="110" ry="25" fill="#000" opacity="0.3" transform="rotate(-5, 120, 200)" />

//             <g transform="skewY(-8) rotate(-5)">
//               {/* Back Legs */}
//               <path d="M 20 110 L 25 110 L 25 160 L 20 160 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 25 110 L 28 111 L 28 161 L 25 160 Z" fill="#151515" stroke="#D4AF37" strokeWidth="0.2" />
//               <path d="M 220 110 L 225 110 L 225 170 L 220 170 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 225 110 L 228 111 L 228 171 L 225 170 Z" fill="#151515" stroke="#D4AF37" strokeWidth="0.2" />
//               {/* Front Legs */}
//               <path d="M 240 188 L 245 188 L 245 240 L 240 240 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 245 188 L 248 189 L 248 241 L 245 240 Z" fill="#151515" stroke="#D4AF37" strokeWidth="0.2" />
//               <path d="M 0 188 L 5 188 L 5 230 L 0 230 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 5 188 L 8 189 L 8 231 L 5 230 Z" fill="#151515" stroke="#D4AF37" strokeWidth="0.2" />

//               <path d="M 10 110 L 230 110 L 240 180 L 0 180 Z" fill="#151515" stroke="#D4AF37" strokeWidth="1" />
//               <path d="M 0 180 L 240 180 L 240 188 L 0 188 Z" fill="#0a0a0a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 240 180 L 230 110 L 230 118 L 240 188 Z" fill="#0f0f0f" stroke="#D4AF37" strokeWidth="0.5" />

//               {/* Monitor */}
//               <path d="M 110 120 L 140 120 L 145 130 L 105 130 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <rect x="122" y="90" width="6" height="30" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="0.5" />
//               <g transform="translate(125, 80) rotate(5)">
//                 <rect x="-60" y="-35" width="120" height="70" rx="2" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="1" />
//                 <rect x="-60" y="-35" width="120" height="4" fill="#252525" stroke="#D4AF37" strokeWidth="0.2" />
//                 <rect x="-55" y="-28" width="110" height="56" fill="#0a0a15" stroke="#D4AF37" strokeWidth="0.5" />
//                 <rect x="-55" y="-28" width="110" height="56" fill="url(#screenGlow)" opacity="0.4" />
//                 <svg x="-55" y="-28" width="110" height="56" viewBox="0 0 110 56" overflow="hidden">
//                   <motion.g
//                     initial={{ y: 0 }}
//                     animate={{ y: -totalCodeHeight }}
//                     transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//                   >
//                     {codeLines.map((line, i) => (
//                       <text key={`c1-${i}`} x={5} y={10 + i * lineHeight} fill={line.color} fontSize="5" fontFamily="monospace" opacity={0.9}>
//                         {line.text}
//                       </text>
//                     ))}
//                     {codeLines.map((line, i) => (
//                       <text key={`c1b-${i}`} x={5} y={10 + totalCodeHeight + i * lineHeight} fill={line.color} fontSize="5" fontFamily="monospace" opacity={0.9}>
//                         {line.text}
//                       </text>
//                     ))}
//                   </motion.g>
//                 </svg>
//               </g>

//               {/* Keyboard (Base Scale) */}
//               <g transform="translate(85, 145) rotate(2)">
//                 <path d="M 0 0 L 80 0 L 85 20 L -5 20 Z" fill="#0d0d0d" stroke="#D4AF37" strokeWidth="0.5" />
//                 {[0, 1, 2].map((row) => (
//                   <g key={row}>
//                     {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
//                       <rect key={`${row}-${col}`} x={2 + col * 9.5} y={2 + row * 5} width="8" height="4" fill="#1a1a1a" rx="1" />
//                     ))}
//                   </g>
//                 ))}
//               </g>

//               {/* Mouse */}
//               <g transform="translate(195, 150) rotate(5)">
//                 <ellipse cx="0" cy="0" rx="10" ry="14" fill="#0d0d0d" stroke="#D4AF37" strokeWidth="0.5" />
//                 <line x1="0" y1="-14" x2="0" y2="0" stroke="#D4AF37" strokeWidth="0.5" />
//                 <rect x="-2" y="-8" width="4" height="6" fill="#1a1a1a" rx="1" />
//               </g>

//               {/* Coffee */}
//               <g transform="translate(220, 140)">
//                 <ellipse cx="0" cy="5" rx="7" ry="3" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="0.5" />
//                 <path d="M -7 5 L -7 18 Q 0 22 7 18 L 7 5" fill="#0d0d0d" stroke="#D4AF37" strokeWidth="0.5" />
//                 <path d="M 7 8 Q 11 8 11 11 Q 11 14 7 14" fill="none" stroke="#D4AF37" strokeWidth="1" />
//                 <motion.path d="M -2 0 Q 0 -5 2 -8" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6"
//                   animate={{ y: [0, -5, 0], opacity: [0, 0.6, 0] }} transition={{ duration: 2, repeat: Infinity }} />
//               </g>
//             </g>

//             <motion.text x="120" y="260" fill="#D4AF37" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="3"
//               animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}>
//               DEVELOP
//             </motion.text>
//           </g>

//           {/* ============================================ */}
//           {/* ===== DESIGN WORKSTATION (Style 2) ===== */}
//           {/* ============================================ */}
//           <g transform={isMobile ? "translate(125, 530)" : "translate(480, 180)"}>
//             <ellipse cx="120" cy="200" rx="110" ry="25" fill="#000" opacity="0.3" transform="rotate(-5, 120, 200)" />

//             <g transform="skewY(-8) rotate(-5)">
//               {/* Legs & Desk */}
//               <path d="M 20 110 L 25 110 L 25 160 L 20 160 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 25 110 L 28 111 L 28 161 L 25 160 Z" fill="#151515" stroke="#D4AF37" strokeWidth="0.2" />
//               <path d="M 220 110 L 225 110 L 225 170 L 220 170 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 225 110 L 228 111 L 228 171 L 225 170 Z" fill="#151515" stroke="#D4AF37" strokeWidth="0.2" />
//               <path d="M 240 188 L 245 188 L 245 240 L 240 240 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 245 188 L 248 189 L 248 241 L 245 240 Z" fill="#151515" stroke="#D4AF37" strokeWidth="0.2" />
//               <path d="M 0 188 L 5 188 L 5 230 L 0 230 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 5 188 L 8 189 L 8 231 L 5 230 Z" fill="#151515" stroke="#D4AF37" strokeWidth="0.2" />

//               <path d="M 10 110 L 230 110 L 240 180 L 0 180 Z" fill="#1c1c1c" stroke="#D4AF37" strokeWidth="1" />
//               <path d="M 0 180 L 240 180 L 240 188 L 0 188 Z" fill="#0f0f0f" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 240 180 L 230 110 L 230 118 L 240 188 Z" fill="#141414" stroke="#D4AF37" strokeWidth="0.5" />

//               {/* Monitor */}
//               <path d="M 110 120 L 140 120 L 145 130 L 105 130 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <rect x="122" y="90" width="6" height="30" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="0.5" />
//               <g transform="translate(125, 80) rotate(5)">
//                 <rect x="-60" y="-35" width="120" height="70" rx="2" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="1" />
//                 <rect x="-60" y="-35" width="120" height="4" fill="#252525" stroke="#D4AF37" strokeWidth="0.2" />
//                 <rect x="-55" y="-28" width="110" height="56" fill="#0a0a15" stroke="#D4AF37" strokeWidth="0.5" />
//                 <rect x="-55" y="-28" width="110" height="56" fill="url(#screenGlow)" opacity="0.4" />
//                 <svg x="-55" y="-28" width="110" height="56" viewBox="0 0 110 56" overflow="hidden">
//                   <rect x="0" y="0" width="110" height="8" fill="#151515" />
//                   <circle cx="5" cy="4" r="1.5" fill="#FF5252" />
//                   <circle cx="9" cy="4" r="1.5" fill="#FFD740" />
//                   <circle cx="13" cy="4" r="1.5" fill="#69F0AE" />
//                   <rect x="25" y="2" width="60" height="4" rx="1" fill="#2a2a2a" />
//                   <rect x="0" y="8" width="10" height="48" fill="#101010" />
//                   {[0, 1, 2, 3].map(i => <rect key={i} x="2" y={10 + i * 6} width="6" height="4" rx="1" fill="#333" />)}
//                   <rect x="95" y="8" width="15" height="48" fill="#101010" />
//                   {[0, 1, 2, 3, 4].map(i => <line key={i} x1="97" y1={12 + i * 5} x2="108" y2={12 + i * 5} stroke="#333" strokeWidth="1" />)}
//                   <g clipPath="url(#canvasClip)">
//                     <rect x="15" y="12" width="75" height="30" fill="#050505" />
//                     <rect x="55" y="15" width="30" height="24" fill="#1a1a1a" rx="2" />
//                     <circle cx="70" cy="27" r="5" fill="#333" />
//                     <rect x="20" y="18" width="30" height="3" fill="#666" />
//                     <rect x="20" y="24" width="20" height="2" fill="#444" />
//                     <rect x="20" y="28" width="25" height="2" fill="#444" />
//                     <motion.rect x="20" y="34" width="15" height="5" rx="1" fill="#D4AF37"
//                       animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
//                   </g>
//                 </svg>
//               </g>

//               {/* Keyboard (Scaled Up 1.2x, No Rotate) */}
//               <g transform="translate(85, 145) scale(1.2)">
//                 <path d="M 0 0 L 80 0 L 85 20 L -5 20 Z" fill="#0d0d0d" stroke="#D4AF37" strokeWidth="0.5" />
//                 {[0, 1, 2].map((row) => (
//                   <g key={row}>
//                     {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
//                       <rect key={`${row}-${col}`} x={2 + col * 9.5} y={2 + row * 5} width="8" height="4" fill="#1a1a1a" rx="1" />
//                     ))}
//                   </g>
//                 ))}
//               </g>

//               {/* Mouse (Standard) */}
//               <g transform="translate(195, 150) rotate(5)">
//                 <ellipse cx="0" cy="0" rx="10" ry="14" fill="#0d0d0d" stroke="#D4AF37" strokeWidth="0.5" />
//                 <line x1="0" y1="-14" x2="0" y2="0" stroke="#D4AF37" strokeWidth="0.5" />
//                 <rect x="-2" y="-8" width="4" height="6" fill="#1a1a1a" rx="1" />
//               </g>

//               {/* Plant - Moved In & Scaled Up 1.8x */}
//               <g transform="translate(190, 125) scale(1.8)">
//                 <path d="M -4 10 L -3 3 L 3 3 L 4 10 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.4" />
//                 <ellipse cx="0" cy="3" rx="4" ry="2" fill="#1a4a1a" opacity="0.8" />
//                 <path d="M 0 2 Q -3 -2 -1 -5" stroke="#2a6a2a" strokeWidth="1" fill="none" />
//                 <path d="M 0 2 Q 2 -1 4 -4" stroke="#2a6a2a" strokeWidth="1" fill="none" />
//                 <path d="M 0 1 Q 0 -3 1 -6" stroke="#2a6a2a" strokeWidth="1" fill="none" />
//               </g>
//             </g>

//             <motion.text x="120" y="260" fill="#D4AF37" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="3"
//               animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
//               DESIGN
//             </motion.text>
//           </g>

//           {/* ============================================ */}
//           {/* ===== DELIVER WORKSTATION (Style 3) ===== */}
//           {/* ============================================ */}
//           <g transform={isMobile ? "translate(125, 910)" : "translate(910, 180)"}>
//             <ellipse cx="120" cy="200" rx="110" ry="25" fill="#000" opacity="0.3" transform="rotate(-5, 120, 200)" />

//             <g transform="skewY(-8) rotate(-5)">
//               {/* Legs & Desk */}
//               <path d="M 20 110 L 25 110 L 25 160 L 20 160 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 25 110 L 28 111 L 28 161 L 25 160 Z" fill="#151515" stroke="#D4AF37" strokeWidth="0.2" />
//               <path d="M 220 110 L 225 110 L 225 170 L 220 170 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 225 110 L 228 111 L 228 171 L 225 170 Z" fill="#151515" stroke="#D4AF37" strokeWidth="0.2" />
//               <path d="M 240 188 L 245 188 L 245 240 L 240 240 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 245 188 L 248 189 L 248 241 L 245 240 Z" fill="#151515" stroke="#D4AF37" strokeWidth="0.2" />
//               <path d="M 0 188 L 5 188 L 5 230 L 0 230 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 5 188 L 8 189 L 8 231 L 5 230 Z" fill="#151515" stroke="#D4AF37" strokeWidth="0.2" />

//               <path d="M 10 110 L 230 110 L 240 180 L 0 180 Z" fill="#181818" stroke="#D4AF37" strokeWidth="1" />
//               <path d="M 0 180 L 240 180 L 240 188 L 0 188 Z" fill="#0c0c0c" stroke="#D4AF37" strokeWidth="0.5" />
//               <path d="M 240 180 L 230 110 L 230 118 L 240 188 Z" fill="#101010" stroke="#D4AF37" strokeWidth="0.5" />

//               {/* Monitor */}
//               <path d="M 110 120 L 140 120 L 145 130 L 105 130 Z" fill="#2a2a2a" stroke="#D4AF37" strokeWidth="0.5" />
//               <rect x="122" y="90" width="6" height="30" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="0.5" />
//               <g transform="translate(125, 80) rotate(5)">
//                 <rect x="-60" y="-35" width="120" height="70" rx="2" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="1" />
//                 <rect x="-60" y="-35" width="120" height="4" fill="#252525" stroke="#D4AF37" strokeWidth="0.2" />
//                 <rect x="-55" y="-28" width="110" height="56" fill="#0a0a15" stroke="#D4AF37" strokeWidth="0.5" />
//                 <rect x="-55" y="-28" width="110" height="56" fill="url(#screenGlow)" opacity="0.4" />
//                 <svg x="-55" y="-28" width="110" height="56" viewBox="0 0 110 56" overflow="hidden">
//                   <rect x="0" y="0" width="110" height="10" fill="#102010" />
//                   <text x="5" y="7" fontSize="5" fill="#4ade80" fontFamily="monospace">SYSTEM NOMINAL</text>
//                   <text x="80" y="7" fontSize="5" fill="#4ade80" fontFamily="monospace">UP 99.9%</text>
//                   <g transform="translate(5, 15)">
//                     <rect x="0" y="0" width="20" height="15" fill="#0d1f0d" stroke="#254525" strokeWidth="0.5" />
//                     <text x="3" y="10" fontSize="4" fill="#4ade80">BUILD</text>
//                     <circle cx="17" cy="4" r="1" fill="#4ade80" />
//                     <line x1="20" y1="7" x2="25" y2="7" stroke="#4ade80" strokeWidth="0.5" strokeDasharray="1 1" />
//                     <rect x="25" y="0" width="20" height="15" fill="#0d1f0d" stroke="#254525" strokeWidth="0.5" />
//                     <text x="28" y="10" fontSize="4" fill="#4ade80">TEST</text>
//                     <circle cx="42" cy="4" r="1" fill="#4ade80" />
//                     <line x1="45" y1="7" x2="50" y2="7" stroke="#4ade80" strokeWidth="0.5" strokeDasharray="1 1" />
//                     <rect x="50" y="0" width="20" height="15" fill="#0d1f0d" stroke="#254525" strokeWidth="0.5" />
//                     <text x="52" y="10" fontSize="4" fill="#4ade80">PROD</text>
//                     <motion.circle cx="67" cy="4" r="1" fill="#4ade80"
//                       animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
//                   </g>
//                   <g transform="translate(80, 15)">
//                     <rect x="0" y="0" width="25" height="35" fill="#050505" stroke="#222" strokeWidth="0.5" />
//                     {[0, 1, 2, 3, 4, 5].map(i => (
//                       <rect key={i} x="2" y={3 + i * 5} width="21" height="3" fill={i % 2 === 0 ? "#1a3a1a" : "#222"} rx="1" />
//                     ))}
//                   </g>
//                   <path d="M 5,45 L 75,45" stroke="#222" strokeWidth="1" />
//                   <polyline points="5,45 15,40 25,42 35,35 45,38 55,30 65,32 75,25" fill="none" stroke="#4ade80" strokeWidth="0.5" />
//                 </svg>
//               </g>

//               {/* Keyboard (Scaled Up 1.2x, No Rotate) */}
//               <g transform="translate(85, 145) scale(1.2)">
//                 <path d="M 0 0 L 80 0 L 85 20 L -5 20 Z" fill="#0d0d0d" stroke="#D4AF37" strokeWidth="0.5" />
//                 {[0, 1, 2].map((row) => (
//                   <g key={row}>
//                     {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
//                       <rect key={`${row}-${col}`} x={2 + col * 9.5} y={2 + row * 5} width="8" height="4" fill="#1a1a1a" rx="1" />
//                     ))}
//                   </g>
//                 ))}
//               </g>

//               {/* Mouse (Standard) - Moved Left */}
//               <g transform="translate(185, 150) rotate(5)">
//                 <ellipse cx="0" cy="0" rx="10" ry="14" fill="#0d0d0d" stroke="#D4AF37" strokeWidth="0.5" />
//                 <line x1="0" y1="-14" x2="0" y2="0" stroke="#D4AF37" strokeWidth="0.5" />
//                 <rect x="-2" y="-8" width="4" height="6" fill="#1a1a1a" rx="1" />
//               </g>

//               {/* Headphones - Moved Back/Right & Scaled */}
//               <g transform="translate(225, 125) rotate(10) scale(1.5)">
//                 <path d="M -8 0 Q -10 -8 0 -10 Q 10 -8 8 0" stroke="#D4AF37" strokeWidth="2" fill="none" />
//                 <ellipse cx="-8" cy="2" rx="3" ry="4" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="0.5" />
//                 <ellipse cx="8" cy="2" rx="3" ry="4" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="0.5" />
//               </g>

//             </g>

//             <motion.text x="120" y="260" fill="#D4AF37" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="3"
//               animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }}>
//               DELIVER
//             </motion.text>
//           </g>

//           {/* Subtle floating symbols */}
//           {[
//             { symbol: '</>', x: 25, y: 60 },
//             { symbol: '{ }', x: isMobile ? 400 : 860, y: 80 },
//           ].map((s, i) => (
//             <motion.text key={i} x={s.x} y={s.y} fill="#D4AF37" fontSize="12" fontFamily="monospace" opacity={0.12}
//               animate={{ y: [s.y, s.y - 8, s.y], opacity: [0.08, 0.18, 0.08] }}
//               transition={{ duration: 10, repeat: Infinity, delay: i * 3 }}>
//               {s.symbol}
//             </motion.text>
//           ))}
//         </svg>

//         {/* Bottom Text */}
//         <motion.div
//           className="absolute bottom-8 left-0 right-0 text-center"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.5, duration: 1 }}
//         >
//           <p className="text-gold-electric/60 text-sm font-display uppercase tracking-[0.4em] font-bold">
//             More projects coming soon
//           </p>
//           <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-gold-electric/40 to-transparent mx-auto mt-4" />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default WorkAnimation;