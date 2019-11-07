import React, { useState, useEffect } from 'react';

import { StatusBar, BackHandler, Image, SafeAreaView } from 'react-native';
import Logo from '../../assets/images/logo.png'

import { Creators as PhotosActions } from '../../store/ducks/photo';
import { useSelector, useDispatch } from 'react-redux';

import Modal from '../../components/Modal'

import { withTheme, ActivityIndicator } from 'react-native-paper';

import {
  Bar, Container, PhotosContainer, PhotoBox, Photo,
  EmptyGalleryContainer, EmptyGalleryText, EventContainer,
  EventPhoto, EventDetails, EventMainDetails, EventCapacityContainer,
  EventMainDetailsTitle, EventMainDetailsRow, EventMainDetailsRowTitle,
  EventMainDetailsRowData, EventCapacityQuantity, EventCapacityText,
  Header
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
    <SafeAreaView style={{ flex: 1 }}>
      <Header>
        <Image style={{
          maxWidth: 200,
          maxHeight: 50,
          marginBottom: 20,
          marginTop: 5,
          borderWidth: 0
        }} source={Logo} />
      </Header>
      <Container background={theme.colors.primary}>
        <StatusBar backgroundColor={theme.colors.background} barStyle="light-content" />

        {/*<Bar>*/}

        {/*</Bar>*/}

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

        <EventContainer>
          <EventPhoto
            source={{ uri: `http://photoguest.com.br/uploads/25/thumb_25_1573126230.jpg` }}
            resizeMode="contain"
            style={{ flex: 1, width: 800 }}
          />
          <EventDetails>
            <EventMainDetails>
              <EventMainDetailsTitle color={theme.colors.gray}>Meu evento</EventMainDetailsTitle>
              <EventMainDetailsRow>
                <EventMainDetailsRowTitle color={theme.colors.header}>Local: </EventMainDetailsRowTitle>
                <EventMainDetailsRowData color={theme.colors.gray}>Minha casa</EventMainDetailsRowData>
              </EventMainDetailsRow>
            </EventMainDetails>
            <EventCapacityContainer>
              <EventCapacityQuantity color={theme.colors.gray}>150</EventCapacityQuantity>
              <EventCapacityText color={theme.colors.gray}>Photoguesters</EventCapacityText>
            </EventCapacityContainer>
          </EventDetails>
        </EventContainer>

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
            ListEmptyComponent={
              <EmptyGalleryContainer>
                <Icon name="photo" size={40} color={theme.colors.gray} />
                <EmptyGalleryText color={theme.colors.gray}>
                  Esperando suas fotos
                </EmptyGalleryText>
              </EmptyGalleryContainer>
            }
            renderItem={({ item, index }) => (
              <PhotoBox onPress={() => {
                setCurrentPhoto(index)
                setPhotoViewerVisible(true)
              }} activeOpacity={0.7}>
                <Photo
                  color={theme.colors.lightGray}
                  source={{ uri: item.source.uri }}
                  width={30}
                  loadingIndicatorSource={<ActivityIndicator />}
                  fadeDuration={1000}
                />
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
    </SafeAreaView>
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
