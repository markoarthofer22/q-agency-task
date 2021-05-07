import App from '../App.tsx';
import PageNotFound from '../pages/404/404.page';
import BlogListPage from '../pages/allPostsList/allPostsLists.page';
import IndexPage from '../pages/index/Index.page';
import BlogSingleDetails from '../pages/PostDetails/postDetails.page';

export default [
    {
        // App Component renders always, so we have access to Switch component
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: IndexPage,
            },
            {
                path: '/posts',
                exact: true,
                component: BlogListPage,
            },
            {
                path: '/posts/:id',
                exact: true,
                component: BlogSingleDetails,
            },
            {
                path: '*',
                exact: false,
                component: PageNotFound,
            },
        ],
    },
];
