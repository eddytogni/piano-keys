import { FC } from 'react';
import { Piano } from '..';
import { usePiano, useStorate } from '../../hooks';
import { Staff } from '../Staff';
import { Sharp } from '../Staff/Svg';
import * as Styled from './EntryPoint.styled';

interface Props {
  inputs: WebMidi.MIDIInputMap | null;
}

type Level = 'beginner' | 'intermediate' | 'advanced';

const LEVELS = {
  beginner: {
    firstKey: 43,
    lastKey: 78,
  },
  intermediate: {
    firstKey: 33,
    lastKey: 91,
  },
  advanced: {
    firstKey: 21,
    lastKey: 108,
  },
};

export const PianoEntryPoint: FC<Props> = ({ inputs }) => {
  const [level, setLevel] = useStorate<Level>('level', 'beginner');
  const [withSharp, setWithSharp] = useStorate<boolean>('with-sharp', false);

  const {
    started,
    practicing,
    currentNote,
    errorNote,
    pressedKeys,
    handleContinue,
    handleOff,
    handleOn,
    handleReset,
  } = usePiano(inputs, {
    withSharp,
    ...LEVELS[level],
  });

  return (
    <Styled.Page>
      <Styled.ActionBar>
        <div>
          {(!started || !practicing) && (
            <Styled.Start onClick={handleContinue}>
              <Styled.Key>C</Styled.Key>
              <span>{started && !practicing ? 'Continue' : 'Start'}</span>
            </Styled.Start>
          )}
        </div>
        <Styled.Levels>
          <Styled.Level isActive={level === 'beginner'} onClick={() => setLevel('beginner')}>
            Beginner
          </Styled.Level>
          <Styled.Level
            isActive={level === 'intermediate'}
            onClick={() => setLevel('intermediate')}
          >
            Intermediate
          </Styled.Level>
          <Styled.Level isActive={level === 'advanced'} onClick={() => setLevel('advanced')}>
            Advanced
          </Styled.Level>
          <Styled.Sharp isActive={withSharp} onClick={() => setWithSharp(!withSharp)}>
            <Sharp />
          </Styled.Sharp>
        </Styled.Levels>
        <div>
          {started && !practicing && (
            <Styled.Start onClick={handleReset}>
              <span>Reset</span>
              <Styled.Key>B</Styled.Key>
            </Styled.Start>
          )}
        </div>
      </Styled.ActionBar>
      <Styled.Staff>
        <Staff note={currentNote} errorNote={errorNote} />
      </Styled.Staff>
      <Piano keys={pressedKeys} onPress={handleOn} onRelease={handleOff} />
    </Styled.Page>
  );
};
