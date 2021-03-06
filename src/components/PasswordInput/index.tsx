import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  IconContainer,
  InputText,
  EyeContainer,
  ChangePasswordVisibilityButton,
} from './styles';

interface PasswordInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({
  iconName,
  value,
  ...rest
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>

      <InputText
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={!isPasswordVisible}
        autoCorrect={false}
        {...rest}
      />

      <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
        <EyeContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color={theme.colors.text_detail}
          />
        </EyeContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  );
}
