import React from 'react';

import Test from '../components/Test';
import { Content } from '../components/content/Content';
import { FilmPreview } from '../components/filmPreview/FilmPreview';

export const routes = {
  '/': () => <Test />,
  '/:category': ({ category }) => <Content category={category} />,
  '/:category/:id': ({ category, id }) => (
    <FilmPreview id={id} category={category} />
  ),
};
