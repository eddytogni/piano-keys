import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  forwardRef,
  ReactNode,
  useMemo,
  useState,
} from 'react';
import { InputLabel } from '../InputLabel';
import { TextHelper } from '../TextHelper/TextHelper';
import * as Styled from './Radio.styled';

interface RadioProps extends Styled.RadioBaseProps {
  name: string;
  value?: string;
  checked?: Styled.Checked;
  defaultChecked?: Styled.Checked;
  disabled?: boolean;
  label?: string;
  error?: string;
  helperText?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler;
  onFocus?: FocusEventHandler;
}

export const Radio: FC<RadioProps> = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      name,
      value,
      label,
      defaultChecked,
      checked,
      disabled,
      error,
      helperText,
      onChange,
      onBlur,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const [isFocus, setFocus] = useState(false);

    const inputProps = useMemo(
      () => ({
        name,
        checked,
        defaultChecked,
        value,
        disabled,
        onChange,
      }),
      [checked, defaultChecked, onChange, onBlur, onFocus, disabled, name, value],
    );

    const handleBlur = (e: React.FocusEvent) => {
      e.persist();
      setFocus(false);
      onBlur?.(e);
    };
    const handleFocus = (e: React.FocusEvent) => {
      e.persist();
      setFocus(true);
      onFocus?.(e);
    };

    return (
      <Styled.Base {...props}>
        <Styled.Field>
          <Styled.Input type="radio" error={!!error} {...inputProps} ref={ref} />
          <Styled.Box
            tabIndex={0}
            checked={checked ?? defaultChecked}
            error={!!error}
            focus={isFocus}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {label && <Styled.Label as={InputLabel}>{label}</Styled.Label>}
        </Styled.Field>
        {label && error && (
          <Styled.HelperText as={TextHelper} color="error" icon="error">
            {error}
          </Styled.HelperText>
        )}
        {label && helperText && <Styled.HelperText as={TextHelper}>{helperText}</Styled.HelperText>}
      </Styled.Base>
    );
  },
);
