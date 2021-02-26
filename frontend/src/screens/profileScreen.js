import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../actions/userActions";
import { Button, Col, Form, Row } from "react-bootstrap";

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    console.log(name);
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { success } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user.name || success) {
                dispatch(getUserDetails("profile"));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, user, userInfo, history]);

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
                    <Form.Group controlId="password">
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
            </Col>
        </Row>
    );
};

export default ProfileScreen;
