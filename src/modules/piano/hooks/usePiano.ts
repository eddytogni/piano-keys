import { useEffect, useState } from 'react';
import { COMMAND_KEY_OFF, COMMAND_KEY_ON, KEY_MAP, MIDDLE_C_KEY, Note } from '../keys';
import { getRandomeNote, RandomNoteOptions } from '../utils';

type Options = RandomNoteOptions;

interface State {
  currentNote: Note | null;
  started: boolean;
  practicing: boolean;
  errorNote: Note | null;
}

export const usePiano = (inputs: WebMidi.MIDIInputMap | null, options: Options) => {
  const [pressedKeys, setPressedKeys] = useState<number[]>([]);
  const [{ currentNote, errorNote, started, practicing }, setState] = useState<State>({
    currentNote: null,
    errorNote: null,
    started: false,
    practicing: false,
  });

  const handleContinue = () => {
    let note = getRandomeNote(options);

    if (currentNote) {
      while (note.key === currentNote?.key) {
        note = getRandomeNote(options);
      }
    }

    setState((state) => ({
      ...state,
      started: true,
      practicing: true,
      errorNote: null,
      currentNote: note,
    }));
  };

  const handleOn = (key: number) => {
    setPressedKeys((keys) => [...keys, key]);
    if (practicing) {
      if (currentNote) {
        if (key !== currentNote.key) {
          setState((state) => ({
            ...state,
            errorNote: KEY_MAP[key],
            practicing: false,
          }));
        } else {
          handleContinue();
        }
      }
    } else if (key === MIDDLE_C_KEY) {
      handleContinue();
    }
  };

  const handleOff = (key: number) => {
    setPressedKeys((keys) => keys.filter((k) => k !== key));
  };

  const handleInputs = ({ data: [command, key, velocity] }: any) => {
    if (command === COMMAND_KEY_ON) {
      if (velocity > 0) {
        handleOn(key);
      } else {
        handleOff(key);
      }
    } else if (command === COMMAND_KEY_OFF) {
      handleOff(key);
    }
  };

  useEffect(() => {
    if (inputs) {
      inputs.forEach((input) => {
        input.addEventListener('midimessage', handleInputs);
      });

      return () => {
        inputs.forEach((input) => {
          input.removeEventListener('midimessage', handleInputs);
        });
      };
    }
  }, [inputs, currentNote, practicing, options]);

  return {
    started,
    practicing,
    pressedKeys,
    currentNote,
    errorNote,
    handleOn,
    handleOff,
    handleContinue,
  };
};
