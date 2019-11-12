import styled from 'styled-components/native';

import { Title, Text, Appbar } from 'react-native-paper';

export const Container = styled.ScrollView.attrs({})`
  background-color: ${props => props.background};
`;

export const EventContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-horizontal: 15;
`;

export const HeaderLogo = styled.Image`
  flex: 1;
  margin-top: 15;
`;

export const Header = styled(Appbar.Header)`
  margin-vertical: 15;
  padding-horizontal: 60;
`;

export const EventPhoto = styled.Image`
  flex: 1;
  margin-top: 35;
  min-height: 200;
`;

export const EventDetails = styled.View`
  flex: 1;
  margin-top: 15;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const EventMainDetails = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const EventMainDetailsTitle = styled(Title)`
  color: ${props => props.color};
  font-size: 18;
  font-family: Poppins-Bold;
`;

export const EventMainDetailsRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

export const EventMainDetailsRowTitle = styled(Text)`
  color: ${props => props.color};
  font-size: 16;
  font-family: Poppins-Bold;
`;

export const EventMainDetailsRowData = styled(Text)`
  color: ${props => props.color};
  font-size: 16;
  font-family: Poppins-Regular;
  margin-left: 8;
`;

export const EventCapacityContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
`;

export const EventCapacityQuantity = styled(Title)`
  color: ${props => props.color};
  font-size: 25;
`;

export const EventCapacityText = styled(Text)`
  color: ${props => props.color};
`;

export const EventName = styled(Text)`
  color: ${props => props.color};
  font-size: 18;
`;

export const GalleryTitle = styled(Title)`
    text-align: center;
    padding-top:20
    font-size: 22;
    color: ${props => props.color}
    font-family: Poppins-Regular;
`;

export const PhotosContainer = styled.View`
  margin-top: 20;
  flex: 1;
  align-items: center;
  flex-direction: row;
`;

export const PhotoBox = styled.TouchableOpacity`
    width: ${props => props.width};
    height: ${props => props.width};
    flex-direction: row;
    justify-content: space-evenly
    margin-vertical: 2;
`;

export const Photo = styled.Image`
  resize-mode: cover;
  flex: 1;
  margin-horizontal: 2;
  border-width: 1;
  border-color: ${props => props.color};
`;

export const EmptyGalleryContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyGalleryText = styled(Title)`
  margin-top: 10;
  color: ${props => props.color};
  font-family: Poppins-Regular;
`;
