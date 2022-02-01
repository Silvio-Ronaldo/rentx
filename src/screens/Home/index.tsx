import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import { Container, Header, TotalCars, CarList } from './styles';

import Logo from '../../assets/logo.svg';

import { CardCar } from '../../components/CardCar';

export function Home() {
  const { navigate } = useNavigation();

  const carOne = {
    brand: 'AUDI',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 170,
    },
    thumbnail:
      'https://production.autoforce.com/uploads/version/profile_image/3188/comprar-tiptronic_87272c1ff1.png',
  };

  function handleCarDetails() {
    navigate('CarDetails');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />

        <TotalCars>Total de 14 carros</TotalCars>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => (
          <CardCar data={carOne} onPress={handleCarDetails} />
        )}
      />
    </Container>
  );
}
