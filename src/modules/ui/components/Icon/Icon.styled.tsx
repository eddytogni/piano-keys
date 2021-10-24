import styled, { Color, keyframes } from 'styled-components';

export interface IconProps {
  color?: Color;
  spin?: boolean;
  size?: '.5x' | '.75x' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
}

const spinAnimation = keyframes`
  0% { transform: 'rotate(0deg)'; }
  100% { transform: 'rotate(360deg)'; }
`;

export const Icon = styled.i<IconProps>(({ theme: { utils }, color, size, spin }) => ({
  alignItems: 'center',
  color: color && utils.color(color, 'main'),
  display: 'inline-flex',
  fontFamily: 'Material Icons',
  fontSize: 'inherit',
  fontStyle: 'normal',
  height: '1em',
  justifyContent: 'center',
  width: '1em',

  ...utils.css(!!size, {
    fontSize: utils.em(parseFloat(size!) * 16),
  }),

  ...utils.css(spin, {
    animation: () => `1s ${spinAnimation} linear infinite`,
  }),
}));
