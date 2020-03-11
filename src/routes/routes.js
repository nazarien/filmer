import React from 'react';

import { Content } from '../components/content/Content';
import { FilmPreview } from '../components/filmPreview/FilmPreview';

export const routes = {
  '/:category': ({ category }) => <Content category={category} />,
  '/:category/:id': ({ category, id }) => (
    <FilmPreview id={id} category={category} />
  ),
};
