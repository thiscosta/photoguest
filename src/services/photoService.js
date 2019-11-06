import { photos } from '../static/photos';
import api, { accessKey } from './api';
import AsyncStorage from '@react-native-community/async-storage';

import asyncForeach from '../utils/asyncForeach'
import PouchDB from 'pouchdb-react-native';
import Axios from 'axios';

async function getPhotos() {
    const authData = JSON.parse(await AsyncStorage.getItem('@authData'))
    const urlParams = `chave_de_acesso=${accessKey}&id_login_fotografo=21`//${authData.id_fotografo}
    const response = await api.get(`list_fotos.php?${urlParams}`)
    await Axios.post('https://photoguestest.free.beeceptor.com', { data: response.data.array_fotos })
    if (response.data.sucess == 200) {
        let photos = response.data.array_fotos.split('|')
        photos = photos.filter(photo => photo.length > 2)
        return { success: true, data: photos }
    }

    return { success: false, error: response.data.error };
}

async function getLocalPhotos() {
    const db = new PouchDB('photoguest_database');
    const localPhotos = await db.allDocs()
    const formattedLocalPhotos = localPhotos.rows.filter(row => {
        if (row.doc.base64) {
            return true
        }
        return false
    }).map(row => (
        `data:image/png;base64,${row.doc.base64}`
    ))
    return formattedLocalPhotos ? formattedLocalPhotos : []
}

async function savePhoto(photo, showOnScreen) {
    const authData = JSON.parse(await AsyncStorage.getItem('@authData'))
    const urlParams = `chave_de_acesso=${accessKey}&
    id_fotografo=${authData.id_fotografo}&
    id_principal=${authData.id_principal}&
    no_telao=${showOnScreen ? 1 : 0}&
    num_ft_permitidas=${authData.num_ft_permitidas}
    `
    const response = await api.post(`envio_de_fotos.php?${urlParams}`,
        { nome_da_foto: `data:image/jpeg;base64,${photo}` }
    )

    if (response.data.sucess == 200) {
        return { success: true, data: response.data };
    }

    return { success: false, errorCode: response.data.error };
}

async function uploadPhotos() {
    const db = new PouchDB('photoguest_database');
    const localPhotos = await db.allDocs()
    const authData = JSON.parse(await AsyncStorage.getItem('@authData'))
    await asyncForeach(localPhotos.rows, async row => {
        const urlParams = `chave_de_acesso=${accessKey}&
        id_fotografo=${authData.id_fotografo}&
        id_principal=${authData.id_principal}&
        no_telao=${row.doc.showOnScreen ? 1 : 0}&
        num_ft_permitidas=${authData.num_ft_permitidas}`
        if (row.doc.base64) {
            const response = await api.post(`envio_de_fotos.php?${urlParams}`,
                { nome_da_foto: `${row.doc.base64}` }
            )
            if (response.data.sucess == 200) {
                await db.remove(row.doc._id, row.doc._rev)
            }
        }
    })
}

export default {
    getPhotos,
    getLocalPhotos,
    savePhoto,
    uploadPhotos
};
