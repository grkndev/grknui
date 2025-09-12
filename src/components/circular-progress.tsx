import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressBarProps {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0-100 arası değer
  duration?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  textColor?: string;
  fontSize?: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  size = 120,
  strokeWidth = 10,
  progress = 0,
  duration = 1000,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  showPercentage = true,
  textColor = '#1f2937',
  fontSize = 20,
}) => {
  const animatedProgress = useSharedValue(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const centerX = size / 2;
  const centerY = size / 2;

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration });
  }, [progress, duration]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDasharray = circumference;
    const strokeDashoffset = interpolate(
      animatedProgress.value,
      [0, 100],
      [circumference, 0]
    );

    return {
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      <Svg width={size} height={size}>
        <G rotation="-90" originX={centerX} originY={centerY}>
          {/* Background circle */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <AnimatedCircle
            cx={centerX}
            cy={centerY}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            animatedProps={animatedProps}
          />
        </G>
      </Svg>
      {showPercentage && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: fontSize,
              fontWeight: 'bold',
              color: textColor,
            }}
          >
            {Math.round(progress)}%
          </Text>
        </View>
      )}
    </View>
  );
};

export default CircularProgressBar;