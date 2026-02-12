import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import HomePage from '../pages/HomePage';
import StoriesPage from '../pages/StoriesPage';
import StoryPage from '../pages/StoryPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/stories',
        element: <StoriesPage />,
      },
      { path: 'stories/:slug', element: <StoryPage /> },
    ],
  },
]);
