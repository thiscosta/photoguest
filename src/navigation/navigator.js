import React, { useEffect } from 'react'

import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Creators as ErrorActions } from '../store/ducks/error'
import { Creators as PhotoActions } from '../store/ducks/photo'

import Modal from '../components/Modal'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Authentication from '../screens/Authentication';

import Gallery from '../screens/Gallery';
import Camera from '../screens/Camera';

import { withTheme } from 'react-native-paper';
import theme from '../design/apptheme';

const bottomNavigator = createMaterialBottomTabNavigator(
  {
    Gallery,
    Camera,
  },
  {
    shifting: true,
    initialRouteName: 'Gallery',
    activeColor: theme.colors.primary,
    barStyle: {
      backgroundColor: theme.colors.header,
    },
  },
);

const stackNavigatior = createStackNavigator(
  {
    Authentication,
    Home: {
      screen: bottomNavigator,
      navigationOptions: {
        title: 'Photoguest',
        headerStyle: {
          backgroundColor: theme.colors.header,
        },
        headerLeft: null,
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: 'light',
          fontFamily: 'Poppins-Regular',
          textAlign: 'center',
          flexGrow: 1,
          alignSelf: 'center',
        },
        headerTitleContainerStyle: {
          textAlign: 'center',
        },
        headerMode: 'float',
      },
    },
  },
  {
    initialRouteName: 'Authentication',
  },
);

const AppContainer = createAppContainer(stackNavigatior);

const AppContainerComponent = ({ theme }) => {

  const error = useSelector(store => store.error.error)
  const errorMessage = useSelector(store => store.error.errorMessage)
  const dispatch = useDispatch()

  useEffect(() => {
    setInterval(() => dispatch(PhotoActions.uploadPhotos()), 15000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppContainer />
      <Modal
        isVisible={error}
        onBackdropPress={() => { dispatch(ErrorActions.dismissError()) }}
        modalBackground={theme.colors.background}
        iconName="alert-outline"
        iconColor={theme.colors.error}
        modalTitle="Alerta"
        modalTitleColor={theme.colors.error}
        content={errorMessage}
        closeText="Fechar"
        confirmText="Ok"
        closeAction={() => { dispatch(ErrorActions.dismissError()) }}
        confirmAction={() => { dispatch(ErrorActions.dismissError()) }}
      />
    </View >
  )
}

export default withTheme(AppContainerComponent);
