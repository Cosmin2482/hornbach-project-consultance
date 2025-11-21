
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Check, AlertTriangle, Hammer, Scissors, Ruler, 
  RotateCcw, CheckCircle2, ShieldCheck, Calculator, Home, Brush, Droplets, Truck, Wrench, Info, MousePointer2,
  Layers, Paintbrush, Flower, Trash2, HardHat, Box
} from 'lucide-react';
import { Button, DialogBubble, Card, NumberInput } from './UI';
import { ProjectType, ProductOption } from '../types';

// --- LAYOUT CONTAINER ---
const ContentPanel: React.FC<{ children: React.ReactNode, title?: string, fullHeight?: boolean }> = ({ children, title, fullHeight }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
    className={`
      relative z-20 bg-neutral-900/95 backdrop-blur-md border border-white/10 
      rounded-2xl shadow-2xl w-full flex flex-col overflow-hidden
      ${fullHeight ? 'h-full' : 'max-h-[85vh] h-[85vh]'}
    `}
  >
    {/* Header Bar */}
    <div className="h-12 border-b border-white/5 flex items-center px-6 bg-white/[0.02] justify-between shrink-0">
       <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
          <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
          {title && <h2 className="ml-3 text-sm font-bold text-gray-300 uppercase tracking-widest">{title}</h2>}
       </div>
       <div className="text-[10px] text-hornbach-orange font-mono hidden sm:block tracking-widest">HORNBACH_CONSULT_SYS</div>
    </div>

    {/* Scrollable Content */}
    <div className="flex-grow overflow-hidden relative flex flex-col">
      {children}
    </div>
  </motion.div>
);

// --- SCENE 0: INTRO ---
export const IntroScene: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-4 relative z-30">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-12 relative group"
    >
      <div className="absolute inset-0 bg-hornbach-orange blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity duration-1000"></div>
      <div className="relative inline-block bg-hornbach-orange text-white font-black text-5xl md:text-8xl px-8 py-4 transform -skew-x-12 shadow-2xl border-2 border-white/10 tracking-tighter">
        HORNBACH
      </div>
      <div className="mt-6 text-sm md:text-2xl font-bold tracking-[0.4em] uppercase text-gray-200 bg-black/50 backdrop-blur-sm py-2">
        Consultanță – Proiecte Renovare
      </div>
    </motion.div>
    
    <div className="max-w-md mx-auto mb-12 text-gray-300 font-medium leading-relaxed bg-black/40 p-6 rounded-xl border border-white/5 backdrop-blur-md">
        Bine ați venit! Veți parcurge un ghid asistat alături de consultantul nostru virtual pentru a planifica proiectul dumneavoastră de la A la Z.
    </div>

    <Button onClick={onStart} size="lg" className="text-xl px-12 py-5 shadow-orange-500/20 shadow-2xl animate-pulse border border-white/20">
      Încep Consultanța <ArrowRight className="ml-3" strokeWidth={3} />
    </Button>
  </div>
);

// --- SCENE 1: PROJECT SELECT ---
export const ProjectSelectScene: React.FC<{ onSelect: (type: ProjectType) => void }> = ({ onSelect }) => {
  const projects = [
    { 
        id: 'flooring', 
        label: 'Parchet & Pardoseli', 
        icon: <Layers size={64} strokeWidth={1.5} />,
        desc: "Laminat, stratificat, pregătire strat suport." 
    },
    { 
        id: 'painting', 
        label: 'Vopsele & Pereți', 
        icon: <Paintbrush size={64} strokeWidth={1.5} />,
        desc: "Vopsea lavabilă, mixare nuanțe, unelte." 
    },
    { 
        id: 'garden', 
        label: 'Grădină & Terasă', 
        icon: <Flower size={64} strokeWidth={1.5} />,
        desc: "Întreținere gazon, pavaje, irigații." 
    }
  ];

  return (
    <ContentPanel title="Alege Proiectul">
      <div className="p-8 flex flex-col h-full overflow-y-auto">
        <DialogBubble speaker="consultant" text="Bună ziua! Sunt Cristian, consultantul dumneavoastră. Ce proiect aveți în plan astăzi?" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-stretch pb-4">
          {projects.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="h-full"
            >
              <Card 
                  onClick={() => onSelect(p.id as ProjectType)} 
                  icon={p.icon}
                  className="h-full hover:border-hornbach-orange hover:scale-[1.02] transition-transform duration-300 justify-between bg-neutral-800/50"
              >
                <div className="flex flex-col gap-4 h-full text-center items-center pt-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-hornbach-orange transition-colors leading-tight mb-2">{p.label}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity text-hornbach-orange border-t border-white/10 pt-4 w-full justify-center">
                     Selectează <ArrowRight size={12} className="ml-2"/>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </ContentPanel>
  );
};

// --- SCENE 2: MEETING (Specific Dialogue) ---
export const MeetingScene: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if(step === 0) {
        const t = setTimeout(() => setStep(1), 3000);
        return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <ContentPanel title="Discuție Inițială">
      <div className="p-8 flex flex-col h-full overflow-y-auto">
        <div className="flex flex-col gap-4">
            <DialogBubble speaker="consultant" text="Bună ziua! Cu ce vă pot ajuta astăzi?" />
            
            {step >= 1 && (
               <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                   <DialogBubble speaker="client" text="Aș dori să schimb parchetul din dormitor, dar nu știu exact ce îmi trebuie și cum se procedează." />
               </motion.div>
            )}

            {step >= 1 && (
              <motion.div 
                  initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 2.5}}
                  onAnimationComplete={() => setStep(2)}
              >
                   <DialogBubble speaker="consultant" text="Perfect, haideți să trecem împreună prin toate etapele. Vă ofer consultanță completă, de la demontarea parchetului vechi până la montajul celui nou." />
              </motion.div>
            )}
        </div>
        
        {step >= 2 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-auto flex justify-end pt-6"
            >
               <Button onClick={onNext} size="lg">Începem <ArrowRight className="ml-2"/></Button>
            </motion.div>
        )}
      </div>
    </ContentPanel>
  );
}

