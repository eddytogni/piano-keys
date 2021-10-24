import 'styled-components';

declare module 'styled-components' {
  export type Mode = 'light' | 'dark';
  export type Device = 'mobile' | 'tablet' | 'laptop' | 'desktop';

  export type TextColor = {
    main: string;
    heading: string;
    body: string;
    label: string;
    helper: string;
  };
  export type TextColorName = keyof TextColor;

  export type PaletteColor = {
    main: string;
    textContrast: string;
  };
  export type Color = 'default' | 'primary' | 'secondary' | 'warning' | 'error' | 'success';
  export type Colors = Record<Color, PaletteColor>;
  export type ColorName = keyof PaletteColor;

  export type Background = 'default' | 'paper' | 'dialog' | 'backdrop';
  export type Backgrounds = Record<Background, string>;
  export type Gradients = Record<Color, string>;
  export type FontKey = 'header' | 'body' | 'accent';
  export type FontFamilies = Record<FontKey, string>;

  export interface ThemeUtils {
    color: (color: Color, name: ColorName, opacity?: number) => string;
    text: (name: keyof TextColor, opacity?: number) => string;
    background: (color: Background) => string;
    gradient: (color: Color) => string;
    font: (name: FontKey) => string;
    rem: (...args: number[]) => string;
    em: (...args: number[]) => string;
    fromRem: (rem: string | number) => number;
    css: (condition: boolean | undefined, attributes: CSSObject) => CSSObject;
    breakpoint: (device: Device) => boolean;
  }

  export interface DefaultTheme {
    mode: Mode;
    base: number;
    borderRadius: number | string;
    colors: {
      palette: Colors;
      text: TextColor;
      background: Backgrounds;
    };
    gradients: Gradients;
    fontFamilies: FontFamilies;
    grid: {
      gutter: number;
      columns: number;
    };
    zIndex: {
      appBar: number;
      drawer: number;
      modal: number;
      snackbar: number;
      tooltip: number;
      [key: string]: number;
    };
    breakpoints: Record<Device, number>;
    utils: ThemeUtils;
  }
}
