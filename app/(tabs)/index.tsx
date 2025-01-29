import { StyleSheet, Text, View } from "react-native";
import ThemedText from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedText type="header" color="focused"></ThemedText> 
      <StatusBar backgroundColor="rgba(33, 33, 33, 0.18)" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
