import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';

import { RootNativeParamList } from '../../@types/@react-navigation';
import { CarDTO } from '../../dtos/CarDTO';

import { api } from '../../services/api';

import { BackButton } from '../../components/BackButton';
import { Load } from '../../components/Load';
import { CardCar } from '../../components/CardCar';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsAmount,
  CardCarWrapper,
  CardFooter,
  CardFooterTitle,
  CardFooterPeriod,
  CardFooterDate,
} from './styles';

type MyCarsProps = NativeStackScreenProps<RootNativeParamList, 'MyCars'>;

interface CarsData {
  car: CarDTO;
  user_id: string;
  id: string;
  startDate: string;
  endDate: string;
}

export function MyCars({ navigation }: MyCarsProps) {
  const [cars, setCars] = useState<CarsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButton color={theme.colors.shape} onPress={handleBack} />

        <Title>
          Aqui estão {'\n'}
          todos os seus {'\n'}
          carros alugados
        </Title>

        <Subtitle>
          Conforto, {'\n'}
          segurança e {'\n'}
          praticidade
        </Subtitle>
      </Header>

      {isLoading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos</AppointmentsTitle>
            <AppointmentsAmount>{cars.length}</AppointmentsAmount>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CardCarWrapper>
                <CardCar data={item.car} />
                <CardFooter>
                  <CardFooterTitle>PERÍODO</CardFooterTitle>
                  <CardFooterPeriod>
                    <CardFooterDate>{item.startDate}</CardFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CardFooterDate>{item.endDate}</CardFooterDate>
                  </CardFooterPeriod>
                </CardFooter>
              </CardCarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
