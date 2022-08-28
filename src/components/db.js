const { Dimensions } = require("react-native");

const { width, height } = Dimensions.get('window');
export const COLOURS = {
    white: '#ffffff',
    black: '#000000',
    green: '#00AC76',
    red: '#C04345',
    blue: '#0043F9',
    backgroundLight: '#F0F0F3',
    backgroundMedium: '#B9B9B9',
    backgroundDark: '#777777',
    primary: '#0C0E0E',
    accent: '#3D3E40',
    grey: '#DBD5D5',
    lightGrey: '#E4E6EA',
};
export const SIZES = {
    h1: 30,
    h2: 24,
    h3: 20,
    h4: 18,
    h5: 16,
    h6: 14,

    width,
    height,
};

export const FONTWEIGHT = {
    bold: 'bold',
    normal: 'normal',
    weight500: '500',
    weight700: '700',
};