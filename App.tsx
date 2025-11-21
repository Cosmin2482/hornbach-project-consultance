
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { AppState, SceneStep, ProjectType, ProductOption } from './types';
import { Character } from './components/UI';
import { 
  IntroScene, 
  ProjectSelectScene,
  MeetingScene,
  AssessmentScene,
  DemolitionScene,
  SupportScene,
  ProductSelectScene,
  CalculatorScene,
  InstallationScene,
  ColorMixerScene,
  ToolsScene,
  ServicesScene,
  SummaryScene
} from './components/Scenes';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentStep: SceneStep.INTRO,
    projectType: null,
    floorDiagnosis: null,
    wallDiagnosis: null,
    gardenType: null,
    sqm: 15,
    gardenSize: 50,
    selectedProduct: null,
    selectedColor: null,
    cart: [],
    selectedServices: []
  });

  // Which character is currently "active" (speaking/waiting)
  const [activeSpeaker, setActiveSpeaker] = useState<'consultant' | 'client'>('consultant');

  // --- MOUSE PARALLAX ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized coordinates -1 to 1
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const bgX = useTransform(mouseX, [-1, 1], ["-2%", "2%"]);
  const bgY = useTransform(mouseY, [-1, 1], ["-2%", "2%"]);


  // --- LOGIC HANDLERS ---
  const next = (step?: SceneStep) => {
    setActiveSpeaker('client'); 
    setTimeout(() => {
       setState(prev => ({ ...prev, currentStep: step ?? prev.currentStep + 1 }));
       setActiveSpeaker('consultant'); 
    }, 500);
  };

  const handleProjectSelect = (type: ProjectType) => {
    if (type === 'flooring') {
        // Flooring follows specific Meeting -> Demolition etc. flow
        setState(prev => ({ ...prev, projectType: type, currentStep: SceneStep.MEETING }));
    } else {
        // Others skip straight to Assessment for now
        setState(prev => ({ ...prev, projectType: type, currentStep: SceneStep.ASSESSMENT }));
    }
  };

  const handleMeetingEnd = () => {
      next(SceneStep.ASSESSMENT);
  }

  const handleAssessment = (val: string) => {
    setActiveSpeaker('client');
    setTimeout(() => {
        if (state.projectType === 'flooring') {
             setState(prev => ({ ...prev, floorDiagnosis: val as any, currentStep: SceneStep.DEMOLITION }));
        } else if (state.projectType === 'painting') {
             setState(prev => ({ ...prev, wallDiagnosis: val as any, currentStep: SceneStep.CALCULATOR }));
        } else {
             setState(prev => ({ ...prev, gardenType: val as any, currentStep: SceneStep.CALCULATOR }));
        }
        setActiveSpeaker('consultant');
    }, 600);
  };

  // Flooring Specific
  const handleDemolitionDone = () => {
      // Add demolition tools to cart automatically
      const demoTools = ["Rangă (Levier)", "Ciocan Cauciuc", "Mănuși Protecție", "Cutter", "Saci Deșeuri"];
      setState(prev => ({ 
          ...prev, 
          cart: [...prev.cart, ...demoTools],
          currentStep: SceneStep.SUPPORT_CHECK 
      }));
  };

  const handleSupportDone = () => {
      // Add support materials to cart
      // Logic could be expanded here to add specific items based on diagnosis
      const supportMaterials = ["Șapă Autonivelantă", "Gletieră Lată", "Amorsă Șapă"];
      setState(prev => ({ 
          ...prev, 
          cart: [...prev.cart, ...supportMaterials],
          currentStep: SceneStep.PRODUCT_SELECT 
      }));
  };

  const handleProductSelect = (prod: ProductOption) => {
      setState(prev => ({ ...prev, selectedProduct: prod, currentStep: SceneStep.CALCULATOR }));
  }

  const handleMeasurement = (val: number) => {
    setState(prev => {
      let nextStep;
      if (prev.projectType === 'flooring') nextStep = SceneStep.INSTALLATION;
      else if (prev.projectType === 'painting') nextStep = SceneStep.COLOR_MIXER;
      else nextStep = SceneStep.TOOLS_GENERIC;
      
      return { ...prev, sqm: val, currentStep: nextStep };
    });
  };

  const handleColor = (color: string) => {
    setState(prev => ({ ...prev, selectedColor: color, currentStep: SceneStep.TOOLS_GENERIC }));
  };

  const handleInstallationItems = (items: string[]) => {
      // Append items, do not overwrite
      setState(prev => ({ ...prev, cart: [...prev.cart, ...items], currentStep: SceneStep.SERVICES }));
  }

  const handleTools = (tools: string[]) => {
    setState(prev => ({ ...prev, cart: tools, currentStep: SceneStep.SERVICES }));
  };

  const handleServices = (services: string[]) => {
    setState(prev => ({ ...prev, selectedServices: services, currentStep: SceneStep.SUMMARY }));
  };

  const restart = () => {
    setState({
      currentStep: SceneStep.INTRO,
      projectType: null,
      floorDiagnosis: null,
      wallDiagnosis: null,
      gardenType: null,
      sqm: 15,
      gardenSize: 50,
      selectedProduct: null,
      selectedColor: null,
      cart: [],
      selectedServices: []
    });
    setActiveSpeaker('consultant');
  };

  // --- SCENE RENDERER ---
  const renderScene = () => {
    switch (state.currentStep) {
      case SceneStep.INTRO: 
        return <IntroScene onStart={() => next(SceneStep.PROJECT_SELECT)} />;
      case SceneStep.PROJECT_SELECT: 
        return <ProjectSelectScene onSelect={handleProjectSelect} />;
        
      // Flooring Flow
      case SceneStep.MEETING:
        return <MeetingScene onNext={handleMeetingEnd} />;
      case SceneStep.ASSESSMENT: 
        return <AssessmentScene type={state.projectType!} onNext={handleAssessment} />;
      case SceneStep.DEMOLITION:
        return <DemolitionScene onNext={handleDemolitionDone} />;
      case SceneStep.SUPPORT_CHECK:
        // Pass the diagnosis state so the component can render dynamic advice
        return <SupportScene onNext={handleSupportDone} diagnosis={state.floorDiagnosis} />;
      case SceneStep.PRODUCT_SELECT:
        return <ProductSelectScene onSelect={handleProductSelect} />;
        
      // Common / Divergent
      case SceneStep.CALCULATOR:
        return <CalculatorScene 
                  type={state.projectType!} 
                  selectedProduct={state.selectedProduct}
                  onNext={handleMeasurement} 
               />;
        
      case SceneStep.INSTALLATION:
        return <InstallationScene onNext={handleInstallationItems} />;

      // Painting / Garden
      case SceneStep.COLOR_MIXER:
        return <ColorMixerScene onNext={handleColor} />;
      case SceneStep.TOOLS_GENERIC:
        return <ToolsScene projectType={state.projectType!} onNext={handleTools} />;

      case SceneStep.SERVICES:
        return <ServicesScene onNext={handleServices} />;
      case SceneStep.SUMMARY:
        return <SummaryScene state={state} onRestart={restart} />;
      default:
        return <div>Error: Step not found</div>;
    }
  };

  // --- DYNAMIC ASSETS ---
  const getBackground = () => {
    const s = state.currentStep;
    
    // 1. Intro - Exterior Hornbach / Modern Store
    if (s === SceneStep.INTRO) return "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=2000&q=80";
    
    // 2. Project Select - Aisle
    if (s === SceneStep.PROJECT_SELECT) return "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=2000&q=80"; 
    
    // 3. Meeting - Customer Service Desk / Friendly
    if (s === SceneStep.MEETING) return "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2000&q=80";

    // 4. Assessment - Bedroom Floor
    if (s === SceneStep.ASSESSMENT) return "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2000&q=80";

    // 5. Demolition - Construction tools / Messy floor
    if (s === SceneStep.DEMOLITION) return "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80";

    // 6. Support Check - Concrete / Screed
    if (s === SceneStep.SUPPORT_CHECK) return "https://images.unsplash.com/photo-1620626012761-d97f7e0f3a01?auto=format&fit=crop&w=2000&q=80";

    // 7. Product Select - Wood samples
    if (s === SceneStep.PRODUCT_SELECT) return "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=2000&q=80";

    // 8. Calculator - Blueprint / Measuring
    if (s === SceneStep.CALCULATOR) return "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80";

    // 9. Installation - Worker / Kneepads
    if (s === SceneStep.INSTALLATION) return "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?auto=format&fit=crop&w=2000&q=80";
    
    // Fallbacks
    if (state.projectType === 'painting' || s === SceneStep.COLOR_MIXER) return "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=2000&q=80"; 
    if (state.projectType === 'garden') return "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=2000&q=80"; 
    
    return "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=2000&q=80"; 
  };

  // Show characters starting from Project Select until Summary
  const showCharacters = state.currentStep >= SceneStep.PROJECT_SELECT && state.currentStep < SceneStep.SUMMARY;

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans select-none text-white">
      
      {/* Background Layer with Parallax */}
      <motion.div 
        className="absolute -top-10 -left-10 -right-10 -bottom-10 bg-cover bg-center z-0 saturate-[0.8]"
        style={{ 
            backgroundImage: `url('${getBackground()}')`,
            x: bgX,
            y: bgY,
            scale: 1.05 
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} // Full opacity for visibility as requested
        transition={{ duration: 1.5 }}
      />

      {/* Overlay Gradient for Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>

      {/* Noise Overlay for Industrial Texture */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      {/* Main Container - WIDER GRID for Characters */}
      <div className="relative z-10 h-screen flex flex-col">
          
          {/* Navbar */}
          <header className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-neutral-950/60 backdrop-blur-md shrink-0 z-50">
            <div className="flex items-center gap-3">
                <div className="bg-hornbach-orange text-white px-3 py-1 text-2xl font-black -skew-x-12 shadow-[0_0_15px_rgba(250,100,0,0.5)]">H</div>
                <div className="text-white/70 font-bold tracking-[0.2em] text-[10px] md:text-xs hidden sm:block uppercase border-l border-white/10 pl-3">Consultanță Interactivă</div>
            </div>
            {state.projectType && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-1.5 rounded-full bg-white/5 text-[10px] font-black text-gray-300 border border-white/10 tracking-wider uppercase shadow-inner"
                >
                    Proiect: <span className="text-hornbach-orange ml-1">{state.projectType}</span>
                </motion.div>
            )}
          </header>

          {/* 3-Column Stage (Cinema Layout) - Wider Sidebars for Characters */}
          <div className="flex-grow w-full max-w-[1800px] mx-auto px-4 pb-4 md:px-8 md:pb-8 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)_220px] gap-6 md:gap-8 items-end md:items-center">
            
            {/* LEFT: Client (You) */}
            <div className="hidden md:flex h-full items-end justify-center pb-0 md:pb-8 relative z-20 pointer-events-none">
               <AnimatePresence>
               {showCharacters && (
                 <div className="w-full h-full relative pointer-events-auto">
                   <Character type="client" isVisible={true} isSpeaking={activeSpeaker === 'client'} />
                 </div>
               )}
               </AnimatePresence>
            </div>

            {/* CENTER: Interface */}
            <div className="w-full h-full max-h-[88vh] flex items-center justify-center relative z-30 order-first md:order-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={state.currentStep}
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full flex flex-col justify-center"
                    >
                        {renderScene()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* RIGHT: Cristian (Consultant) */}
            <div className="hidden md:flex h-full items-end justify-center pb-0 md:pb-8 relative z-20 pointer-events-none">
                <AnimatePresence>
                {showCharacters && (
                  <div className="w-full h-full relative pointer-events-auto">
                     <Character type="consultant" isVisible={true} isSpeaking={activeSpeaker === 'consultant'} />
                  </div>
                )}
                </AnimatePresence>
            </div>

          </div>
      </div>

      {/* Mobile Character Hint */}
      {!showCharacters && state.currentStep !== SceneStep.INTRO && (
         <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-[9px] uppercase tracking-widest animate-pulse">
            Rotire ecran pentru experiență completă
         </div>
      )}
    </div>
  );
};

export default App;
