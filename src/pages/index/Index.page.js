import React, { useState, useEffect, useContext } from "react";
import Helmet from "react-helmet";

//styles
import "./styles.scss";

// components
import HeroBox from "../../components/hero-box/hero-box.component";
import BlogsList from "../../layouts/BlogsList/BlogsList.layout";

//assets
import headerBg from "../../assets/img/index_background.png";

// Context
import axios from "axios";
import { Context, ContextApp } from "../../contextStore/context";
import { setIsLoading, setAllPosts } from "../../contextStore/globals/globalState.actions";

const IndexPage = (props) => {
    const {} = props;
    const [componentName] = useState("Home");

    // global state
    const { globalState, globalDispatch } = useContext(Context);
    const { appState } = useContext(ContextApp);

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    useEffect(() => {
        axios
            .get("https://my-json-server.typicode.com/markoarthofer22/q-agency-db/posts")
            .then((response) => {
                globalDispatch(setAllPosts(response.data));
            })
            .finally(() => {
                globalDispatch(setIsLoading(false));
            });
    }, []);

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

                {globalState?.allPosts?.length > 0 && (
                    <section className="latest-blogs">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <BlogsList data={globalState.allPosts} limit={3} showMore />
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </section>
        </>
    );
};

export default IndexPage;
