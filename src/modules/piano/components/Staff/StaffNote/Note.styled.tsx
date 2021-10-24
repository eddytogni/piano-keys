import styled, { css } from 'styled-components';

interface NoteProps {
  isError?: boolean;
}

export const Note = styled.div(
  () => css`
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
  `
);

export const NoteInner = styled.div<NoteProps>(
  ({ theme: { utils }, isError }) => css`
    align-items: center;
    color: ${utils.background('default')};
    display: flex;
    font-weight: 700;

    ${isError &&
    css`
      color: ${utils.color('error', 'main', 0.95)};
    `}
  `
);

export const Sharp = styled.div(
  ({ theme: { utils } }) => css`
    margin-left: ${utils.em(-13 - 4)};
    margin-right: ${utils.em(4)};
  `
);
