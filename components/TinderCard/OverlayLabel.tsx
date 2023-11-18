import React, { PropsWithChildren } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width: windowWidth } = Dimensions.get('screen');


type Props = PropsWithChildren<{
  overShootFrom?: number;
  angleFromValue: Animated.SharedValue<number>;
  angleToValue: Animated.SharedValue<number>;
  overShootTo?: number;
  Component: () => JSX.Element;
  distanceValue: Animated.SharedValue<number>;
  angleValue: Animated.SharedValue<number>;
}>;

const OverlayLabel = ({
  overShootFrom = 0.05,
  angleFromValue,
  angleToValue,
  overShootTo = 0.05,
  Component,
  distanceValue,
  angleValue
}: Props) => {

  const animatedStyle = useAnimatedStyle(() => {
    const adjustedDistance = interpolate(
      distanceValue.value,
      [0, windowWidth / 4],
      [0, 1],
      Extrapolation.CLAMP
    )
    const adjustedAngle = interpolate(
      angleValue.value,
      [angleFromValue.value - overShootFrom, angleFromValue.value + 0.05, angleToValue.value - 0.05, angleToValue.value + overShootTo],
      [0, 1, 1, 0],
      Extrapolation.CLAMP
    )
    return {
      opacity: adjustedDistance * adjustedAngle,
      zIndex: 2,
    };
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, animatedStyle]}
      pointerEvents="none"
    >
      <Component />
    </Animated.View>
  );
};

export default OverlayLabel;