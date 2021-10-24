import { FC, memo } from 'react';
import { animated, useTransition } from 'react-spring';
import { Note } from '../../../keys';
import { Sharp, SimpleNote } from '../Svg';
import * as Styled from './Note.styled';

interface Props {
  note: Note;
  isError?: boolean;
}

export const StaffNote: FC<Props> = memo(({ note, isError }) => {
  const transition = useTransition(note.key, {
    from: { scale: 0 },
    enter: { scale: 1 },
    leave: { scale: 0 },
    config: {
      tension: 180,
      friction: 12,
    },
  });

  return transition(({ scale }) => (
    <Styled.Note
      as={animated.div}
      style={{
        zIndex: isError ? 1 : 0,
        opacity: isError ? 0.8 : 1,
        transform: scale.to((scale) => `scale(${scale}) translate(-50%, -50%)`),
      }}
      title={note.label}
    >
      <Styled.NoteInner isError={isError}>
        {note.sharp && <Sharp />}
        <SimpleNote />
      </Styled.NoteInner>
    </Styled.Note>
  ));
});
