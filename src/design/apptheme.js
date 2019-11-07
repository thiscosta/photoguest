import { DefaultTheme } from 'react-native-paper';

export default {
    ...DefaultTheme,
    dark: false,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FFFFFF',
        accent: '#f1c40f',
        background: '#AA05AD',
        placeholder: 'white',
        text: '#FFFFFF',
        error: '#B00020',
        header: '#282828',
        gray: '#939393'
    },
    fonts: {
        ...DefaultTheme.fonts,
        regular: 'Poppins-Regular',
        medium: 'Poppins-SemiBold',
        light: 'Poppins-Light',
        thin: 'Poppins-Thin'
    }
};