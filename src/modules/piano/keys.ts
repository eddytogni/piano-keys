export const KEY_ON = 144;
export const KEY_OFF = 128;

type KeyName = 'A' | '#A' | 'B' | 'C' | '#C' | 'D' | '#D' | 'E' | 'F' | '#F' | 'G' | '#G';

export type Note = {
  key: number;
  label: KeyName;
  sharp: boolean;
};

export type KeyMap = {
  [key: string]: Note;
};

export const KEY_NAMES: KeyName[] = [
  'A',
  '#A',
  'B',
  'C',
  '#C',
  'D',
  '#D',
  'E',
  'F',
  '#F',
  'G',
  '#G',
];

export const FIRST_KEY = 21;
export const FIRST_STAFF_KEY = FIRST_KEY;
export const LAST_KEY = 108;
export const LAST_STAFF_KEY = LAST_KEY;
export const MIDDLE_C_KEY = 60;
export const B_KEYS = [59, 47, 35, 23, 71, 83, 95, 107];
export const STAFF_STRIKE_KEYS = [
  23, 26, 27, 29, 30, 33, 34, 36, 37, 40, 60, 61, 81, 82, 84, 85, 88, 91, 92, 95, 98, 99, 101, 102,
  105, 106, 108,
];
export const NB_KEYS = LAST_KEY - FIRST_KEY + 1;

export const KEY_MAP = Array.from({ length: NB_KEYS }, (_, i) => FIRST_KEY + i).reduce<KeyMap>(
  (keys, key, index) => {
    const label = KEY_NAMES[index % 12];
    return {
      ...keys,
      [key]: {
        key,
        label,
        sharp: label.includes('#'),
      },
    };
  },
  {}
);

export const KEYS = Object.keys(KEY_MAP).map<Note>((key) => KEY_MAP[key]);

export const TREBLE_NOTES = KEYS.filter(
  ({ key }) => key >= MIDDLE_C_KEY && key <= LAST_STAFF_KEY
).reverse();

export const BASS_NOTES = KEYS.filter(
  ({ key }) => key < MIDDLE_C_KEY && key >= FIRST_STAFF_KEY
).reverse();
