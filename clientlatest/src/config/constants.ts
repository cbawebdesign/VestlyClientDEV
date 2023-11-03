import Config from 'react-native-config';

export const VERSTLY_VERSION = 0.9;

export const API_HOST = Config.API_HOST || '';
export const DEV_USERNAME = Config.USERNAME || '';
export const DEV_PASSWORD = Config.PASSWORD || '';
export const DEV_PHONENUMBER = Config.PHONENUMBER || '';
export const XNITE_TOKEN = Config.XNITE_TOKEN || '';

// COLORS
export const PRIMARY_COLOR = '#8C1CD6';
export const TEXT_COLOR = '#000000';
export const ICON_COLOR = '#000000';

// IMAGES
export const LOGO = require('../assets/images/vestlylogo.png');
export const BACKGROUND_MESH = require('../assets/images/mesh-gradient.png');

export const GLOBAL_SHADOW = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,

  elevation: 5,
};
