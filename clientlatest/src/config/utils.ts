import { Dimensions, PixelRatio, Platform } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const iPhone14ViewPortRatio = { width: 390, height: 844 };
const widthBaseScale = SCREEN_WIDTH / iPhone14ViewPortRatio.width;
const heightBaseScale = SCREEN_HEIGHT / iPhone14ViewPortRatio.height;

function normalize(size: number, based: string = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// for width  pixel
const widthPixel = (size: number) => {
  return normalize(size, 'width');
};
// for height  pixel
const heightPixel = (size: number) => {
  return normalize(size, 'height');
};
// for font  pixel
const fontPixel = (size: number) => {
  return heightPixel(size);
};
// for Margin and Padding vertical pixel
const pixelSizeVertical = (size: number) => {
  return heightPixel(size);
};
// for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: number) => {
  return widthPixel(size);
};

export {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
};

const formatInt = (value: number) => {
  'worklet';

  const dividedValue = value * 1000;
  const t = Math.floor(dividedValue);

  if (t < 1) {
    return `${t}`;
  }

  return `${t},${value % 1000}`;
};

export const formatForCandleStickChart = (value: number) => {
  'worklet';

  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    const multipliedValue = value * 100;
    const dividedValue = Math.floor(multipliedValue) / 100;

    return `$${dividedValue}`;
  }

  const int = Math.floor(value);
  const subtractedValue = value - int;
  const multipliedValue = subtractedValue * 100;

  const dec = multipliedValue;

  let formattedDec = '';
  if (dec === 0) {
    formattedDec = '00';
  } else {
    if (dec < 10) {
      formattedDec = `0${dec.toFixed(2)}`;
    } else {
      formattedDec = `${dec.toFixed(2)}`;
    }
  }

  return `$${formatInt(int)}.${formattedDec}`;
};

export const getChartLocaleDateString = (
  type: string,
  dateTime: string,
  isSimple: boolean = false,
) => {
  if (!dateTime) {
    return '';
  }

  if (isSimple) {
    return dateTime;
  }

  if (type === '1D') {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      hour12: true,
      minute: '2-digit',
    });
  } else {
    return new Date(dateTime).toLocaleString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
    });
  }
};
