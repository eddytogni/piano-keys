import styled, { Device } from 'styled-components';

export interface BaseProps {
  size?: Device;
}

export const Base = styled.div<BaseProps>(({ theme: { utils, zIndex, breakpoints }, size }) => ({
  alignItems: 'flex-end',
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  left: 0,
  position: 'fixed',
  opacity: 0,
  top: 0,
  transition: 'opacity 0.2s',
  width: '100vw',
  zIndex: zIndex.dialog,

  ...utils.css(utils.breakpoint('tablet'), {
    alignItems: 'center',
  }),

  [Content]: {
    ...utils.css(size && utils.breakpoint(size), {
      maxWidth: utils.rem(breakpoints[size as keyof typeof breakpoints]),
    }),
  },

  '&.active': {
    opacity: 1,

    [Content]: {
      transform: 'translateY(0%)',
    },
  },
}));

export const Backdrop = styled.div(({ theme: { utils } }) => ({
  backgroundColor: utils.background('backdrop'),
  height: '100%',
  left: 0,
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 0,
}));

export const Content = styled.div(({ theme: { utils, colors } }) => ({
  background: colors.background.default,
  boxShadow: `${utils.rem(0, 8, 32)} rgba(0, 0, 0, 0.1)`,
  borderRadius: utils.rem(16, 16, 0, 0),
  maxHeight: '100%',
  overflow: 'auto',
  margin: 0,
  minHeight: utils.rem(100),
  padding: utils.rem(16),
  position: 'relative',
  transition: 'transform 0.3s',
  transform: 'translateY(50%)',
  width: '100%',
  zIndex: 1,

  ...utils.css(utils.breakpoint('tablet'), {
    borderRadius: utils.rem(16),
    maxHeight: `calc(100% - ${utils.rem(32)})`,
  }),
}));

export const CloseButton = styled.div(({ theme: { utils } }) => ({
  color: utils.color('secondary', 'main', 0.7),
  cursor: 'pointer',
  padding: utils.rem(16),
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 2,

  '&:hover': {
    color: utils.color('secondary', 'main'),
  },
}));
