import { FC, memo } from 'react';
import { MIDDLE_C_KEY, Note, STAFF_STRIKE_KEYS } from '../../../keys';
import { Sharp, SimpleNote } from '../Svg';
import * as Styled from './Line.styled';

interface Props {
  notes: Note[];
  note: Note | null;
  errorNote: Note | null;
}

export const StaffLine: FC<Props> = memo(({ note, notes, errorNote }) => {
  const strikeNote = (n: Note) => {
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
        return errorNote;
      } else if (errorNote.key === n.key) {
        return errorNote;
      }
    }

    if (note) {
      if (note.sharp && note.key === n.key + 1) {
        return note;
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
          <Styled.Line key={staffNote.key} withBar={strikeNote(staffNote)}>
            {match && (
              <Styled.Note title={match.label} isError={match === errorNote}>
                {match.sharp && <Sharp />}
                <SimpleNote />
              </Styled.Note>
            )}
          </Styled.Line>
        );
      })}
    </>
  );
});
