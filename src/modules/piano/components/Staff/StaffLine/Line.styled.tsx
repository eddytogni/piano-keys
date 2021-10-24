import styled, { css } from 'styled-components';

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
