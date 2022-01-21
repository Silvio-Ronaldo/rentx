import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container, Header, TotalCars } from './styles';

import Logo from '../../assets/logo.svg';

export function Home() {
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
    </Container>
  );
}
