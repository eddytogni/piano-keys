import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle(({ theme: { utils } }) => ({
  body: {
    margin: 0,
    padding: 0,
    fontSize: '100%',
    fontFamily: utils.font('body'),
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
  },
  '*': {
    boxSizing: 'border-box',
  },
}));

export const Unsupported = styled.div(
  ({ theme: { utils } }) => css`
    align-items: center;
    background: ${utils.gradient('default')};
    color: ${utils.color('primary', 'main')};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  `
);

export const UnsupportedBox = styled.div(
  ({ theme: { utils, borderRadius } }) => css`
    background: ${utils.background('paper')};
    box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
    border-radius: ${borderRadius};
    color: ${utils.text('main')};
    font-size: ${utils.rem(24)};
    font-weight: 700;
    padding: ${utils.rem(32)};
  `
);

export const Link = styled.a(
  ({ theme: { utils } }) => css`
    color: ${utils.color('primary', 'main')};
    font-size: ${utils.rem(16)};
  `
);
