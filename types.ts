
export interface Resource {
  title: string;
  url: string;
}

export interface WellnessResponse {
  visualInterpretation: string;
  symptomSummary: string;
  wellnessSuggestions: string[];
  trackableSummary: string;
  disclaimer: string;
  trustedResources?: Resource[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type Page = 'HOME' | 'ABOUT' | 'FEATURES' | 'PRIVACY' | 'TERMS' | 'CONTACT' | 'TESTIMONIALS' | 'COOKIE_POLICY' | 'DISCLAIMER' | 'HOW_IT_WORKS';
