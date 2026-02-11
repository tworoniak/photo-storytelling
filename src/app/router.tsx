import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import HomePage from '../pages/HomePage';
import StoryPage from '../pages/StoryPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'stories/:slug', element: <StoryPage /> },
    ],
  },
]);
