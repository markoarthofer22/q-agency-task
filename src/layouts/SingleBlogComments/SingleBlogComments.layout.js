import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import * as moment from "moment";
import _ from "lodash";

//styles
import "./styles.scss";

// components
import SvgIcon from "../../components/svg-icon/svg-icon.component";
import InputComponent from "../../components/input/input.component";
import Button from "../../components/buttons/button.component";

// hooks
import { useForm } from "react-hook-form";

// Context
import { Context, ContextApp } from "../../contextStore/context";
import { revisedRandId, setAllPosts, setIsLoading } from "../../contextStore/globals/globalState.actions";

const BlogSingleComments = ({ commentsData, title }) => {
    const [componentName] = useState("BlogSingleComments");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        mode: "onChange",
        reValidateMode: "onChange"
    });

    // global state
    const { globalState, globalDispatch } = useContext(Context);
    const { appState } = useContext(ContextApp);

    const handleData = (_data, e) => {
        e.preventDefault();
        globalDispatch(setIsLoading(true));
        setIsButtonDisabled(true);

        let data = {
            ...globalState.currentPost,
            comments: [
                ...globalState.currentPost.comments,
                {
                    ..._data,
                    data_created: new Date().toISOString().substring(0, 10),
                    id: revisedRandId("comment_")
                }
            ]
        };

        let tempArr = [...globalState.allPosts];
        tempArr[globalState.allPosts.findIndex((item) => item.id == globalState.currentPost.id)] = data;
        document.querySelector(".form-group").reset();
        globalDispatch(setIsLoading(false));
        setIsButtonDisabled(false);
        globalDispatch(setAllPosts(tempArr));
    };

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    return (
        <section className="comments-section">
            {title && <h3 className="comments-section--title">{title}</h3>}
            <div className="comments-section--list">
                {commentsData?.map((item, index) => (
                    <div key={index} className="comments-section--list--item">
                        <p className="comments-section--list--item--content">"{item.content}"</p>
                        <div className="comments-section--list--item--author">
                            <div className="comments-section--list--item--svg-holder">
                                <SvgIcon icon="author" />
                            </div>
                            <div className="comments-section--list--item--author--text">
                                <p className="username">{item.username}</p>
                                <span className="date">{moment(item.date).format("DD.MM.'YY.")}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="comments-section--form default-form">
                <form noValidate={true} onSubmit={handleSubmit(handleData)} className="form-group" autoComplete="1">
                    <div className="form-item-container single">
                        <div className={`form-item-floating ${errors.username && "invalid"}`}>
                            <InputComponent
                                name="username"
                                labelText="Username"
                                errorMessage={errors.username}
                                register={register}
                                required={{ required: "This field is required!" }}
                            />
                        </div>
                    </div>

                    <div className="form-item-container single">
                        <div className={`form-item-floating ${errors.content && "invalid"}`}>
                            <textarea
                                className={`no-resize  ${errors.content && "invalid"}`}
                                ref={register({ required: "This field is required!" })}
                                name="content"
                                required
                            />
                            <label htmlFor="content">* Content</label>
                            {errors.content && <span name="content" error={errors.content && errors.content.message} />}
                        </div>
                    </div>

                    <Button type="submit" title="Submit" customClass="comments-section--form--button" isLoading={isButtonDisabled} />
                </form>
            </div>
        </section>
    );
};

BlogSingleComments.propTypes = {
    title: PropTypes.string,
    commentsData: PropTypes.array.isRequired
};

export default BlogSingleComments;
