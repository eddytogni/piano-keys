import { Dispatch, SetStateAction, useState } from 'react';

type UseToggleOutput = readonly [boolean, () => void, Dispatch<SetStateAction<boolean>>];

export const useToggle = (defaultState?: boolean): UseToggleOutput => {
  const [state, setState] = useState<boolean>(defaultState ?? false);

  const toggleState = () => {
    setState((s) => !s);
  };

  return [state, toggleState, setState];
};
