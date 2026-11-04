import { Stack } from "expo-router";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="language"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="register"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="reading"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="lessons"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="lessons/[id]"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Game"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="progress"
          options={{ headerShown: false }}
        />
      </Stack>
    </LanguageProvider>
  );
}