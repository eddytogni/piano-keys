import styled from 'styled-components';

export interface InputLabelBaseProps {}

export const Base = styled.label<InputLabelBaseProps>(({ theme: { utils } }) => ({
  color: utils.text('label'),
  display: 'inline-block',
  fontSize: utils.rem(14),
  lineHeight: 1,
  pointerEvents: 'none',
  userSelect: 'none',
}));
