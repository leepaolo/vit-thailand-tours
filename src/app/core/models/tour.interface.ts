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
  tourType: string[];
  tourLanguage?: string[];
  tourStartAt: string;
  tourFinishAt: string;
}

export interface ITour extends ITourInfo, ITourPricing, ITourMeta {
  steps: ITourStep[]; // Add steps array
}
