import React, { useEffect } from "react";

// redux
import { useSelector } from "react-redux";
import { existingTransactionResponse } from "../../../redux/pricingTab/pricingTab.selectors";
import { globalUserHash } from "../../../redux/globals/globals.selectors";

//styles
import "../../index_bundle/PaymentSuccess/paymentSuccess.scss";

const FreePaymentSuccess = (props) => {
    const existingTransaction = useSelector(existingTransactionResponse);
    const userHash = useSelector(globalUserHash);

    const sendGAevent = (payload) => {
        if (window.dataLayer) {
            console.log('Free Payment Success dataLayer: ', payload);

            window.dataLayer.push({
                'event': 'purchase',
                'ecommerce': {
                    'currencyCode': payload.plan_data.currency,
                    'purchase': {
                        'actionField': {
                            'id': payload.plan_data.transaction_id,
                            'affiliation': 'Online Store',
                            'revenue': payload.plan_data.total_price,
                            'tax': '',
                            'shipping': payload.plan_data.box_transport_price,
                            'coupon': payload.plan_data.promotion
                        },
                        'products': [{
                            'name': payload.plan_data.plan,
                            'id': payload.plan_data.plan_id,
                            'price': payload.plan_data.subscription_price,
                            'brand': 'NetTV',
                            'category': 'Tržište ' + payload.plan_data.country_code,
                            'variant': payload.plan_data.subscription_duration,
                            'quantity': 1
                        }]
                    }
                }
            });
        }
    };

    useEffect(() => {
        sendGAevent(existingTransaction);
    }, [existingTransaction]);

    return (
        <div class="order-wrap">
            {(existingTransaction.customer_name || existingTransaction.customer_surname) && (
            <div class="order-header">
                <h2>
                    Pozdrav <strong>{existingTransaction.customer_name} {existingTransaction.customer_surname}</strong>
                </h2>
                <p>
                    Tvoja pretplata je uspešna. Ispod možeš pogledati detalje pretplate, a na unetu email adresu ti je
                    poslat mail sa istim detaljima.
                </p>
            </div>
            )}
            <div class="order-row">
                <h4>Pregled porudžbine</h4>

                <ul class="order-list">
                    {existingTransaction.plan && (
                    <li class="border">
                        <p class="key">Plan:</p>
                        <p class="value">{existingTransaction.plan}</p>
                    </li>
                    )}
                    {existingTransaction.subscription_duration && (
                    <li class="border">
                        <p class="key">Trajanje pretplate:</p>
                        <p class="value">
                            {existingTransaction.subscription_duration} dana
                        </p>
                    </li>
                    )}
                    {existingTransaction.subscription_start && (
                    <li class="border">
                        <p class="key">Datum isteka:</p>
                        <p class="value">{existingTransaction.subscription_start}</p>
                    </li>
                    )}
                    {existingTransaction.subscription_end && (
                    <li class="border">
                        <p class="key">Datum isteka:</p>
                        <p class="value">{existingTransaction.subscription_end}</p>
                    </li>
                    )}
                    {existingTransaction.payment_type && (
                        <li class="border">
                            <p class="key">Način plaćanja:</p>
                            <p class="value">{existingTransaction.payment_type}</p>
                        </li>
                    )}
                    {existingTransaction.subscription_price && existingTransaction.subscription_price !== 0 && (
                    <li class="border">
                        <p class="key">Cena:</p>
                        <p class="value cl-2">{existingTransaction.subscription_price}</p>
                    </li>
                    )}
                </ul>

                <h4>Podaci o korisniku:</h4>
                <ul class="order-list">
                    {existingTransaction.customer_name && (
                        <li class="border">
                            <p class="key">Ime:</p>
                            <p class="value">{existingTransaction.customer_name}</p>
                        </li>
                    )}
                    {existingTransaction.customer_surname && (
                        <li class="border">
                            <p class="key">Prezime:</p>
                            <p class="value">{existingTransaction.customer_surname}</p>
                        </li>
                    )}
                    {existingTransaction.customer_email && (
                        <li class="border">
                            <p class="key">Email:</p>
                            <p class="value">{existingTransaction.customer_email}</p>
                        </li>
                    )}
                    {existingTransaction.customer_phone && (
                        <li class="border">
                            <p class="key">Telefon:</p>
                            <p class="value">{existingTransaction.customer_phone}</p>
                        </li>
                    )}
                    {existingTransaction.customer_country && (
                        <li class="border">
                            <p class="key">Zemlja:</p>
                            <p class="value">{existingTransaction.customer_country}</p>
                        </li>
                    )}
                </ul>

            </div>

            <div class="order-cta">
                <a href={Object.keys(userHash).length ? 'https://moj.nettvplus.com/signin' : process.env.PRODUCTION_HOME} class="order-btn">
                    Povratak
                </a>
            </div>

        </div>
    );
};

export default FreePaymentSuccess;
