import { Button, Dialog, Icon } from '@ui';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMedia, usePiano } from '../../hooks';
import { Piano } from '../Piano';
import { Level, Settings, SettingsOptions, Zoom } from '../Settings';
import { Staff } from '../Staff';
import * as Styled from './PianoPage.styled';

interface Props {
  inputs: WebMidi.MIDIInputMap | null;
}

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

function getDefaultSettings(): SettingsOptions {
  return {
    level: (localStorage.getItem('level') as Level) ?? 'beginner',
    withSharp: localStorage.getItem('with-sharp') === 'true',
    zoom: parseFloat((localStorage.getItem('zoom') as string) ?? 1) as Zoom,
  };
}

export const PianoPage: FC<Props> = ({ inputs }) => {
  const showPiano = useMedia(['(min-width: 1080px)'], [true], false);

  const [withSettings, showSettings] = useState<boolean>(false);
  const [{ level, withSharp, zoom }, setSettings] = useState<SettingsOptions>(getDefaultSettings());

  const {
    started,
    practicing,
    currentNote,
    errorNote,
    pressedKeys,
    handleContinue,
    handleOff,
    handleOn,
  } = usePiano(inputs, {
    withSharp,
    ...LEVELS[level],
  });

  useEffect(() => {
    if (inputs?.size! === 0) {
      toast.error('MIDI device IS NOT connected', { id: 'inputs' });
    } else {
      toast.success('MIDI device is connected', { id: 'inputs' });
    }
  }, [inputs]);

  return (
    <>
      <Styled.Page>
        <Styled.ActionBar>
          <div>
            {(!started || !practicing) && (
              <Button onClick={handleContinue}>
                <Styled.Key>C</Styled.Key>
                <span>{started && !practicing ? 'Continue' : 'Start'}</span>
              </Button>
            )}
          </div>
          <div>
            <Button icon="only" onClick={() => showSettings(true)}>
              <Icon icon="settings" size="2x" />
            </Button>
          </div>
        </Styled.ActionBar>
        <Styled.Staff>
          <Staff note={currentNote} errorNote={errorNote} zoom={zoom} />
        </Styled.Staff>
        {showPiano && <Piano keys={pressedKeys} onPress={handleOn} onRelease={handleOff} />}
      </Styled.Page>
      <Dialog show={withSettings} size="mobile" onClose={() => showSettings(false)}>
        <Settings onChange={setSettings} />
      </Dialog>
    </>
  );
};
