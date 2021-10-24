import styled, { css } from 'styled-components';

export const Container = styled.section(
  ({ theme: { utils } }) => css`
    color: ${utils.text('main')};
  `
);

export const Title = styled.h1(
  ({ theme: { utils } }) => css`
    color: ${utils.text('heading')};
    font-size: ${utils.rem(20)};
    font-weight: 700;
    margin: ${utils.rem(0, 0, 24)};
    text-align: center;
    text-transform: uppercase;
  `
);

export const Options = styled.div(
  ({ theme: { utils } }) => css`
    align-items: flex-start;
    display: flex;
    justify-content: flex-start;
    margin-bottom: ${utils.rem(16)};
    width: 100%;
  `
);
export const OptionsLabel = styled.div(
  ({ theme: { utils } }) => css`
    align-items: center;
    display: flex;
    margin-right: ${utils.rem(16)};
    width: ${utils.rem(75)};
  `
);

export const OptionsList = styled.div(({ theme: { utils } }) => css``);

export const OptionsItem = styled.label(
  ({ theme: { utils } }) => css`
    align-items: center;
    display: flex;
    margin-bottom: ${utils.rem(8)};
  `
);

export const LevelRadio = styled.div(
  ({ theme: { utils } }) => css`
    margin-right: ${utils.rem(8)};
  `
);
