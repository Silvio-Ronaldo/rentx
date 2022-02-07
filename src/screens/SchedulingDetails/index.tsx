import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format, parseISO } from 'date-fns';

import { RootNativeParamList } from '../../@types/@react-navigation';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { api } from '../../services/api';

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

type SchedulingDetailsProps = NativeStackScreenProps<
  RootNativeParamList,
  'SchedulingDetails'
>;

export function SchedulingDetails({
  navigation,
  route,
}: SchedulingDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const { car, dates } = route.params;

  const startFormattedPtBr = format(parseISO(dates[0]), 'dd/MM/yyyy');
  const endFormattedPtBr = format(
    parseISO(dates[dates.length - 1]),
    'dd/MM/yyyy',
  );
  const totalPrice = car.rent.price * dates.length;

  function handleBack() {
    navigation.goBack();
  }

  async function handleConfirmRentalCar() {
    setIsLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    try {
      schedulesByCar.data.unavailable_dates.forEach(unavailableDate => {
        dates.forEach(date => {
          if (unavailableDate === date) {
            throw new Error();
          }
        });
      });

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ];

      await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate: startFormattedPtBr,
        endDate: endFormattedPtBr,
      });

      api
        .put(`/schedules_bycars/${car.id}`, {
          id: car.id,
          unavailable_dates,
        })
        .then(() => navigation.navigate('SchedulingComplete'))
        .catch(() =>
          Alert.alert(
            'Erro no agendamento',
            'Não foi possível completar o agendamento, tente novamente.',
          ),
        );
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        'Intervalo de datas indisponível',
        'Por favor, selecione outras datas',
      );
    }
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
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
            <Period>Ao dia</Period>
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
            <DateValue>{startFormattedPtBr}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={10}
            color={theme.colors.text_detail}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{endFormattedPtBr}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.rent.price} x {dates.length}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {totalPrice}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRentalCar}
          enabled={!isLoading}
          loading={isLoading}
        />
      </Footer>
    </Container>
  );
}
