import styled from 'styled-components';

export interface RadioBaseProps {}

export type Checked = true | false;

interface RadioBoxProps {
  focus: boolean;
  checked?: boolean;
  error?: boolean;
}

interface RadioInputProps {
  error?: boolean;
}

export const Base = styled.div<RadioBaseProps>(({ theme: { utils } }) => ({
  padding: utils.rem(0, 0),
  position: 'relative',
  textAlign: 'left',
}));

export const Field = styled.label({
  alignItems: 'center',
  display: 'flex',
  position: 'relative',
});

export const Label = styled.div(({ theme: { utils } }) => ({
  lineHeight: 1.2,
  marginLeft: utils.rem(8),
}));

export const HelperText = styled.div(({ theme: { utils, borderRadius } }) => ({
  padding: utils.rem(4, utils.fromRem(borderRadius), 4, 24),
}));

export const Box = styled.div<RadioBoxProps>(({ theme: { utils }, focus, error }) => ({
  borderRadius: '100%',
  border: `1px solid ${utils.color('default', 'main')}`,
  display: 'inline-block',
  height: utils.rem(16),
  position: 'relative',
  width: utils.rem(16),

  '&:hover': {
    cursor: 'pointer',
    boxShadow: `0 0 2px 2px ${utils.color(error ? 'error' : 'primary', 'main', 0.25)}`,
  },

  ...utils.css(focus, {
    boxShadow: `0 0 4px 4px ${utils.color(error ? 'error' : 'primary', 'main', 0.5)}`,
  }),

  ...utils.css(error, {
    backgroundColor: utils.color('error', 'main', 0.05),
    borderColor: utils.color('error', 'main'),
  }),
}));

export const Input = styled.input<RadioInputProps>(({ theme: { utils }, error }) => ({
  display: 'none',

  [`&:checked + ${Box}`]: {
    borderColor: utils.color('secondary', 'main'),

    ...utils.css(error, {
      backgroundColor: utils.color('error', 'textContrast'),
      borderColor: utils.color('error', 'main'),
    }),

    ['&::before']: {
      backgroundColor: utils.color('secondary', 'main'),
      borderRadius: '100%',
      bottom: utils.rem(2),
      content: '""',
      display: 'block',
      left: utils.rem(2),
      position: 'absolute',
      right: utils.rem(2),
      top: utils.rem(2),
      zIndex: 1,

      ...utils.css(error, {
        backgroundColor: utils.color('error', 'main'),
      }),
    },
  },

  [`&:disabled + ${Box}`]: {
    opacity: 0.4,
    pointerEvents: 'none',
  },
}));
