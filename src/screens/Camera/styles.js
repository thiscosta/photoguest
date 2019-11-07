import styled from 'styled-components/native';

import { Title, Button, Checkbox, Text } from 'react-native-paper';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1
  }
})`
  background-color: ${props => props.background};
`;

export const CameraTitle = styled(Title)`
    padding-top:20
    font-size: 22;
    text-align:center;
    font-family: Poppins-Light;
    margin-left: 15;
`;

export const PhotoContainer = styled.TouchableOpacity`
  flex: 1;
  align-self: stretch;
  margin-top: 20;
  min-height: 150;
  margin-horizontal: 70;
  margin-bottom:20;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.background};
`;

export const SaveButton = styled(Button).attrs({
  uppercase: true,
})`
  margin-top: 30;
  margin-horizontal: 70;
  max-height: 100;
  margin-bottom: 30;
`;

export const CheckboxContainer = styled.View`
  margin-top: 15;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex: 1;
`;

export const CustomCheckbox = styled(Checkbox).attrs({

})``;

export const CheckboxTitle = styled(Text)`
  color: ${props => props.color};
`;

export const ButtonText = styled(Text)`
  color: ${props => props.color};
  text-transform: uppercase
  font-size: 14
`;
