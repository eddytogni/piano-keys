import { FC, memo } from 'react';
import { BASS_NOTES, Note, TREBLE_NOTES } from '../../keys';
import { Zoom } from '../Settings';
import * as Styled from './Staff.styled';
import { StaffLine } from './StaffLine';
import { StaffSvg } from './Svg';

interface Props {
  note: Note | null;
  errorNote: Note | null;
  zoom: Zoom;
}

const TrebleNotes = TREBLE_NOTES.filter(({ sharp }) => !sharp);
const BassNotes = BASS_NOTES.filter(({ sharp }) => !sharp);

export const Staff: FC<Props> = memo(({ note, errorNote, zoom }) => {
  return (
    <Styled.Staff zoom={zoom}>
      <Styled.NoteSpace>
        <StaffSvg />
        <Styled.TrebleClef>
          <StaffLine note={note} errorNote={errorNote} notes={TrebleNotes} />
        </Styled.TrebleClef>
        <Styled.BassClef>
          <StaffLine note={note} errorNote={errorNote} notes={BassNotes} />
        </Styled.BassClef>
      </Styled.NoteSpace>
    </Styled.Staff>
  );
});
