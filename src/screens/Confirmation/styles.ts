import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  width: 100%;
  height: ${Dimensions.get('window').height + getStatusBarHeight()}px;
  background-color: ${({ theme }) => theme.colors.header};

  padding-top: 48px;
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;

  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(30)}px;

  margin-top: 24px;
`;

export const Message = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;
  text-align: center;
  line-height: ${RFValue(25)}px;
`;

export const Footer = styled.View`
  padding: 0 140px;
  width: 100%;

  align-items: center;
  margin-top: 24px;
`;
