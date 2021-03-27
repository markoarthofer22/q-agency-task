import App from "../App";
import PageNotFound from "../pages/404/404.page";
import BlogListPage from "../pages/allPostsList/allPostsLists.page";
import IndexPage from "../pages/index/index.page";

export default [
    {
        // App Component renders always, so we have access to Switch component
        component: App,
        routes: [
            {
                path: "/",
                exact: true,
                component: IndexPage
            },
            {
                path: "/posts",
                exact: true,
                component: BlogListPage
            },
            {
                path: "*",
                exact: false,
                component: PageNotFound
            }
        ]
    }
];
