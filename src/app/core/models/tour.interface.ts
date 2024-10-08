interface ITourStep {
  tourStepTitle: string;
  tourStepDescription: string;
}

interface ITourInfo {
  id: string;
  tourTitle: string;
  tourMainDescription: string;
}

interface ITourPricing {
  tourPriceAdult: number | null;
  tourPriceChild: number | null;
}

interface ITourMeta {
  tourActive: boolean;
  tourLocation: string;
  tourType: string[]; // e.g., ['Halfday', 'Fullday']
  tourLanguage?: string[]; // e.g., ['English', 'Italian']
  tourStartAt: string; // Start time, e.g., '10:00 AM'
  tourFinishAt: string; // Finish time, e.g., '2:00 PM'
}

export interface ITour extends ITourInfo, ITourPricing, ITourMeta {
  steps: ITourStep[]; // Add steps array
}
