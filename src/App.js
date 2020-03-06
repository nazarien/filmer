import React from 'react';
import { useRoutes } from 'hookrouter';

import { routes } from './routes/routes';
import { Container } from './containers/Container';
import { NotFoundPage } from './components/notFoundPage/NotFoundPage';

export const App = () => {
  const routeResult = useRoutes(routes) || <NotFoundPage />;
  return <Container>{routeResult}</Container>;
};
