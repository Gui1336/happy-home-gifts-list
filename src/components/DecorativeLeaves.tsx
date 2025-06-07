import { Leaf } from 'lucide-react';

const FallingLeaf = ({ delay = 0, duration = 10, size = 16, startX = 0 }) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${startX}%`,
        top: '-20px',
        animation: `falling ${duration}s linear ${delay}s infinite`,
      }}
    >
      <Leaf className="text-sage-200 opacity-50" style={{ width: size, height: size }} />
    </div>
  );
};

export const DecorativeLeaves = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <style>
        {`
          @keyframes falling {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.5;
            }
            90% {
              opacity: 0.5;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>
      
      {/* Falling leaves */}
      <FallingLeaf delay={0} duration={8} size={20} startX={10} />
      <FallingLeaf delay={2} duration={12} size={24} startX={30} />
      <FallingLeaf delay={4} duration={10} size={18} startX={50} />
      <FallingLeaf delay={6} duration={9} size={22} startX={70} />
      <FallingLeaf delay={8} duration={11} size={20} startX={90} />
      <FallingLeaf delay={10} duration={10} size={24} startX={20} />
      <FallingLeaf delay={12} duration={12} size={18} startX={40} />
      <FallingLeaf delay={14} duration={9} size={22} startX={60} />
      <FallingLeaf delay={16} duration={11} size={20} startX={80} />
    </div>
  );
}; 