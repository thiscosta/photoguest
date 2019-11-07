import styled from 'styled-components/native'
import { Title, Text, Button } from 'react-native-paper';

export const ModalContainer = styled.View`
    height: 300;
    background-color: ${props => props.background};
    flex-direction: column;
`;

export const ModalHeader = styled.View`
    flex: 1;
    align-self: center;
    align-items: center;
    margin-top: 20;
`;

export const ModalTitle = styled(Title)`
    color: ${props => props.color}
    font-size: 27;
    margin-left: 15;
    margin-top:15
    margin-right:10;
`;

export const ModalContent = styled.View`
    flex: 1;
`;

export const ContentText = styled(Text)`
    text-align: center;
    margin-horizontal: 15;
`;

export const ModalButtonsContainer = styled.View`
    flex-direction: row;
    margin-bottom: 15;
`;

export const ModalButton = styled(Button).attrs({
    mode: 'contained'
})`
    margin-horizontal: 10;
    flex: 1;
`;