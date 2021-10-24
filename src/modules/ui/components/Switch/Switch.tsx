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
import * as Styled from './Switch.styled';

interface SwitchProps extends Styled.SwitchBaseProps {
  name: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  label?: string;
  error?: string;
  helperText?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler;
  onFocus?: FocusEventHandler;
}

export const Switch: FC<SwitchProps> = forwardRef<HTMLInputElement, SwitchProps>(
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
        value,
        checked,
        defaultChecked,
        disabled,
        onChange,
      }),
      [checked, defaultChecked, onChange, disabled, name, value],
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
      <Styled.SwitchBase disabled={disabled} {...props}>
        <Styled.SwitchField>
          <Styled.SwitchInput type="checkbox" error={!!error} {...inputProps} ref={ref} />
          <Styled.SwitchBox
            tabIndex={0}
            error={!!error}
            focus={isFocus}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {label && <Styled.SwitchLabel as={InputLabel}>{label}</Styled.SwitchLabel>}
        </Styled.SwitchField>
        {label && error && (
          <Styled.SwitchHelperText as={TextHelper} color="error" icon="error">
            {error}
          </Styled.SwitchHelperText>
        )}
        {label && helperText && (
          <Styled.SwitchHelperText as={TextHelper}>{helperText}</Styled.SwitchHelperText>
        )}
      </Styled.SwitchBase>
    );
  },
);
