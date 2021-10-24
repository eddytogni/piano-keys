import styled, { Color, css, keyframes } from 'styled-components';

export interface IconProps {
  color?: Color;
  spin?: boolean;
  size?: '.5x' | '.75x' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
}

const spinAnimation = keyframes`
  0% { transform: 'rotate(0deg)'; }
  100% { transform: 'rotate(360deg)'; }
`;

export const Icon = styled.i<IconProps>(
  ({ theme: { utils }, color, size, spin }) => css`
    align-items: center;
    color: ${color && utils.color(color, 'main')};
    display: inline-flex;
    font-family: 'Material Icons';
    font-size: inherit;
    font-style: normal;
    height: 1em;
    justify-content: center;
    width: 1em;

    ${!!size &&
    css`
      font-size: ${utils.em(parseFloat(size!) * 16)};
    `}

    ${spin &&
    css`
      animation: ${spinAnimation} 1s linear infinite;
    `}
  `
);
