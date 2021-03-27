import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { CSSTransition } from "react-transition-group";

//redux
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { setIsLoading, setHeaderType } from "../../redux/globals/globals.actions";
import { selectCurrentStep } from "../../redux/navigation-steps/steps.selectors";
import { setCurrentNavigationStep } from "../../redux/navigation-steps/steps.actions";
import {homeUrl} from "../../redux/globals/globals.endpoints";

//styles
import "../index/indexpage.scss";

//components
import ContainerFull from "../../components/layout/container-full.component";
import SidePanel from "./SidePanel/freeSidePanel.component";
import FreePaymentInfo from "./PaymentInfo/freePaymentInfo.form";
import FreePaymentSuccess from "./PaymentSuccess/freePaymentSuccess.component";
import GlobalLoader from "../../components/loaders/global.loader.component";
import FreePackage from "./FreePackage/freePackage.form";

const FreeTrialIndex = (props) => {
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
        let queryParams = queryString.parse(history.location.search);

        if (queryParams.plan !== undefined && queryParams.plan !== "") {
            dispatch(setHeaderType("gratis"));
            dispatch(setCurrentNavigationStep(1));
        } else {
            window.location = homeUrl + "paketi";
        }
    }, [history.location]);

    const selectActiveStep = (_step) => {
        let step = _step;

        switch (step) {
            case 1:
                return <FreePackage />;
                break;

            case 2:
                return <FreePaymentInfo />;
                break;

            case 3:
                return <FreePaymentSuccess />;
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
                    <title>NetTVPlus | Free Trial</title>
                </Helmet>
                <ContainerFull>
                    <div className={`form-holder ${currentStep === 3 ? "full-width" : ""}`}>
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
                { currentStep < 3 && (
                    <div className="side-panel-holder">
                        <SidePanel />
                    </div>
                )}
                </ContainerFull>
            </section>
        </>
    );
};

export default withRouter(FreeTrialIndex);
