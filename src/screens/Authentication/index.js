import React, { useState, useEffect } from 'react';

import { StatusBar } from 'react-native';

import {
  Container,
  LogoContainer,
  Logo,
  TokenInput,
  SendButton,
  Content,
  ErrorText,
} from './styles';

import { withTheme } from 'react-native-paper';

import ImageLogo from '../../assets/images/logo.png';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as AuthActions } from '../../store/ducks/auth';

const Authentication = ({ navigation, theme }) => {
  const [token, setToken] = useState('000000');

  const authenticated = useSelector(store => store.auth.authenticated);
  const loading = useSelector(store => store.auth.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    function openGallery() {
      if (authenticated) {
        navigation.navigate('Gallery');
      }
    }

    return openGallery();
  }, [authenticated, navigation]);

  const tryToAuthenticate = async () => {
    dispatch(AuthActions.authenticate(token));
  };

  return (
    <Container background={theme.colors.background}>
      <StatusBar backgroundColor={theme.colors.background} />
      <LogoContainer>
        <Logo source={ImageLogo} />
      </LogoContainer>
      <Content>
        {authenticated === false && loading === false && (
          <ErrorText color={theme.colors.error}>Token inválido</ErrorText>
        )}
        <TokenInput
          value={token}
          label="Digite seu token"
          onChangeText={setToken}
        />
        <SendButton
          mode="contained"
          onPress={() => {
            tryToAuthenticate();
          }}
          loading={loading}
          disabled={loading || !token}>
          Validar
        </SendButton>
      </Content>
    </Container>
  );
};

Authentication.navigationOptions = () => ({
  header: null,
});

export default withTheme(Authentication);
