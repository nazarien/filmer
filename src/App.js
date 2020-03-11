import React from 'react';
import { useRoutes, useRedirect } from 'hookrouter';

import { routes } from './routes/routes';
import { Container } from './containers/Container';
import { NotFoundPage } from './components/notFoundPage/NotFoundPage';

export const App = () => {
  useRedirect('/', '/action');
  const routeResult = useRoutes(routes) || <NotFoundPage />;
  return <Container>{routeResult}</Container>;
};
