import React, { FC } from 'react';
import * as Styled from './InputLabel.styled';

interface InputLabelProps extends Styled.InputLabelBaseProps {}

export const InputLabel: FC<InputLabelProps> = ({ children, ...props }) => {
  return <Styled.Base {...props}>{children}</Styled.Base>;
};
