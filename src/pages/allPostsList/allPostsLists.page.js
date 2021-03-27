import React, { useState, useEffect, useContext } from "react";
import Helmet from "react-helmet";
import { CSSTransition } from "react-transition-group";

//styles
import "./styles.scss";

// components
import HeroBox from "../../components/hero-box/hero-box.component";
import BlogsList from "../../layouts/BlogsList/BlogsList.layout";
import BlogSearchBar from "../../components/blog-search-bar/search.component";
import Popup from "../../components/popup/popup.component";
import AddNewBlogForm from "../../layouts/AddNewBlog/AddNewBlog.layout";
//assets
import headerBg from "../../assets/img/index_background.png";

// Context
import axios from "axios";
import { Context, ContextApp } from "../../contextStore/context";
import { setIsLoading, setAllPosts } from "../../contextStore/globals/globalState.actions";

const BlogList = () => {
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [filteredBlogsError, setFilteredBlogsError] = useState(null);
    const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);

    // state
    const { globalState, globalDispatch } = useContext(Context);
    const { appState } = useContext(ContextApp);
    const [componentName] = useState("BlogList");

    const returnValueForBlogs = (_searchText) => {
        if (_searchText.length === 0) {
            setFilteredBlogs([]);
            return;
        }

        if (_searchText.length >= 3) {
            globalDispatch(setIsLoading(true));

            // find posts by author name
            console.log(_searchText);
            let res = globalState.allPosts.filter((item) => new RegExp(_searchText, "i").test(item.author));

            if (res.length > 0) {
                setFilteredBlogs([...res]);
                setFilteredBlogsError(null);
                globalDispatch(setIsLoading(false));
            } else {
                setFilteredBlogs([]);
                setFilteredBlogsError("No posts match you search! Please try again.");
                globalDispatch(setIsLoading(false));
            }
        }
    };

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    useEffect(() => {
        // if this route is not accessed directly there already exists
        //  var with all posts so there is no need to request them again
        if (globalState.allPosts.length > 0) {
            globalDispatch(setIsLoading(false));
            return;
        }

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
            <section className="all-blogs-section">
                <HeroBox
                    bgImage={headerBg}
                    title="Read all of our Blogs and Post"
                    subtitle="Stay up to date on industry news and the best of chain management."
                />

                {globalState.allPosts?.length > 0 && (
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
                                                message: "Please enter at least 3 characters" // <p>error message</p>
                                            }
                                        }}
                                        ctaText="Add new article"
                                        returnCtaAction={() => setIsAddNewModalOpen(true)}
                                    />
                                </div>
                            </div>
                        </div>

                        <BlogsList
                            data={filteredBlogs.length > 0 ? filteredBlogs : globalState.allPosts}
                            holderClass="all-blogs"
                            postError={filteredBlogsError}
                        />
                    </section>
                )}

                <CSSTransition in={isAddNewModalOpen} timeout={500} classNames="popup" unmountOnExit>
                    <Popup closePopup={() => setIsAddNewModalOpen(false)} class="add-new-popup">
                        <>
                            <h3 className="add-new-popup--title">Add New Article</h3>
                            <AddNewBlogForm returnAfterEnd={() => setIsAddNewModalOpen(false)} />
                        </>
                    </Popup>
                </CSSTransition>
            </section>
        </>
    );
};

export default BlogList;
