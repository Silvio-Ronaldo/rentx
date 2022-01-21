import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container, Header, TotalCars } from './styles';

import Logo from '../../assets/logo.svg';

import { CardCar } from '../../components/CardCar';

export function Home() {
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

  const carTwo = {
    brand: 'Porsche',
    name: 'Panamera',
    rent: {
      period: 'Ao dia',
      price: 350,
    },
    thumbnail:
      'https://production.autoforce.com/uploads/version/profile_image/3188/comprar-tiptronic_87272c1ff1.png',
  };

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

      <CardCar data={carOne} />
      <CardCar data={carTwo} />
    </Container>
  );
}
