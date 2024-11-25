import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui';
import { Card } from '@/components/ui/card';
import { router } from 'expo-router';
import { ChevronLeft, Fan } from '@/components/Icons';
import PeacefulBreathing from '@/components/PeacefulBreathing';

export default function PeacefulBreathingPage() {
  return (
    <ScrollView className="flex-1 bg-gradient-from-blue-50 bg-gradient-to-purple-50">
      <View className="p-6">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="flex-row items-center mb-8"
        >
          <ChevronLeft className="w-5 h-5 mr-2 text-purple-600" />
          <Text className="text-purple-600">Back to Exercises</Text>
        </TouchableOpacity>

        <View className="items-center mb-8">
          <View className="mb-4">
            <Fan className="w-12 h-12 text-purple-600" />
          </View>
          <Text className="text-3xl font-bold text-purple-900 mb-4 text-center">
            Peaceful Breathing
          </Text>
          <Text className="text-lg text-purple-700 text-center">
            Follow the gentle rhythm of your breath with this calming exercise.{'\n'}
            Let each breath bring you deeper into relaxation.
          </Text>
        </View>

        <PeacefulBreathing />

        <Card className="mt-12 p-6 bg-white">
          <Text className="text-2xl font-bold text-purple-900 mb-4">Benefits of Deep Breathing</Text>
          <View className="space-y-4">
            <View className="flex-row">
              <Text className="font-bold mr-2 text-purple-700">•</Text>
              <Text className="text-purple-700">Helps calm your mind and reduce stress</Text>
            </View>
            <View className="flex-row">
              <Text className="font-bold mr-2 text-purple-700">•</Text>
              <Text className="text-purple-700">Improves focus and concentration</Text>
            </View>
            <View className="flex-row">
              <Text className="font-bold mr-2 text-purple-700">•</Text>
              <Text className="text-purple-700">Increases oxygen flow throughout your body</Text>
            </View>
            <View className="flex-row">
              <Text className="font-bold mr-2 text-purple-700">•</Text>
              <Text className="text-purple-700">Promotes better sleep and relaxation</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
