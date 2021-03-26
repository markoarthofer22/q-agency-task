import App from "../App";
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
            }
        ]
    }
];
