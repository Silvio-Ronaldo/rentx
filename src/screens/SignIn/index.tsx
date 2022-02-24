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
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

import { RootNativeParamList } from '../../@types/@react-navigation';

import { useAuth } from '../../hooks/auth';

import { Container, Header, Title, Subtitle, Form, Footer } from './styles';

type SignInScreenProps = NativeStackScreenProps<RootNativeParamList, 'SignIn'>;

export function SignIn({ navigation }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

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

      await signIn({ email, password });
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

  function handleSignUp() {
    navigation.navigate('SignUpFirstStep');
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
              onPress={handleSignUp}
              enabled
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
