import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format, parseISO } from 'date-fns';
import { useNetInfo } from '@react-native-community/netinfo';

import { RootNativeParamList } from '../../@types/@react-navigation';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

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
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const theme = useTheme();
  const netInfo = useNetInfo();
  const { car, dates } = route.params;

  const startFormattedPtBr = format(parseISO(dates[0]), 'dd/MM/yyyy');
  const endFormattedPtBr = format(
    parseISO(dates[dates.length - 1]),
    'dd/MM/yyyy',
  );
  const totalPrice = car.price * dates.length;

  function handleBack() {
    navigation.goBack();
  }

  async function handleConfirmRentalCar() {
    setIsLoading(true);

    try {
      await api
        .post('/rentals/', {
          user_id: 1,
          car_id: car.id,
          start_date: startFormattedPtBr,
          end_date: endFormattedPtBr,
          total: totalPrice,
        })
        .then(() =>
          navigation.navigate('Confirmation', {
            title: 'Carro alugado!',
            message:
              'Agora você só precisa ir\naté a concessionária da RENTX\nretirar o seu carro',
            nextScreenRoute: 'Home',
          }),
        )
        .catch(err =>
          Alert.alert(
            `Erro no agendamento: ${err.message}`,
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

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected, car.id]);

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
        <ImageSlider
          imageUrls={
            carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.id, photo: car.thumbnail }]
          }
        />
      </CarImage>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                info={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

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
              R$ {car.price} x {dates.length}
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
