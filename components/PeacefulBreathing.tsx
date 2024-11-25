import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Fan } from '@/components/Icons';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_CIRCLE_SIZE = Math.min(300, SCREEN_WIDTH * 0.8);

const PeacefulBreathing: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCount((prev) => (prev + 1) % 16);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (count < 4) setPhase('inhale');
    else if (count < 7) setPhase('hold');
    else if (count < 11) setPhase('exhale');
    else {
      setPhase('rest');
      if (count === 15) {
        setCycles(prev => prev + 1);
      }
    }
  }, [count]);

  const getInstructions = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe Out...';
      case 'rest': return 'Rest...';
    }
  };

  const getCircleScale = (circleIndex: number) => {
    'worklet';
    const baseScale = 1 - circleIndex * 0.2;
    switch (phase) {
      case 'inhale':
        return baseScale * 1.3;
      case 'exhale':
        return baseScale * 0.7;
      default:
        return baseScale;
    }
  };

  // Animated circle component
  const BreathingCircle = ({ index }: { index: number }) => {
    const circleStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: withTiming(getCircleScale(index), {
              duration: phase === 'inhale' || phase === 'exhale' ? 4000 : 500,
              easing: Easing.inOut(Easing.ease),
            })
          },
        ],
        width: BASE_CIRCLE_SIZE - index * 60,
        height: BASE_CIRCLE_SIZE - index * 60,
        borderRadius: (BASE_CIRCLE_SIZE - index * 60) / 2,
        borderWidth: 2,
        borderColor: `rgb(${147 - index * 30}, ${51}, ${255 - index * 30})`,
        position: 'absolute',
        left: -(BASE_CIRCLE_SIZE - index * 60) / 2,
        top: -(BASE_CIRCLE_SIZE - index * 60) / 2,
      };
    }, [phase]);

    return <Animated.View style={circleStyle} />;
  };

  // Wind icon animation
  const windStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: withTiming(`${phase === 'inhale' ? 180 : phase === 'exhale' ? 0 : 90}deg`, { duration: 2000 }) },
        { scale: withTiming(phase === 'hold' ? 1.2 : 1, { duration: 500 }) },
      ],
    };
  }, [phase]);

  // Tip text animation
  const tipStyle = useAnimatedStyle(() => {
    return {
      opacity: withRepeat(
        withSequence(
          withTiming(0.7, { duration: 2000 }),
          withTiming(1, { duration: 2000 }),
          withTiming(1, { duration: 2000 }),
          withTiming(0.7, { duration: 2000 })
        ),
        -1
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
            {isPlaying ? 'Pause' : 'Start'} Breathing
          </Text>
        </Button>
      </View>

      <View className="h-[600px] bg-gradient-to-b from-blue-50 to-purple-50 rounded-3xl overflow-hidden">
        <View className="flex-1 items-center justify-center">
          {/* Breathing circles */}
          <View className="w-1 h-1">
            {[0, 1, 2].map((i) => (
              <BreathingCircle key={i} index={i} />
            ))}

            {/* Center wind icon */}
            <Animated.View style={[{ position: 'absolute', left: -24, top: -24 }, windStyle]}>
              <Fan className="w-12 h-12 text-purple-600" />
            </Animated.View>
          </View>
        </View>

        {/* Instruction text */}
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          key={phase}
          className="absolute bottom-20 left-0 right-0 items-center"
        >
          <Text className="text-3xl font-bold text-purple-900">
            {getInstructions()}
          </Text>
        </Animated.View>

        {/* Progress indicators */}
        <View className="absolute bottom-8 left-0 right-0 flex-row justify-center space-x-2">
          {['inhale', 'hold', 'exhale', 'rest'].map((p) => (
            <View
              key={p}
              className={`w-3 h-3 rounded-full ${phase === p ? 'bg-purple-600' : 'bg-purple-200'
                }`}
            />
          ))}
        </View>

        {/* Cycles counter */}
        {isPlaying && (
          <View className="absolute top-4 right-4 bg-white/80 px-4 py-2 rounded-full">
            <Text className="text-purple-900 font-medium">
              Cycles: {cycles}
            </Text>
          </View>
        )}

        {/* Initial instructions */}
        {!isPlaying && (
          <View className="absolute inset-0 items-center justify-center px-4">
            <Text className="text-xl text-purple-600 font-medium mb-2 text-center">
              Find a comfortable position
            </Text>
            <Text className="text-purple-500 text-center">
              Press start when you're ready to begin
            </Text>
          </View>
        )}
      </View>

      {/* Tips */}
      {isPlaying && (
        <View className="mt-6 bg-white/80 rounded-2xl p-4">
          <Animated.View style={tipStyle}>
            <Text className="font-medium mb-1 text-purple-900 text-center">
              Breathing Pattern: 4-3-4-5
            </Text>
            <Text className="text-sm text-purple-600 text-center">
              4s inhale • 3s hold • 4s exhale • 5s rest
            </Text>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

export default PeacefulBreathing;
