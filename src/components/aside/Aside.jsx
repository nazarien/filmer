import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usePath, navigate } from 'hookrouter';
import clsx from 'clsx';
import { IoIosArrowForward as ArrowIcon } from 'react-icons/io';

import { useFocus } from '../../hooks/useFocus';

import {
  aside,
  listItem,
  link,
  activeStyle,
  icon,
  activeCategory,
} from './aside.module.scss';

const categories = [
  'action',
  'comedy',
  'drama',
  'documentary',
  'family',
  'thriller',
];

export const Aside = ({ keyboardKey }) => {
  const path = usePath();
  const globalFocus = useSelector(state => state.focus.globalFocus);
  const initialCursor = categories.findIndex(item => path.includes(item));

  const { cursor, setCursor, moveFocusOnClick } = useFocus({
    keyboardKey,
    items: categories,
    initialCursor: initialCursor === -1 ? 0 : initialCursor,
    nextFocus: 'content',
    currentFocus: 'aside',
    navigateTo: currentCursor => `/${categories[currentCursor]}`,
    cursorCallbackUp: prevState => (prevState > 0 ? prevState - 1 : prevState),
    cursorCallbackDown: prevState =>
      prevState < categories.length - 1 ? prevState + 1 : prevState,
  });

  useEffect(() => {
    if (globalFocus === 'aside') {
      navigate(`/${categories[cursor]}`);
    }
  }, [cursor, globalFocus]);

  const handleClick = ({ linkTo, index }) => {
    setCursor(index);
    moveFocusOnClick();
    navigate(linkTo);
  };

  const items = categories.map((item, index) => (
    <li key={item} className={clsx(listItem, index === cursor && activeStyle)}>
      <button
        type="button"
        className={clsx(
          link,
          index === cursor && globalFocus === 'aside' && activeStyle,
          path.includes(item) && activeCategory
        )}
        onClick={() => handleClick({ linkTo: `/${item}`, index })}
      >
        {item}
        <ArrowIcon className={icon} />
      </button>
    </li>
  ));

  return (
    <aside className={aside}>
      <ul>{items}</ul>
    </aside>
  );
};
