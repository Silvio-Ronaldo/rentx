import React from 'react';
import { StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

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
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

export function SchedulingDetails() {
  const theme = useTheme();
  const { navigate } = useNavigation();

  function handleConfirmRentalCar() {
    navigate('SchedulingComplete');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButton />
      </Header>

      <CarImage>
        <ImageSlider
          imageUrls={[
            'https://production.autoforce.com/uploads/version/profile_image/3188/comprar-tiptronic_87272c1ff1.png',
          ]}
        />
      </CarImage>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracán</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 780</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory info="380 Km/h" icon={speedSvg} />
          <Accessory info="3.2 s" icon={accelerationSvg} />
          <Accessory info="800 HP" icon={forceSvg} />
          <Accessory info="Gasolina" icon={gasolineSvg} />
          <Accessory info="Auto" icon={exchangeSvg} />
          <Accessory info="2 pessoas" icon={peopleSvg} />
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>27/01/2022</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={10}
            color={theme.colors.text_detail}
          />

          <DateInfo>
            <DateTitle>PARA</DateTitle>
            <DateValue>30/01/2022</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 780 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.240</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRentalCar}
        />
      </Footer>
    </Container>
  );
}
