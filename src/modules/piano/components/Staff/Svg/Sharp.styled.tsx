import styled, { css } from 'styled-components';

export const Svg = styled.svg(
  ({ theme: { utils } }) => css`
    height: ${utils.em(28)};
    width: ${utils.em(13)};
  `
);
