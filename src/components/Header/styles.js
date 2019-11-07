import styled from 'styled-components/native';

import {Appbar} from 'react-native-paper';

export const HeaderLogo = styled.Image`
  flex: 1;
  margin-top: 15;
  max-width: 200;
  max-height: 50;
`;

export const Header = styled(Appbar.Header)`
  margin-vertical: 15;
  padding-horizontal: 60;
  background-color: ${props => props.background};
  justify-content: center;
`;