// --- SCENE 3: ASSESSMENT (Updated) ---
export const AssessmentScene: React.FC<{ 
  type: ProjectType, 
  onNext: (val: string) => void 
}> = ({ type, onNext }) => {
  const [selection, setSelection] = useState<string | null>(null);

  // Data based on the script provided
  const data = {
    flooring: {
      q: "Primul pas este să înțelegem situația din dormitorul dumneavoastră. Parchetul actual este deteriorat? S-a umflat? Scârțâie?",
      options: [
        { id: 'swollen', label: 'Da, sunt câteva zone umflate', desc: "Indică prezența umidității", icon: <Droplets className="text-blue-400 mb-3" size={32}/> },
        { id: 'old', label: 'Nu, doar este vechi și inestetic', desc: "Uzură normală în timp", icon: <RotateCcw className="text-amber-500 mb-3" size={32}/> },
        { id: 'squeaky', label: 'Scârțâie destul de tare', desc: "Problemă la stratul suport", icon: <AlertTriangle className="text-red-500 mb-3" size={32}/> }
      ],
      response: {
          swollen: "Dacă este umflat, e o problemă de umiditate. Va trebui să scoatem tot și să tratăm șapa împotriva mucegaiului înainte de a monta ceva nou.",
          squeaky: "Scârțâitul indică denivelări. Va fi obligatoriu să folosim o șapă autonivelantă pentru a corecta planeitatea.",
          old: "În regulă. În acest caz, va trebui să îl demontați complet și să verificăm șapa dedesubt pentru a asigura o lucrare de calitate."
      }
    },
    painting: {
      q: "Care este starea actuală a pereților?",
      options: [
        { id: 'fresh', label: 'Glet Proaspăt', desc: "Necesită amorsă", icon: <CheckCircle2 className="text-white mb-3" size={32}/> },
        { id: 'stained', label: 'Vopsea Veche', desc: "Necesită curățare", icon: <Paintbrush className="text-yellow-500 mb-3" size={32}/> }
      ],
      response: {
          fresh: "Pentru glet proaspăt, amorsa este crucială pentru a nu 'suge' vopseaua.",
          stained: "Vom alege o vopsea cu putere mare de acoperire."
      }
    },
    garden: {
        q: "Ce zonă amenajăm?",
        options: [{id:'lawn', label:'Gazon', desc:'', icon: <Flower size={32}/>}, {id:'terrace', label:'Terasă', desc:'', icon: <Home size={32}/>}],
        response: {lawn: "Perfect.", terrace: "Perfect."}
    }
  }[type];

  const getResponse = () => {
      if (!selection) return "";
      // @ts-ignore
      return data.response[selection] || "Am înțeles.";
  };

  return (
    <ContentPanel title="Diagnosticul Inițial">
      <div className="p-8 flex flex-col h-full overflow-y-auto">
        <DialogBubble speaker="consultant" text={data.q} />
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 mt-6 shrink-0">
            {data.options.map((opt) => (
            <Card 
                key={opt.id} 
                selected={selection === opt.id} 
                onClick={() => setSelection(opt.id)}
                className="flex flex-col items-center text-center h-full justify-center py-8 hover:bg-neutral-800"
            >
                {opt.icon}
                <span className="font-bold text-base leading-tight mb-2">{opt.label}</span>
                <span className="text-xs text-gray-400 leading-relaxed px-2">{opt.desc}</span>
            </Card>
            ))}
        </div>

        <AnimatePresence>
            {selection && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="flex flex-col gap-4 border-t border-white/10 pt-6 mt-auto"
                >
                    <DialogBubble speaker="consultant" text={getResponse()} />
                    <div className="flex justify-end pb-4">
                        <Button onClick={() => onNext(selection)} size="lg" className="shadow-xl">
                        Următorul Pas <ArrowRight size={16}/>
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </ContentPanel>
  );
};

// --- SCENE 4: DEMOLITION TOOLS ---
export const DemolitionScene: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const tools = [
      { name: "Rangă (Levier)", desc: "Pentru desprinderea primei lamele", icon: <Hammer /> },
      { name: "Ciocan Cauciuc", desc: "Pentru ajustări fine", icon: <Hammer /> },
      { name: "Mănuși Protecție", desc: "Siguranța pe primul loc", icon: <ShieldCheck /> },
      { name: "Cutter", desc: "Pentru tăierea plintelor vechi", icon: <Scissors /> },
      { name: "Saci Deșeuri", desc: "Pentru curățenie rapidă", icon: <Trash2 /> },
  ];

  return (
    <ContentPanel title="Scoaterea Parchetului Vechi">
       <div className="p-8 flex flex-col h-full overflow-y-auto">
           <DialogBubble speaker="consultant" text="Pentru a scoate parchetul vechi, aveți nevoie de câteva unelte de bază. Haideți să le trecem pe toate în revistă." />
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 shrink-0">
              {tools.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-neutral-800/60 border border-white/5 p-4 rounded-xl flex items-center gap-4 hover:bg-neutral-800 transition-colors"
                  >
                      <div className="bg-hornbach-orange/20 p-3 rounded-lg text-hornbach-orange">{t.icon}</div>
                      <div>
                          <div className="font-bold text-sm uppercase">{t.name}</div>
                          <div className="text-xs text-gray-400">{t.desc}</div>
                      </div>
                  </motion.div>
              ))}
           </div>

           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
             className="mt-auto pt-4 border-t border-white/10"
           >
               <DialogBubble speaker="consultant" text="Procesul este simplu: ridicați prima lamelă cu ranga, apoi restul ies ușor în sistem click." className="!mb-4" />
               <div className="flex justify-end pb-2">
                    <Button onClick={onNext}>Am înțeles, mergem mai departe <ArrowRight size={16}/></Button>
               </div>
           </motion.div>
       </div>
    </ContentPanel>
  );
}

