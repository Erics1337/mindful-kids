import React, { useState, useEffect, memo } from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Star, MoonStar } from '@/components/Icons';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  withDelay,
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

interface StarProps {
  x: number;
  y: number;
  scale: number;
  delay: number;
  isPlaying: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ShootingStar = () => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withRepeat(
            withSequence(
              withTiming(-SCREEN_WIDTH, { duration: 0 }),
              withDelay(
                Math.random() * 10000,
                withTiming(SCREEN_WIDTH, {
                  duration: 2000,
                  easing: Easing.linear,
                })
              )
            ),
            -1
          ),
        },
        {
          translateY: withRepeat(
            withSequence(
              withTiming(0, { duration: 0 }),
              withDelay(
                Math.random() * 10000,
                withTiming(200, {
                  duration: 2000,
                  easing: Easing.linear,
                })
              )
            ),
            -1
          ),
        },
      ],
      opacity: withRepeat(
        withSequence(
          withTiming(0, { duration: 0 }),
          withDelay(
            Math.random() * 10000,
            withSequence(
              withTiming(1, { duration: 500 }),
              withTiming(0, { duration: 500 })
            )
          )
        ),
        -1
      ),
    };
  });

  return (
    <Animated.View
      style={[{
        position: 'absolute',
        width: 2,
        height: 2,
        backgroundColor: 'white',
        borderRadius: 1,
      }, animatedStyle]}
    >
      <View
        style={{
          width: 48,
          height: 1,
          backgroundColor: 'white',
          opacity: 0.5,
          transform: [{ translateX: -48 }],
        }}
      />
    </Animated.View>
  );
};

const AnimatedStar = memo(({ x, y, scale, delay, isPlaying }: StarProps) => {
  const starStyle = useAnimatedStyle(() => ({
    opacity: isPlaying
      ? withRepeat(
          withSequence(
            withTiming(0.2, { duration: 1000 }),
            withTiming(1, { duration: 1000 }),
            withTiming(0.2, { duration: 1000 })
          ),
          -1,
          false
        )
      : 0.5,
    transform: [{
      scale: isPlaying
        ? withRepeat(
            withDelay(
              delay,
              withSequence(
                withTiming(scale, { duration: 1000 }),
                withTiming(scale * 1.2, { duration: 1000 }),
                withTiming(scale, { duration: 1000 })
              )
            ),
            -1,
            false
          )
        : scale,
    }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
        },
        starStyle,
      ]}
    >
      <Star className="w-4 h-4 text-yellow-200" fill="currentColor" />
    </Animated.View>
  );
});

export function SleepyStars() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stars, setStars] = useState<Omit<StarProps, 'isPlaying'>[]>([]);
  const [remainingTime, setRemainingTime] = useState(900); // 15 minutes in seconds

  // Moon animation
  const moonStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: isPlaying
        ? withRepeat(
            withSequence(
              withTiming(1.1, { duration: 2000 }),
              withTiming(1, { duration: 2000 })
            ),
            -1
          )
        : 1,
    }],
  }));

  // Breathing guide animation
  const breathingGuideStyle = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withTiming(0.5, { duration: 2000 }),
        withTiming(1, { duration: 2000 }),
        withTiming(1, { duration: 2000 }),
        withTiming(0.5, { duration: 2000 })
      ),
      -1
    ),
  }));

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          scale: 0.5 + Math.random() * 0.5,
          delay: Math.random() * 2000,
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, remainingTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View className="w-full">
      <View className="absolute top-4 left-4 z-10">
        <Button
          onPress={() => setIsPlaying(!isPlaying)}
          className="bg-purple-500/20 backdrop-blur"
        >
          <Text className="text-white font-semibold">
            {isPlaying ? 'Pause' : 'Start'} Meditation
          </Text>
        </Button>
      </View>

      <View className="h-[600px] bg-gradient-to-b from-indigo-950 to-purple-950 rounded-3xl overflow-hidden">
        {/* Moon */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              right: 48,
              top: 48,
            },
            moonStyle,
          ]}
        >
          <MoonStar className="w-16 h-16 text-yellow-100" />
        </Animated.View>

        {/* Stars */}
        {stars.map((star, index) => (
          <AnimatedStar key={index} {...star} isPlaying={isPlaying} />
        ))}

        {/* Shooting Stars */}
        {isPlaying && Array.from({ length: 5 }).map((_, i) => (
          <ShootingStar key={i} />
        ))}

        {/* Timer */}
        {isPlaying && (
          <View className="absolute bottom-8 left-0 right-0 items-center">
            <Text className="text-4xl font-bold text-white">
              {formatTime(remainingTime)}
            </Text>
          </View>
        )}

        {/* Initial Instructions */}
        {!isPlaying && (
          <View className="absolute inset-0 items-center justify-center px-4">
            <Text className="text-xl text-purple-200 font-medium text-center">
              Press start to begin your stargazing journey
            </Text>
          </View>
        )}
      </View>

      {/* Breathing Guide */}
      {isPlaying && (
        <View className="mt-6">
          <Animated.View style={breathingGuideStyle}>
            <Text className="text-lg text-white text-center">
              Breathe with the twinkling stars...
            </Text>
          </Animated.View>
        </View>
      )}
    </View>
  );
}
