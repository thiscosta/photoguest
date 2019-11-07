import React from 'react';

import {Header, HeaderLogo} from './styles';

export default ({logo, background}) => {
  return (
    <Header background={background || 'white'}>
      <HeaderLogo source={logo} />
    </Header>
  );
};
