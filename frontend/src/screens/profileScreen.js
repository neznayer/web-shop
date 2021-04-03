import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";

import { getUserDetails, updateUser } from "../actions/userActions";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userOrders = useSelector((state) => state.myOrdersList);
    const {
        loading: myOrdersLoading,
        error: myOrdersError,
        orders,
    } = userOrders;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { success } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user.name || success) {
                dispatch({ type: USER_UPDATE_RESET });
                dispatch(getUserDetails("profile"));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
            dispatch(listMyOrders());
        }
    }, [dispatch, user, userInfo, history, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch register
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            // dispatch(register(name, email, password));
            // DISPATCH UPDATE
            dispatch(updateUser({ id: user._id, name, email, password }));
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {error && <Message variant="danger">{error}</Message>}
                {message && <Message variant="danger">{message}</Message>}
                {loading && <Loader />}
                {success && <Message variant="success">Success</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="enter your name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="enter email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="enter password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="ConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My orders</h2>
                {myOrdersLoading ? (
                    <Loader />
                ) : myOrdersError ? (
                    <Message variant="warning">{myOrdersError}</Message>
                ) : (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer
                                            to={`/order/${order._id}`}
                                        >
                                            <Button variant="info">
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
