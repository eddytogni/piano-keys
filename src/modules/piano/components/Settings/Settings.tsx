import { Radio, Switch } from '@ui';
import { ChangeEvent, FC, useEffect } from 'react';
import { useStorate } from '../../hooks';
import * as Styled from './Settings.styled';

export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Zoom = 1 | 1.5 | 2;

type InputEvent = ChangeEvent<HTMLInputElement>;

export interface SettingsOptions {
  withSharp: boolean;
  level: Level;
  zoom: Zoom;
}

interface Props {
  onChange: (options: SettingsOptions) => void;
}

export const Settings: FC<Props> = ({ onChange }) => {
  const [level, setLevel] = useStorate<Level>('level', 'beginner');
  const [zoom, setZoom] = useStorate<Zoom>('zoom', 1);
  const [withSharp, setWithSharp] = useStorate<boolean>('with-sharp', false);

  useEffect(() => {
    onChange({
      level,
      withSharp,
      zoom,
    });
  }, [withSharp, level, zoom]);

  return (
    <Styled.Container>
      <Styled.Title>Settings</Styled.Title>

      <Styled.Options>
        <Styled.OptionsLabel>Level:</Styled.OptionsLabel>
        <Styled.OptionsList>
          <Styled.OptionsItem>
            <Styled.LevelRadio
              as={Radio}
              name="level"
              value="beginner"
              checked={level === 'beginner'}
              onChange={({ target }: InputEvent) => setLevel(target.value as Level)}
            />
            <span>Beginner</span>
          </Styled.OptionsItem>
          <Styled.OptionsItem>
            <Styled.LevelRadio
              as={Radio}
              name="level"
              value="intermediate"
              checked={level === 'intermediate'}
              onChange={({ target }: InputEvent) => setLevel(target.value as Level)}
            />
            <span>Intermediate</span>
          </Styled.OptionsItem>
          <Styled.OptionsItem>
            <Styled.LevelRadio
              as={Radio}
              name="level"
              value="advanced"
              checked={level === 'advanced'}
              onChange={({ target }: InputEvent) => setLevel(target.value as Level)}
            />
            <span>Advanced</span>
          </Styled.OptionsItem>
        </Styled.OptionsList>
      </Styled.Options>

      <Styled.Options>
        <Styled.OptionsLabel>
          <div>Sharp </div>
        </Styled.OptionsLabel>
        <Styled.OptionsList>
          <Styled.OptionsItem>
            <Switch
              name="sharp"
              checked={withSharp}
              onChange={({ target }) => setWithSharp(target.checked)}
            />
          </Styled.OptionsItem>
        </Styled.OptionsList>
      </Styled.Options>

      <Styled.Options>
        <Styled.OptionsLabel>
          <div>Zoom </div>
        </Styled.OptionsLabel>
        <Styled.OptionsList>
          <Styled.OptionsItem>
            <Styled.LevelRadio
              as={Radio}
              name="zoom"
              value="1"
              checked={zoom === 1}
              onChange={({ target }: InputEvent) => setZoom(parseFloat(target.value) as Zoom)}
            />
            <span>1x</span>
          </Styled.OptionsItem>
          <Styled.OptionsItem>
            <Styled.LevelRadio
              as={Radio}
              name="zoom"
              value="1.5"
              checked={zoom === 1.5}
              onChange={({ target }: InputEvent) => setZoom(parseFloat(target.value) as Zoom)}
            />
            <span>1.5x</span>
          </Styled.OptionsItem>
          <Styled.OptionsItem>
            <Styled.LevelRadio
              as={Radio}
              name="zoom"
              value="2"
              checked={zoom === 2}
              onChange={({ target }: InputEvent) => setZoom(parseFloat(target.value) as Zoom)}
            />
            <span>2x</span>
          </Styled.OptionsItem>
        </Styled.OptionsList>
      </Styled.Options>
    </Styled.Container>
  );
};
