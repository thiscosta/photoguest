import React, { useState, useEffect } from 'react';

import { StatusBar, BackHandler, Image } from 'react-native';
import Logo from '../../assets/images/logo.png'

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
import { StackActions } from 'react-navigation'

import theme from '../../design/apptheme';
import Icon from 'react-native-vector-icons/FontAwesome';

import ImageView from 'react-native-image-view';

const Gallery = ({ theme, navigation }) => {
  const photos = useSelector(store => store.photo.photos);
  const [logoutVisible, setLogoutVisible] = useState(false)
  const [photoViewerVisible, setPhotoViewerVisible] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState(0)
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
    <Container background={theme.colors.primary}>
      <StatusBar backgroundColor={theme.colors.background} barStyle="light-content" />
      <Image style={{ alignSelf: 'center', minWidth: 150, minHeight: 40, marginVertical: 20 }} source={Logo} />
      <Modal
        isVisible={logoutVisible}
        onBackdropPress={() => { }}
        modalBackground={theme.colors.background}
        iconName="alert-outline"
        iconColor={theme.colors.accent}
        modalTitle="Atenção"
        modalTitleColor={theme.colors.accent}
        content={"Tem certeza que deseja fazer logout do aplicativo?"}
        closeText="Cancelar"
        closeAction={() => { setLogoutVisible(false) }}
        confirmText="Sair"
        confirmAction={() => { navigation.dispatch(StackActions.popToTop()) }}
      />
      <GalleryTitle color={theme.colors.header}>Galeria</GalleryTitle>
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
          renderItem={({ item, index }) => (
            <PhotoBox onPress={() => {
              setCurrentPhoto(index)
              setPhotoViewerVisible(true)
            }} activeOpacity={0.7}>
              <Photo source={{ uri: item.source.uri }} width={30} />
            </PhotoBox>
          )}
        />
      </PhotosContainer>

      <ImageView
        images={photos}
        imageIndex={currentPhoto}
        isVisible={photoViewerVisible}
        onClose={() => {
          setPhotoViewerVisible(false)
        }}
      />

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
