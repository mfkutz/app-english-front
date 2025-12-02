import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/common/Button";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Imagen */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🎯</Text>
          <Text style={styles.appName}>English Practice</Text>
          <Text style={styles.tagline}>Speak English confidently</Text>
        </View>

        {/* Ilustración/Texto */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Start Your Journey</Text>
          <Text style={styles.heroSubtitle}>
            Practice English conversations with AI, get instant feedback, and become fluent faster.
          </Text>
        </View>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Get Started"
            onPress={() => router.push("/signup-options")}
            variant="primary"
            size="large"
            style={styles.button}
          />

          <Button
            title="I already have an account"
            onPress={() => router.push("/(auth)/login")}
            variant="outline"
            size="large"
            style={styles.button}
          />
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#666",
  },
  heroSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 12,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonsContainer: {
    width: "100%",
  },
  button: {
    marginBottom: 12,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 16,
    marginTop: 16,
  },
});
