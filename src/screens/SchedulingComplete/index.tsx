import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';

import { Container, Content, Title, Message, Footer } from './styles';

import LogoBackgroundSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const { navigate } = useNavigation();

  function handleConfirmedRentalCar() {
    navigate('Home');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <LogoBackgroundSvg width={width} height={RFPercentage(50)} />

      <Content>
        <DoneSvg width={RFValue(80)} height={RFValue(80)} />

        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <Button
          title="OK"
          color={theme.colors.shape_dark}
          onPress={handleConfirmedRentalCar}
        />
      </Footer>
    </Container>
  );
}
