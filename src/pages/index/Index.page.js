import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
//redux

import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setAllPosts } from "../../redux/globals/globals.actions";
import { selectIsLoading, getAllPosts } from "../../redux/globals/globals.selectors";

//styles
import "./styles.scss";

// components
import HeroBox from "../../components/hero-box/hero-box.component";

//assets
import headerBg from "../../assets/img/index_background.png";

// hooks
import useIsBreakpoint from "../../components/hooks/useIsBreakpoint.hook";
import axios from "axios";

const IndexPage = (props) => {
    const {} = props;
    const [componentName, setComponentName] = useState("Home");
    const dispatch = useDispatch();

    // selectors
    const allPosts = useSelector(getAllPosts);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        console.log("isLoading se promijenio => ", isLoading);
    }, [isLoading]);

    useEffect(() => {
        axios
            .get("https://my-json-server.typicode.com/markoarthofer22/q-agency-db/posts")
            .then((response) => {
                dispatch(setAllPosts(response.data));
            })
            .finally(() => {
                dispatch(setIsLoading(false));
            });
    }, []);

    useEffect(() => {
        console.log("allPosts :>> ", allPosts);
    }, [allPosts]);

    return (
        <>
            <Helmet>
                <meta name="geo.region" content="RS-01" />
                <meta name="geo.placename" content="" />
                <meta name="geo.position" content="45.60000;19.20000" />
                <meta name="ICBM" content="45.60000;19.20000" />
                <title>Q Agency | {componentName}</title>
            </Helmet>
            <section className="index-page">
                <HeroBox
                    bgImage={headerBg}
                    title="Read Our Latest News & Posts"
                    subtitle="Stay up to date on industry news and the best of chain management."
                />

                <section className="latest-blogs">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2>Blogovi</h2>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default IndexPage;
