import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// components
import BlogCard from "../SingleBlogCard/blog-card.layout";
import Button from "../../components/buttons/button.component";
// styles
import "./styles.scss";

// context
import { ContextApp } from "../../contextStore/context";

const BlogsList = (props) => {
    const { data, limit, showMore, holderClass, postError } = props;
    const { appState } = useContext(ContextApp);
    const [componentName] = useState("BlogsListList");
    const [limitedDataArray, setLimitedDataArray] = useState([]);

    useEffect(() => {
        if (limit && limit > 0) {
            setLimitedDataArray(data.slice(0, limit));
        } else {
            setLimitedDataArray(data);
        }
    }, [limit, data]);

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    return (
        <div className={`latest-blogs--holder ${holderClass && holderClass}`}>
            <div className="container">
                {Boolean(postError) ? (
                    <h3 className="latest-blogs--error-text">{postError ? postError : "Error occured!"}</h3>
                ) : (
                    <>
                        <div className="row grid-20">
                            {limitedDataArray?.map((item, index) => (
                                <div key={index} className="col-12 col-sm-6 col-md-4">
                                    <Link to={`/posts/${item.id}`}>
                                        <BlogCard content={item.content} title={item.title} user={item.author} date={item.date} background={item.img} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {showMore && (
                            <div className="row">
                                <div className="col-12 text-center">
                                    <Link to="/posts">
                                        <Button customClass="latest-blogs--cta" title="See all Posts" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

BlogsList.propTypes = {
    data: PropTypes.array.isRequired,
    limit: PropTypes.number,
    showMore: PropTypes.bool,
    holderClass: PropTypes.string,
    postError: PropTypes.node
};

export default BlogsList;
