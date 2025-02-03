import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add"
        options={{
          title: 'Add New',
        }}
      />
      <Stack.Screen
        name="statistics"
        options={{ headerShown: false }}
      />
    </Stack>
}
