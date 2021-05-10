import React, { useState, useEffect, useContext } from 'react';
import Helmet from 'react-helmet';
import { CSSTransition } from 'react-transition-group';

//styles
import './styles.scss';

// components
import HeroBox from '../../components/hero-box/hero-box.component';
import BlogsList from '../../layouts/BlogsList/BlogsList.layout';
import BlogSearchBar from '../../layouts/BlogSearchBar/search.component';
import Popup from '../../components/popup/popup.component';
import AddNewBlogForm from '../../layouts/AddNewBlog/AddNewBlog.layout';
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

// typscript
import { iPostType } from 'contextStore/globals/interface/globals.interface';

const BlogList = (): JSX.Element => {
    const [filteredBlogs, setFilteredBlogs] = useState<iPostType[]>([]);
    const [filteredBlogsError, setFilteredBlogsError] = useState<string | null>(
        null
    );
    const [isAddNewModalOpen, setIsAddNewModalOpen] = useState<boolean>(false);

    // state
    const { globalState, globalDispatch } = useContext(Context);

    const returnValueForBlogs = (_searchText: string): void => {
        if (_searchText.length === 0) {
            setFilteredBlogs([]);
            setFilteredBlogsError(null);
            return;
        }

        if (_searchText.length >= 3) {
            globalDispatch && globalDispatch(setIsLoading(true));

            // find posts by author name
            const res = globalState?.allPosts.filter((item) =>
                new RegExp(_searchText, 'i').test(item.author)
            );

            if (res && res.length > 0) {
                setFilteredBlogs([...res]);
                setFilteredBlogsError(null);
                globalDispatch && globalDispatch(setIsLoading(false));
            } else {
                setFilteredBlogs([]);
                setFilteredBlogsError(
                    'No posts match you search! Please try again.'
                );
                globalDispatch && globalDispatch(setIsLoading(false));
            }
        }
    };

    useEffect(() => {
        // if this route is not accessed directly there already exists
        //  var with all posts so there is no need to request them again
        if (globalState && globalState.allPosts.length > 0) {
            globalDispatch && globalDispatch(setIsLoading(false));
            return;
        }

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
                <title>Q Agency | All Blogs</title>
            </Helmet>
            <section className="all-blogs-section">
                <HeroBox
                    bgImage={headerBg}
                    title="Read all of our Blogs and Post"
                    subtitle="Stay up to date on industry news and the best of chain management."
                />

                {globalState && globalState.allPosts?.length > 0 && (
                    <section className="latest-blogs">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <BlogSearchBar
                                        returnSearchParams={returnValueForBlogs}
                                        inputLabel="Search trough posts by author..."
                                        inputName="blog_search_name"
                                        inputValidatorObj={{
                                            required: false,
                                            minLength: {
                                                value: 3,
                                                message:
                                                    'Please enter at least 3 characters', // <p>error message</p>
                                            },
                                        }}
                                        ctaText="Add new article"
                                        returnCtaAction={() =>
                                            setIsAddNewModalOpen(true)
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <BlogsList
                            data={
                                filteredBlogs.length > 0
                                    ? filteredBlogs
                                    : globalState.allPosts
                            }
                            holderClass="all-blogs"
                            postError={filteredBlogsError}
                        />
                    </section>
                )}

                <CSSTransition
                    in={isAddNewModalOpen}
                    timeout={500}
                    classNames="popup"
                    unmountOnExit
                >
                    <Popup
                        closePopup={() => setIsAddNewModalOpen(false)}
                        class="add-new-popup"
                    >
                        <>
                            <h3 className="add-new-popup--title">
                                Add New Article
                            </h3>
                            <AddNewBlogForm
                                returnAfterEnd={() =>
                                    setIsAddNewModalOpen(false)
                                }
                            />
                        </>
                    </Popup>
                </CSSTransition>
            </section>
        </>
    );
};

export default clgComponentName(BlogList, 'BlogList');
