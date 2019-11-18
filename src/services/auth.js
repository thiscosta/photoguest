import api, { accessKey } from './api';
import AsyncStorage from '@react-native-community/async-storage';

export const tryAuth = async token => {
  const response = await api.get(
    `login.php?chave_de_acesso=${accessKey}&cod_fotografo=${token}`,
  );

  if (response.data.sucess == 200) {
    await AsyncStorage.setItem('@authData', JSON.stringify(response.data))
    return {
      success: true,
      data: {
        name: response.data.nome_evento,
        date: response.data.data_evento,
        time: response.data.horario_evento,
        location: response.data.local_evento,
        capacity: response.data.capacidade_evento,
      },
    };
  }

  return { success: false, message: 'Invalid photographer code' };
};
