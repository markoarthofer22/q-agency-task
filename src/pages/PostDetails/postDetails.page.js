import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import Helmet from "react-helmet";
import _ from "lodash";
//styles
import "./styles.scss";

// components
import HeroBox from "../../components/hero-box/hero-box.component";
import CustomSwiper from "../../components/swiper/swiper.component";
import BlogsList from "../../layouts/BlogsList/BlogsList.layout";
import BlogSingleComments from "../../layouts/SingleBlogComments/SingleBlogComments.layout";

// Context
import Axios from "axios";
import { Context, ContextApp } from "../../contextStore/context";
import { setIsLoading, setAllPosts, setCurrentPost } from "../../contextStore/globals/globalState.actions";

const GallerySwiper = ({ data }) => {
    const { appState } = useContext(ContextApp);
    const [componentName] = useState("CustomSwiper");

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    const [params] = useState({
        slidesPerView: "auto",
        spaceBetween: 15,
        navigation: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
            speed: 600
        },
        loop: false,
        rebuildOnUpdate: true
    });

    return (
        data && (
            <CustomSwiper containerClass="blog-cards--swiper" params={params}>
                {data?.map((item, index) => (
                    <div key={index} className={`col-12 col-sm-6 col-md-3`}>
                        <div
                            className="blog-cards--swiper--img"
                            style={{
                                backgroundImage: "url('" + item.download_url + "')"
                            }}
                        ></div>
                    </div>
                ))}
            </CustomSwiper>
        )
    );
};

GallerySwiper.propTypes = {
    data: PropTypes.array.isRequired
};

const BlogSingleDetails = () => {
    const [componentName] = useState("BlogSingleDetails");
    const [singlePostDetail, setSinglePostDetails] = useState({});
    const [otherPosts, setOtherPosts] = useState([]);

    const [galleryArray, setGalleryArray] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    // global state
    const { globalState, globalDispatch } = useContext(Context);
    const { appState } = useContext(ContextApp);

    const getArrayOfRndImg = (_limit) => {
        Axios.get(`https://picsum.photos/v2/list?limit=${_limit ? _limit : "30"}`).then((response) => {
            setGalleryArray([...response.data]);
        });
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

        Axios.get("https://my-json-server.typicode.com/markoarthofer22/q-agency-db/posts")
            .then((response) => {
                globalDispatch(setAllPosts(response.data));
            })
            .finally(() => {
                globalDispatch(setIsLoading(false));
            });
    }, []);

    useEffect(() => {
        if (globalState.allPosts.length < 1) return;

        let tempArr = globalState.allPosts.filter((item) => item.id === id)[0];

        let otherBlogs = globalState.allPosts.filter((item) => item.id !== id);

        if (Boolean(tempArr)) {
            setSinglePostDetails(tempArr);
            globalDispatch(setCurrentPost(tempArr));
            setOtherPosts(otherBlogs);
            getArrayOfRndImg(9);
        } else {
            history.push("/404");
        }
    }, [globalState.allPosts]);

    return (
        <>
            <Helmet>
                <meta name="geo.region" content="RS-01" />
                <meta name="geo.placename" content="" />
                <meta name="geo.position" content="45.60000;19.20000" />
                <meta name="ICBM" content="45.60000;19.20000" />
                <title>Q Agency | {componentName}</title>
            </Helmet>
            {!_.isEmpty(singlePostDetail) && (
                <section className="blog-single-page">
                    <HeroBox hasOverlay bgImage={singlePostDetail?.img} title={singlePostDetail?.title} />

                    <div className="container mv-4">
                        <div className="row">
                            <div className="col-12 col-md-8">
                                {singlePostDetail?.content && (
                                    <>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="blog-single-page--content">
                                                    <p>{singlePostDetail.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {galleryArray.length > 0 && (
                                            <div className="row">
                                                <div className="col-12">
                                                    <GallerySwiper data={galleryArray} />
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="row">
                                    <div className="col-12">
                                        <BlogSingleComments commentsData={singlePostDetail.comments} title="Leave a comment" />
                                    </div>
                                </div>
                            </div>

                            {otherPosts.length > 0 && (
                                <div className="col-12 col-md-4">
                                    <h3 className="other-post-title">Other Blogs</h3>
                                    <BlogsList data={otherPosts} limit={1} showMore={false} isVertical />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default BlogSingleDetails;
