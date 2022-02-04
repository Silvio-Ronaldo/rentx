import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { DateData } from 'react-native-calendars';
import { format, parseISO } from 'date-fns';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootNativeParamList } from '../../@types/@react-navigation';

import { BackButton } from '../../components/BackButton';
import {
  Calendar,
  generateInterval,
  MarkedDatesType,
} from '../../components/Calendar';
import { Button } from '../../components/Button';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValueContainer,
  DateValue,
  Content,
  Footer,
} from './styles';

import ArrowSvg from '../../assets/arrow.svg';

type SchedulingProps = NativeStackScreenProps<
  RootNativeParamList,
  'Scheduling'
>;

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling({ navigation, route }: SchedulingProps) {
  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>(
    {} as DateData,
  );
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>(
    {} as MarkedDatesType,
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod,
  );

  const theme = useTheme();
  const { car } = route.params;

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirmScheduling() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert(
        'Data não selecionada',
        'Por favor, selecione a data do aluguel.',
      );
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    setRentalPeriod({
      startFormatted: format(parseISO(start.dateString), 'dd/MM/yyyy'),
      endFormatted: format(parseISO(end.dateString), 'dd/MM/yyyy'),
    });
  }

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
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueContainer selected={!!rentalPeriod.startFormatted}>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueContainer selected={!!rentalPeriod.endFormatted}>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmScheduling} />
      </Footer>
    </Container>
  );
}
