import styled, { Color } from 'styled-components';

export interface TextHelperProps {
  color?: Color;
}

export const TextHelper = styled.div<TextHelperProps>(({ theme: { utils }, color }) => ({
  color: color ? utils.color(color, 'main') : utils.text('helper'),
  fontSize: utils.rem(12),
  fontWeight: 400,
  opacity: 0.7,
}));

export const TextHelperIcon = styled.span(({ theme: { utils } }) => ({
  marginRight: utils.rem(4),
}));

export const TextHelperContent = styled.span({
  color: 'currentcolor',
});
