import React from 'react';
import { MascotType, TimerMode } from '../types';

interface MascotProps {
  type: MascotType;
  mode: TimerMode;
  progress: number; // 0 to 1 (0 = just started, 1 = completed)
  isCompleted?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

interface SkinConfig {
  name: string;
  bodyColor: string;
  bodyGradient: string;
  shadowColor: string;
  leafColor: string;
  leafHighlight: string;
  blushColor: string;
  accentDetail?: string;
}

export const MASCOT_SKINS: Record<MascotType, SkinConfig> = {
  tomato: {
    name: 'Klassik Pomidor',
    bodyColor: '#F05A50',
    bodyGradient: 'radial-gradient(circle at 35% 30%, #FF7B72 0%, #F05A50 55%, #D63E34 100%)',
    shadowColor: '#C43026',
    leafColor: '#4E8752',
    leafHighlight: '#74B278',
    blushColor: '#FFAAA6',
  },
  strawberry: {
    name: 'Qulupnayvoy',
    bodyColor: '#E84855',
    bodyGradient: 'radial-gradient(circle at 35% 30%, #FF6B78 0%, #E84855 60%, #B82E3A 100%)',
    shadowColor: '#A82531',
    leafColor: '#3E885B',
    leafHighlight: '#5EB880',
    blushColor: '#FFB3BA',
    accentDetail: 'seeds',
  },
  cherry: {
    name: 'Gilosvoy',
    bodyColor: '#C81D35',
    bodyGradient: 'radial-gradient(circle at 35% 30%, #E63952 0%, #C81D35 60%, #941023 100%)',
    shadowColor: '#7E0B1B',
    leafColor: '#489B62',
    leafHighlight: '#68C385',
    blushColor: '#FF94A2',
    accentDetail: 'gloss',
  },
  peach: {
    name: 'Shaftolivoy',
    bodyColor: '#F4A261',
    bodyGradient: 'radial-gradient(circle at 35% 30%, #FFC38B 0%, #F4A261 60%, #DE7B35 100%)',
    shadowColor: '#C8621D',
    leafColor: '#588157',
    leafHighlight: '#7DAA7B',
    blushColor: '#F28482',
    accentDetail: 'cleft',
  },
  green_tomato: {
    name: 'Yashil Pomidor',
    bodyColor: '#7CB342',
    bodyGradient: 'radial-gradient(circle at 35% 30%, #9CCC65 0%, #7CB342 60%, #558B2F 100%)',
    shadowColor: '#457223',
    leafColor: '#2E7D32',
    leafHighlight: '#4CAF50',
    blushColor: '#C5E1A5',
  },
};

export const Mascot: React.FC<MascotProps> = ({
  type = 'tomato',
  mode = 'focus',
  progress = 0,
  isCompleted = false,
  size = 'lg',
}) => {
  const skin = MASCOT_SKINS[type] || MASCOT_SKINS.tomato;

  // Calculate stair position: 5 steps total (0, 1, 2, 3, 4)
  // 0.0 -> Step 0, 1.0 -> Step 4
  const stepIndex = isCompleted
    ? 4
    : Math.min(4, Math.floor(Math.max(0, Math.min(1, progress)) * 5));

  // Clock rotation: 0% -> 0deg, 100% -> 360deg
  const clockAngle = (Math.max(0, Math.min(1, progress)) * 360) % 360;

  // Stair coordinates for the mascot (offset in SVG units)
  // Step 0: x=60, y=140
  // Step 1: x=90, y=115
  // Step 2: x=120, y=90
  // Step 3: x=150, y=65
  // Step 4: x=180, y=40 (top of the stairs next to golden star)
  const stairPositions = [
    { x: 55, y: 135 },
    { x: 88, y: 110 },
    { x: 122, y: 85 },
    { x: 156, y: 60 },
    { x: 190, y: 35 },
  ];

  const currentPos = stairPositions[stepIndex];

  // Resting position for break mode (cozy sit at bottom right of staircase with cushion)
  const isBreak = mode === 'short_break' || mode === 'long_break';
  const mascotX = isBreak ? 130 : currentPos.x;
  const mascotY = isBreak ? 140 : currentPos.y;

  return (
    <div
      className={`relative select-none flex flex-col items-center justify-center transition-all ${
        size === 'sm' ? 'w-40 h-36' : size === 'md' ? 'w-64 h-56' : 'w-80 sm:w-96 h-72 sm:h-80'
      }`}
      aria-label={`${skin.name} mascot`}
    >
      <svg
        viewBox="0 0 320 250"
        className="w-full h-full drop-shadow-sm overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="stairWoodGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF1E6" />
            <stop offset="100%" stopColor="#F5DFCE" />
          </linearGradient>
          <linearGradient id="stairBorderGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E6C4AA" />
            <stop offset="100%" stopColor="#D9B294" />
          </linearGradient>
        </defs>

        {/* --- STAGE BACKGROUND & FLOATING DECORATIONS --- */}
        {/* Soft shadow base under whole scene */}
        <ellipse cx="160" cy="232" rx="130" ry="12" fill="#F4EAE0" opacity="0.8" />

        {/* --- TINY STAIRCASE (5 STEPS) --- */}
        <g id="staircase" className="transition-all duration-300">
          {/* Step 1 */}
          <path
            d="M 30 220 L 75 220 L 75 200 L 30 200 Z"
            fill="url(#stairWoodGrad)"
            stroke="url(#stairBorderGrad)"
            strokeWidth="1.5"
            rx="3"
          />
          {/* Step 2 */}
          <path
            d="M 65 195 L 110 195 L 110 175 L 65 175 Z"
            fill="url(#stairWoodGrad)"
            stroke="url(#stairBorderGrad)"
            strokeWidth="1.5"
            rx="3"
          />
          {/* Step 3 */}
          <path
            d="M 100 170 L 145 170 L 145 150 L 100 150 Z"
            fill="url(#stairWoodGrad)"
            stroke="url(#stairBorderGrad)"
            strokeWidth="1.5"
            rx="3"
          />
          {/* Step 4 */}
          <path
            d="M 135 145 L 180 145 L 180 125 L 135 125 Z"
            fill="url(#stairWoodGrad)"
            stroke="url(#stairBorderGrad)"
            strokeWidth="1.5"
            rx="3"
          />
          {/* Step 5 (Top platform) */}
          <path
            d="M 170 120 L 225 120 L 225 100 L 170 100 Z"
            fill="url(#stairWoodGrad)"
            stroke="url(#stairBorderGrad)"
            strokeWidth="1.5"
            rx="4"
          />

          {/* Step level markers - cute little dots */}
          {[
            { cx: 52, cy: 210, active: stepIndex >= 0 },
            { cx: 87, cy: 185, active: stepIndex >= 1 },
            { cx: 122, cy: 160, active: stepIndex >= 2 },
            { cx: 157, cy: 135, active: stepIndex >= 3 },
            { cx: 197, cy: 110, active: stepIndex >= 4 },
          ].map((dot, idx) => (
            <circle
              key={idx}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.active ? 3.5 : 2.5}
              fill={dot.active ? '#F05A50' : '#E2C8B5'}
              className="transition-colors duration-300"
            />
          ))}

          {/* Goal Star Flag at Top Step */}
          <g transform="translate(210, 60)">
            {/* Flagpole */}
            <line x1="0" y1="0" x2="0" y2="40" stroke="#B38D75" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="0" cy="0" r="3" fill="#D4AF37" />
            {/* Cute Gold Star Flag */}
            <path
              d="M 0 4 L 26 12 L 0 20 Z"
              fill={isCompleted || stepIndex === 4 ? '#FFB703' : '#FFD166'}
              stroke="#E09F00"
              strokeWidth="1"
            />
            {/* Tiny star on flag */}
            <text x="5" y="15" fontSize="10" fill="#FFF" fontWeight="bold">
              ★
            </text>
          </g>

          {/* Resting Pillow on floor during break mode */}
          {isBreak && (
            <g transform="translate(115, 205)">
              <ellipse cx="25" cy="16" rx="28" ry="10" fill="#F9DAD7" stroke="#F0B6B1" strokeWidth="1.5" />
              {/* Cute pillow tassel */}
              <circle cx="-3" cy="16" r="2" fill="#F05A50" />
              <circle cx="53" cy="16" r="2" fill="#F05A50" />
            </g>
          )}
        </g>

        {/* --- MASCOT CHARACTER CONTAINER --- */}
        <g
          id="mascot-character"
          style={{
            transform: `translate(${mascotX}px, ${mascotY}px)`,
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Mascot shadow */}
          <ellipse cx="0" cy="48" rx="26" ry="6" fill="#EAD9CE" opacity="0.75" />

          {/* Little Feet */}
          {!isBreak ? (
            <g id="feet">
              <ellipse
                cx="-12"
                cy="44"
                rx="6"
                ry="4"
                fill="#3D3A38"
                className={mode === 'focus' ? 'animate-bounce' : ''}
                style={{ animationDuration: '1.2s' }}
              />
              <ellipse
                cx="12"
                cy="44"
                rx="6"
                ry="4"
                fill="#3D3A38"
                className={mode === 'focus' ? 'animate-bounce' : ''}
                style={{ animationDuration: '1.2s', animationDelay: '0.6s' }}
              />
            </g>
          ) : (
            <g id="resting-feet">
              <ellipse cx="-10" cy="42" rx="5" ry="3" fill="#3D3A38" />
              <ellipse cx="10" cy="42" rx="5" ry="3" fill="#3D3A38" />
            </g>
          )}

          {/* Tiny Arms */}
          {isCompleted ? (
            // Celebratory raised arms!
            <g id="celebrating-arms">
              <path
                d="M -26 10 Q -38 -6 -32 -16"
                fill="none"
                stroke={skin.bodyColor}
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 26 10 Q 38 -6 32 -16"
                fill="none"
                stroke={skin.bodyColor}
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>
          ) : isBreak ? (
            // Relaxing arms holding a cozy mug
            <g id="resting-arms">
              <path
                d="M -24 15 Q -15 25 -4 20"
                fill="none"
                stroke={skin.bodyColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 24 15 Q 15 25 4 20"
                fill="none"
                stroke={skin.bodyColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Cozy Steaming Tea Mug */}
              <g transform="translate(-6, 12)">
                <rect x="0" y="2" width="12" height="12" rx="2" fill="#FFF8EF" stroke="#E6C4AA" strokeWidth="1" />
                <path d="M 12 5 C 15 5 15 10 12 10" fill="none" stroke="#E6C4AA" strokeWidth="1" />
                <ellipse cx="6" cy="4" rx="4" ry="1.5" fill="#8D5B4C" />
                {/* Gentle steam wisps */}
                <path
                  d="M 4 0 Q 6 -5 4 -8"
                  fill="none"
                  stroke="#E8C5AF"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                <path
                  d="M 8 -1 Q 6 -6 8 -9"
                  fill="none"
                  stroke="#E8C5AF"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </g>
            </g>
          ) : (
            // Normal walking / climbing arms
            <g id="walking-arms">
              <path
                d="M -27 15 Q -33 24 -24 30"
                fill="none"
                stroke={skin.bodyColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 27 15 Q 35 20 28 28"
                fill="none"
                stroke={skin.bodyColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Main Round Mascot Body */}
          <g id="body-shape">
            {type === 'strawberry' ? (
              // Strawberry slightly tapered heart/cone shape
              <path
                d="M 0 -22 C 28 -22 34 2 22 28 C 15 42 0 46 0 46 C 0 46 -15 42 -22 28 C -34 2 -28 -22 0 -22 Z"
                fill={skin.bodyColor}
                stroke={skin.shadowColor}
                strokeWidth="1.5"
              />
            ) : type === 'peach' ? (
              // Peach with top cleft
              <path
                d="M 0 -19 C 14 -25 32 -16 32 10 C 32 34 16 45 0 45 C -16 45 -32 34 -32 10 C -32 -16 -14 -25 0 -19 Z"
                fill={skin.bodyColor}
                stroke={skin.shadowColor}
                strokeWidth="1.5"
              />
            ) : (
              // Round tomato / cherry / green tomato
              <circle
                cx="0"
                cy="12"
                r="32"
                fill={skin.bodyColor}
                stroke={skin.shadowColor}
                strokeWidth="1.5"
              />
            )}

            {/* Strawberry Seed Accents */}
            {skin.accentDetail === 'seeds' && (
              <g fill="#FFD166" opacity="0.8">
                <ellipse cx="-18" cy="8" rx="1.5" ry="2" transform="rotate(-15 -18 8)" />
                <ellipse cx="18" cy="8" rx="1.5" ry="2" transform="rotate(15 18 8)" />
                <ellipse cx="-12" cy="28" rx="1.2" ry="1.8" transform="rotate(-10 -12 28)" />
                <ellipse cx="12" cy="28" rx="1.2" ry="1.8" transform="rotate(10 12 28)" />
                <ellipse cx="0" cy="36" rx="1.2" ry="1.8" />
              </g>
            )}

            {/* Gloss highlight on top left */}
            <path
              d="M -16 -4 C -12 -14 -2 -18 10 -18"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.35"
            />
          </g>

          {/* Rosy Blush Cheeks */}
          <ellipse cx="-19" cy="14" rx="4.5" ry="3" fill={skin.blushColor} opacity="0.75" />
          <ellipse cx="19" cy="14" rx="4.5" ry="3" fill={skin.blushColor} opacity="0.75" />

          {/* FACIAL EXPRESSIONS */}
          {isCompleted ? (
            // Celebratory joyful eyes & wide open happy mouth
            <g id="face-celebration">
              {/* Star sparkling eyes */}
              <text x="-16" y="7" fontSize="11" fill="#2E2421" textAnchor="middle" fontWeight="bold">
                ★
              </text>
              <text x="16" y="7" fontSize="11" fill="#2E2421" textAnchor="middle" fontWeight="bold">
                ★
              </text>
              {/* Joyful open mouth */}
              <path d="M -5 12 Q 0 19 5 12 Z" fill="#992222" />
            </g>
          ) : isBreak ? (
            // Relaxed happy sleeping / resting eyes ( ^ _ ^ )
            <g id="face-break">
              <path
                d="M -16 6 Q -12 0 -8 6"
                fill="none"
                stroke="#2B2625"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 8 6 Q 12 0 16 6"
                fill="none"
                stroke="#2B2625"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Tiny sweet smile */}
              <path
                d="M -3 12 Q 0 15 3 12"
                fill="none"
                stroke="#2B2625"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Cute zZ floating */}
              <g transform="translate(18, -12)">
                <text x="0" y="0" fontSize="9" fill="#8E7366" fontWeight="bold" opacity="0.8">
                  z
                </text>
                <text x="6" y="-7" fontSize="11" fill="#8E7366" fontWeight="bold" opacity="0.9">
                  Z
                </text>
              </g>
            </g>
          ) : (
            // Focus mode: Big friendly kawaii eyes with catchlights
            <g id="face-focus">
              {/* Left eye */}
              <circle cx="-13" cy="5" r="4.2" fill="#2B2625" />
              <circle cx="-14.5" cy="3.5" r="1.6" fill="#FFFFFF" />
              {/* Right eye */}
              <circle cx="13" cy="5" r="4.2" fill="#2B2625" />
              <circle cx="11.5" cy="3.5" r="1.6" fill="#FFFFFF" />
              {/* Cute smile */}
              <path
                d="M -3 12 Q 0 16 3 12"
                fill="none"
                stroke="#2B2625"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* --- INCORPORATED ANALOG CLOCK FACE (ON MASCOT'S BELLY) --- */}
          <g id="analog-clock" transform="translate(0, 24)">
            {/* Clock dial background */}
            <circle
              cx="0"
              cy="0"
              r="13"
              fill="#FFFDF7"
              stroke="#ECD9C9"
              strokeWidth="1.2"
              className="drop-shadow-xs"
            />
            {/* Hour tick dots at 12, 3, 6, 9 */}
            <circle cx="0" cy="-9.5" r="0.9" fill="#9C8274" />
            <circle cx="9.5" cy="0" r="0.9" fill="#9C8274" />
            <circle cx="0" cy="9.5" r="0.9" fill="#9C8274" />
            <circle cx="-9.5" cy="0" r="0.9" fill="#9C8274" />

            {/* Rotating Clock Hand based on progress */}
            <g
              transform={`rotate(${clockAngle} 0 0)`}
              style={{ transition: 'transform 0.4s ease-out' }}
            >
              {/* Hand pointing to current progress */}
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-8.5"
                stroke="#F05A50"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="0" cy="-8.5" r="1.2" fill="#F05A50" />
            </g>

            {/* Center Pivot */}
            <circle cx="0" cy="0" r="1.6" fill="#5A473F" />
            <circle cx="0" cy="0" r="0.7" fill="#FFFDF7" />
          </g>

          {/* --- GREEN LEAF / CALYX ON HEAD --- */}
          <g id="mascot-calyx" transform="translate(0, -20)">
            {/* Stem */}
            <path
              d="M 0 0 Q -2 -9 -5 -12"
              fill="none"
              stroke="#3D6A3E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Leaves */}
            {type === 'cherry' ? (
              // Cherry dual stem & leaves
              <g>
                <path d="M -3 -8 Q -14 -12 -12 -5 Q -8 -2 -3 -8" fill={skin.leafColor} />
                <path d="M 0 -8 Q 12 -13 12 -5 Q 7 -2 0 -8" fill={skin.leafHighlight} />
              </g>
            ) : (
              // Classic 3-petal tomato leaf crown
              <g>
                {/* Center leaf */}
                <path
                  d="M 0 0 C -4 -10 4 -10 0 0"
                  fill={skin.leafHighlight}
                  stroke={skin.leafColor}
                  strokeWidth="0.8"
                />
                {/* Left leaf */}
                <path
                  d="M 0 0 C -12 -6 -10 2 0 0"
                  fill={skin.leafColor}
                  stroke="#2E5430"
                  strokeWidth="0.8"
                />
                {/* Right leaf */}
                <path
                  d="M 0 0 C 12 -6 10 2 0 0"
                  fill={skin.leafColor}
                  stroke="#2E5430"
                  strokeWidth="0.8"
                />
                <circle cx="0" cy="0" r="2.2" fill={skin.leafColor} />
              </g>
            )}
          </g>

          {/* Celebratory sparkles around mascot when completed */}
          {isCompleted && (
            <g id="sparkles">
              <text x="-32" y="-22" fontSize="14" fill="#FFD166" className="animate-ping">
                ✨
              </text>
              <text x="24" y="-24" fontSize="16" fill="#FFD166" className="animate-bounce">
                ✨
              </text>
              <text x="-34" y="24" fontSize="12" fill="#FFD166">
                ✨
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
