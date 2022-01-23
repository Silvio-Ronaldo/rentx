import React from 'react';
import { SvgProps } from 'react-native-svg';

import { Container, Info } from './styles';

interface AccessoryProps {
  info: string;
  icon: React.FC<SvgProps>;
}

export function Accessory({ info, icon: Icon }: AccessoryProps) {
  return (
    <Container>
      <Icon width={24} height={24} />
      <Info>{info}</Info>
    </Container>
  );
}
