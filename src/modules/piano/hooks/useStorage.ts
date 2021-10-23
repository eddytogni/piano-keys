import { Dispatch, SetStateAction, useState } from 'react';

function tryParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

// @TODO: improve
export const useStorate = <S>(key: string, defaultValue: S): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState<S>(
    localStorage.getItem(key) === null ? defaultValue : tryParse(localStorage.getItem(key)!)
  );

  const setStorage = (argument: any) => {
    if (typeof argument === 'function') {
      const returnValue = argument(state);
      localStorage.setItem(key, JSON.stringify(returnValue));
      setState(returnValue);
    } else {
      localStorage.setItem(key, JSON.stringify(argument));
      setState(argument);
    }
  };

  return [state, setStorage];
};
