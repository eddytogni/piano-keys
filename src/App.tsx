import { Theme } from '@ui';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, Link, Unsupported, UnsupportedBox } from './App.styled';
import { PianoPage } from './modules/piano';

const MIDI_COMPATIBLE = 'requestMIDIAccess' in navigator;
const WAKELOCK_COMPATIBLE = 'wakeLock' in navigator;

function App() {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);
  const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess | null>(null);
  const [inputs, setInputs] = useState<WebMidi.MIDIInputMap | null>(null);
  const [isCompatible, setCompatible] = useState(false);

  const handleInputs = () => {
    if (midiAccess) {
      setInputs(midiAccess.inputs);
    }
  };

  const requestMidiAccess = async () => {
    try {
      const midiAccess = await navigator.requestMIDIAccess({ sysex: true });
      setMidiAccess(midiAccess);
      setInputs(midiAccess.inputs);
      setCompatible(true);
    } catch (e) {
      setCompatible(false);
    }
  };

  const requestWakeLock = async () => {
    try {
      const wakeLock = await navigator.wakeLock.request('screen');
      setWakeLock(wakeLock);
    } catch (err) {
      console.log(`Unable to keep the screen awake`, err);
    }
  };

  useEffect(() => {
    if (midiAccess) {
      midiAccess.addEventListener('statechange', handleInputs);

      return () => {
        midiAccess.removeEventListener('statechange', handleInputs);
      };
    }
  }, [midiAccess]);

  useEffect(() => {
    if (wakeLock) {
      return () => {
        wakeLock.release();
      };
    }
  }, [wakeLock]);

  useEffect(() => {
    MIDI_COMPATIBLE && requestMidiAccess();
    WAKELOCK_COMPATIBLE && requestWakeLock();
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Toaster position="top-center" />
      {isCompatible ? (
        <PianoPage inputs={inputs} />
      ) : (
        <Unsupported>
          <UnsupportedBox>
            <div>Unsupported Web MIDI API</div>
            <Link
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API"
              target="_blank"
            >
              MDN Web doc
            </Link>
          </UnsupportedBox>
        </Unsupported>
      )}
    </ThemeProvider>
  );
}

export default App;
