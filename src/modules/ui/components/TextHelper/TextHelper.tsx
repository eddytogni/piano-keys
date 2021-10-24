import React, { FC } from 'react';
import { Icon } from '../Icon';
import * as Styled from './TextHelper.styled';

interface IconProps extends Styled.TextHelperProps {
  icon?: string;
}

export const TextHelper: FC<IconProps> = ({ icon, children, color, ...props }) => {
  return (
    <Styled.TextHelper color={color} {...props}>
      {icon && <Styled.TextHelperIcon as={Icon} icon={icon} />}
      <Styled.TextHelperContent>{children}</Styled.TextHelperContent>
    </Styled.TextHelper>
  );
};
