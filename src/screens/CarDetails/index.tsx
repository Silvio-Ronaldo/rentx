import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

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
  About,
} from './styles';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

export function CarDetails() {
  return (
    <Container>
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

        <About>
          Este é um automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </About>
      </Content>
    </Container>
  );
}
