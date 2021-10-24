import { FC, memo } from 'react';
import { KEY_MAP, MIDDLE_C_KEY, Note, STAFF_STRIKE_KEYS } from '../../../keys';
import { StaffNote } from '../StaffNote';
import * as Styled from './Line.styled';

interface Props {
  notes: Note[];
  note: Note | null;
  errorNote: Note | null;
}

export const StaffLine: FC<Props> = memo(({ note, notes, errorNote }) => {
  const strikeNote = (matchNote: Note | null, n: Note) => {
    if (matchNote && STAFF_STRIKE_KEYS.includes(matchNote.key)) {
      return true;
    }

    if (n.key > MIDDLE_C_KEY && n.key <= note?.key!) {
      return STAFF_STRIKE_KEYS.includes(n.key);
    }

    if (n.key < MIDDLE_C_KEY && n.key >= note?.key!) {
      return STAFF_STRIKE_KEYS.includes(n.key);
    }

    return STAFF_STRIKE_KEYS.includes(n.key) && n.key === note?.key;
  };

  const matchNote = (n: Note): Note | null => {
    if (errorNote) {
      if (errorNote.sharp && errorNote.key === n.key + 1) {
        return KEY_MAP[n.key + 1];
      } else if (errorNote.key === n.key) {
        return errorNote;
      }
    }

    if (note) {
      if (note.sharp && note.key === n.key + 1) {
        return KEY_MAP[n.key + 1];
      } else if (note.key === n.key) {
        return note;
      }
    }

    return null;
  };

  if (!note) {
    return null;
  }

  return (
    <>
      {notes.map((staffNote) => {
        const match = matchNote(staffNote);
        return (
          <Styled.Line key={staffNote.key} withBar={strikeNote(match, staffNote)}>
            {match && <StaffNote note={match} isError={match.key === errorNote?.key} />}
          </Styled.Line>
        );
      })}
    </>
  );
});
