import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import * as moment from "moment";
// styles
import "./styles.scss";

// components
import SvgIcon from "../../components/svg-icon/svg-icon.component";

// context
import { ContextApp } from "../../contextStore/context";

const BlogCard = (props) => {
    const { content, title, user, background, date } = props;
    const { appState } = useContext(ContextApp);
    const [componentName] = useState("BlogCardSingle");

    const trimHeadingText = (_content, _length) => {
        let length = _length ? _length : 100;

        return _content.length > length ? _content.substring(0, length - 3) + "..." : _content;
    };

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    return (
        <div className={`blog--single-card`}>
            <div
                className="blog--single-card--img"
                style={{
                    backgroundImage: "url('" + background + "')"
                }}
            ></div>
            <div className="blog--single-card--holder">
                <div>
                    <h3 className="blog--single-card--title">{title}</h3>
                    <div className="blog--single-card--content" dangerouslySetInnerHTML={{ __html: trimHeadingText(content, 150) }}></div>
                </div>

                {user && (
                    <div className="blog--single-card--user">
                        <div className="blog--single-card--user--svg-holder">
                            <SvgIcon icon="author" />
                        </div>
                        <div className="blog--single-card--user-text">
                            <h5 className="title">{user}</h5>
                            {date && <span className="date">{moment(date).format("DD.MM.'YY.")}</span>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

BlogCard.propTypes = {
    content: PropTypes.string,
    title: PropTypes.string.isRequired,
    user: PropTypes.string,
    background: PropTypes.string.isRequired,
    date: PropTypes.string
};

export default BlogCard;
