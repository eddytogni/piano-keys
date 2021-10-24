import styled from 'styled-components';

export interface SwitchBaseProps {
  disabled?: boolean;
}

interface SwitchBoxProps {
  focus: boolean;
  error?: boolean;
}

interface SwitchInputProps {
  error?: boolean;
}

export const SwitchBase = styled.div<SwitchBaseProps>(({ theme: { utils } }) => ({
  color: utils.color('default', 'main'),
  padding: utils.rem(0, 0),
  position: 'relative',
  textAlign: 'left',
}));

export const SwitchField = styled.label({
  alignItems: 'center',
  display: 'flex',
  position: 'relative',
});

export const SwitchLabel = styled.div(({ theme: { utils } }) => ({
  lineHeight: 1.2,
  marginLeft: utils.rem(8),
}));

export const SwitchHelperText = styled.div(({ theme: { utils, borderRadius } }) => ({
  padding: utils.rem(4, utils.fromRem(borderRadius), 4, 40),
}));

export const SwitchBox = styled.div<SwitchBoxProps>(({ theme: { utils }, focus, error }) => ({
  backgroundColor: utils.color('secondary', 'main', 0.05),
  border: `1px solid ${utils.color('secondary', 'main')}`,
  borderRadius: utils.rem(16),
  display: 'inline-block',
  height: utils.rem(16),
  padding: utils.rem(1),
  position: 'relative',
  transition: 'background-color .2s',
  width: utils.rem(32),

  '&:hover': {
    cursor: 'pointer',
    boxShadow: `0 0 2px 2px ${utils.color(error ? 'error' : 'primary', 'main', 0.25)}`,
  },

  ...utils.css(focus, {
    boxShadow: `0 0 4px 4px ${utils.color('primary', 'main', 0.5)}`,
  }),

  ...utils.css(focus && error, {
    boxShadow: `0 0 4px 4px ${utils.color('error', 'main', 0.5)}`,
  }),

  ...utils.css(error, {
    backgroundColor: utils.color('error', 'main', 0.05),
    borderColor: utils.color('error', 'main'),
  }),

  ['&::before']: {
    backgroundColor: utils.color('secondary', 'main'),
    borderRadius: '100%',
    content: '""',
    display: 'block',
    height: utils.rem(12),
    position: 'relative',
    transform: 'translateX(0%)',
    transition: 'transform .2s, background-color .2s .1s',
    width: utils.rem(12),
    zIndex: 1,

    ...utils.css(error, {
      backgroundColor: utils.color('error', 'main'),
    }),
  },
}));

export const SwitchInput = styled.input<SwitchInputProps>(({ theme: { utils }, error }) => ({
  display: 'none',

  [`&:checked + ${SwitchBox}`]: {
    backgroundColor: utils.color('secondary', 'main'),
    borderColor: utils.color('secondary', 'main'),

    ...utils.css(error, {
      backgroundColor: utils.color('error', 'main'),
      borderColor: utils.color('error', 'main'),
    }),

    ['&::before']: {
      backgroundColor: utils.color('secondary', 'textContrast'),
      transform: `translateX(${utils.rem(16)})`,

      ...utils.css(error, {
        backgroundColor: utils.color('error', 'textContrast'),
      }),
    },
  },

  [`&:disabled + ${SwitchBox}`]: {
    opacity: 0.4,
    pointerEvents: 'none',
  },
}));
