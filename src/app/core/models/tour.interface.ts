interface ITourStep {
  tourStepTitle: string;
  tourStepDescription: string;
}

interface ITourInfo {
  id: string;
  tourTitle: string;
  tourMainDescription: string;
  tourMainImage: string;
}

interface ITourPricing {
  tourPriceAdult: number | null;
  tourPriceChild: number | null;
}

interface ITourMeta {
  tourActive: boolean;
  tourLocation: string;
  tourType: string[];
  tourLanguage?: {
    primaryLanguage: string;
    secondaryLanguage: string;
  };
  tourStartAt: string;
  tourFinishAt: string;
}

export interface ITour extends ITourInfo, ITourPricing, ITourMeta {
  steps: ITourStep[]; // Add steps array
}
