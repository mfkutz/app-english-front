import { googleAuthService } from "@/services/google.auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { authService, UserProfile } from "../services/auth.service";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  updateUser: (userData: Partial<UserProfile>) => Promise<void>;
}

console.log("INgresando al store");

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        console.log("Ingresando al login...");
        set({ isLoading: true });
        try {
          const response = await authService.login({ email, password });

          if (response.success) {
            set({
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
            });

            // Guardar token en AsyncStorage (ya lo hace persist)
            await AsyncStorage.setItem("auth_token", response.data.token);
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          console.error("ERROR LOGIN");
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authService.register({
            email,
            password,
            name: "", // Enviar nombre vacío
          });

          if (response.success) {
            set({
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
            });

            await AsyncStorage.setItem("auth_token", response.data.token);
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        console.log("Cerrando sesión...");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });

        AsyncStorage.removeItem("auth_token");
      },

      loadUser: async () => {
        console.log("Cargando usuario...");
        const token = await AsyncStorage.getItem("auth_token");
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        set({ isLoading: true });
        try {
          const response = await authService.getProfile();

          if (response.success) {
            set({
              user: response.data.user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            await AsyncStorage.removeItem("auth_token");
            set({ isAuthenticated: false });
          }
        } catch (error) {
          await AsyncStorage.removeItem("auth_token");
          set({ isAuthenticated: false, isLoading: false });
        }
      },

      updateUser: async (userData: Partial<UserProfile>) => {
        console.log("Actualizando perfil...");
        try {
          const response = await authService.updateProfile(userData);

          if (response.success && response.data.user) {
            set({ user: response.data.user });
          }
        } catch (error) {
          throw error;
        }
      },

      // En useAuthStore.ts
      loginWithGoogle: async () => {
        set({ isLoading: true });
        try {
          // TODO: Implementar Google Sign-In
          const { token, user } = await googleAuthService.signInWithGoogle();

          // Guardar token y usuario
          set({
            user: {
              id: user.id,
              email: user.email,
              name: user.name || "",
              // ... otros campos
            },
            token,
            isAuthenticated: true,
            isLoading: false,
          });

          await AsyncStorage.setItem("auth_token", token);
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
