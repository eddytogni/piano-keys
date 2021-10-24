import StaffSvg from '@assets/staff.svg';
import { FC, memo } from 'react';
import { BASS_NOTES, Note, TREBLE_NOTES } from '../../keys';
import * as Styled from './Staff.styled';
import { StaffLine } from './StaffLine';

interface Props {
  note: Note | null;
  errorNote: Note | null;
}

const TrebleNotes = TREBLE_NOTES.filter(({ sharp }) => !sharp);
const BassNotes = BASS_NOTES.filter(({ sharp }) => !sharp);

export const Staff: FC<Props> = memo(({ note, errorNote }) => {
  return (
    <Styled.Staff>
      <Styled.NoteSpace>
        <Styled.Image src={StaffSvg} />
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
