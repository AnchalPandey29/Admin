import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AdminAuth from 'AdminAuth';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page

// render - utilities
const Blog = Loadable(lazy(() => import('pages/components-overview/AddBlog')));
const Campaign = Loadable(lazy(() => import('pages/components-overview/AddCampaign')));
const News = Loadable(lazy(() => import('pages/components-overview/AddNews')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (<AdminAuth><MainLayout /></AdminAuth>),
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'campaign',
            element: <Campaign />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        
        {
            path: 'news',
            element: <News />
        },
        {
            path: 'blog',
            element: <Blog />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
