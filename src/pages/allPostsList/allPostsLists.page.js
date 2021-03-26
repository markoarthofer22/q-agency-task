//react
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";

const BlogListPage = (props) => {
    const [componentName, setComponentName] = useState("All Blogs");

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
                <h1>Blogs</h1>
            </section>
        </>
    );
};

export default BlogListPage;
