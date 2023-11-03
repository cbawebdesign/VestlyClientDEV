import { Line, Rect } from 'react-native-svg';

import React from 'react';
import { ChartBar } from '../../types/types';

interface CandleProps {
  candle: ChartBar;
  caliber: number;
  scaleY: (value: number) => number;
  scaleBody: (value: number) => number;
  index: number;
}

const MARGIN = 4;

const Candle = ({ candle, caliber, scaleY, scaleBody, index }: CandleProps) => {
  const x = caliber * index + 0.5 * caliber;
  const open = candle.Open;
  const close = candle.Close;
  const high = candle.High;
  const low = candle.Low;
  const color = open > close ? 'green' : 'red';

  if (!candle.Open) {
    return null;
  }

  return (
    <>
      <Line
        x1={x}
        x2={x}
        y1={scaleY(high)}
        y2={scaleY(low)}
        stroke={color}
        strokeWidth={1}
      />
      <Rect
        x={caliber * index + MARGIN / 2}
        y={scaleY(Math.max(open, close))}
        width={caliber - MARGIN}
        height={scaleBody(Math.max(open, close) - Math.min(open, close))}
        fill={color}
      />
    </>
  );
};

export default Candle;
