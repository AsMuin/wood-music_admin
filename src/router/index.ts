import App from '@/App';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter([
    {
        path: '*',
        Component: App,
        children: [
            {
                path: 'listAlbum',
                Component: lazy(() => import('@/view/ListAlbum'))
            },
            {
                path: 'addAlbum',
                Component: lazy(() => import('@/view/AddAlbum'))
            },
            {
                path: 'listSong',
                Component: lazy(() => import('@/view/ListSong'))
            },
            {
                path: 'addSong',
                Component: lazy(() => import('@/view/AddSong'))
            }
        ]
    }
]);

export default router;
