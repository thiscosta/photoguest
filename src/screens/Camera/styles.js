import styled from 'styled-components/native';

import { Title, Button, Checkbox, Text } from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.background};
`;

export const CameraTitle = styled(Title)`
    padding-top:40
    font-size: 22;
    font-family: Poppins-Light;
    margin-left: 15;
`;

export const PhotoContainer = styled.TouchableOpacity`
  height: 250;
  align-self: stretch;
  margin-top: 40;
  margin-horizontal: 70;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.background};
`;

export const SaveButton = styled(Button).attrs({
  uppercase: true,
})`
  margin-top: 60;
  margin-horizontal: 70;
`;

export const CheckboxContainer = styled.View`
  margin-horizontal: 62;
  margin-top:30;
  align-items: center;
  flex-direction: row;
`;

export const CustomCheckbox = styled(Checkbox).attrs({

})``;

export const CheckboxTitle = styled(Text)`
  color: ${props => props.color}
`;
