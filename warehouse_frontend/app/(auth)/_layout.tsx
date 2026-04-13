import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" options={{ headerShown: false, gestureEnabled: true }}/>
      <Stack.Screen name="signup" options={{ headerShown: false, gestureEnabled: true }}/>
    </Stack>
  );
}