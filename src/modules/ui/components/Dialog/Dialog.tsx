import React, { FC, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../Icon';
import { Transition } from '../Transition';
import * as Styled from './Dialog.styled';

type DialogProps = Styled.BaseProps & {
  show?: boolean;
  hideBackdrop?: boolean;
  hideCloseButton?: boolean;
  preventBackdropClose?: boolean;
  preventEscapeClose?: boolean;
  onClose?: () => void;
  onCloseEnd?: (e: TransitionEvent) => void;
};

export const Dialog: FC<DialogProps> = ({
  children,
  show,
  hideBackdrop,
  hideCloseButton,
  preventBackdropClose,
  preventEscapeClose,
  onClose,
  onCloseEnd,
  ...props
}) => {
  const handleBackdropClose = () => {
    if (!preventBackdropClose) {
      onClose?.();
    }
  };

  const handleEscapeClose = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !preventEscapeClose) {
        onClose?.();
      }
    },
    [onClose, preventEscapeClose]
  );

  useEffect(() => {
    if (show) {
      document.addEventListener('keydown', handleEscapeClose, false);
      document.body.style.setProperty('overflow', 'hidden');
      return () => {
        document.removeEventListener('keydown', handleEscapeClose, false);
        document.body.style.removeProperty('overflow');
      };
    }
  }, [handleEscapeClose, show]);

  return createPortal(
    <Transition as={Styled.Base} visible={show} onTransitionEnd={onCloseEnd} {...props}>
      {!hideBackdrop && <Styled.Backdrop onClick={handleBackdropClose} />}
      <Styled.Content>
        {!hideCloseButton && (
          <Styled.CloseButton onClick={onClose}>
            <Icon icon="close" size="1x" />
          </Styled.CloseButton>
        )}
        {children}
      </Styled.Content>
    </Transition>,
    document.body
  );
};
