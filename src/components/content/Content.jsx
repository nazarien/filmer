import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { A as button, navigate } from 'hookrouter';
import clsx from 'clsx';

import { useFocus } from '../../hooks/useFocus';

import { content, item, poster, activeStyle } from './content.module.scss';

export const Content = ({ category, keyboardKey }) => {
  const films = useSelector(
    state => state.films.data
  )?.filter(({ genre_ids }) => genre_ids.includes(category));
  const initialItem = useSelector(state => state.focus.initialItem);
  const globalFocus = useSelector(state => state.focus.globalFocus);

  const sectionRef = useRef();
  const itemRef = useRef();

  const buttonMargin = 15;
  const sectionPadding = 100;
  const itemWidth = itemRef.current?.offsetWidth;
  const sectionWidth = sectionRef.current?.offsetWidth - sectionPadding;

  const itemsInRow = Math.floor(
    (sectionWidth - Math.floor(sectionWidth / itemWidth) * buttonMargin) /
      itemWidth
  );

  const { cursor, moveFocusOnClick } = useFocus({
    keyboardKey,
    items: films,
    initialCursor: initialItem || 0,
    nextFocus: 'filmPreview',
    currentFocus: 'content',
    prevFocus: 'aside',
    navigateTo: currentCursor => `/${category}/${films[currentCursor]?.id}`,
    cursorCallbackRight: prevState =>
      prevState < films.length - 1 ? prevState + 1 : prevState,
    cursorCallbackLeft: prevState =>
      prevState > 0 ? prevState - 1 : prevState,
    cursorCallbackUp: prevState =>
      prevState - itemsInRow >= 0 ? prevState - itemsInRow : 0,
    cursorCallbackDown: prevState =>
      prevState + itemsInRow <= films.length - 1
        ? prevState + itemsInRow
        : films.length - 1,
  });

  useEffect(() => {
    window.scrollTo({
      top:
        (cursor / itemsInRow - 1) *
        itemRef.current?.getBoundingClientRect().height,
      behavior: 'smooth',
    });
  });

  const handleClick = linkTo => {
    navigate(linkTo);
    moveFocusOnClick();
  };

  const items = films.map(({ id, poster_path }, index) => (
    <button
      type="button"
      key={id}
      className={clsx(
        item,
        index === cursor && globalFocus === 'content' && activeStyle
      )}
      onClick={() => handleClick(`/${category}/${id}`)}
      ref={index === 0 ? itemRef : null}
    >
      <img
        src={poster_path}
        className={poster}
        alt="film-avatar"
        height="250px"
        width="175px"
      />
    </button>
  ));
  return (
    <section className={content} ref={sectionRef}>
      {items}
    </section>
  );
};
