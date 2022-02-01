import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  CarImage,
} from './styles';

import GasolineSvg from '../../assets/gasoline.svg';

type CardCarData = {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
};

interface CardCarProps extends RectButtonProps {
  data: CardCarData;
}

export function CardCar({ data, ...rest }: CardCarProps) {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <GasolineSvg />
        </About>
      </Details>

      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}
