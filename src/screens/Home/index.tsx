import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { RootNativeParamList } from '../../@types/@react-navigation';

import { Load } from '../../components/Load';
import { CardCar } from '../../components/CardCar';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import { Container, Header, TotalCars, CarList, MyCarsButton } from './styles';

type HomeScreenProps = NativeStackScreenProps<RootNativeParamList, 'Home'>;

export function Home({ navigation }: HomeScreenProps) {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data } = await api.get('/cars');
        setCars(data);
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
        <Logo width={RFValue(108)} height={RFValue(12)} />

        <TotalCars>Total de {cars.length} carros</TotalCars>
      </Header>

      {isLoading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CardCar data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  );
}
