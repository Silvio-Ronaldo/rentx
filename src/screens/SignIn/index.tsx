import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

import { Container, Header, Title, Subtitle, Form, Footer } from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required('A Senha é obrigatória'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
      });

      await schema.validate({ email, password });
      Alert.alert('Tudo certo!');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Ops!', error.message);
      } else {
        Alert.alert(
          'Ocorreu um erro!',
          'Cheque as credenciais e tente novamente.',
        );
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={theme.colors.background_primary}
            translucent
          />

          <Header>
            <Title>
              Estamos{'\n'}
              quase lá
            </Title>
            <Subtitle>
              Faça seu login para começar {'\n'}
              uma experiência incrível.
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled
              loading={false}
            />

            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={() => {}}
              enabled
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
