import { useState } from "react";
import { wizardService } from "../services/wizard.service";
import { useAuthStore } from "../store/useAuthStore";

export const useWizard = () => {
  const { setWizardCompleted } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const checkStatus = async () => {
    try {
      const status = await wizardService.checkStatus();
      return status;
    } catch (err: any) {
      setError(err.message);
      return { needsWizard: true, hasName: false, currentName: "" };
    }
  };

  const completeWizard = async (data: any) => {
    try {
      const response = await wizardService.complete(data);

      if (response.success) {
        setWizardCompleted(response.data.user);
        return { success: true, user: response.data.user };
      } else {
        throw new Error(response.message);
      }
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  return {
    checkStatus,
    completeWizard,
    error,
    clearError: () => setError(null),
  };
};
