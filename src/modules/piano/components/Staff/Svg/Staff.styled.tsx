import styled, { css } from 'styled-components';

export const Svg = styled.svg(
  ({ theme: { utils } }) => css`
    color: ${utils.background('default')};
    height: 100%;
    width: 100%;
  `
);
