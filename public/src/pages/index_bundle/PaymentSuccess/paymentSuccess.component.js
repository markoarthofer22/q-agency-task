import React, { useEffect } from "react";

// redux
import { useSelector } from "react-redux";
import { existingTransactionResponse } from "../../../redux/pricingTab/pricingTab.selectors";
import { globalUserHash } from "../../../redux/globals/globals.selectors";

//styles
import "./paymentSuccess.scss";

const PaymentSuccess = (props) => {
    const existingTransaction = useSelector(existingTransactionResponse);
    const userHash = useSelector(globalUserHash);

    const sendGAevent = (payload) => {
        if (window.dataLayer) {
            console.log('Payment Success dataLayer: ', payload);

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
            {existingTransaction.customer_data && (existingTransaction.customer_data.customer_name || existingTransaction.customer_data.customer_surname) && (
            <div class="order-header">
                <h2>
                    Pozdrav <strong>{existingTransaction.customer_data.customer_name} {existingTransaction.customer_data.customer_surname}</strong>
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
                    {existingTransaction.plan_data && existingTransaction.plan_data.plan && (
                    <li class="border">
                        <p class="key">Paket:</p>
                        <p class="value">{existingTransaction.plan_data.plan}</p>
                    </li>
                    )}
                    {existingTransaction.plan_data && existingTransaction.plan_data.promotion && (
                    <li class="border">
                        <p class="key">Akcija:</p>
                        <p class="value">{existingTransaction.plan_data.promotion}</p>
                    </li>
                    )}
                    {existingTransaction.plan_data && existingTransaction.plan_data.subscription_duration && (
                    <li class="border">
                        <p class="key">Period:</p>
                        <p class="value">
                            {existingTransaction.plan_data.subscription_duration} mes
                        </p>
                    </li>
                    )}
                    {existingTransaction.plan_data && existingTransaction.plan_data.subscription_end && (
                    <li class="border">
                        <p class="key">Datum isteka:</p>
                        <p class="value">{existingTransaction.plan_data.subscription_end}</p>
                    </li>
                    )}
                    {existingTransaction.plan_data && existingTransaction.plan_data.subscription_price && (
                    <li class="border">
                        <p class="key">Cena:</p>
                        <p class="value cl-2">{existingTransaction.plan_data.subscription_price}</p>
                    </li>
                    )}
                </ul>

                {existingTransaction.plan_data && existingTransaction.plan_data.cms_promotion_type === 'plan_box' && (
                <div>
                    <h4>Dodatni troškovi:</h4>
                    <ul class="order-list">
                        {existingTransaction.plan_data && existingTransaction.plan_data.box_price && existingTransaction.plan_data.box_price !== 0 && (
                        <li class="border">
                            <p class="key">STB:</p>
                            <p class="value cl-2">{existingTransaction.plan_data.box_price}</p>
                        </li>
                        )}
                        {existingTransaction.plan_data && existingTransaction.plan_data.box_activation_price && existingTransaction.plan_data.box_activation_price !== 0 && (
                        <li class="border">
                            <p class="key">STB aktivacija:</p>
                            <p class="value cl-2">{existingTransaction.plan_data.box_activation_price}</p>
                        </li>
                        )}
                        {existingTransaction.plan_data && existingTransaction.plan_data.box_transport_price && existingTransaction.plan_data.box_transport_price !== 0 && (
                        <li class="border">
                            <p class="key">STB transport:</p>
                            <p class="value cl-2">{existingTransaction.plan_data.box_transport_price}</p>
                        </li>
                        )}
                        {existingTransaction.plan_data && existingTransaction.plan_data.transaction_fee && existingTransaction.plan_data.transaction_fee !== 0 && (
                        <li class="margin">
                            <p class="key">Troškovi transakcije:</p>
                            <p class="value cl-2">{existingTransaction.plan_data.transaction_fee}</p>
                        </li>
                        )}
                    </ul>
                </div>
                )}

                <h4>Ukupno:</h4>
                <ul class="order-list">
                    {existingTransaction.plan_data && existingTransaction.plan_data.total_price && (
                        <li class="border">
                            <p class="key">Odmah:</p>
                            <p class="value cl-2">{existingTransaction.plan_data.total_price}</p>
                        </li>
                    )}
                    {existingTransaction.plan_data && existingTransaction.plan_data.price_monthly && (
                        <li class="border">
                            <p class="key">Mesečno:</p>
                            <p class="value cl-2">{existingTransaction.plan_data.price_monthly}</p>
                        </li>
                    )}
                    {existingTransaction.plan_data && existingTransaction.plan_data.subscription_start && (
                        <li class="border">
                            <p class="key">Datum pretplate:</p>
                            <p class="value">{existingTransaction.plan_data.subscription_start}</p>
                        </li>
                    )}
                    {existingTransaction.plan_data && existingTransaction.plan_data.payment_type && (
                        <li class="margin">
                            <p class="key">Način plaćanja:</p>
                            <p class="value">{existingTransaction.plan_data.payment_type}</p>
                        </li>
                    )}
                </ul>

                <h4>Podaci o korisniku:</h4>
                <ul class="order-list">
                    {existingTransaction.customer_data && existingTransaction.customer_data.customer_name && (
                        <li class="border">
                            <p class="key">Ime:</p>
                            <p class="value">{existingTransaction.customer_data.customer_name}</p>
                        </li>
                    )}
                    {existingTransaction.customer_data && existingTransaction.customer_data.customer_surname && (
                        <li class="border">
                            <p class="key">Prezime:</p>
                            <p class="value">{existingTransaction.customer_data.customer_surname}</p>
                        </li>
                    )}
                    {existingTransaction.customer_data && existingTransaction.customer_data.customer_email && (
                        <li class="border">
                            <p class="key">Email:</p>
                            <p class="value">{existingTransaction.customer_data.customer_email}</p>
                        </li>
                    )}
                    {existingTransaction.customer_data && existingTransaction.customer_data.customer_phone && (
                        <li class="border">
                            <p class="key">Telefon:</p>
                            <p class="value">{existingTransaction.customer_data.customer_phone}</p>
                        </li>
                    )}
                    {existingTransaction.customer_data && existingTransaction.customer_data.customer_country && (
                        <li class="border">
                            <p class="key">Zemlja:</p>
                            <p class="value">{existingTransaction.customer_data.customer_country}</p>
                        </li>
                    )}
                </ul>

                {existingTransaction.plan_data && existingTransaction.plan_data.cms_promotion_type === 'plan_box' && (
                <div>
                    <h4>Podaci o dostavi:</h4>
                    <ul class="order-list">
                        {existingTransaction.customer_data && existingTransaction.customer_data.customer_country && (
                        <li class="border">
                            <p class="key">Zemlja:</p>
                            <p class="value">{existingTransaction.customer_data.customer_country}</p>
                        </li>
                        )}
                        {existingTransaction.customer_data && existingTransaction.customer_data.customer_city && (
                        <li class="border">
                            <p class="key">Grad:</p>
                            <p class="value">{existingTransaction.customer_data.customer_city}</p>
                        </li>
                        )}
                        {existingTransaction.customer_data && existingTransaction.customer_data.customer_address && (
                        <li class="border">
                            <p class="key">Ulica:</p>
                            <p class="value">{existingTransaction.customer_data.customer_address}</p>
                        </li>
                        )}
                        {existingTransaction.customer_data && existingTransaction.customer_data.customer_zip && (
                        <li class="border">
                            <p class="key">Poštanski broj:</p>
                            <p class="value">{existingTransaction.customer_data.customer_zip}</p>
                        </li>
                        )}
                    </ul>
                </div>
                )}

            </div>

            <div class="order-cta">
                <a href={Object.keys(userHash).length ? 'https://moj.nettvplus.com/signin' : process.env.PRODUCTION_HOME} class="order-btn">
                    Povratak
                </a>
            </div>

        </div>
    );
};

export default PaymentSuccess;
