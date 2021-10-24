import styled, { css } from 'styled-components';

export const Page = styled.section(
  ({ theme: { utils } }) => css`
    align-items: center;
    background: ${utils.gradient('default')};
    color: ${utils.text('main')};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  `
);
export const Staff = styled.div(
  () => css`
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
    width: 100%;
  `
);

export const ActionBar = styled.div(
  ({ theme: { utils } }) => css`
    display: flex;
    justify-content: space-between;
    left: 0%;
    padding-bottom: ${utils.rem(16)};
    position: absolute;
    right: 0;
    top: 0;

    > div {
      display: flex;
      flex: 1;
      justify-content: center;

      &:first-child {
        justify-content: flex-start;
      }
      &:last-child {
        justify-content: flex-end;
      }
    }
  `
);

export const Start = styled.button(
  ({ theme: { utils, borderRadius } }) => css`
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 0 0 ${borderRadius} ${borderRadius};
    color: ${utils.color('primary', 'main')};
    display: flex;
    font-size: ${utils.rem(20)};
    line-height: 1;
    padding: ${utils.rem(8, 16, 16)};

    &:hover {
      background-color: ${utils.color('default', 'main', 0.1)};
      cursor: pointer;
    }

    &:first-child {
      border-bottom-left-radius: 0;
    }
    &:last-child:not(:first-child) {
      border-bottom-right-radius: 0;
    }
  `
);

export const Key = styled.div(
  ({ theme: { utils } }) => css`
    background: white;
    border-radius: ${utils.rem(0, 0, 12, 12)};
    color: ${utils.color('primary', 'main')};
    font-size: ${utils.rem(20)};
    font-weight: 700;
    margin: ${utils.rem(-16, 0, 0)};
    padding: ${utils.rem(24, 8, 8)};
    width: ${utils.rem(48)};

    &:first-child {
      margin-right: ${utils.rem(16)};
    }
    &:last-child {
      margin-left: ${utils.rem(16)};
    }
  `
);

export const Levels = styled.div(
  () => css`
    align-items: flex-start;
    display: flex;
    justify-content: center;
    line-height: 1;
    width: 100%;
  `
);

export const Level = styled.div<{ isActive?: boolean }>(
  ({ theme: { utils }, isActive }) => css`
    border-radius: ${utils.rem(0, 0, 12, 12)};
    margin: ${utils.rem(0, 4)};
    padding: ${utils.rem(16)};

    &:hover {
      cursor: pointer;
    }

    ${isActive &&
    css`
      background-color: ${utils.color('primary', 'main')};
      color: ${utils.color('primary', 'textContrast')};
    `}
  `
);

export const Sharp = styled.div<{ isActive?: boolean }>(
  ({ theme: { utils }, isActive }) => css`
    margin-left: ${utils.rem(8)};
    padding: ${utils.rem(8)};

    &:hover {
      cursor: pointer;
    }

    ${isActive &&
    css`
      color: ${utils.color('primary', 'main')};
    `}
  `
);
