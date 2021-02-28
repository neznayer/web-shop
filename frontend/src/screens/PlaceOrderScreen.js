import React, { useEffect } from "react";
import {
    Button,
    Card,
    Col,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetCart } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    // calculate prices

    const addTrailingZeros = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    cart.itemsPrice = addTrailingZeros(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    cart.shippingPrice = addTrailingZeros(cart.itemsPrice > 100 ? 0 : 10);

    cart.taxPrice = addTrailingZeros(+(0.15 * cart.itemsPrice));

    cart.totalPrice = +cart.itemsPrice + +cart.shippingPrice + +cart.taxPrice;

    const { order, success, error } = useSelector((state) => state.orderCreate);

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
        }
    }, [history, success]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
        dispatch(resetCart());
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>Shipping</h3>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city},
                                {cart.shippingAddress.postalCode},
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h3>Payment method:</h3>
                            <strong>{cart.paymentMethod}</strong>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h3>Order items</h3>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
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
                                                    {item.qty} x ${item.price} =
                                                    ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                            <strong>{cart.paymentMethod}</strong>
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
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {error && (
                                    <Message variant="danger">{error}</Message>
                                )}
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button
                                    type="button"
                                    className="btn-blobk"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