// --- SCENE 5: SUPPORT CHECK (Dynamic based on diagnosis) ---
export const SupportScene: React.FC<{ 
    onNext: () => void,
    diagnosis: 'swollen' | 'old' | 'squeaky' | null 
}> = ({ onNext, diagnosis }) => {
    
    // Dynamic Content based on diagnosis
    let dialogueText = "După ce ați scos parchetul, șapa trebuie verificată.";
    let specificChecklist = [
        { label: "Gletieră Lată", desc: "Pentru întinderea materialelor" },
        { label: "Amorsă Șapă", desc: "Pentru aderență optimă" },
    ];

    if (diagnosis === 'swollen') {
        dialogueText += " Deoarece ați menționat că parchetul era umflat, VĂ RECOMAND imperativ o soluție anti-mucegai și verificare cu higrometrul.";
        specificChecklist.unshift({ label: "Soluție Anti-Mucegai", desc: "Tratament obligatoriu pentru umiditate" });
        specificChecklist.push({ label: "Șapă Autonivelantă", desc: "Pentru a acoperi zonele afectate" });
    } else if (diagnosis === 'squeaky') {
        dialogueText += " Pentru scârțâit, cauza este de obicei denivelarea. Șapa autonivelantă este OBLIGATORIE în cazul dumneavoastră.";
        specificChecklist.unshift({ label: "Șapă Autonivelantă", desc: "Esențială pentru eliminarea scârțâitului" });
    } else {
        dialogueText += " Dacă sunt găuri sau denivelări mici, le reparăm rapid.";
        specificChecklist.unshift({ label: "Kit Reparație Șapă", desc: "Pentru mici fisuri" });
    }

    return (
        <ContentPanel title="Verificarea Șapei">
            <div className="p-8 flex flex-col h-full overflow-y-auto">
                <DialogBubble speaker="consultant" text={dialogueText} />
                
                <div className="flex flex-col gap-3 my-6 bg-neutral-950/30 p-6 rounded-xl border border-white/5 shrink-0">
                    {specificChecklist.map((c, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.3 }}
                          className="flex items-center gap-4 p-3 bg-neutral-800 border-l-4 border-hornbach-orange rounded shadow-md"
                        >
                            <CheckCircle2 className="text-green-500 shrink-0" />
                            <div>
                                <div className="font-bold">{c.label}</div>
                                <div className="text-xs text-gray-400">{c.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="flex items-center gap-3 bg-blue-900/20 p-4 rounded-lg border border-blue-500/20 mb-6 shrink-0">
                    <Info className="text-blue-400" />
                    <div className="text-xs text-blue-200">Aplicarea durează aproximativ 1–2 ore, iar uscarea între 3 și 6 ore, în funcție de produs.</div>
                </div>

                <div className="mt-auto flex justify-end pb-2">
                     <Button onClick={onNext}>Totul este clar <ArrowRight/></Button>
                </div>
            </div>
        </ContentPanel>
    );
}

// --- SCENE 6: PRODUCT SELECT ---
export const ProductSelectScene: React.FC<{ onSelect: (product: ProductOption) => void }> = ({ onSelect }) => {
    const options: ProductOption[] = [
        { id: 'egger', name: 'Parchet Egger Pro', category: 'floor', description: 'Laminat 8mm, Stejar Deschis, Trafic Intens AC4', price: 45, unit: 'm²', image: '' },
        { id: 'classen', name: 'Parchet Classen', category: 'floor', description: 'Laminat 10mm, Gri Modern, Rezistent la Apă', price: 62, unit: 'm²', image: '' },
        { id: 'krono', name: 'Krono Original', category: 'floor', description: 'Laminat 12mm, Aspect Masiv, V-Groove 4 laturi', price: 89, unit: 'm²', image: '' },
    ];
    
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <ContentPanel title="Alegerea Noului Parchet">
            <div className="p-8 flex flex-col h-full overflow-y-auto">
                <DialogBubble speaker="consultant" text="Pentru dormitor vă recomand un parchet laminat de minim 8 mm, trafic AC4, pentru durabilitate. Iată câteva opțiuni excelente disponibile acum." />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 shrink-0">
                    {options.map(opt => (
                        <Card 
                           key={opt.id} 
                           icon={<Layers size={48} strokeWidth={1} />} 
                           selected={selected === opt.id}
                           onClick={() => setSelected(opt.id)}
                           className="h-full min-h-[200px] justify-between"
                        >
                            <div className="flex flex-col gap-2 mt-4">
                                <div className="font-black text-xl leading-tight">{opt.name}</div>
                                <div className="w-full h-px bg-white/10 my-2"></div>
                                <div className="text-xs text-gray-400 font-medium leading-relaxed">{opt.description}</div>
                            </div>
                            <div className="mt-6 text-hornbach-orange font-black text-3xl text-right tracking-tighter">
                                {opt.price} <span className="text-sm font-bold text-gray-500">Lei/{opt.unit}</span>
                            </div>
                        </Card>
                    ))}
                </div>
                
                <div className="mt-auto flex justify-between items-center border-t border-white/10 pt-4 pb-2">
                     <div className="text-xs text-gray-500 hidden sm:block">Selectați un produs pentru a continua.</div>
                     <Button 
                        disabled={!selected} 
                        onClick={() => {
                            const prod = options.find(o => o.id === selected);
                            if(prod) onSelect(prod);
                        }}
                        className="shadow-lg ml-auto"
                     >
                        Am ales acest model <ArrowRight/>
                     </Button>
                </div>
            </div>
        </ContentPanel>
    );
}

// --- SCENE 8: INSTALLATION (Fixed Layout) ---
export const InstallationScene: React.FC<{ onNext: (items: string[]) => void }> = ({ onNext }) => {
    const tools = [
        { id: 'dist', label: 'Distanțiere', sub: 'Pentru rost dilatare' },
        { id: 'hammer', label: 'Ciocan Cauciuc', sub: 'Montaj prin lovire' },
        { id: 'saw', label: 'Fierăstrău/Bormașină', sub: 'Pentru decupaje' },
    ];
    
    const materials = [
        { id: 'folie', label: 'Folie Izolatoare', sub: 'Obligatorie sub parchet' },
        { id: 'plinta', label: 'Plinte & Colțare', sub: 'Finisaj perimetral' },
        { id: 'banda', label: 'Bandă Etanșare', sub: 'Îmbinare folie' },
    ];

    const steps = [
        "Întindeți folia pe toată suprafața.",
        "Lăsați un rost de 1 cm la perete (folosind distanțiere).",
        "Montați primul rând paralel cu lumina naturală.",
        "Îmbinați lamelele în sistem click.",
        "Montați plintele și colțarele la final."
    ];

    const [activeStep, setActiveStep] = useState(0);

    // Combine all items to return
    const allItems = [...tools.map(t=>t.label), ...materials.map(m=>m.label)];

    return (
        <ContentPanel title="Montajul Noului Parchet">
             {/* Main Flex Column */}
             <div className="flex flex-col h-full">
                 
                 {/* SCROLLABLE CONTENT AREA */}
                 <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
                    <DialogBubble speaker="consultant" text="Pentru montaj aveți nevoie de câteva elemente esențiale. Mai jos aveți lista completă și pașii de lucru." />
                    
                    <div className="flex flex-col lg:flex-row gap-6 mt-4">
                        {/* Lists */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-hornbach-orange uppercase tracking-widest mb-3 border-b border-white/10 pb-1">Materiale Necesare</h3>
                                <div className="space-y-2">
                                    {materials.map(m => (
                                        <div key={m.id} className="flex items-center justify-between bg-neutral-800 p-2 rounded px-3 border border-white/5">
                                            <div>
                                               <div className="font-bold text-sm text-white">{m.label}</div>
                                               <div className="text-[10px] text-gray-400">{m.sub}</div>
                                            </div>
                                            <Check size={14} className="text-green-500"/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-hornbach-orange uppercase tracking-widest mb-3 border-b border-white/10 pb-1">Unelte Necesare</h3>
                                <div className="space-y-2">
                                    {tools.map(t => (
                                        <div key={t.id} className="flex items-center justify-between bg-neutral-800 p-2 rounded px-3 border border-white/5">
                                            <div>
                                               <div className="font-bold text-sm text-white">{t.label}</div>
                                               <div className="text-[10px] text-gray-400">{t.sub}</div>
                                            </div>
                                            <Wrench size={14} className="text-gray-400"/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="flex-1 bg-neutral-900 rounded-xl p-4 border border-white/10 shadow-inner flex flex-col">
                            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4 border-b border-neutral-700 pb-2">Ghid Pas cu Pas</h3>
                            <div className="relative border-l-2 border-neutral-700 ml-3 space-y-8 pb-4 flex-grow">
                                {steps.map((s, i) => (
                                    <motion.div 
                                       key={i}
                                       initial={{ opacity: 0, x: 10 }}
                                       animate={{ opacity: 1, x: 0 }}
                                       transition={{ delay: i * 0.5 }}
                                       className="relative pl-6 group cursor-pointer"
                                       onMouseEnter={() => setActiveStep(i)}
                                    >
                                        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-colors ${activeStep === i ? 'bg-hornbach-orange border-white' : 'bg-neutral-800 border-neutral-600'}`}></div>
                                        <div className={`text-sm leading-relaxed transition-colors font-medium ${activeStep === i ? 'text-white scale-105 origin-left' : 'text-gray-500'}`}>
                                            {s}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* FOOTER - FIXED AT BOTTOM */}
                 <div className="shrink-0 p-6 border-t border-white/10 bg-neutral-900 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                      <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500 hidden sm:block">Totul este pregătit. Putem finaliza lista.</div>
                          <Button onClick={() => onNext(allItems)} size="lg" className="ml-auto">
                              Finalizează Lista <CheckCircle2 className="ml-2"/>
                          </Button>
                      </div>
                 </div>
             </div>
        </ContentPanel>
    );
}

// --- SCENE 3: CALCULATOR ---
export const CalculatorScene: React.FC<{ 
  type: ProjectType, 
  selectedProduct?: ProductOption | null,
  onNext: (val: number) => void 
}> = ({ type, selectedProduct, onNext }) => {
  const [val1, setVal1] = useState(4); 
  const [val2, setVal2] = useState(3.5);
  const [layers, setLayers] = useState(2);
  
  const area = parseFloat((val1 * val2).toFixed(2));

  const [paintedPercent, setPaintedPercent] = useState(0);
  useEffect(() => {
     if (type === 'painting') {
        setPaintedPercent(0);
        const interval = setInterval(() => {
           setPaintedPercent(p => p < 100 ? p + 1.5 : 100);
        }, 20);
        return () => clearInterval(interval);
     }
  }, [val1, val2, type]);
  
  let resultText = "";
  let secondaryResult = "";
  let label = "Suprafață Totală";

  // Dynamic dialogue
  let dialogue = "Haideți să calculăm exact ce cantitate vă trebuie. Care sunt dimensiunile camerei?";
  if (selectedProduct) {
      dialogue = `Ați ales ${selectedProduct.name}. Pentru a calcula câte pachete sunt necesare, am nevoie de dimensiunile camerei.`;
  }

  if (type === 'flooring') {
    const needed = (area * 1.1).toFixed(2); 
    resultText = `${needed} m²`;
    secondaryResult = `(incl. 10% pierderi montaj)`;
    label = "Necesar Parchet (cu pierderi)";
  } else if (type === 'painting') {
    const liters = ((area * layers) / 10).toFixed(1); 
    resultText = `${liters} L`;
    secondaryResult = `${layers} straturi recomandate`;
    label = "Necesar Vopsea Lavabilă";
  } else {
    resultText = `${area} m²`;
  }

  return (
    <ContentPanel title="Calculator Necesar Materiale">
      <div className="p-8 flex flex-col h-full overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-8 h-full shrink-0">
            <div className="lg:w-5/12 space-y-6">
            <DialogBubble speaker="consultant" text={dialogue} />
            
            <div className="bg-neutral-950/60 p-6 rounded-xl border border-white/10 space-y-5 shadow-inner">
                <NumberInput label="Lungime Încăpere" unit="m" value={val1} onChange={setVal1} step={0.5} />
                <NumberInput label="Lățime Încăpere" unit="m" value={val2} onChange={setVal2} step={0.5} />
                
                {type === 'painting' && (
                    <div className="pt-3 border-t border-white/5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">Număr Straturi Vopsea</label>
                        <div className="flex gap-3">
                        {[1, 2, 3].map(l => (
                            <button key={l} onClick={() => setLayers(l)} className={`flex-1 py-3 text-xs rounded font-bold transition-all ${layers === l ? 'bg-blue-600 text-white shadow-lg scale-105 ring-1 ring-blue-400' : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700'}`}>
                            {l}x Strat
                            </button>
                        ))}
                        </div>
                    </div>
                )}
            </div>
            </div>

            <div className="lg:w-7/12 flex flex-col justify-between gap-6">
            {/* Visualizer */}
            <div className="bg-neutral-800 rounded-xl border border-white/10 h-48 md:h-64 relative overflow-hidden flex items-center justify-center shadow-2xl">
                {type === 'painting' ? (
                    <div className="w-full h-full relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] bg-neutral-700 flex items-center justify-center text-neutral-500 text-sm font-mono tracking-widest uppercase">Perete Brut</div>
                        <motion.div 
                            className="h-full bg-blue-500/90 absolute left-0 top-0 border-r-4 border-blue-400/50 backdrop-blur-sm mix-blend-overlay"
                            initial={{ width: 0 }}
                            animate={{ width: `${paintedPercent}%` }}
                        />
                        <div className="absolute bottom-4 left-4 text-white font-mono text-xs bg-black/50 px-2 py-1 rounded">Acoperire simulată: {Math.round(paintedPercent)}%</div>
                    </div>
                ) : (
                    <div className="w-3/4 h-3/4 border-2 border-dashed border-white/20 grid relative bg-neutral-900" style={{ gridTemplateColumns: `repeat(${Math.ceil(val1)}, 1fr)`, gridTemplateRows: `repeat(${Math.ceil(val2)}, 1fr)` }}>
                        {Array.from({ length: Math.ceil(val1 * val2) }).map((_, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, scale: 0.8 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                transition={{ delay: i * 0.02 }}
                                className="border-[0.5px] border-white/5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-amber-700/40 hover:bg-amber-600/60 transition-colors"
                            />
                        ))}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="bg-black/60 px-3 py-1 rounded text-white font-bold text-xs backdrop-blur">GRID {Math.ceil(val1)}x{Math.ceil(val2)}</span>
                        </div>
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-black/80 border border-white/10 px-3 py-1.5 rounded text-xs font-mono text-green-400 shadow-lg">
                    L:{val1}m x l:{val2}m = {area}m²
                </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-hornbach-orange to-orange-700 text-white rounded-xl shadow-2xl flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="flex justify-between items-end relative z-10">
                    <div>
                        <div className="text-xs uppercase font-bold opacity-80 mb-1 tracking-wider">{label}</div>
                        <div className="text-4xl md:text-5xl font-black tracking-tighter leading-none">{resultText}</div>
                    </div>
                    <div className="text-xs opacity-90 font-medium text-right leading-tight bg-black/20 px-3 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                        {secondaryResult}
                    </div>
                </div>
                <Button variant="secondary" size="md" className="mt-2 bg-white text-orange-700 hover:bg-gray-100 border-none w-full font-black shadow-lg" onClick={() => onNext(type === 'painting' ? (area * layers)/10 : area)}>
                    VALIDEAZĂ NECESARUL
                </Button>
            </div>
            </div>
        </div>
      </div>
    </ContentPanel>
  );
};

// --- SCENE 4: COLOR MIXER ---
export const ColorMixerScene: React.FC<{ onNext: (color: string) => void }> = ({ onNext }) => {
  const colors = [
    { hex: '#ffffff', name: 'Alb Polar' },
    { hex: '#e0e7ff', name: 'Albastru Gheață' },
    { hex: '#fef3c7', name: 'Crem Vanilie' },
    { hex: '#dcfce7', name: 'Verde Mentă' },
    { hex: '#475569', name: 'Gri Ardezie' },
    { hex: '#7f1d1d', name: 'Roșu Burgund' }
  ];
  const [selected, setSelected] = useState(colors[0]);

  return (
    <ContentPanel title="Centrul de Mixare Vopsele">
      <div className="p-8 flex flex-col h-full overflow-y-auto">
        <DialogBubble speaker="consultant" text="La Hornbach mixăm orice nuanță dorești. Alege o culoare din paletar pentru a vedea o simulare în timp real pe perete." />
        
        <div className="flex flex-col md:flex-row gap-6 items-stretch mt-6 shrink-0 min-h-[400px]">
            <div className="w-full md:w-1/3 bg-neutral-950/50 rounded-xl border border-white/5 p-5 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Paletar Culori</h3>
                {colors.map(c => (
                <button 
                    key={c.hex}
                    onClick={() => setSelected(c)}
                    className={`
                    p-3 rounded-lg flex items-center gap-3 transition-all group
                    ${selected.hex === c.hex ? 'bg-white text-black shadow-xl ring-2 ring-offset-2 ring-offset-black ring-white transform scale-105' : 'bg-neutral-800 hover:bg-neutral-700'}
                    `}
                >
                    <div className="w-8 h-8 rounded-full border border-gray-300 shadow-sm relative overflow-hidden" style={{ backgroundColor: c.hex }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide">{c.name}</span>
                </button>
                ))}
            </div>

            <div className="w-full md:w-2/3 relative rounded-xl overflow-hidden border-2 border-neutral-700 bg-neutral-800 shadow-2xl group">
                {/* Room Preview Image - High quality Unsplash */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-100 transition-transform duration-[10s] ease-linear group-hover:scale-110"></div>
                
                {/* Color Overlay with Multiply Blend Mode */}
                <motion.div 
                    className="absolute inset-0 z-10 mix-blend-multiply transition-colors duration-500"
                    style={{ backgroundColor: selected.hex }}
                />
                
                {/* Lighting Restore (optional, keeps highlights) */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-30 flex justify-between items-end">
                <div>
                    <div className="text-[10px] text-gray-300 uppercase tracking-widest mb-1">Nuanță Selectată</div>
                    <div className="text-2xl font-bold text-white leading-none">{selected.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono mt-1">HEX: {selected.hex}</div>
                </div>
                <Button size="md" onClick={() => onNext(selected.name)} className="shadow-lg border-white/20 border">
                    Mixează Această Culoare <RotateCcw size={14}/>
                </Button>
                </div>
            </div>
        </div>
      </div>
    </ContentPanel>
  );
};

// --- SCENE 5/8: TOOLS (Generic) ---
export const ToolsScene: React.FC<{ 
  projectType: ProjectType, 
  onNext: (tools: string[]) => void 
}> = ({ projectType, onNext }) => {
  const [collected, setCollected] = useState<string[]>([]);
  
  // Only for painting/garden, flooring has special scene
  const tools = {
    flooring: [],
    painting: [
      { id: 'p1', name: 'Set Trafalet', icon: <Brush size={24}/>, desc: "Microfibră + Grătar" },
      { id: 'p2', name: 'Bandă Mascare', icon: <RotateCcw size={24}/>, desc: "Protecție plinte/prize" },
      { id: 'p3', name: 'Amorsă Perete', icon: <Droplets size={24}/>, desc: "Egalizare absorbție" },
      { id: 'p4', name: 'Folie Protecție', icon: <ShieldCheck size={24}/>, desc: "Pentru mobilă/podea" },
    ],
    garden: [
      { id: 'g1', name: 'Mașină Tuns', icon: <Truck size={24}/>, desc: "Electrică sau benzină" },
      { id: 'g2', name: 'Trimmer Electric', icon: <Scissors size={24}/>, desc: "Pentru margini" },
      { id: 'g3', name: 'Îngrășământ', icon: <Droplets size={24}/>, desc: "Nutrienți gazon" },
      { id: 'g4', name: 'Mănuși Lucru', icon: <ShieldCheck size={24}/>, desc: "Protecție piele" },
    ]
  }[projectType];

  const toggle = (id: string) => {
    setCollected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <ContentPanel title="Selecție Unelte & Accesorii">
      <div className="p-8 flex flex-col h-full overflow-y-auto">
        <DialogBubble speaker="consultant" text="Proiectele reușite încep cu uneltele potrivite. Selectează din listă ce îți lipsește din trusă pentru a le adăuga la comandă." />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 shrink-0">
            {tools.map(t => {
            const isSelected = collected.includes(t.name);
            return (
                <motion.button
                key={t.id}
                onClick={() => toggle(t.name)}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.98 }}
                className={`
                    relative p-4 rounded-xl border flex items-center gap-4 text-left transition-all group
                    ${isSelected ? 'bg-neutral-800 text-white border-hornbach-orange shadow-lg shadow-orange-900/20' : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'}
                `}
                >
                <div className={`p-3 rounded-lg transition-colors ${isSelected ? 'bg-hornbach-orange text-white' : 'bg-neutral-900 text-gray-500 group-hover:text-gray-300'}`}>
                    {t.icon}
                </div>
                <div className="flex-1">
                    <div className="text-sm font-bold uppercase tracking-wide leading-tight mb-1">{t.name}</div>
                    <div className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors">{t.desc}</div>
                </div>
                {isSelected && (
                    <div className="absolute top-3 right-3 bg-white rounded-full p-0.5">
                        <Check size={12} className="text-hornbach-orange" strokeWidth={4}/>
                    </div>
                )}
                </motion.button>
            );
            })}
        </div>

        <div className="mt-auto flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-6 gap-4 pb-2">
            <div className="text-xs text-gray-400 bg-neutral-950 px-3 py-1 rounded-full border border-white/5">
                <span className="text-white font-bold mr-1">{collected.length}</span> articole selectate
            </div>
            <Button onClick={() => onNext(collected)} size="md" variant={collected.length > 0 ? 'primary' : 'outline'}>
                {collected.length > 0 ? 'Adaugă la Proiect' : 'Am deja uneltele'} <ArrowRight size={14}/>
            </Button>
        </div>
      </div>
    </ContentPanel>
  );
};

// --- SCENE 9: SERVICES ---
export const ServicesScene: React.FC<{ onNext: (services: string[]) => void }> = ({ onNext }) => {
  const [selected, setSelected] = useState<string[]>([]);
  
  const services = [
    { id: 'transport', title: 'Transport la Domiciliu', desc: 'Livrare rapidă direct la bordură (48h)', icon: <Truck size={28}/> },
    { id: 'montaj', title: 'Serviciu Montaj Autorizat', desc: 'Garanție extinsă 2 ani pentru manoperă', icon: <Wrench size={28}/> },
  ];

  const toggle = (id: string) => {
     setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <ContentPanel title="Servicii Hornbach">
      <div className="p-8 flex flex-col h-full overflow-y-auto">
        <DialogBubble speaker="consultant" text="La Hornbach suntem alături de tine până la final. Dorești ajutor cu transportul sau cu montajul profesionist?" />
        
        <div className="flex flex-col gap-4 mt-6 shrink-0">
            {services.map(s => (
            <Card 
                key={s.id} 
                selected={selected.includes(s.id)} 
                onClick={() => toggle(s.id)}
                className="flex flex-row items-center gap-5 bg-neutral-900/80 hover:bg-neutral-800 py-6 px-5 border-l-4"
            >
                <div className={`p-3 rounded-full shadow-lg ${selected.includes(s.id) ? 'bg-hornbach-orange text-white' : 'bg-neutral-800 text-gray-500'}`}>{s.icon}</div>
                <div>
                <h4 className="font-bold text-lg text-white mb-1">{s.title}</h4>
                <p className="text-xs text-gray-400">{s.desc}</p>
                </div>
            </Card>
            ))}
        </div>

        <div className="mt-auto pt-6 flex justify-end pb-2">
            <Button onClick={() => onNext(selected)} variant="success" size="lg" className="w-full sm:w-auto px-10 shadow-green-900/30 shadow-xl">
            Finalizează Consultanța <CheckCircle2 size={18} className="ml-2"/>
            </Button>
        </div>
      </div>
    </ContentPanel>
  );
};

// --- SCENE 10: SUMMARY ---
export const SummaryScene: React.FC<{ 
  state: any,
  onRestart: () => void 
}> = ({ state, onRestart }) => {
  
  return (
    <ContentPanel title="Sumar Proiect" fullHeight>
      <div className="p-8 flex flex-col h-full overflow-y-auto">
        <DialogBubble 
            speaker="consultant" 
            text="Excelent! Am configurat împreună lista completă pentru proiectul tău. Poți merge la casă cu acest bon digital sau poți plasa comanda online chiar acum." 
        />

        <div className="flex-grow flex items-center justify-center py-6 shrink-0">
            <div className="relative bg-[#fcfcfc] text-black p-8 rounded-sm shadow-2xl font-mono text-sm w-full max-w-sm transform rotate-1 hover:rotate-0 transition-transform duration-500 border-t border-white/40">
                {/* Receipt Texture */}
                <div className="absolute top-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#e5e5e5_5px,#e5e5e5_10px)] opacity-50"></div>

                <div className="text-center border-b-4 border-black pb-4 mb-4 mt-2">
                    <h2 className="text-3xl font-black tracking-tighter">HORNBACH</h2>
                    <p className="text-[10px] uppercase mt-1 text-gray-600 font-bold tracking-widest">Bon de Consultanță Virtuală</p>
                    <div className="text-[10px] text-gray-500 mt-2">{new Date().toLocaleString('ro-RO')}</div>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                    <div className="flex justify-between font-bold text-base border-b-2 border-dashed border-gray-300 pb-2 mb-2">
                    <span className="uppercase">{state.projectType === 'flooring' ? 'Parchet' : state.projectType === 'painting' ? 'Vopsea' : 'Grădină'}</span>
                    <span>{state.projectType === 'painting' ? `${state.sqm} L` : `${(state.sqm * 1.1).toFixed(1)} m²`}</span>
                    </div>
                    
                    {state.selectedProduct && (
                        <div className="flex justify-between pl-2 text-gray-800 py-1 bg-gray-100 rounded px-2">
                            <span className="font-bold text-gray-500">PRODUS</span>
                            <span className="font-black uppercase text-right">{state.selectedProduct.name}</span>
                        </div>
                    )}

                    {state.selectedColor && (
                        <div className="flex justify-between pl-2 text-gray-800 py-1 bg-gray-100 rounded px-2">
                            <span className="font-bold text-gray-500">MIXARE CULOARE</span>
                            <span className="font-black uppercase">{state.selectedColor}</span>
                        </div>
                    )}

                    {state.cart.length > 0 && (
                        <div className="pt-2">
                            <div className="font-bold text-[10px] uppercase text-gray-400 mb-1 border-b border-gray-100">Articole / Unelte</div>
                            {state.cart.map((tool: string, i: number) => (
                                <div key={i} className="flex justify-between pl-2 py-1 border-b border-dashed border-gray-200 last:border-0">
                                    <span>{tool}</span>
                                    <span className="font-bold">1 buc</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {state.selectedServices.length > 0 && (
                    <div className="pt-2 border-t-2 border-dashed border-gray-300 mt-3">
                        <div className="font-bold text-[10px] uppercase text-gray-400 mb-1">Servicii Adăugate</div>
                        {state.selectedServices.map((s: string) => (
                            <div key={s} className="flex justify-between pl-2 text-black font-bold py-1 bg-orange-50 rounded mb-1 px-2">
                                <span className="uppercase">{s === 'transport' ? 'Transport Rapid' : 'Montaj Pro'}</span>
                                <span>DA</span>
                            </div>
                        ))}
                    </div>
                    )}
                </div>

                <div className="mt-8 pt-4 border-t-4 border-black text-center">
                    <div className="text-[9px] uppercase text-gray-500 mb-1 font-bold">Cod Unic Proiect</div>
                    <div className="font-black text-3xl tracking-widest text-hornbach-orange">HB-{Math.floor(Math.random()*9000)+1000}</div>
                    <div className="text-[9px] text-gray-400 mt-2">Prezintă acest cod la casa de marcat.</div>
                </div>
                
                {/* Barcode fake */}
                <div className="h-10 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAYAAAD5PA/NAAAAFklEQVR42mN88P//fwYGBgYGBgYGBgYAJlAE+Qn5+wYAAAAASUVORK5CYII=')] bg-repeat-x mt-6 w-full opacity-40"></div>
            </div>
        </div>

        <div className="flex justify-center pb-4">
            <Button variant="secondary" size="sm" onClick={onRestart} className="hover:bg-white hover:text-black"><RotateCcw size={14}/> Începe Un Nou Proiect</Button>
        </div>
      </div>
    </ContentPanel>
  );
};
