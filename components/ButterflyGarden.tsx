import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from '@/components/ui';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { Bug, Flower } from '@/components/Icons';
import { Button } from '@/components/ui/button';

interface Butterfly {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GARDEN_HEIGHT = 600;

export function ButterflyGarden() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const addButterfly = (event: any) => {
    const { locationX: x, locationY: y } = event.nativeEvent;
    
    const newButterfly: Butterfly = {
      id: Date.now(),
      x,
      y,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
    };
    
    setButterflies(prev => [...prev, newButterfly]);
  };

  // Flower animation
  const FlowerComponent = ({ index }: { index: number }) => {
    const flowerStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateY: withRepeat(
            withSequence(
              withTiming(-10, { duration: 1000 }),
              withTiming(0, { duration: 1000 })
            ),
            -1
          )},
          { rotate: `${index * 20}deg` }
        ]
      };
    });

    return (
      <Animated.View style={flowerStyle}>
        <Flower className="w-12 h-12 text-purple-400" />
      </Animated.View>
    );
  };

  // Butterfly animation
  const ButterflyComponent = ({ butterfly }: { butterfly: Butterfly }) => {
    const butterflyStyle = useAnimatedStyle(() => {
      if (!isPlaying) {
        return {
          transform: [
            { translateX: butterfly.x - 20 },
            { translateY: butterfly.y - 20 },
            { scale: butterfly.scale },
            { rotate: '45deg' }
          ]
        };
      }

      return {
        transform: [
          { translateX: withRepeat(
            withSequence(
              withTiming(butterfly.x + 100, { duration: 2000 }),
              withTiming(butterfly.x - 100, { duration: 2000 }),
              withTiming(butterfly.x, { duration: 2000 })
            ),
            -1
          )},
          { translateY: withRepeat(
            withSequence(
              withTiming(butterfly.y - 50, { duration: 2000 }),
              withTiming(butterfly.y + 50, { duration: 2000 }),
              withTiming(butterfly.y, { duration: 2000 })
            ),
            -1
          )},
          { rotate: withRepeat(
            withSequence(
              withTiming('45deg', { duration: 2000 }),
              withTiming('-45deg', { duration: 2000 }),
              withTiming('45deg', { duration: 2000 })
            ),
            -1
          )},
          { scale: butterfly.scale }
        ]
      };
    });

    return (
      <Animated.View style={[{ position: 'absolute' }, butterflyStyle]}>
        <Bug className="w-10 h-10 text-purple-600" />
      </Animated.View>
    );
  };

  // Progress bar animation
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(
        isPlaying ? '100%' : '0%',
        { duration: 600000, easing: Easing.linear }
      ),
    };
  });

  return (
    <View className="w-full">
      <View className="absolute top-4 left-4 z-10">
        <Button
          onPress={() => setIsPlaying(!isPlaying)}
          className="bg-purple-600"
        >
          <Text className="text-white font-semibold">
            {isPlaying ? 'Pause' : 'Start'} Meditation
          </Text>
        </Button>
      </View>

      <TouchableOpacity
        onPress={addButterfly}
        className="h-[600px] bg-gradient-to-b from-purple-100 to-purple-50 rounded-3xl overflow-hidden"
      >
        {/* Garden Elements */}
        <View className="absolute bottom-0 w-full">
          <View className="flex-row justify-around">
            {[...Array(5)].map((_, i) => (
              <FlowerComponent key={i} index={i} />
            ))}
          </View>
        </View>

        {/* Butterflies */}
        {butterflies.map((butterfly) => (
          <ButterflyComponent key={butterfly.id} butterfly={butterfly} />
        ))}

        {/* Instructions */}
        {butterflies.length === 0 && (
          <View className="absolute inset-0 items-center justify-center p-4">
            <Text className="text-xl text-purple-600 font-medium text-center">
              Tap anywhere in the garden to add butterflies,{'\n'}then start the meditation
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Meditation Progress */}
      {isPlaying && (
        <View className="mt-6 px-4">
          <View className="bg-white rounded-full h-2 overflow-hidden">
            <Animated.View
              className="h-full bg-purple-600"
              style={progressStyle}
            />
          </View>
          <Text className="text-center mt-2 text-purple-600">
            Follow the butterflies with your eyes and take deep breaths
          </Text>
        </View>
      )}
    </View>
  );
}
