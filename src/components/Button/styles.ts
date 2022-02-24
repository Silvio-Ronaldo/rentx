import styled from 'styled-components/native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps extends RectButtonProps {
  color?: string;
}

interface ButtonTextProps {
  light?: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  height: 56px;

  padding: 19px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color, theme }) => color || theme.colors.main};
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
  font-size: ${RFValue(15)}px;
`;
