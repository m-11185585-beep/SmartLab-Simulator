
export type Language = 'en' | 'ms' | 'bi';

export enum FormLevel {
  Form1 = 1,
  Form2 = 2,
  Form3 = 3,
  Form4 = 4,
  Form5 = 5
}

export type Subject = 'General' | 'Biology' | 'Physics' | 'Chemistry';

export interface User {
  name: string;
  language: Language;
  xp: number;
  level: number;
  badges: string[];
  completedExperiments: string[]; // IDs
  completedQuizzes: string[]; // IDs
}

export type SimType = 'shadow' | 'ph' | 'motion' | 'growth' | 'density' | 'lens' | 'cell' | 'states' | 'circuit' | 'foodTest' | 'diffusion' | 'solubility' | 'electromagnet' | 'tropism' | 'respiration' | 'transpiration' | 'exoEndo' | 'circuitSP' | 'heart' | 'transformer' | 'titration' | 'electrolysis' | 'rateConc' | 'latex' | 'osmosis' | 'enzyme' | 'yeast' | 'calorimetry' | 'generic' | 'inheritance' | 'translocation' | 'elasticity' | 'pressure' | 'decay' | 'soap' | 'rusting' | 'ester' | 'pollution';

export interface SimulationConfig {
  type: SimType;
  defaultValues: Record<string, number>;
  labels: Record<string, string>; // mapping variable keys to display names
  minMax: Record<string, [number, number]>; // [min, max] for sliders
}

export interface Experiment {
  id: string;
  form: FormLevel;
  subject: Subject;
  title: { en: string; ms: string };
  objective: { en: string; ms: string };
  variables: {
    manipulated: { en: string; ms: string };
    responding: { en: string; ms: string };
    controlled: { en: string; ms: string };
  };
  steps: { en: string[]; ms: string[] };
  conclusion: { en: string; ms: string };
  simulation: SimulationConfig;
}

export interface QuizQuestion {
  id: string;
  question: { en: string; ms: string };
  options: { en: string; ms: string }[]; // Array of bilingual options
  correctIndex: number;
  explanation: { en: string; ms: string };
  xp: number;
}

export interface Quiz {
  id: string;
  form: FormLevel;
  subject: Subject;
  title: { en: string; ms: string };
  questions: QuizQuestion[];
}

export interface Translation {
  [key: string]: {
    en: string;
    ms: string;
  };
}
