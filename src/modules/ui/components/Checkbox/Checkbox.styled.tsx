import styled from 'styled-components';

export interface CheckboxBaseProps {}

export type Checked = true | false | 'indeterminate';

interface CheckboxBoxProps {
  focus: boolean;
  error?: boolean;
}

interface CheckboxInputProps {
  error?: boolean;
  indeterminate: boolean;
}

export const CheckboxBase = styled.div<CheckboxBaseProps>(({ theme: { utils } }) => ({
  padding: utils.rem(0, 0),
  position: 'relative',
  textAlign: 'left',
  width: '100%',

  '&:not(:last-child)': {
    marginBottom: utils.rem(16),
  },
}));

export const CheckboxField = styled.label({
  alignItems: 'center',
  display: 'flex',
  position: 'relative',
});

export const CheckboxLabel = styled.div(({ theme: { utils } }) => ({
  lineHeight: 1.2,
  marginLeft: utils.rem(8),
}));

export const CheckboxHelperText = styled.div(({ theme: { utils, borderRadius } }) => ({
  padding: utils.rem(4, utils.fromRem(borderRadius), 4, 24),
}));

export const CheckboxBox = styled.div<CheckboxBoxProps>(
  ({ theme: { utils, borderRadius }, focus, error }) => ({
    borderRadius,
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
  }),
);

export const CheckboxInput = styled.input<CheckboxInputProps>(
  ({ theme: { utils, borderRadius }, error, indeterminate }) => ({
    display: 'none',

    [`&:checked + ${CheckboxBox}`]: {
      backgroundColor: utils.color('secondary', 'main'),
      borderColor: utils.color('secondary', 'main'),

      ...utils.css(error, {
        backgroundColor: utils.color('error', 'main'),
        borderColor: utils.color('error', 'main'),
      }),

      ['&::before, &::after']: {
        backgroundColor: utils.color('secondary', 'textContrast'),
        borderRadius,
        content: '""',
        display: 'block',
        height: utils.rem(2),
        width: '70%',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-35%, -50%) rotate(-45deg)',
        zIndex: 1,

        ...utils.css(indeterminate, {
          transform: 'translate(-50%, -50%)',
        }),

        ...utils.css(error, {
          backgroundColor: utils.color('error', 'textContrast'),
        }),
      },

      ['&::after']: {
        ...utils.css(!indeterminate, {
          width: '40%',
          transform: 'translate(-105%, 20%) rotate(45deg)',
        }),
      },
    },

    [`&:disabled + ${CheckboxBox}`]: {
      opacity: 0.4,
      pointerEvents: 'none',
    },
  }),
);
