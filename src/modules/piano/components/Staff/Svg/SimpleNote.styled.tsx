import styled, { css } from 'styled-components';

export const Svg = styled.svg(
  ({ theme: { utils } }) => css`
    height: ${utils.em(14)};
    width: ${utils.em(14)};
  `
);
