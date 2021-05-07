import React, { useEffect, useContext } from 'react';
import Helmet from 'react-helmet';

//styles
import './styles.scss';

// components
import HeroBox from '../../components/hero-box/hero-box.component';
import BlogsList from '../../layouts/BlogsList/BlogsList.layout';

//assets
import headerBg from '../../assets/img/index_background.png';

// Context
import axios from 'axios';
import { Context } from '../../contextStore/context';
import {
    setIsLoading,
    setAllPosts,
} from '../../contextStore/globals/globalState.actions';

// hoc
import clgComponentName from '../../components/hoc/consoleComponentName';

const IndexPage = (): JSX.Element => {
    // global state
    const { globalState, globalDispatch } = useContext(Context);

    useEffect(() => {
        axios
            .get(
                'https://my-json-server.typicode.com/markoarthofer22/q-agency-db/posts'
            )
            .then((response) => {
                globalDispatch && globalDispatch(setAllPosts(response.data));
            })
            .finally(() => {
                globalDispatch && globalDispatch(setIsLoading(false));
            });
    }, []);

    return (
        <>
            <Helmet>
                <meta name="geo.region" content="RS-01" />
                <meta name="geo.placename" content="" />
                <meta name="geo.position" content="45.60000;19.20000" />
                <meta name="ICBM" content="45.60000;19.20000" />
                <title>Q Agency | Index</title>
            </Helmet>
            <section className="index-page">
                <HeroBox
                    bgImage={headerBg}
                    title="Read Our Latest News & Posts"
                    subtitle="Stay up to date on industry news and the best of chain management."
                />

                {globalState && globalState?.allPosts?.length > 0 && (
                    <section className="latest-blogs">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <BlogsList
                                        data={globalState.allPosts}
                                        limit={3}
                                        showMore
                                        holderClass="list-home"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </section>
        </>
    );
};

export default clgComponentName(IndexPage, 'IndexPage');
