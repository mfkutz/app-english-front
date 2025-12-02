import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/common/Button";
import { useAuthStore } from "../../store/useAuthStore";

export default function HomeScreen() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome{user?.name ? `, ${user.name}` : ""}! 👋</Text>
          <Text style={styles.subtitle}>Ready to practice English?</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {user?.dailyMinutesUsed || 0}/{user?.dailyPracticeGoal || 10}
              </Text>
              <Text style={styles.statLabel}>Today's Minutes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.streak || 0}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.level || "A1"}</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.totalMinutes || 0}</Text>
              <Text style={styles.statLabel}>Total Minutes</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Button
            title="Start Practice Session"
            onPress={() => router.push("/(tabs)/practice")}
            variant="primary"
            style={styles.button}
          />
          <Button
            title="Browse Topics"
            onPress={() => router.push("/(tabs)/topics")}
            variant="outline"
            style={styles.button}
          />
          <Button
            title="View Progress Details"
            onPress={() => router.push("/(tabs)/progress")}
            variant="outline"
            style={styles.button}
          />
        </View>

        {/* User Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Profile</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>

            <Text style={styles.infoLabel}>Plan</Text>
            <View style={styles.planBadge}>
              <Text style={styles.planText}>{user?.plan === "premium" ? "Premium 🚀" : "Free"}</Text>
            </View>

            <Text style={styles.infoLabel}>English Level</Text>
            <Text style={styles.infoValue}>{user?.englishLevel || "Not set"}</Text>

            <Text style={styles.infoLabel}>Goals</Text>
            <Text style={styles.infoValue}>{user?.goals?.length > 0 ? user.goals.join(", ") : "No goals set"}</Text>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.footer}>
          <Button title="Logout" onPress={logout} variant="secondary" size="small" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  button: {
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  planBadge: {
    backgroundColor: "#F0F7FF",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  planText: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
});
