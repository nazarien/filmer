import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePath } from 'hookrouter';
import { setFocus } from '../store/ducks/focus';

import { Header } from '../components/header/Header';
import { Aside } from '../components/aside/Aside';

import { filmsRequest } from '../store/ducks/films';

import { wrapper, main } from './container.module.scss';

export const Container = ({ children }) => {
  const [keyboardKey, setKeyboardKey] = useState(null);

  const dispatch = useDispatch();
  const isFilmsFetched = useSelector(state => state.films.isSuccess);
  const path = usePath()
    .split('/')
    .filter(Boolean);

  const keyHandler = event => {
    const { key } = event;
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) {
      event.preventDefault();
    }
    setKeyboardKey(key);
  };

  useEffect(() => {
    if (!isFilmsFetched) {
      dispatch(filmsRequest());
    }

    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
      setKeyboardKey(null);
    };
  });

  useEffect(() => {
    if (path.length === 2) {
      dispatch(setFocus('filmPreview'));
    }
    if (path.length === 1) {
      dispatch(setFocus('aside'));
    }
  }, []); // eslint-disable-line

  return (
    <div className={wrapper}>
      <Header />
      <main className={main}>
        <Aside keyboardKey={keyboardKey} />
        {React.cloneElement(children, {
          keyboardKey,
        })}
      </main>
    </div>
  );
};
