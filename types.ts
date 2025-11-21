
export enum SceneStep {
  INTRO = 0,
  PROJECT_SELECT = 1,
  MEETING = 2,        // New: Greeting & Intent
  ASSESSMENT = 3,     // Diagnosis
  DEMOLITION = 4,     // New: Removal Tools
  SUPPORT_CHECK = 5,  // New: Screed check
  PRODUCT_SELECT = 6, // New: Brand selection
  CALCULATOR = 7,     // Measurements
  INSTALLATION = 8,   // New: Installation Tools + Steps
  SERVICES = 9,
  SUMMARY = 10,

  // Variants for other flows if needed
  COLOR_MIXER = 11, 
  TOOLS_GENERIC = 12
}

export type ProjectType = 'flooring' | 'painting' | 'garden';

export interface ProductOption {
  id: string;
  name: string;
  category: 'floor' | 'paint' | 'garden_tool' | 'accessory';
  description: string;
  price: number;
  unit: string; // 'm²', 'L', 'buc'
  image: string;
  features?: string[];
}

export interface AppState {
  currentStep: SceneStep;
  projectType: ProjectType | null;
  
  // Project Specific Data
  floorDiagnosis: 'swollen' | 'old' | 'squeaky' | null;
  wallDiagnosis: 'fresh' | 'stained' | 'mold' | null;
  gardenType: 'lawn' | 'terrace' | null;

  // Measurements
  sqm: number; // Used for Floor and Wall area
  gardenSize: number; // Used for Garden

  // Selections
  selectedProduct: ProductOption | null;
  selectedColor: string | null; // For Paint
  cart: string[]; // IDs of collected tools/items
  selectedServices: string[]; // Transport, Montaj, etc.
}
