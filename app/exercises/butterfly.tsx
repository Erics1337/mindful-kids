import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui';
import { Card } from '@/components/ui/card';
import { router } from 'expo-router';
import { ChevronLeft } from '@/components/Icons';
import { ButterflyGarden } from '@/components/ButterflyGarden';

export default function ButterflyGardenExercise() {
  return (
    <ScrollView className="flex-1 bg-gradient-from-purple-50 bg-gradient-to-purple-100">
      <View className="p-6">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="flex-row items-center mb-8"
        >
          <ChevronLeft className="w-5 h-5 mr-2 text-purple-600" />
          <Text className="text-purple-600">Back to Exercises</Text>
        </TouchableOpacity>

        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-purple-900 mb-4 text-center">
            Butterfly Garden Meditation
          </Text>
          <Text className="text-lg text-purple-700 text-center">
            Welcome to your peaceful garden! Create your own butterfly sanctuary 
            and follow their gentle movements for a calming meditation experience.
          </Text>
        </View>

        <ButterflyGarden />

        <Card className="mt-12 p-6 bg-white">
          <Text className="text-2xl font-bold text-purple-900 mb-4">How to Practice</Text>
          <View className="space-y-4">
            <View className="flex-row">
              <Text className="font-bold mr-2 text-purple-700">1.</Text>
              <Text className="text-purple-700">Tap anywhere in the garden to add butterflies</Text>
            </View>
            <View className="flex-row">
              <Text className="font-bold mr-2 text-purple-700">2.</Text>
              <Text className="text-purple-700">Press the Start button when you're ready</Text>
            </View>
            <View className="flex-row">
              <Text className="font-bold mr-2 text-purple-700">3.</Text>
              <Text className="text-purple-700">Follow the butterflies with your eyes as they float around</Text>
            </View>
            <View className="flex-row">
              <Text className="font-bold mr-2 text-purple-700">4.</Text>
              <Text className="text-purple-700">Take slow, deep breaths as you watch their gentle movements</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
