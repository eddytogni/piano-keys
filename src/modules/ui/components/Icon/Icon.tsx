import React, { FC, forwardRef } from 'react';
import * as Styled from './Icon.styled';

interface IconProps extends Styled.IconProps {
  icon: string;
  spin?: boolean;
}

export const Icon: FC<IconProps> = forwardRef<HTMLElement, IconProps>(
  ({ icon, size, spin, ...props }, ref) => {
    return (
      <Styled.Icon size={size} spin={spin} {...props} ref={ref}>
        {icon}
      </Styled.Icon>
    );
  },
);
