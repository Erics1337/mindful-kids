import {View, ScrollView, Pressable} from "react-native";
import {useScrollToTop} from "@react-navigation/native";
import {FlashList} from "@shopify/flash-list";
import {eq} from "drizzle-orm";
import {Link, Stack} from "expo-router";
import * as React from "react";
import {useLiveQuery} from "drizzle-orm/expo-sqlite";

import {Text} from "@/components/ui/text";
import {habitTable} from "@/db/schema";
import {Plus} from "@/components/Icons";
import {useMigrationHelper} from "@/db/drizzle";
import {useDatabase} from "@/db/provider";
import {HabitCard} from "@/components/habit";
import type {Habit} from "@/lib/storage";
import {Card} from "@/components/ui/card";
import {Star, Heart, Cloud} from "@/components/Icons";

const achievements = [
  {
    icon: Star,
    title: "Star Breather",
    color: "text-yellow-500"
  },
  {
    icon: Heart,
    title: "Kind Heart",
    color: "text-pink-500"
  },
  {
    icon: Cloud,
    title: "Peace Cloud",
    color: "text-blue-500"
  }
];

export default function Home() {
  const {success, error} = useMigrationHelper();

  if (error) {
    return (
      <View className="flex-1 gap-5 p-6 bg-secondary/30">
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View className="flex-1 gap-5 p-6 bg-secondary/30">
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: "Mindful Kids",
        }}
      />
      
      <View className="p-6">
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold mb-4">Welcome, Little Explorer!</Text>
          <Text className="text-lg text-muted-foreground">Let's practice mindfulness together 🌟</Text>
        </View>

        <View className="mb-8">
          <Text className="text-2xl font-bold mb-6">Your Achievements</Text>
          <View className="flex-row justify-between">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="flex-1 mx-1 items-center p-4 bg-card">
                  <Icon className={`h-8 w-8 ${achievement.color} mb-2`} />
                  <Text className="text-sm font-medium text-center">{achievement.title}</Text>
                </Card>
              );
            })}
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg text-muted-foreground">
            Tip: Take deep breaths and relax your mind. You're doing great! 🌈
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
