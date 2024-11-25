import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui';
import { Card } from '@/components/ui/card';
import { router } from 'expo-router';
import { ChevronLeft } from '@/components/Icons';
import { SleepyStars } from '@/components/SleepyStars';

export default function SleepyStarsScreen() {
  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900">
      <View className="p-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center mb-8"
        >
          <ChevronLeft className="w-5 h-5 text-purple-200" />
          <Text className="ml-2 text-purple-200">
            Back to Exercises
          </Text>
        </TouchableOpacity>

        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-white mb-4">
            Sleepy Stars Meditation
          </Text>
          <Text className="text-lg text-purple-200 text-center">
            Let the twinkling stars guide you into a peaceful state of relaxation
            as you prepare for sweet dreams.
          </Text>
        </View>

        <SleepyStars />

        <Card className="mt-12 p-6 bg-white/10">
          <Text className="text-2xl font-bold text-white mb-4">How to Practice</Text>
          <View className="space-y-4">
            <View className="flex-row">
              <Text className="text-purple-200 font-bold mr-2">1.</Text>
              <Text className="text-purple-200">
                Make yourself comfortable in a quiet space
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-purple-200 font-bold mr-2">2.</Text>
              <Text className="text-purple-200">
                Press Start when you're ready to begin
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-purple-200 font-bold mr-2">3.</Text>
              <Text className="text-purple-200">
                Watch the stars twinkle and breathe slowly
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-purple-200 font-bold mr-2">4.</Text>
              <Text className="text-purple-200">
                Let your thoughts drift away like shooting stars
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
