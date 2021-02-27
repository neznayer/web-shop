import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const PaymentMethodScreen = ({ history }) => {
    // get cart from redux store and fill to state
    const cart = useSelector((state) => state.cart); //get cart
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push("/shipping");
    }

    const [paymentMethod, setPaymentMethod] = useState(null);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setPaymentMethod(e.target.value);
        console.log(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Methods</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal of credit card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            onChange={handleChange}
                        ></Form.Check>
                        <Form.Check
                            type="radio"
                            label="Yandex.Money"
                            id="YandexMoney"
                            name="paymentMethod"
                            value="YandexMoney"
                            onChange={handleChange}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <div className="d-flex justify-content-end">
                    <Button
                        disabled={!paymentMethod}
                        type="submit"
                        variant="primary"
                    >
                        Continue
                    </Button>
                </div>
            </Form>
        </FormContainer>
    );
};

export default PaymentMethodScreen;
