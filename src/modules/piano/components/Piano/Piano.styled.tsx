import styled, { css } from 'styled-components';

export const Piano = styled.div(
  ({ theme: { utils } }) => css`
    display: flex;
    height: ${utils.rem(200)};
    width: 100%;
  `
);

interface KeyProps {
  isSharp?: boolean;
  isPressed?: boolean;
  isMiddleC?: boolean;
}

export const PianoKey = styled.div<KeyProps>(
  ({ theme: { utils }, isSharp: isSharp, isPressed, isMiddleC }) => css`
    font-size: ${utils.rem(10)};
    font-weight: 400;
    flex: 0 0 calc(100% / 52);
    height: 100%;
    padding: 1px;
    text-align: center;

    &:after {
      background-color: white;
      color: ${utils.background('default')};
      content: attr(data-name);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: calc(100% - ${utils.rem(8)});
      padding-bottom: ${utils.rem(8)};
      width: 100%;
    }

    ${isSharp &&
    css`
      flex-basis: calc(100% / 66);
      height: 70%;
      margin: 0 calc(100% / 66 / -2);
      z-index: 1;

      &:after {
        background-color: ${utils.background('default')};
        color: ${utils.text('main')};
        box-shadow: 0 2px 5px -2px rgba(0, 0, 0, 0.5);
      }
    `}

    ${isMiddleC &&
    css`
      font-weight: 700;
      &:after {
        color: ${utils.color('warning', 'main')};
      }
    `}

    ${isPressed &&
    css`
      &:after {
        background-color: ${utils.color('primary', 'main')};
        color: ${utils.color('primary', 'textContrast')};
      }
    `}
  `
);
