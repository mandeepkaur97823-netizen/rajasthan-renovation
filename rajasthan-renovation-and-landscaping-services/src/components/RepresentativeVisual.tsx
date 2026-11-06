import React from 'react';

interface VisualProps {
  type: 'hero' | 'lawn' | 'design' | 'tilling' | 'fencing' | 'renovation' | 'tiles' | 'contact';
  className?: string;
  badge?: string;
}

export const RepresentativeVisual: React.FC<VisualProps> = ({ type, className = '', badge }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#142618] shadow-md border border-[#23422a]/40 ${className}`}>
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#1e4526] via-[#122316] to-[#0c180f] opacity-90" />

      {/* Domain Scene Graphics */}
      {type === 'hero' && (
        <svg
          viewBox="0 0 800 500"
          className="relative w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Representative visual of lush manicured lawn, modern garden bed, and clean outdoor perimeter"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a7c59" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1e3e26" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="grassGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#70b431" />
              <stop offset="100%" stopColor="#2e6322" />
            </linearGradient>
            <linearGradient id="grassGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5ea024" />
              <stop offset="100%" stopColor="#234c1b" />
            </linearGradient>
            <linearGradient id="fenceWood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7a5533" />
              <stop offset="100%" stopColor="#472e18" />
            </linearGradient>
            <pattern id="lawnStripes" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="20" height="40" fill="#2d6124" fillOpacity="0.5" />
              <rect x="20" width="20" height="40" fill="#3e7a32" fillOpacity="0.5" />
            </pattern>
          </defs>

          {/* Distant background garden foliage */}
          <rect width="800" height="500" fill="url(#skyGrad)" />
          
          {/* Subtle sun glow */}
          <circle cx="680" cy="120" r="140" fill="#a4d468" fillOpacity="0.15" />

          {/* Modern fence backdrop */}
          <g opacity="0.85">
            <rect x="0" y="160" width="800" height="8" fill="#5c3f25" />
            <rect x="0" y="180" width="800" height="8" fill="#5c3f25" />
            <rect x="0" y="200" width="800" height="8" fill="#5c3f25" />
            <rect x="0" y="220" width="800" height="8" fill="#5c3f25" />
            <rect x="120" y="145" width="16" height="110" fill="#442a17" rx="2" />
            <rect x="280" y="145" width="16" height="110" fill="#442a17" rx="2" />
            <rect x="440" y="145" width="16" height="110" fill="#442a17" rx="2" />
            <rect x="600" y="145" width="16" height="110" fill="#442a17" rx="2" />
            <rect x="760" y="145" width="16" height="110" fill="#442a17" rx="2" />
          </g>

          {/* Garden bed & decorative shrubs */}
          <ellipse cx="650" cy="280" rx="220" ry="80" fill="#261b11" />
          <path d="M520,270 Q560,200 620,240 Q680,180 730,250 Q780,210 820,280 L520,280 Z" fill="#2c5c2d" />
          <path d="M550,270 Q600,190 640,240 Q670,170 710,250 L550,270 Z" fill="#427838" />
          <circle cx="610" cy="225" r="30" fill="#70b431" fillOpacity="0.7" />
          <circle cx="680" cy="210" r="36" fill="#88c946" fillOpacity="0.8" />
          <circle cx="730" cy="235" r="26" fill="#53962d" fillOpacity="0.9" />

          {/* Stepping stone pavers */}
          <path d="M 120 420 Q 240 370 420 340 L 460 380 Q 260 410 140 480 Z" fill="#697268" opacity="0.3" />
          <rect x="150" y="410" width="70" height="35" rx="6" fill="#889284" />
          <rect x="240" y="375" width="65" height="32" rx="6" fill="#99a395" />
          <rect x="325" y="345" width="60" height="28" rx="6" fill="#7a8476" />
          <rect x="400" y="322" width="55" height="25" rx="6" fill="#8e988a" />

          {/* Lush Green Lawn with fresh mowing stripes */}
          <path d="M0,240 Q250,250 500,260 L800,280 L800,500 L0,500 Z" fill="url(#grassGrad1)" />
          <path d="M0,270 L800,290 L800,500 L0,500 Z" fill="url(#lawnStripes)" />
          <path d="M0,330 Q400,310 800,340 L800,500 L0,500 Z" fill="url(#grassGrad2)" opacity="0.5" />

          {/* Crisp trimmed lawn edge */}
          <path d="M 0 460 Q 400 440 800 460" stroke="#8de042" strokeWidth="3" strokeDasharray="6 3" opacity="0.6" fill="none" />
          
          {/* Subtle botanical silhouettes */}
          <g transform="translate(40, 200) scale(0.7)" fill="#1c3b22">
            <path d="M20,100 Q10,50 30,10 Q50,60 30,100 Z" />
            <path d="M50,110 Q60,40 85,20 Q80,70 60,110 Z" fill="#2d5734" />
            <path d="M35,115 Q30,65 5,40 Q20,75 35,115 Z" fill="#40774a" />
          </g>
        </svg>
      )}

      {type === 'lawn' && (
        <svg
          viewBox="0 0 600 400"
          className="relative w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Representative visual of lawn mowing and perimeter trimming"
        >
          <defs>
            <linearGradient id="lawnG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e4020" />
              <stop offset="100%" stopColor="#0d210f" />
            </linearGradient>
            <pattern id="mowStripe" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <rect width="15" height="30" fill="#3c7929" fillOpacity="0.4" />
              <rect x="15" width="15" height="30" fill="#275618" fillOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="600" height="400" fill="url(#lawnG)" />
          <rect y="120" width="600" height="280" fill="#2a5820" />
          <rect y="120" width="600" height="280" fill="url(#mowStripe)" />

          {/* Edge trimmer line & freshly groomed lawn contour */}
          <path d="M0,130 C180,120 420,140 600,125" stroke="#70b431" strokeWidth="5" fill="none" />
          <path d="M0,120 L600,115 L600,0 L0,0 Z" fill="#1b2a1a" />
          
          {/* Concrete border line */}
          <polygon points="0,95 600,90 600,115 0,120" fill="#758276" />
          <line x1="0" y1="95" x2="600" y2="90" stroke="#96a397" strokeWidth="2" />

          {/* Lawn mower geometric icon representation */}
          <g transform="translate(380, 180) scale(0.9)" opacity="0.95">
            <rect x="20" y="40" width="90" height="50" rx="8" fill="#70b431" />
            <rect x="80" y="25" width="25" height="40" rx="4" fill="#1f2420" />
            <circle cx="35" cy="95" r="18" fill="#111" stroke="#444" strokeWidth="4" />
            <circle cx="95" cy="95" r="18" fill="#111" stroke="#444" strokeWidth="4" />
            <line x1="20" y1="55" x2="-20" y2="-10" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
            <line x1="-30" y1="-10" x2="-10" y2="-10" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* Clean grass blades */}
          <g stroke="#8de042" strokeWidth="2" strokeLinecap="round">
            <line x1="120" y1="320" x2="115" y2="285" />
            <line x1="130" y1="320" x2="135" y2="280" />
            <line x1="240" y1="340" x2="235" y2="300" />
            <line x1="250" y1="340" x2="255" y2="295" />
          </g>
        </svg>
      )}

      {type === 'design' && (
        <svg
          viewBox="0 0 600 400"
          className="relative w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Representative visual of landscape design layout with garden beds and pavers"
        >
          <rect width="600" height="400" fill="#132417" />
          {/* Architectural landscape blueprint lines */}
          <g stroke="#2d5736" strokeWidth="1" strokeDasharray="4 4" opacity="0.4">
            <line x1="50" y1="0" x2="50" y2="400" />
            <line x1="150" y1="0" x2="150" y2="400" />
            <line x1="250" y1="0" x2="250" y2="400" />
            <line x1="350" y1="0" x2="350" y2="400" />
            <line x1="450" y1="0" x2="450" y2="400" />
            <line x1="550" y1="0" x2="550" y2="400" />
            <line x1="0" y1="100" x2="600" y2="100" />
            <line x1="0" y1="200" x2="600" y2="200" />
            <line x1="0" y1="300" x2="600" y2="300" />
          </g>

          {/* Tiered garden beds */}
          <path d="M 50 350 C 200 280 400 370 550 290 L 550 400 L 50 400 Z" fill="#20150b" />
          <path d="M 50 350 C 200 280 400 370 550 290" stroke="#70b431" strokeWidth="3" fill="none" />

          {/* Stepping stone pavers */}
          <g fill="#8c978b" stroke="#5d675c" strokeWidth="2">
            <rect x="80" y="160" width="70" height="40" rx="8" transform="rotate(-5 80 160)" />
            <rect x="180" y="145" width="70" height="40" rx="8" transform="rotate(3 180 145)" />
            <rect x="280" y="135" width="70" height="40" rx="8" transform="rotate(-2 280 135)" />
            <rect x="380" y="130" width="70" height="40" rx="8" transform="rotate(4 380 130)" />
            <rect x="480" y="125" width="70" height="40" rx="8" transform="rotate(-3 480 125)" />
          </g>

          {/* Structural plant spheres */}
          <circle cx="150" cy="270" r="45" fill="#3c7929" />
          <circle cx="150" cy="270" r="32" fill="#589e3c" />
          <circle cx="360" cy="280" r="55" fill="#2d6124" />
          <circle cx="360" cy="280" r="40" fill="#4d923a" />
          <circle cx="470" cy="250" r="38" fill="#70b431" />
        </svg>
      )}

      {type === 'tilling' && (
        <svg
          viewBox="0 0 600 400"
          className="relative w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Representative visual of site ground preparation and surface leveling"
        >
          <rect width="600" height="400" fill="#152618" />
          
          {/* Ground plane */}
          <rect y="170" width="600" height="230" fill="#2a1d13" />
          
          {/* Level graded surface lines */}
          <g stroke="#3d2a1b" strokeWidth="6" strokeLinecap="round">
            <line x1="20" y1="210" x2="580" y2="210" />
            <line x1="10" y1="250" x2="590" y2="250" />
            <line x1="20" y1="290" x2="580" y2="290" />
            <line x1="10" y1="330" x2="590" y2="330" />
            <line x1="20" y1="370" x2="580" y2="370" />
          </g>
          
          {/* Leveling spirit level / grading marker */}
          <g transform="translate(210, 160)" stroke="#70b431" strokeWidth="2" fill="none">
            <rect x="0" y="45" width="180" height="30" rx="6" fill="#1b3b22" stroke="#70b431" strokeWidth="2" />
            <line x1="30" y1="60" x2="150" y2="60" stroke="#8de042" strokeWidth="3" strokeLinecap="round" />
            <circle cx="90" cy="60" r="8" fill="#8de042" stroke="none" />
            <circle cx="90" cy="60" r="4" fill="#1b3b22" stroke="none" />
          </g>

          <text x="30" y="80" fill="#84cc16" fontSize="13" fontWeight="600" letterSpacing="1">
            GROUND PREPARATION &amp; PRECISION LEVELING
          </text>
        </svg>
      )}

      {type === 'fencing' && (
        <svg
          viewBox="0 0 600 400"
          className="relative w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Representative visual of sturdy outdoor boundary fencing"
        >
          <rect width="600" height="400" fill="#122416" />

          {/* Prepared ground base */}
          <rect y="290" width="600" height="110" fill="#1f3d1e" />

          {/* Horizontal slat timber / colorbond style fence */}
          <g fill="#4e331c" stroke="#2c1a0c" strokeWidth="1.5">
            <rect x="0" y="70" width="600" height="20" rx="2" />
            <rect x="0" y="100" width="600" height="20" rx="2" />
            <rect x="0" y="130" width="600" height="20" rx="2" />
            <rect x="0" y="160" width="600" height="20" rx="2" />
            <rect x="0" y="190" width="600" height="20" rx="2" />
            <rect x="0" y="220" width="600" height="20" rx="2" />
            <rect x="0" y="250" width="600" height="20" rx="2" />
          </g>

          {/* Sturdy upright fence posts */}
          <g fill="#2e1d0f">
            <rect x="60" y="50" width="22" height="250" rx="3" />
            <rect x="220" y="50" width="22" height="250" rx="3" />
            <rect x="380" y="50" width="22" height="250" rx="3" />
            <rect x="540" y="50" width="22" height="250" rx="3" />
          </g>

          {/* Concrete footings */}
          <rect x="50" y="290" width="42" height="40" rx="4" fill="#64748b" opacity="0.6" />
          <rect x="210" y="290" width="42" height="40" rx="4" fill="#64748b" opacity="0.6" />
          <rect x="370" y="290" width="42" height="40" rx="4" fill="#64748b" opacity="0.6" />

          {/* Grass edge tufts along fence base */}
          <path d="M 0 300 Q 150 290 300 300 T 600 300" stroke="#70b431" strokeWidth="4" fill="none" />
        </svg>
      )}

      {type === 'renovation' && (
        <svg
          viewBox="0 0 600 400"
          className="relative w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Representative visual of outdoor renovation and surface work"
        >
          <rect width="600" height="400" fill="#142618" />
          
          {/* Surface refurbishment & geometric pavers */}
          <g transform="translate(40, 60)">
            <rect x="0" y="0" width="140" height="100" rx="6" fill="#334155" stroke="#475569" strokeWidth="2" />
            <rect x="160" y="0" width="140" height="100" rx="6" fill="#3b4b5e" stroke="#475569" strokeWidth="2" />
            <rect x="320" y="0" width="160" height="100" rx="6" fill="#2d3b4a" stroke="#475569" strokeWidth="2" />

            <rect x="0" y="120" width="200" height="110" rx="6" fill="#3b4b5e" stroke="#475569" strokeWidth="2" />
            <rect x="220" y="120" width="260" height="110" rx="6" fill="#70b431" fillOpacity="0.25" stroke="#70b431" strokeWidth="2" />
          </g>

          {/* Spirit level / alignment ruler */}
          <g transform="translate(180, 290)">
            <rect x="0" y="0" width="240" height="30" rx="4" fill="#d97706" />
            <circle cx="120" cy="15" r="8" fill="#fef08a" />
            <circle cx="120" cy="15" r="4" fill="#65a30d" />
            <line x1="110" y1="5" x2="110" y2="25" stroke="#78350f" strokeWidth="2" />
            <line x1="130" y1="5" x2="130" y2="25" stroke="#78350f" strokeWidth="2" />
          </g>
        </svg>
      )}

      {type === 'tiles' && (
        <svg
          viewBox="0 0 600 400"
          className="relative w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Representative tiling graphic"
        >
          <rect width="600" height="400" fill="#1e293b" />
          <defs>
            <pattern id="tileGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="58" height="58" fill="#334155" stroke="#475569" strokeWidth="2" rx="2" />
            </pattern>
          </defs>
          <rect width="600" height="400" fill="url(#tileGrid)" />
          {/* Accent tiles */}
          <rect x="180" y="120" width="58" height="58" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" rx="2" />
          <rect x="240" y="120" width="58" height="58" fill="#10b981" fillOpacity="0.6" stroke="#10b981" strokeWidth="2" rx="2" />
          <rect x="300" y="120" width="58" height="58" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" rx="2" />
        </svg>
      )}

      {type === 'contact' && (
        <svg
          viewBox="0 0 600 400"
          className="relative w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Direct consultation graphic"
        >
          <rect width="600" height="400" fill="#0f1f12" />
          <circle cx="300" cy="200" r="160" fill="#1b3b22" />
          <circle cx="300" cy="200" r="110" fill="#244d2b" />
          <circle cx="300" cy="200" r="60" fill="#70b431" fillOpacity="0.2" />
          
          {/* Phone handset emblem */}
          <path
            d="M270,165 C266,165 262,168 260,172 C255,182 254,196 264,212 C275,229 292,238 304,240 C308,241 312,238 315,234 L323,222 C325,219 324,215 321,213 L306,204 C304,203 301,203 299,205 L292,212 C285,208 279,201 275,193 L281,186 C283,184 284,181 282,179 L276,167 C275,165 272,164 270,165 Z"
            fill="#8de042"
          />
        </svg>
      )}

      {/* Representative Graphic Badge (Transparency Discipline) */}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0b160e]/85 backdrop-blur-xs border border-white/10 text-[11px] font-medium text-slate-300">
        <span className="w-1.5 h-1.5 rounded-full bg-[#70b431]" />
        <span>{badge || "Representative Visual"}</span>
      </div>
    </div>
  );
};
