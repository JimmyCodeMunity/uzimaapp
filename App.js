import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigation from "./navigation/StackNavigation";
import { PlanProvider } from "./context/PaymentPlanContext";

export default function App() {
  return (
    <PlanProvider>
      <StackNavigation />
    </PlanProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
