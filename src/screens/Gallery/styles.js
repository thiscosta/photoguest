import styled from 'styled-components/native';

import {Title} from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.background};
`;

export const GalleryTitle = styled(Title)`
    padding-top:40
    font-size: 22;
    font-family: Poppins-Light;
    margin-left: 15;
`;

export const PhotosContainer = styled.View`
  margin-top: 20;
  flex: 1;
  flex-direction: row;
`;

export const PhotoBox = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    justify-content: space-evenly
    margin-vertical: 2;
`;

export const Photo = styled.Image`
  resize-mode: cover;
  flex: 1;
  margin-horizontal: 2;
  height: 200;
`;