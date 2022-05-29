import React from 'react';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';

import { Container, Info } from './styles';

interface AccessoryProps {
  info: string;
  icon: React.FC<SvgProps>;
}

export function Accessory({ info, icon: Icon }: AccessoryProps) {
  const theme = useTheme();

  return (
    <Container>
      <Icon width={24} height={24} fill={theme.colors.header} />
      <Info>{info}</Info>
    </Container>
  );
}
