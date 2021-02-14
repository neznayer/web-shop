import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Image,
    ListGroup,
    Row,
} from "react-bootstrap";

// when add to cart is pressed, it will redirect to cart screen. <Route path="/cart/:id?" component={CartScreen} />
const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const qty = location.search ? +location.search.split("=")[1] : 1;

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        if (productId) {
            // if cartScreen is displayed after we added something to cart:
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        console.log(id);
    };
    const checkOutHandler = () => {
        console.log("Checkout");
    };
    return (
        <Row>
            <Col md={8}>
                {cartItems.lenght === 0 ? (
                    <Message>
                        Your cart is empty <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            fluid
                                            alt={item.name}
                                            rounded
                                        />
                                    </Col>
                                    <Col ms={3}>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>￥{item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        +e.target.value
                                                    )
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={removeFromCartHandler(
                                                item.product
                                            )}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h6>
                                Subtotal (
                                {cartItems.reduce(
                                    (acc, cur) => acc + cur.qty,
                                    0
                                )}
                                ) items{" "}
                            </h6>
                            ￥
                            {cartItems
                                .reduce(
                                    (acc, cur) => acc + cur.price * cur.qty,
                                    0
                                )
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0}
                                onClick={checkOutHandler}
                            >
                                Check out
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;
