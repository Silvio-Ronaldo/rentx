import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { RootNativeParamList } from '../../@types/@react-navigation';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  InputSection,
} from './styles';

type ProfileProps = NativeStackScreenProps<RootNativeParamList, 'Profile'>;

export function Profile({ navigation }: ProfileProps) {
  const { user, signOut } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  async function handleSelectAvatar() {
    const result = (await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })) as ImagePicker.ImageInfo;

    if (!result.cancelled && result.uri) {
      setAvatar(result.uri);
    }
  }

  function handleChangeOption(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />

          <Header>
            <HeaderTop>
              <BackButton onPress={handleBack} color={theme.colors.shape} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={signOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleChangeOption('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleChangeOption('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' ? (
              <InputSection>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </InputSection>
            ) : (
              <InputSection>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput
                  iconName="lock"
                  placeholder="Repita a nova senha"
                />
              </InputSection>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
