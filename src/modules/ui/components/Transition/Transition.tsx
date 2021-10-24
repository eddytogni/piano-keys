/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

enum ANIMATION_STATE {
  VISIBLE,
  ENTERING,
  HIDDEN,
  LEAVING,
}

const Base = styled.div``;

export type TransitionProps = Omit<HTMLAttributes<HTMLDivElement>, 'onTransitionEnd'> & {
  visible?: boolean;
  activeClassName?: string;
  as?: any;
  onTransitionEnd?: (e: TransitionEvent) => void;
};

export const Transition: FC<TransitionProps> = ({
  children,
  visible,
  activeClassName = 'active',
  onTransitionEnd,
  ...props
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ANIMATION_STATE>(
    visible ? ANIMATION_STATE.VISIBLE : ANIMATION_STATE.HIDDEN
  );

  const handleTransitionEnd = useCallback(
    (e: TransitionEvent) => {
      setState(ANIMATION_STATE.HIDDEN);
      onTransitionEnd?.(e);
    },
    [onTransitionEnd]
  );

  useEffect(() => {
    if (!visible) {
      setState((s) => (s !== ANIMATION_STATE.HIDDEN ? ANIMATION_STATE.LEAVING : s));
    } else {
      setState((s) =>
        s === ANIMATION_STATE.HIDDEN ? ANIMATION_STATE.ENTERING : ANIMATION_STATE.VISIBLE
      );
    }
  }, [visible]);

  useEffect(() => {
    if (state === ANIMATION_STATE.LEAVING) {
      const domElement = menuRef.current;
      domElement?.addEventListener('transitionend', handleTransitionEnd);
      return () => {
        domElement?.removeEventListener('transitionend', handleTransitionEnd);
      };
    } else if (state === ANIMATION_STATE.ENTERING) {
      document.body.offsetHeight; // force repaint
      setState(ANIMATION_STATE.VISIBLE);
    }
  }, [state, handleTransitionEnd]);

  if (state === ANIMATION_STATE.HIDDEN) {
    return null;
  }

  return (
    <Base className={state === ANIMATION_STATE.VISIBLE && activeClassName} ref={menuRef} {...props}>
      {children}
    </Base>
  );
};
