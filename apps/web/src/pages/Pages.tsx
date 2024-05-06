import { PageRoot } from '@a-type/ui/components/layouts';
import ExercisePage from './ExercisePage.jsx';
import { HomePage } from './HomePage.jsx';
import { makeRoutes, Outlet, Router } from '@verdant-web/react-router';

const routes = makeRoutes([
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/edit/:id',
    component: ExercisePage,
  },
]);

export function Pages() {
  return (
    <Router routes={routes}>
      <PageRoot>
        <Outlet />
      </PageRoot>
    </Router>
  );
}
