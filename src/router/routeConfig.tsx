import { RouteProps } from 'react-router-dom';
import AboutPage from '../pages/AboutPage/AboutPage';
import HomePage from '../pages/HomePage/HomePage';
import UserPage from '../pages/UserPage/UserPage';

export enum AppRoutes {
    HOME = 'home',
    USER = 'user',
    ABOUT = 'about',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.USER]: '/user',
  [AppRoutes.ABOUT]: '/about',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <HomePage />,
  },
  [AppRoutes.USER]: {
    path: RoutePath.user,
    element: <UserPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />,
  },
};
