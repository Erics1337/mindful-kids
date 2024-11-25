import React from 'react';
import { View, ScrollView, Image, Pressable } from 'react-native';
import { Text } from '@/components/ui';
import { Link, router } from 'expo-router';
import { Card } from '@/components/ui/card';

const exercises = [
  {
    title: "Peaceful Breathing",
    duration: "5 minutes",
    image: "https://images.unsplash.com/photo-1602192509154-0b900ee1f851?auto=format&fit=crop&q=80&w=1000",
    route: "/exercises/breathing"
  },
  {
    title: "Butterfly Garden",
    duration: "10 minutes",
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&q=80&w=1000",
    route: "/exercises/butterfly"
  },
  {
    title: "Sleepy Stars",
    duration: "15 minutes",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1000",
    route: "/exercises/stars"
  }
];

export default function ExercisesScreen() {
  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Text className="text-2xl font-bold mb-6">Mindfulness Exercises</Text>
      
      <View className="space-y-4">
        {exercises.map((exercise, index) => (
          <Pressable
            key={index}
            onPress={() => router.push(exercise.route)}
          >
            <Card className="overflow-hidden">
              <Image
                source={{ uri: exercise.image }}
                className="w-full h-48"
                resizeMode="cover"
              />
              <View className="p-4">
                <Text className="text-lg font-semibold">{exercise.title}</Text>
                <Text className="text-muted-foreground">{exercise.duration}</Text>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
