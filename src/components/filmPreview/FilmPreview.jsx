import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { FaPlay, FaEye } from 'react-icons/fa';
import { MdPlaylistAdd } from 'react-icons/md';

import { useFocus } from '../../hooks/useFocus';

import { getFullLanguage } from '../../helpers/language';

import {
  filmPreview,
  heading,
  content,
  details,
  row,
  item,
  shadowText,
  image,
  button,
  description,
  activeStyle,
} from './filmPreview.module.scss';

const buttons = [
  { name: 'Play', icon: <FaPlay /> },
  { name: 'Trailer', icon: <FaEye /> },
  { name: 'Add', icon: <MdPlaylistAdd /> },
];

export const FilmPreview = ({ id, category, keyboardKey }) => {
  const isReady = useSelector(state => state.films.isSuccess);
  const {
    release_date,
    title,
    overview,
    poster_path,
    original_language,
    vote_average,
    original_title,
  } = useSelector(state => state.films.data.find(film => film.id == id)) || {};

  const { cursor } = useFocus({
    keyboardKey,
    items: buttons,
    initialCursor: 0,
    currentFocus: 'filmPreview',
    prevFocus: 'content',
    navigateBack: `/${category}`,
    cursorCallbackRight: prevState =>
      prevState < buttons.length - 1 ? prevState + 1 : prevState,
    cursorCallbackLeft: prevState =>
      prevState > 0 ? prevState - 1 : prevState,
  });

  const yearOfFilm = release_date?.split('-')[0];

  const buttonElements = buttons.map(({ name, icon }, index) => (
    <button
      type="button"
      key={name}
      className={clsx(button, index === cursor && activeStyle)}
    >
      {icon}
      {name}
    </button>
  ));

  return isReady && title ? (
    <section className={filmPreview}>
      <h2 className={heading}>{`${title} (${yearOfFilm})`}</h2>
      <div className={content}>
        <div className={details}>
          <div className={row}>
            <div className={item}>
              <p className={shadowText}>Vote average</p>
              <p>{vote_average}</p>
            </div>
            <div className={item}>
              <p className={shadowText}>Language</p>
              <p>{getFullLanguage[original_language]}</p>
            </div>
            <div className={item}>
              <p className={shadowText}>Original title</p>
              <p>{original_title}</p>
            </div>
          </div>
          <img className={image} src={poster_path} alt="poster-path" />
          <div className={row}>{buttonElements}</div>
        </div>
        <div className={description}>{overview}</div>
      </div>
    </section>
  ) : null;
};
