import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PropTypes from "prop-types";

// styles
import "./styles.scss";

//hooks
import { useForm } from "react-hook-form";

// components
import Button from "../../components/buttons/button.component";
import SvgIcon from "../../components/svg-icon/svg-icon.component";
import InputComponent from "../../components/input/input.component";

// context
import { ContextApp, Context } from "../../contextStore/context";
import { setIsLoading, setAllPosts, revisedRandId } from "../../contextStore/globals/globalState.actions";

const AddNewBlogForm = ({ returnAfterEnd }) => {
    const { globalState, globalDispatch } = useContext(Context);
    const { appState } = useContext(ContextApp);
    const [componentName] = useState("AddNewBlogForm");

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const SweetAlert = withReactContent(Swal);

    const { register, handleSubmit, errors, watch, setError } = useForm({
        mode: "onChange",
        reValidateMode: "onChange"
    });

    const FormIsSent = (successMessage) => {
        globalDispatch(setIsLoading(false));

        SweetAlert.fire({
            title: "Success!",
            text: successMessage,
            icon: "success",
            customClass: {
                container: "form--alert-box",
                popup: "form--alert-box-popup",
                title: "form--alert-box-title",
                content: "form--alert-box-content"
            },
            showConfirmButton: false,
            padding: "4rem",
            width: 500,
            timer: 1500,
            timerProgressBar: true,
            onClose: () => {
                document.querySelector(".form-group").reset();
                setIsButtonDisabled(false);
                returnAfterEnd();
            }
        });
    };

    //handle all data from inputs
    const handleData = (_data, e) => {
        e.preventDefault();

        let data = {
            ..._data,
            comments: [],
            id: revisedRandId("blog_"),
            img: "https://picsum.photos/400/600",
            date: new Date().toISOString().substring(0, 10)
        };

        let tempArr = [data, ...globalState.allPosts];

        console.log(tempArr);

        globalDispatch(setIsLoading(true));
        setIsButtonDisabled(true);
        globalDispatch(setAllPosts(tempArr));
        FormIsSent("New post added successfuly!");
    };

    useEffect(() => {
        console.log(`${appState.propsMessage} ${componentName}`);
    }, []);

    return (
        <section className="default-form">
            <form noValidate={true} onSubmit={handleSubmit(handleData)} className="form-group" autoComplete="1">
                <div className="form-item-container single">
                    <div className={`form-item-floating ${errors.title && "invalid"}`}>
                        <InputComponent
                            name="title"
                            labelText="Title"
                            errorMessage={errors.title}
                            register={register}
                            required={{ required: "This field is required!" }}
                        />
                    </div>
                </div>

                <div className="form-item-container single">
                    <div className={`form-item-floating ${errors.author && "invalid"}`}>
                        <InputComponent
                            name="author"
                            labelText="Author"
                            errorMessage={errors.author}
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

                <div className="default-form--actions-box">
                    <Button type="submit" title="Submit" customClass="default-form--actions-box--cta" isLoading={isButtonDisabled}>
                        <SvgIcon icon="send" />
                    </Button>
                </div>
            </form>
        </section>
    );
};

AddNewBlogForm.propTypes = {
    returnAfterEnd: PropTypes.func
};

export default AddNewBlogForm;
