import { Stack } from 'expo-router';

export default function ExercisesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="butterfly"
        options={{
          title: "Butterfly Garden",
          presentation: 'modal',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="breathing"
        options={{
          title: "Peaceful Breathing",
          presentation: 'modal',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="stars"
        options={{
          title: "Sleepy Stars",
          presentation: 'modal',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
