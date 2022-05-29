import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { useFocusEffect } from '@react-navigation/native';

import { RootNativeParamList } from '../../@types/@react-navigation';

import { Load } from '../../components/Load';
import { CardCar } from '../../components/CardCar';

import { api } from '../../services/api';
import { database } from '../../database';
import { Car as ModelCar } from '../../database/model/Car';

import Logo from '../../assets/logo.svg';

import { Container, Header, TotalCars, CarList } from './styles';

type HomeScreenProps = NativeStackScreenProps<RootNativeParamList, 'Home'>;

export function Home({ navigation }: HomeScreenProps) {
  const [carsData, setCarsData] = useState<ModelCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const netInfo = useNetInfo();
  const synchronizing = useRef(false);

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`,
        );

        const { changes, latestVersion } = data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('users/sync', user);
      },
    });

    await fetchCars();
  }

  async function fetchCars() {
    try {
      const carCollection = await database.get<ModelCar>('cars');
      const cars = await carCollection.query().fetch();

      setCarsData(cars);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCarDetails(car: ModelCar) {
    navigation.navigate('CarDetails', { car });
  }

  useFocusEffect(
    useCallback(() => {
      const syncChanges = async () => {
        if (netInfo.isConnected && !synchronizing.current) {
          synchronizing.current = true;

          try {
            await offlineSynchronize();
          } catch (err) {
            console.log(err);
          } finally {
            synchronizing.current = false;
          }
        }
      };

      syncChanges();
    }, [netInfo.isConnected]),
  );

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchCars();
    }

    return () => {
      isMounted = false;
    };
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

        {!isLoading && <TotalCars>Total de {carsData.length} carros</TotalCars>}
      </Header>

      {isLoading ? (
        <Load />
      ) : (
        <CarList
          data={carsData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CardCar data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
