import { Theme } from '@ui';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, Unsupported, UnsupportedBox } from './App.styled';
import { PianoEntryPoint } from './modules/piano/components/EntryPoint';

const MIDI_COMPATIBLE = 'requestMIDIAccess' in navigator;

function App() {
  const [inputs, setInputs] = useState<WebMidi.MIDIInputMap | null>(null);
  const [incompatible, setIncompatible] = useState(false);

  const requestMidiAccess = async () => {
    try {
      const midiAccess = await navigator.requestMIDIAccess();
      setInputs(midiAccess.inputs);
      setIncompatible(false);
      console.log('Access to Midi device granted!');
    } catch (e) {
      setIncompatible(true);
      console.error('Unable to access Midi device', e);
    }
  };

  useEffect(() => {
    MIDI_COMPATIBLE && requestMidiAccess();
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      {incompatible ? (
        <Unsupported>
          <UnsupportedBox>Not supported MIDI device</UnsupportedBox>
        </Unsupported>
      ) : (
        <PianoEntryPoint inputs={inputs} />
      )}
    </ThemeProvider>
  );
}

export default App;
