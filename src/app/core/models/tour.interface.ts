interface ITourInfo {
  id: number;
  tourTitle: string;
  tourMainDescription: string;
  tourStepOne: string;
  tourStepTwo: string;
}

interface ITourPricing {
  tourPriceAdult: number;
  tourPriceChild?: number; // Optional, if needed in future
}

interface ITourMeta {
  tourLocation: string;
  tourType: string[]; // e.g., ['Halfday', 'Fullday']
  tourLanguage: string[]; // e.g., ['English', 'Italian']
}

export interface ITour extends ITourInfo, ITourPricing, ITourMeta {}
