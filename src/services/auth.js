import api, { accessKey } from './api';
import AsyncStorage from '@react-native-community/async-storage';

export const tryAuth = async token => {
  const response = await api.get(
    `login.php?chave_de_acesso=${accessKey}&cod_fotografo=${token}`,
  );

  if (response.data.sucess == 200) {
    await AsyncStorage.setItem('@authData', JSON.stringify(response.data))
    return { success: true, data: response.data };
  }

  return { success: false, message: 'Invalid photographer code' };
};
