import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const ShippingScreen = ({ history }) => {
    // get cart from redux store and fill to state
    const cart = useSelector((state) => state.cart); //get cart
    const { shippingAddress } = cart;
    const [shippingDetails, setShippingDetails] = useState(shippingAddress);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setShippingDetails({
            ...shippingDetails,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress(shippingDetails));
        history.push("/payment");
    };
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        name="country"
                        type="text"
                        placeholder="Enter country"
                        value={shippingDetails.country}
                        onChange={handleChange}
                        required
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        name="city"
                        type="text"
                        placeholder="Enter city"
                        value={shippingDetails.city}
                        onChange={handleChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        name="postalCode"
                        type="text"
                        placeholder="Enter postalCode"
                        value={shippingDetails.postalCode}
                        onChange={handleChange}
                        required
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        name="address"
                        type="text"
                        placeholder="Enter address"
                        value={shippingDetails.address}
                        onChange={handleChange}
                        required
                    ></Form.Control>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button type="submit" variant="primary">
                        Continue
                    </Button>
                </div>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
