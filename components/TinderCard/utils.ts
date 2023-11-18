import { Dimensions } from 'react-native';
import Animated, { withSpring } from 'react-native-reanimated';

const { width: windowWidth, height: windowHeight } = Dimensions.get('screen');

const userConfig = {
  damping: 15,
  stiffness: 120,
  mass: 0.5,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};

function resetPosition(
  x: Animated.SharedValue<number>,
  y: Animated.SharedValue<number>
): void {
  'worklet';
  x.value = withSpring(0, userConfig);
  y.value = withSpring(0, userConfig);
}

const snapPoint = (
  value: number,
  _velocity: number,
  points: ReadonlyArray<number>
): number => {
  'worklet';
  const point = value
  const deltas = points.map((p) => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  return Number(points.filter((p) => Math.abs(point - p) === minDelta)[0]);
};
export {
  resetPosition,
  snapPoint,
  userConfig,
  windowWidth,
  windowHeight,
};