import { FC } from 'react';
import { KEYS } from '../../keys';
import * as Styled from './Piano.styled';

interface Props {
  keys: number[];
  onPress: (key: number) => void;
  onRelease: (key: number) => void;
}

export const Piano: FC<Props> = ({ keys, onPress, onRelease }) => {
  const handlePress = (key: number) => () => {
    onPress(key);
  };
  const handleRelease = (key: number) => () => {
    onRelease(key);
  };

  return (
    <Styled.Piano>
      {KEYS.map(({ key, label: value }, i) => (
        <Styled.PianoKey
          key={i}
          isSharp={value.includes('#')}
          isPressed={keys?.includes(key)}
          isMiddleC={key === 60}
          data-name={value}
          onMouseDown={handlePress(key)}
          onMouseUp={handleRelease(key)}
        />
      ))}
    </Styled.Piano>
  );
};
