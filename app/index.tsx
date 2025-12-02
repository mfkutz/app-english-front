// import { useAuthStore } from "@/store/useAuthStore";
// import { Redirect } from "expo-router";
// import { ActivityIndicator, View } from "react-native";

// export default function Index() {
//   const { isAuthenticated, isLoading } = useAuthStore();

//   // Mostrar loading mientras verifica autenticación
//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   // Redirigir basado en autenticación
//   if (isAuthenticated) {
//     return <Redirect href="/(tabs)" />;
//   } else {
//     return <Redirect href="/(auth)/login" />;
//   }
// }

import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/welcome" />;
}
