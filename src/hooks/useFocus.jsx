import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate, usePath } from 'hookrouter';
import { setFocus, setCurrentItem } from '../store/ducks/focus';

export const useFocus = ({
  keyboardKey,
  initialCursor,
  cursorCallbackRight,
  cursorCallbackLeft,
  cursorCallbackDown,
  cursorCallbackUp,
  items,
  navigateTo,
  navigateBack,
  nextFocus,
  currentFocus,
  prevFocus,
}) => {
  const [cursor, setCursor] = useState(initialCursor);

  const dispatch = useDispatch();
  const globalFocus = useSelector(state => state.focus.globalFocus);
  const path = usePath();

  const executionCondition = globalFocus === currentFocus;

  const callbacks = {
    ArrowRight: cursorCallbackRight,
    ArrowLeft: cursorCallbackLeft,
    ArrowUp: cursorCallbackUp,
    ArrowDown: cursorCallbackDown,
  };

  const navigates = {
    string: navigateTo,
    function: navigateTo(cursor),
  };

  const moveFocus = useCallback(() => {
    if (nextFocus) {
      dispatch(setFocus(nextFocus));
    }
  }, [dispatch, nextFocus]);

  useEffect(() => {
    setCursor(initialCursor);
  }, [initialCursor, path]);

  useEffect(() => {
    if (executionCondition && callbacks[keyboardKey]) {
      setCursor(callbacks[keyboardKey]);
    }
  }, [callbacks, executionCondition, keyboardKey]);

  useEffect(() => {
    if (items.length && executionCondition && keyboardKey === 'Enter') {
      moveFocus();

      if (currentFocus === 'content') {
        dispatch(setCurrentItem(cursor));
      }

      navigate(navigates[typeof navigateTo]);
    }
  }, [
    currentFocus,
    cursor,
    dispatch,
    executionCondition,
    items.length,
    keyboardKey,
    moveFocus,
    navigates,
    navigateTo,
  ]);

  const goBack = useCallback(() => {
    if (navigateBack) {
      navigate(navigateBack);
    }
    if (prevFocus) {
      dispatch(setFocus(prevFocus));
    }
    if (currentFocus === 'content') {
      dispatch(setCurrentItem(null));
    }
  }, [currentFocus, dispatch, navigateBack, prevFocus]);

  useEffect(() => {
    if (
      executionCondition &&
      (keyboardKey === 'Escape' || keyboardKey === 'b')
    ) {
      goBack();
    }
  }, [keyboardKey, executionCondition, navigateBack, goBack]);

  // handle back button
  useEffect(() => {
    if (window.history && window.history.pushState) {
      window.history.pushState('forward', null);
      window.addEventListener('popstate', goBack);
    }
    return () => {
      window.removeEventListener('popstate', goBack);
    };
  });

  return { cursor, setCursor, moveFocusOnClick: moveFocus };
};
