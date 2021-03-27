import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { CSSTransition } from "react-transition-group";

//redux
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { setIsLoading } from "../../redux/globals/globals.actions";
import { selectCurrentStep } from "../../redux/navigation-steps/steps.selectors";
import { setCurrentNavigationStep } from "../../redux/navigation-steps/steps.actions";

//styles
import "./indexpage.scss";

//components
import ContainerFull from "../../components/layout/container-full.component";
import PackagesForm from "./FormSteps/Packages/packages.form";
import SidePanel from "./SidePanel/sidePanel.component";
import PaymentInfo from "./FormSteps/PaymentInfo/paymentInfo.form";
import PaymentSuccess from "../index_bundle/PaymentSuccess/paymentSuccess.component";
import SubscriptionPlans from "./FormSteps/OptionPlans/subscriptionPlans.form";
import GlobalLoader from "../../components/loaders/global.loader.component";

const IndexPage = (props) => {
    const history = useHistory();
    const currentStep = useSelector(selectCurrentStep);
    const dispatch = useDispatch();
    const queryString = require("query-string");
    const [cssTransitionIsOpen, setCssTransitionIsOpen] = useState(false);

    useEffect(() => {
        dispatch(setIsLoading(false));
    }, [dispatch]);

    useEffect(() => {
        const promiseFunction = new Promise((resolve) => {
            setCssTransitionIsOpen(false);
            resolve();
        });

        promiseFunction.then(() => {
            setCssTransitionIsOpen(true);
        });
    }, [currentStep]);

    useEffect(() => {
        if (localStorage.getItem("lang_code") === undefined) return;
        let queryParams = queryString.parse(history.location.search);

        if ((!queryParams.lang_code || queryParams.lang_code === "") && localStorage.getItem("lang_code") === undefined) {
            queryParams = {
                ...queryParams,
                lang_code: "other"
            };
            let url = `/products/?${queryString.stringify(queryParams)}`;
            history.push(url);
        } else {
            queryParams = {
                ...queryParams,
                lang_code: queryParams.lang_code ? queryParams.lang_code : localStorage.getItem("lang_code") ? localStorage.getItem("lang_code") : "other"
            };

            let url = `/products/?${queryString.stringify(queryParams)}`;
            history.push(url);
        }
    }, [localStorage.getItem("lang_code")]);

    useEffect(() => {
        let queryParams = queryString.parse(history.location.search);

        if (queryParams.product_code !== undefined && queryParams.product_code !== "") {
            dispatch(setCurrentNavigationStep(2));
        } else {
            dispatch(setCurrentNavigationStep(1));
        }
    }, [history.location]);

    const selectActiveStep = (_step) => {
        let step = _step;

        switch (step) {
            case 1:
                return <SubscriptionPlans />;
                break;
            case 2:
                return <PackagesForm />;
                break;
            case 3:
                return <PackagesForm />;
                break;
            case 4:
                return <PaymentInfo />;
                break;
            case 5:
                return <PaymentSuccess />;
                break;
            default:
                return null;
                break;
        }
    };

    return (
        <>
            <GlobalLoader />
            <section className="index-page">
                <Helmet>
                    <title>NetTVPlus</title>
                </Helmet>
                <ContainerFull>
                    <div className={`form-holder ${currentStep === 1 ? "homepage" : ""} ${currentStep === 3 ? "full-width" : ""}`}>
                        <CSSTransition
                            in={cssTransitionIsOpen}
                            timeout={500}
                            classNames={{
                                enterActive: "animate__fadeIn",
                                exitActive: "animate__fadeOut"
                            }}
                            unmountOnExit
                        >
                            <div className={`form-holder--steps  animate__animated`}>{selectActiveStep(currentStep)}</div>
                        </CSSTransition>
                    </div>

                    {currentStep > 1 && (
                        <div className="side-panel-holder">
                            <SidePanel />
                        </div>
                    )}
                </ContainerFull>
            </section>
        </>
    );
};

export default withRouter(IndexPage);
