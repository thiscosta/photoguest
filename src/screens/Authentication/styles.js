import styled from 'styled-components/native';

import { TextInput, Button, Text, Title } from 'react-native-paper';

export const Container = styled.View`
  align-items: center;
  background-color: ${props => props.background};
  flex: 1;
  justify-content: center;
`;

export const LogoContainer = styled.View`
  margin-top: 50;
`;

export const Slogan = styled(Text)`
  font-family: Poppins-Bold;
  margin-top: 15;
`;

export const EffectPhrase = styled(Title)`
  margin-bottom: 80
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image``;

export const TokenInput = styled(TextInput).attrs({ mode: 'outlined' })`
  height: 60;
  width: 300;
`;

export const SendButton = styled(Button).attrs({
  uppercase: true,
})`
  margin-top: 60;
  width: 300;
`;

export const ErrorText = styled(Text)`
  color: ${props => props.color};
  align-self: center;
  margin-bottom: 15;
  font-size: 15;
`;
