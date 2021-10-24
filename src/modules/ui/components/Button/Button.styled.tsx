import styled, { Color } from 'styled-components';
import { Icon } from '../Icon/Icon.styled';

export interface ButtonProps {
  color?: Color;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge';
  icon?: undefined | 'prepend' | 'append' | 'both-sides' | 'only';
  outlined?: boolean;
  gradient?: boolean;
}

const sizes = {
  tiny: 12,
  small: 14,
  medium: 16,
  large: 18,
  huge: 20,
};

export const Button = styled.button<ButtonProps>((props) => {
  const {
    theme: { utils, borderRadius },
    color,
    size,
    outlined,
    gradient,
    icon,
  } = props;

  const fontSize = sizes[size as keyof typeof sizes];

  const fs = fontSize - (outlined ? 2 : 0);
  const y = fs - 4;
  const x = fs - 4;

  return {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius,
    border: 'none',
    color: utils.color('primary', 'main'),
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: utils.font('body'),
    fontSize: utils.rem(fontSize),
    fontWeight: 600,
    lineHeight: 1,
    position: 'relative',
    transition: 'all .2s',

    ['&:hover']: {
      opacity: 0.85,
    },

    ['&:disabled']: {
      opacity: 0.4,
      pointerEvents: 'none',
    },

    [Icon]: {
      fontWeight: 'normal',
    },

    ...utils.css(!!color, {
      backgroundColor: utils.color(color!, 'main'),
      color: utils.color(color!, 'textContrast'),
    }),

    ...utils.css(!!color && outlined, {
      backgroundColor: color && utils.color(color, 'main', 0.05),
      border: color && `2px solid ${utils.color(color!, 'main')}`,
      color: utils.color(color!, 'main'),
    }),

    ...utils.css(!!color && !outlined && gradient, {
      background: color && utils.gradient(color!),
    }),

    ...utils.css(!icon, {
      padding: utils.em(y, fs),
    }),

    ...utils.css(icon === 'only', {
      padding: utils.em(y, x),
    }),

    ...utils.css(icon === 'prepend', {
      padding: utils.em(y, fs, y, x),
      [Icon]: {
        marginRight: utils.em(fs / 2),
      },
    }),

    ...utils.css(icon === 'append', {
      padding: utils.em(y, x, y, fs),
      [Icon]: {
        marginLeft: utils.em(fs / 2),
      },
    }),

    ...utils.css(icon === 'both-sides', {
      padding: utils.em(y, x),
      [`${Icon}:first-child`]: {
        marginRight: utils.em(fs / 2),
      },
      [`${Icon}:last-child`]: {
        marginLeft: utils.em(fs / 2),
      },
    }),
  };
});
