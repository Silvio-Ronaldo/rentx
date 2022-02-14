import React from 'react';
import { StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
  Content,
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

      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImage>
        <ImageSlider imageUrls={car.photos} />
      </CarImage>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
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

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRentalCar} />
      </Footer>
    </Container>
  );
}
