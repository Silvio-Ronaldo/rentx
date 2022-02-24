import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootNativeParamList } from '../../@types/@react-navigation';

import { Button } from '../../components/Button';

import { Container, Content, Title, Message, Footer } from './styles';

import LogoBackgroundSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

type ConfirmationScreenProps = NativeStackScreenProps<
  RootNativeParamList,
  'Confirmation'
>;

export function Confirmation({ navigation, route }: ConfirmationScreenProps) {
  const { width } = useWindowDimensions();
  const theme = useTheme();

  const { title, message, nextScreenRoute } = route.params;

  function handleConfirmation() {
    navigation.navigate(nextScreenRoute as 'Home' | 'SignIn');
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

        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <Button
          title="OK"
          color={theme.colors.shape_dark}
          onPress={handleConfirmation}
        />
      </Footer>
    </Container>
  );
}
