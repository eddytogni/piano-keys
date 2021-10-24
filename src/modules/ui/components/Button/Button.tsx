import React, { FC, ReactEventHandler } from 'react';
import * as Styled from './Button.styled';

interface ButtonProps extends Styled.ButtonProps {
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  onClick?: ReactEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = ({
  children,
  color,
  size = 'medium',
  type = 'button',
  ...props
}) => {
  return (
    <Styled.Button color={color} size={size} type={type} {...props}>
      {children}
    </Styled.Button>
  );
};
