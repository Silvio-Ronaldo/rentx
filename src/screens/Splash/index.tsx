import React, { useEffect } from 'react';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';

import { RootNativeParamList } from '../../@types/@react-navigation';

import { Container } from './styles';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootNativeParamList,
  'Splash'
>;

export function Splash() {
  const { navigate } = useNavigation<SplashScreenNavigationProp>();

  const animation = useSharedValue(0);

  const brandStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      animation.value,
      [0, 25, 50],
      [1, 0.3, 0],
      Extrapolate.CLAMP,
    ),
    transform: [
      {
        translateX: interpolate(
          animation.value,
          [0, 50],
          [0, -50],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  const logoStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      animation.value,
      [0, 25, 50],
      [0, 0.3, 1],
      Extrapolate.CLAMP,
    ),
    transform: [
      {
        translateX: interpolate(
          animation.value,
          [0, 50],
          [-50, 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  function startApp() {
    navigate('Home');
  }

  useEffect(() => {
    animation.value = withTiming(
      50,
      {
        duration: 2000,
      },
      () => {
        'worklet';

        runOnJS(startApp)();
      },
    );
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyles, { position: 'absolute' }]}>
        <BrandSvg width={90} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyles, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
