import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  forwardRef,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { InputLabel } from '../InputLabel';
import { TextHelper } from '../TextHelper/TextHelper';
import * as Styled from './Checkbox.styled';

interface CheckboxProps extends Styled.CheckboxBaseProps {
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

export const Checkbox: FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      name,
      value,
      label,
      defaultChecked: rawDefaultChecked,
      checked: rawChecked,
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
    const [indeterminate, setIndeterminate] = useState(rawDefaultChecked === 'indeterminate');
    const checked = rawChecked !== 'indeterminate' ? rawChecked : true;
    const defaultChecked = rawDefaultChecked !== 'indeterminate' ? rawDefaultChecked : true;

    const inputProps = useMemo(
      () => ({
        name,
        value,
        indeterminate,
        checked,
        defaultChecked,
        disabled,
        onChange,
      }),
      [checked, defaultChecked, onChange, disabled, name, indeterminate, value],
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

    useEffect(() => {
      setIndeterminate(rawChecked === 'indeterminate');
    }, [rawChecked]);

    return (
      <Styled.CheckboxBase {...props}>
        <Styled.CheckboxField>
          <Styled.CheckboxInput type="checkbox" error={!!error} {...inputProps} ref={ref} />
          <Styled.CheckboxBox
            tabIndex={0}
            error={!!error}
            focus={isFocus}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {label && <Styled.CheckboxLabel as={InputLabel}>{label}</Styled.CheckboxLabel>}
        </Styled.CheckboxField>
        {label && error && (
          <Styled.CheckboxHelperText as={TextHelper} color="error" icon="error">
            {error}
          </Styled.CheckboxHelperText>
        )}
        {label && helperText && (
          <Styled.CheckboxHelperText as={TextHelper}>{helperText}</Styled.CheckboxHelperText>
        )}
      </Styled.CheckboxBase>
    );
  },
);
