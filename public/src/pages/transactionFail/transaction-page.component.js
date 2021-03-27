import React, { useEffect } from "react";
import Helmet from "react-helmet";

//components
import Button from "../../components/buttons/button.component";
import Container from "../../components/layout/container.component";

//Redux
import { useDispatch } from "react-redux";
import { setHeaderType } from "../../redux/globals/globals.actions";
import {homeUrl} from "../../redux/globals/globals.endpoints";

//styles
import "./transaction-page.scss";

const TransactionFailed = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setHeaderType("disabled"));
    }, []);

    return (
        <>
            <Helmet>
                <title>NetTVPlus | Transaction</title>
            </Helmet>

            <section className="no-page">
                <Container>
                    <div className="no-page--holder">
                        <h1 className="no-page--title">Neuspešna pretplata</h1>

                        <h4 className="no-page--subtitle">Za dodatne informacije, molimo te da kontaktiraš našu Korisničku podršku.</h4>

                        <a href={homeUrl} rel="noopener noreferrer">
                            <Button title="Idi na početnu stranu" customClass="no-page--button"></Button>
                        </a>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default TransactionFailed;
