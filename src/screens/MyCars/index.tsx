import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';

import { RootNativeParamList } from '../../@types/@react-navigation';

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
import { Car as ModelCar } from '../../database/model/Car';

type MyCarsProps = NativeStackScreenProps<RootNativeParamList, 'MyCars'>;

interface CarsData {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars({ navigation }: MyCarsProps) {
  const [cars, setCars] = useState<CarsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const screenFocused = useIsFocused();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/rentals');
        const dataFormatted = response.data.map((data: CarsData) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
          };
        });
        setCars(dataFormatted);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, [screenFocused]);

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
                    <CardFooterDate>{item.start_date}</CardFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CardFooterDate>{item.end_date}</CardFooterDate>
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
