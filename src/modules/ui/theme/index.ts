import chroma from 'chroma-js';
import { DefaultTheme, Mode, ThemeUtils } from 'styled-components';

const rem = function (base: number, ...pxs: number[]): string {
  return pxs.map((px) => `${px / base}rem`).join(' ');
};
const em = function (base: number, ...pxs: number[]): string {
  return pxs.map((px) => `${px / base}em`).join(' ');
};
const fromRem = function (base: number, rem: string | number): number {
  return parseFloat(rem as string) * base;
};

export const Theme = (function (mode: Mode): DefaultTheme {
  const base = 16;

  const theme: Omit<DefaultTheme, 'utils'> = {
    mode,
    base,
    borderRadius: rem(base, 16),
    colors: {
      palette: {
        default: { main: '#E6E6E6', textContrast: '#34435A' },
        primary: { main: '#81cfb3', textContrast: '#0f3829' },
        secondary: { main: '#d8829d', textContrast: '#25000c' },
        warning: { main: '#F3B559', textContrast: '#482b00' },
        error: { main: '#f82e53', textContrast: '#200006' },
        success: { main: '#1ebb53', textContrast: '#012d0f' },
      },
      text: {
        main: 'rgba(255, 255, 255, 0.75)',
        heading: '#81cfb3',
        body: 'rgba(255, 255, 255, 0.75)',
        label: 'rgba(255, 255, 255, 0.75)',
        helper: 'rgba(255, 255, 255, 0.5)',
      },
      background: {
        default: '#26355a',
        paper: 'rgba(255, 255, 255, 0.1)',
        dialog: 'white',
        backdrop: chroma('26355a').alpha(0.4).css(),
      },
    },
    gradients: {
      default: 'radial-gradient(at 100% 65%, #5094b0 0%, #4a6091 40%, #152141 100%);',
      primary: 'radial-gradient(0% 0% at 100% 100%, #5AA655 0%, #76D96F 100%);',
      secondary: 'radial-gradient(0% 0% at 100% 100%, #425573 0%, #252F40 100%);',
      warning: 'radial-gradient(0% 0% at 100% 100%, #F6CA88 0%, #EFA029 100%);',
      error: 'radial-gradient(0% 0% at 100% 100%, #D65C5C 0%, #B82E2E 100%);',
      success: 'radial-gradient(0% 0% at 100% 100%, #67E0B4 0%, #26BA85 100%);',
    },
    fontFamilies: {
      header: 'Roboto, sans-serif',
      body: 'Roboto, sans-serif',
      accent: 'monospace',
    },
    zIndex: {
      appBar: 100,
      drawer: 110,
      modal: 120,
      snackbar: 130,
      tooltip: 140,
    },
    grid: {
      gutter: 8,
      columns: 12,
    },
    breakpoints: {
      mobile: 400,
      tablet: 640,
      laptop: 960,
      desktop: 1200,
    },
  };

  const utils: ThemeUtils = {
    color: (variant, name, opacity = 1) => {
      const color = theme.colors.palette[variant]?.[name];
      return color && chroma(color).alpha(opacity).css();
    },
    text: (name, opacity = 1) => {
      const color = theme.colors.text[name];
      return color && chroma(color).alpha(opacity).css();
    },
    background: (name) => theme.colors.background[name],
    gradient: (name) => theme.gradients[name],
    font: (name) => theme.fontFamilies[name],
    rem: (...args) => rem(theme.base, ...args),
    em: (...args) => em(theme.base, ...args),
    fromRem: (rem) => fromRem(theme.base, rem),
    css: (condition, attributes) => (condition ? attributes : {}),
    breakpoint: (device) => window.innerWidth >= theme.breakpoints[device],
  };

  return { ...theme, utils };
})('light');
