import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useWizard } from "../hooks/useWizard";
import { useAuthStore } from "../store/useAuthStore";

export default function Index() {
  useEffect(() => {
    // TEMPORAL: Limpiar auth en desarrollo
    if (__DEV__) {
      const resetAuth = async () => {
        console.log("DEBUG: Resetting auth for development...");
        await AsyncStorage.removeItem("auth-storage");
        await AsyncStorage.removeItem("auth_token");
      };
      resetAuth();
    }
  }, []);

  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const { checkStatus } = useWizard();
  const [wizardStatus, setWizardStatus] = useState<{
    needsWizard: boolean;
    hasName: boolean;
  } | null>(null);

  useEffect(() => {
    const verifyWizard = async () => {
      if (isAuthenticated && !authLoading) {
        try {
          const status = await checkStatus();
          setWizardStatus({
            needsWizard: status.needsWizard,
            hasName: status.hasName,
          });
        } catch (error) {
          console.error("Error checking wizard:", error);
          setWizardStatus({ needsWizard: true, hasName: false });
        }
      }
    };

    verifyWizard();
  }, [isAuthenticated, authLoading]);

  // Mostrar loading mientras verifica autenticación
  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // No autenticado → ir a welcome
  if (!isAuthenticated) {
    return <Redirect href="/welcome" />;
  }

  // Aún verificando wizard
  if (wizardStatus === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Autenticado pero necesita wizard → ir a wizard
  if (wizardStatus.needsWizard) {
    return <Redirect href="/wizard" />;
  }

  // Autenticado y wizard completado → ir a tabs
  return <Redirect href="/(tabs)" />;
}
