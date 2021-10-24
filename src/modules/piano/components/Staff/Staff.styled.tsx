import styled, { css } from 'styled-components';

const MULTIPLIER = 1;

export const Staff = styled.div(
  ({ theme: { utils, borderRadius } }) => css`
    background: white;
    border-radius: ${borderRadius};
    box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
    color: black;
    font-size: ${utils.rem(16 * MULTIPLIER)};
    max-width: ${utils.em(320)};
    position: relative;
    width: 100%;

    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }
  `
);

export const NoteSpace = styled.div(
  ({ theme: { utils } }) => css`
    height: calc(100% - ${utils.em(64)});
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - ${utils.em(64)});
  `
);

export const Image = styled.img(
  () => css`
    display: block;
    height: 100%;
    width: 100%;
  `
);

export const TrebleClef = styled.div(
  ({ theme: { utils } }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: ${utils.em(70)};
    position: absolute;
    top: ${utils.em(48)};
    width: 100%;
  `
);

export const BassClef = styled.div(
  ({ theme: { utils } }) => css`
    display: flex;
    flex-direction: column;
    height: ${utils.em(68)};
    position: absolute;
    top: ${utils.em(138)};
    width: 100%;
  `
);

interface LineProps {
  numberOfNotes?: number;
  withBar?: boolean;
}

export const Line = styled.div<LineProps>(
  ({ theme: { utils }, numberOfNotes = 11, withBar }) => css`
    flex: 0 0 calc(100% / ${numberOfNotes});
    position: relative;

    ${withBar &&
    css`
      &:before {
        background-color: black;
        content: '';
        display: block;
        height: ${utils.em(2)};
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        width: ${utils.em(32)};
      }
    `}
  `
);

interface NoteProps {
  dataType?: '#' | 'b' | null;
}

export const Note = styled.div<NoteProps>(
  ({ theme: { utils }, dataType }) => css`
    align-items: center;
    display: flex;
    font-weight: 700;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;

    ${dataType &&
    css`
      &:before {
        content: '${dataType}';
        display: block;
        margin-right: ${utils.em(4)};
      }
    `}
  `
);

export const NoteImage = styled.img(
  ({ theme: { utils } }) => css`
    height: ${utils.em(14)};
    width: ${utils.em(14)};
  `
);

export const SharpSymbolImage = styled.img(
  ({ theme: { utils } }) => css`
    height: ${utils.em(28)};
    margin-right: ${utils.em(4)};
    width: ${utils.em(13)};
  `
);
