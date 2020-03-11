import React from 'react';

import { header, heading } from './header.module.scss';

export const Header = () => {
  return (
    <header className={header}>
      <h1 className={heading}>Filmer</h1>
    </header>
  );
};
