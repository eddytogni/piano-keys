import { FIRST_STAFF_KEY, KEYS, LAST_STAFF_KEY, Note } from '../keys';

export interface RandomNoteOptions {
  withSharp?: boolean;
  firstKey?: number;
  lastKey?: number;
}

export function getRandomeNote(options: RandomNoteOptions): Note {
  const withSharp = options.withSharp ?? false;
  const firstKey = options.firstKey ?? FIRST_STAFF_KEY;
  const lastKey = options.lastKey ?? LAST_STAFF_KEY;

  const notes = KEYS.filter(
    (note) => note.key >= firstKey && note.key <= lastKey && (withSharp || !note.sharp)
  );
  const randomIndex = Math.floor(Math.random() * notes.length);

  return notes[randomIndex];
}
