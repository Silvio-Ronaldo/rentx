import React from 'react';
import { StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { RootNativeParamList } from '../../@types/@react-navigation';

import {
  Container,
  Header,
  CarImage,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
} from './styles';

type CarDetailsScreenProps = NativeStackScreenProps<
  RootNativeParamList,
  'CarDetails'
>;

export function CarDetails({ navigation, route }: CarDetailsScreenProps) {
  const { car } = route.params;

  const scroll = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scroll.value = event.contentOffset.y;
  });

  const headerAnimationStyle = useAnimatedStyle(() => ({
    height: interpolate(scroll.value, [0, 200], [210, 90], Extrapolate.CLAMP),
  }));

  const sliderAnimationStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scroll.value, [0, 150], [1, 0]),
  }));

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirmRentalCar() {
    navigation.navigate('Scheduling', { car });
  }

  return (
    <Container>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />

      <Animated.View style={headerAnimationStyle}>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <CarImage>
          <Animated.View style={sliderAnimationStyle}>
            <ImageSlider imageUrls={car.photos} />
          </Animated.View>
        </CarImage>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 0,
          paddingBottom: 12,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              info={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRentalCar} />
      </Footer>
    </Container>
  );
}
