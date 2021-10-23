import styled, { css } from 'styled-components';

export const Svg = styled.svg(
  ({ theme: { utils } }) => css`
    height: ${utils.em(28)};
    margin-right: ${utils.em(4)};
    width: ${utils.em(13)};
  `
);
