import React, { useState, useEffect } from 'react';

import { StatusBar, BackHandler } from 'react-native';

import { Creators as PhotosActions } from '../../store/ducks/photo';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../../components/Modal'

import { withTheme } from 'react-native-paper';
import {
  Container,
  GalleryTitle,
  PhotosContainer,
  PhotoBox,
  Photo,
} from './styles';
import { FlatList } from 'react-native-gesture-handler';

import theme from '../../design/apptheme';
import Icon from 'react-native-vector-icons/FontAwesome';

const Gallery = ({ theme, navigation }) => {
  const photos = useSelector(store => store.photo.photos);
  const localPhotos = useSelector(store => store.photo.localPhotos);
  const [logoutVisible, setLogoutVisible] = useState(false)
  const dispatch = useDispatch();

  function handleBackPress() {
    setLogoutVisible(true)
    return true;
  }

  useEffect(() => {
    function loadPhotos() {
      dispatch(PhotosActions.getPhotos());
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    loadPhotos()
    return () => {
      backHandler.remove()
    };
  }, []);

  return (
    <Container background={theme.colors.background}>
      <StatusBar backgroundColor={theme.colors.header} />
      <Modal
        isVisible={logoutVisible}
        onBackdropPress={() => { }}
        modalBackground={theme.colors.background}
        iconName="alert-outline"
        iconColor={theme.colors.accent}
        modalTitle="Atenção"
        modalTitleColor={theme.colors.accent}
        content={"Tem certeza que deseja sair do aplicativo?"}
        closeText="Cancelar"
        closeAction={() => { setLogoutVisible(false) }}
        confirmText="Sair"
        confirmAction={() => { navigation.goBack(null) }}
      />
      <GalleryTitle>Galeria</GalleryTitle>
      <PhotosContainer>

        <FlatList
          data={photos}
          keyExtractor={(item, index) => index}
          extraData={photos}
          numColumns={3}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 10,
          }}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
            <PhotoBox onPress={() => { }} activeOpacity={0.7}>
              <Photo source={{ uri: item }} width={30} />
            </PhotoBox>
          )}
        />
      </PhotosContainer>

    </Container>
  );
};

Gallery.navigationOptions = ({ tintColor, navigationOptions }) => ({
  title: 'Galeria',
  tabBarIcon: ({ focused, horizontal, tintColor }) => (
    <Icon name="photo" size={22} color={tintColor} />
  ),
  headerStyle: {
    backgroundColor: theme.colors.header,
  },
  headerTintColor: theme.colors.header,
  headerTitleStyle: {
    fontWeight: 'light',
    fontFamily: 'Poppins-Regular',
  },
});

export default withTheme(Gallery);
