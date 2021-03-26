import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
//redux

import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/globals/globals.selectors";
import { setIsLoading } from "../../redux/globals/globals.actions";

//styles
import "./index.scss";

// components

// hooks
import useIsBreakpoint from "../../components/hooks/useIsBreakpoint.hook";

const IndexPage = (props) => {
    const {} = props;
    const [params, setParams] = useState({});
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("isLoading se promijenio => ", isLoading);
    }, [isLoading]);

    useEffect(() => {
        dispatch(setIsLoading(true));
    }, []);
    return (
        <>
            <Helmet>
                <title>Q Agency</title>
            </Helmet>
            <section className="index-page">
                <h1>Test</h1>
            </section>
        </>
    );
};

export default IndexPage;
