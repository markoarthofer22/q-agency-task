import App from "../App";
import IndexPage from "../pages/index/Index.page";
export default [
    {
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
