import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = PropsWithChildren<{
  inputRange?: number[];
  outputRange?: number[];
  Component: ({ value }: {value: Animated.SharedValue<number>}) => JSX.Element;
  opacityValue: Animated.SharedValue<number>;
  value: Animated.SharedValue<number>;
}>;

const OverlayLabel = ({
  inputRange,
  outputRange,
  Component,
  opacityValue,
  value
}: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        opacityValue.value,
        inputRange ?? [],
        outputRange ?? [],
        Extrapolation.CLAMP
      ),
      zIndex: 2,
    };
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, animatedStyle]}
      pointerEvents="none"
    >
      <Component value={value} />
    </Animated.View>
  );
};

export default OverlayLabel;