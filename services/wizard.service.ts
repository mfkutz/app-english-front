import { api } from "./api";

export interface WizardStatus {
  needsWizard: boolean;
  hasName: boolean;
  currentName: string;
}

export interface WizardData {
  name: string;
  appLanguage?: "es" | "en" | "pt";
  englishLevel?: "beginner" | "intermediate" | "advanced";
  goals?: string[];
  dailyPracticeGoal?: number;
  wantsNotifications?: boolean;
}

export const wizardService = {
  async checkStatus(): Promise<WizardStatus> {
    const response = await api.get("/wizard/status");
    return response.data.data;
  },

  async update(data: Partial<WizardData>): Promise<any> {
    const response = await api.patch("/wizard", data);
    return response.data;
  },

  async complete(data: WizardData): Promise<any> {
    const response = await api.post("/wizard/complete", data);
    return response.data;
  },
};
