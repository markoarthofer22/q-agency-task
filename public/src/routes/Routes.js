import App from "../App";
// pages
import IndexPage from "../pages/index/IndexPage";
import IndexFreeTrial from "../pages/index_free_trial/IndexFreeTrial";
import IndexPageBundle from "../pages/index_bundle/IndexBundle";
import NotFoundPage from "../pages/404/no-page.component";
import TransactionFailed from "../pages/transactionFail/transaction-page.component";
export default [
    {
        component: App,
        routes: [
            {
                path: "/",
                exact: true,
                component: IndexPage
            },
            {
                path: "/products/",
                exact: true,
                component: IndexPage //page not needed
            },
            {
                path: "/products/code/",
                exact: true,
                component: IndexPage
            },
            {
                path: "/free-trial/",
                exact: true,
                component: IndexFreeTrial
            },
            {
                path: "/bundle/",
                exact: true,
                component: IndexPageBundle
            },
            {
                path: "/transaction-fail/",
                exact: true,
                component: TransactionFailed
            },
            {
                path: "*",
                exact: false,
                component: NotFoundPage
            }
        ]
    }
];
