import React, { useState, useEffect } from 'react';

import { StatusBar, Image } from 'react-native';

import NetInfo from '@react-native-community/netinfo'

import { withTheme, Button, ActivityIndicator } from 'react-native-paper';
import {
  Container, PhotoContainer, CameraTitle, SaveButton,
  CustomCheckbox, CheckboxContainer, CheckboxTitle
} from './styles';

import appTheme from '../../design/apptheme';
import Icon from 'react-native-vector-icons/FontAwesome';

import ImagePicker from 'react-native-image-crop-picker';
import { ActionSheetCustom } from 'react-native-actionsheet';
import defaultStyles from 'react-native-actionsheet/lib/styles';

import { useDispatch, useSelector } from 'react-redux'
import { Creators as PhotoActions } from '../../store/ducks/photo'

import PouchDB from 'pouchdb-react-native';

const Camera = ({ theme }) => {

  let actionSheet;
  const db = new PouchDB('photoguest_database');

  const [photo, setPhoto] = useState('');
  const [checked, setChecked] = useState(false)
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const savingPhoto = useSelector(store => store.photo.saving)
  const successSaved = useSelector(store => store.photo.successSaved)
  const dispatch = useDispatch()

  useEffect(() => {
    function handlePhotoSave() {
      if (!savingPhoto && !successSaved) {
        savePhotoLocally()
      }
      if (!savingPhoto && successSaved) {
        dispatch(PhotoActions.getPhotos())
        setPhoto('')
        setChecked(false)
      }
    }
    return handlePhotoSave()
  }, [savingPhoto])

  async function selectImage() {
    actionSheet.show();
  }

  async function optionSelected(index) {
    setLoadingPhoto(true);
    switch (index) {
      case 0:
        ImagePicker.openPicker({
          width: 1280,
          height: 720,
          compressImageQuality: 0.3,
          cropping: true,
          includeBase64: true,
        }).then(handleImageReady)
          .catch(() => {
            setLoadingPhoto(false)
          });
        break;
      case 1:
        ImagePicker.openCamera({
          width: 1280,
          height: 720,
          compressImageQuality: 0.3,
          cropping: true,
          includeBase64: true,
        }).then(handleImageReady)
          .catch(() => {
            setLoadingPhoto(false)
          });
    }
  }

  async function handleImageReady(image) {
    setPhoto(image.data);
    setLoadingPhoto(false);
  }

  function renderPhotoContainerContent() {
    if (!photo) {
      return (
        <Button loading={photo} disabled={photo}>
          Selecionar imagem
        </Button>
      );
    }
    if (loadingPhoto || savingPhoto) {
      return <ActivityIndicator />;
    }
    if (photo) {
      return (
        <Image
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
          resizeMode="contain"
          source={{ uri: `data:image/png;base64,${photo}` }}
        />
      );
    }
  }

  async function savePhoto() {
    const connectionInfo = await NetInfo.fetch()
    if (connectionInfo.isConnected && connectionInfo.isInternetReachable) {
      dispatch(PhotoActions.savePhoto(photo, checked))
    } else {
      savePhotoLocally()
    }
  }

  async function savePhotoLocally() {
    await db.post({ base64: photo });
    setPhoto('');
    setChecked(false)
  }

  return (
    <Container background={theme.colors.background}>
      <StatusBar backgroundColor={theme.colors.header} />
      <CameraTitle>Nova foto</CameraTitle>
      <PhotoContainer background={theme.colors.header} onPress={selectImage}>
        {renderPhotoContainerContent()}
      </PhotoContainer>
      <CheckboxContainer>
        <CustomCheckbox
          color={theme.colors.primary}
          status={checked ? 'checked' : 'unchecked'}
          disabled={!photo}
          onPress={() => {
            setChecked(!checked)
          }}
        />
        <CheckboxTitle color={photo ? theme.colors.text : theme.colors.gray}>Mostrar no telão</CheckboxTitle>
      </CheckboxContainer>

      <SaveButton
        mode="contained"
        loading={loadingPhoto}
        disabled={!photo}
        onPress={() => { savePhoto() }}>
        Salvar
      </SaveButton>

      <ActionSheetCustom
        ref={actionSheetRef => (actionSheet = actionSheetRef)}
        title={'Selecionar imagem'}
        options={['Galeria', 'Câmera', 'Cancelar']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        tintColor={theme.colors.primary}
        styles={{
          body: {
            ...defaultStyles.body,
            backgroundColor: theme.colors.background,
          },
          buttonBox: {
            ...defaultStyles.buttonBox,
            backgroundColor: theme.colors.header,
          },
          titleBox: {
            ...defaultStyles.titleBox,
            backgroundColor: theme.colors.header,
          },
          titleText: {
            ...defaultStyles.titleText,
            color: theme.colors.text,
          },
          cancelButtonBox: {
            ...defaultStyles.cancelButtonBox,
            backgroundColor: theme.colors.header,
          },
        }}
        onPress={optionSelected}
      />
    </Container>
  );
};

Camera.navigationOptions = () => ({
  title: 'Nova foto',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="camera" size={22} color={tintColor} />
  ),
  headerStyle: {
    backgroundColor: appTheme.colors.header,
  },
  headerTintColor: appTheme.colors.header,
  headerTitleStyle: {
    fontWeight: 'light',
    fontFamily: 'Poppins-Regular',
  },
});

export default withTheme(Camera);
