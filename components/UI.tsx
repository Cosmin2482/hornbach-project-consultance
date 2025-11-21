import React, { useEffect, useState, useRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Check } from 'lucide-react';

// --- Characters ---
interface CharacterProps {
  type: 'consultant' | 'client';
  isVisible: boolean;
  isSpeaking?: boolean;
}

export const Character: React.FC<CharacterProps> = ({ type, isVisible, isSpeaking }) => {
  const isConsultant = type === 'consultant';
  
  return (
    <motion.div
      drag
      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
      dragElastic={0.1}
      initial={{ opacity: 0, x: isConsultant ? 50 : -50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : (isConsultant ? 50 : -50),
        scale: isSpeaking ? 1.05 : 1,
        y: [0, -2, 0], // Subtle breathing
      }}
      transition={{ 
        opacity: { duration: 0.5 },
        y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
        scale: { duration: 0.3 }
      }}
      className={`
        relative z-10 cursor-grab active:cursor-grabbing
        hidden md:flex flex-col items-center justify-end h-full w-full
      `}
    >
      <div className="relative group flex flex-col items-center">
         {/* Tooltip hint */}
         <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none">
            Mă poți muta!
         </div>

        {/* Character Art - SCALED DOWN FOR BETTER LAYOUT */}
        <div className={`
          w-36 h-[260px] lg:w-44 lg:h-[320px]
          flex flex-col items-center justify-end
          filter drop-shadow-2xl transition-all duration-300
          ${!isSpeaking ? 'brightness-90 grayscale-[0.2]' : 'brightness-110 grayscale-0'}
        `}>
          {isConsultant ? (
            // CRISTIAN - The Consultant
            <div className="w-full h-full relative select-none">
                {/* Legs */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-16 bg-neutral-800 rounded-t-lg"></div>

                {/* Upper Body / Vest */}
                <div className="absolute bottom-14 left-2 right-2 h-[180px] bg-hornbach-orange rounded-2xl flex flex-col items-center shadow-inner border-b-4 border-black">
                   {/* Zipper */}
                   <div className="w-0.5 h-full bg-black/20 absolute"></div>
                   
                   {/* Collar */}
                   <div className="w-2/3 h-8 bg-neutral-700 absolute -top-3 rounded-md z-0 shadow-lg"></div>
                   
                   {/* Logo Area */}
                   <div className="mt-10 ml-8 bg-white/20 p-0.5 rounded text-black font-black text-lg opacity-40 rotate-3">H</div>
                   
                   {/* Name Tag */}
                   <div className="absolute top-16 right-4 bg-white px-2 py-1 text-[9px] font-bold text-black shadow-md transform -rotate-2 border-l-2 border-red-600 z-20">
                      CRISTIAN
                   </div>

                   {/* Pockets with Tools */}
                   <div className="absolute bottom-8 left-3 w-8 h-12 bg-orange-700/20 rounded border-t border-orange-600/40">
                      <div className="absolute -top-4 left-1 w-2 h-8 bg-gray-300 rotate-12 rounded-sm border border-gray-400"></div>
                   </div>
                   <div className="absolute bottom-8 right-3 w-8 h-12 bg-orange-700/20 rounded border-t border-orange-600/40"></div>
                </div>
                
                {/* Head */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-[#eac098] rounded-[1.5rem] shadow-xl flex flex-col items-center z-10 overflow-hidden border-b-2 border-black/10">
                   {/* Hair */}
                   <div className="w-full h-6 bg-neutral-800 absolute top-0"></div>
                   {/* Eyes */}
                   <div className="flex gap-2 mt-10">
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                   </div>
                   {/* Beard */}
                   <div className="absolute bottom-0 w-full h-6 bg-neutral-800/90 rounded-b-[1.5rem]"></div>
                   {/* Mouth */}
                   <motion.div 
                     animate={{ height: isSpeaking ? [2, 5, 2] : 2 }}
                     transition={{ repeat: Infinity, duration: 0.2 }}
                     className="w-4 bg-black/80 rounded-full mt-2 absolute bottom-5"
                   ></motion.div>
                </div>
            </div>
          ) : (
             // CLIENT - You
             <div className="w-full h-full relative select-none opacity-95">
                {/* Body */}
                <div className="absolute bottom-0 left-4 right-4 h-[160px] bg-blue-900 rounded-t-[2rem] shadow-xl flex flex-col items-center">
                   {/* Hoodie strings */}
                   <div className="w-0.5 h-12 bg-white/30 absolute top-3 left-6 rotate-3"></div>
                   <div className="w-0.5 h-12 bg-white/30 absolute top-3 right-6 -rotate-3"></div>
                </div>
                
                 {/* Head */}
                 <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-18 h-20 bg-[#f5d0b0] rounded-2xl border-b-2 border-black/10 shadow-lg flex flex-col items-center justify-center z-10">
                   {/* Glasses */}
                   <div className="flex gap-1 mb-1">
                      <div className="w-5 h-5 border-2 border-black rounded-full bg-white/10"></div>
                      <div className="w-5 h-5 border-2 border-black rounded-full bg-white/10"></div>
                   </div>
                   <div className="w-0.5 h-0.5 bg-black rounded-full mt-1"></div>
                   {/* Smile */}
                   <motion.div 
                     animate={{ width: isSpeaking ? [6, 10, 6] : 6 }}
                     className="w-3 h-1 border-b-2 border-black rounded-full mt-1"
                   ></motion.div>
                </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- Buttons ---
interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'ghost';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  size = 'md',
  className = '', 
  ...props 
}) => {
  const baseStyle = "rounded-md font-bold transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 relative overflow-hidden group";
  
  const sizes = {
    sm: "py-2 px-3 text-xs",
    md: "py-3 px-6 text-sm",
    lg: "py-4 px-8 text-base"
  };

  const variants = {
    primary: "bg-hornbach-orange text-white border border-transparent hover:shadow-orange-500/40 hover:brightness-110",
    secondary: "bg-neutral-700 hover:bg-neutral-600 text-white border border-transparent",
    outline: "bg-transparent border border-white/30 text-white hover:bg-white/10",
    success: "bg-green-700 hover:bg-green-600 text-white border border-transparent hover:shadow-green-500/40",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white shadow-none"
  };

  return (
    <motion.button
      whileHover={!props.disabled ? { scale: 1.02 } : {}}
      whileTap={!props.disabled ? { scale: 0.98 } : {}}
      className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

// --- Dialog Bubble ---
interface DialogBubbleProps {
  speaker: 'client' | 'consultant';
  text: string;
  onTypingComplete?: () => void;
  className?: string;
}

export const DialogBubble: React.FC<DialogBubbleProps> = ({ speaker, text, onTypingComplete, className='' }) => {
  const isClient = speaker === 'client';
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  // We use a ref to keep track of if the component is mounted to avoid setting state on unmounted component
  const isMounted = useRef(true);

  // Typing effect simulation - FIXED logic to prevent missing letters
  useEffect(() => {
    isMounted.current = true;
    setIsTyping(true);
    setDisplayedText('');
    
    // Small initial delay before typing starts
    const thinkingTimeout = setTimeout(() => {
      let i = 0;
      const totalLength = text.length;
      
      // Faster interval, but using SLICE to guarantee integrity
      const typingInterval = setInterval(() => {
        if (!isMounted.current) {
            clearInterval(typingInterval);
            return;
        }

        if (i < totalLength) {
          // Use slice instead of concatenation to prevent skipped frame issues
          // This guarantees displayedText is exactly the substring from 0 to i+1
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          if (onTypingComplete) onTypingComplete();
        }
      }, 20); // 20ms per character is a good reading speed

      return () => clearInterval(typingInterval);
    }, 300);

    return () => {
        isMounted.current = false;
        clearTimeout(thinkingTimeout);
    };
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 w-full mb-6 ${isClient ? 'justify-start' : 'justify-end'} ${className}`}
    >
      {/* Avatar for Mobile Only */}
      <div className={`md:hidden w-8 h-8 rounded-full flex items-center justify-center font-bold border text-[10px] shrink-0 ${isClient ? 'order-1 bg-blue-900 border-blue-400 text-white' : 'order-2 bg-hornbach-orange border-orange-300 text-black'}`}>
        {isClient ? 'TU' : 'CR'}
      </div>

      <div className={`
        relative p-5 max-w-[90%] md:max-w-[90%] rounded-xl shadow-xl border backdrop-blur-md flex flex-col gap-1
        ${isClient 
          ? 'order-2 bg-white text-gray-900 border-gray-200 rounded-tl-none' 
          : 'order-1 bg-neutral-800/95 text-gray-100 border-hornbach-orange/30 rounded-tr-none'
        }
      `}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] font-black uppercase tracking-wider opacity-70 ${isClient ? 'text-gray-500' : 'text-hornbach-orange'}`}>
            {isClient ? 'Tu (Client)' : 'Cristian (Consultant)'}
          </span>
        </div>
        
        <div className="text-sm md:text-base leading-relaxed font-medium">
          {displayedText}
          {isTyping && <span className="animate-pulse ml-1 text-hornbach-orange inline-block w-1 h-4 align-middle bg-hornbach-orange"></span>}
        </div>
      </div>
    </motion.div>
  );
};

// --- Card ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  image?: string;
  icon?: React.ReactNode; // Added icon prop support
}

export const Card: React.FC<CardProps> = ({ children, className = '', selected = false, onClick, disabled, image, icon }) => {
  return (
    <motion.div
      onClick={!disabled ? onClick : undefined}
      whileHover={!disabled && onClick ? { y: -4, borderColor: "rgba(250, 100, 0, 0.6)" } : {}}
      whileTap={!disabled && onClick ? { scale: 0.98 } : {}}
      className={`
        relative rounded-xl transition-all duration-200 overflow-hidden group
        border flex flex-col bg-neutral-900/80 backdrop-blur-sm
        ${selected 
          ? 'border-hornbach-orange ring-1 ring-orange-500/50 shadow-lg shadow-orange-900/20' 
          : 'border-white/10 hover:border-white/30'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed grayscale' : ''}
        ${onClick && !disabled ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Image Header */}
      {image && (
        <div className="h-32 md:h-40 w-full overflow-hidden relative border-b border-white/5 bg-neutral-800">
           <img src={image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" loading="lazy" />
           <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
           {selected && (
             <div className="absolute inset-0 bg-hornbach-orange/20 mix-blend-overlay"></div>
           )}
        </div>
      )}

      {/* Animated Icon Header (Alternative to Image) */}
      {icon && (
          <div className="h-32 md:h-40 w-full overflow-hidden relative border-b border-white/5 bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-800/80 transition-colors">
             <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
             <motion.div 
                className={`text-gray-400 group-hover:text-hornbach-orange transition-colors duration-300`}
                initial={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
             >
                {icon}
             </motion.div>
          </div>
      )}
      
      <div className="p-5 relative z-10 flex-grow flex flex-col">
        {selected && (
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-hornbach-orange text-white p-1 rounded-full shadow-lg z-20"
          >
            <Check size={14} strokeWidth={4} />
          </motion.div>
        )}
        {children}
      </div>
    </motion.div>
  );
};

// --- Number Input ---
export const NumberInput: React.FC<{ 
  value: number, 
  onChange: (val: number) => void, 
  label: string,
  unit: string,
  step?: number
}> = ({ value, onChange, label, unit, step = 1 }) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1">{label}</label>
    <div className="flex items-center bg-neutral-900 rounded-lg border border-neutral-700 focus-within:border-hornbach-orange transition-colors overflow-hidden shadow-inner h-12 group">
      <button 
        onClick={() => onChange(Math.max(0, Number((value - step).toFixed(1))))}
        className="w-12 h-full flex items-center justify-center hover:bg-neutral-800 text-white font-bold border-r border-neutral-800 active:bg-red-900/30 transition-colors text-xl"
      >
        -
      </button>
      <input 
        type="number" 
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 bg-transparent text-center text-lg font-bold text-white focus:outline-none appearance-none p-1 font-mono"
      />
      <div className="px-3 text-gray-500 font-bold text-xs uppercase border-l border-neutral-800 h-full flex items-center bg-neutral-950/30">{unit}</div>
      <button 
        onClick={() => onChange(Number((value + step).toFixed(1)))}
        className="w-12 h-full flex items-center justify-center hover:bg-neutral-800 text-white font-bold border-l border-neutral-800 active:bg-green-900/30 transition-colors text-xl"
      >
        +
      </button>
    </div>
  </div>
);