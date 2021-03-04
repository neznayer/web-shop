import React, { useEffect, useState } from "react";
import {
    Card,
    Col,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
    const orderId = match.params.id;
    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false);

    const addTrailingZeros = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const { order, loading, error } = useSelector(
        (state) => state.orderDetails
    );

    const { loading: loadingPay, success: successPay } = useSelector(
        (state) => state.orderPay
    );

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, successPay, order]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <>
            <h1>Order {order._id}</h1>

            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>Shipping</h3>
                            <p>
                                <strong>Name:&nbsp;</strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email:&nbsp;</strong>
                                {order.user.email}
                            </p>

                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city},
                                {order.shippingAddress.postalCode},
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant="warning">
                                    Not delivered yet
                                </Message>
                            )}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h3>Payment method:</h3>
                            <p>
                                <strong>{order.paymentMethod}</strong>
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">
                                    Paid on {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant="warning">
                                    Not paid yet
                                </Message>
                            )}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h3>Order items</h3>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item) => (
                                        <ListGroupItem key={item.product}>
                                            <Row>
                                                <Col md={3}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x $
                                                    {addTrailingZeros(
                                                        item.price
                                                    )}
                                                    = $
                                                    {addTrailingZeros(
                                                        item.qty * item.price
                                                    )}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                            <strong>{order.paymentMethod}</strong>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>
                                        ${addTrailingZeros(order.itemsPrice)}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>
                                        ${addTrailingZeros(order.shippingPrice)}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>
                                        ${addTrailingZeros(order.taxPrice)}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>
                                        ${addTrailingZeros(order.totalPrice)}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            {!order.isPaid && (
                                <ListGroupItem>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={addTrailingZeros(
                                                order.totalPrice
                                            )}
                                            onSuccess={successPaymentHandler}
                                        ></PayPalButton>
                                    )}
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;
