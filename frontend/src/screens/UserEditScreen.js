import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader, { LoaderSmall } from "../components/Loader";
import { getUserDetails, updateUserByAdmin } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { USER_UPDATE_BY_ADMIN_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = useSelector((state) => state.userUpdateByAdmin);

    // if there i sno user, get it from userid. dispatch puts found user in state.
    // useEffect fires bcoz user is changed
    // setName  etc., will then fill input fields with user info
    useEffect(() => {
        // if user update is successed then redirect to user list
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_BY_ADMIN_RESET });
            console.log("hello");
            history.push("/admin/userlist");
        } else {
            if (!user.name) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [user, userId, successUpdate, history, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateUserByAdmin({ _id: userId, name, email, isAdmin }));
    };

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {error && <Message variant="warning">{error}</Message>}
                {loading && <Loader />}
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
                    <Form.Group controlId="isAdmin">
                        <Form.Label>Password</Form.Label>
                        <Form.Check
                            type="checkbox"
                            label="is admin?"
                            value={isAdmin}
                            checked={isAdmin}
                            onChange={(e) => {
                                setIsAdmin(e.target.checked);
                            }}
                        ></Form.Check>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Button type="submit" variant="primary">
                                Update
                            </Button>
                        </Col>
                        <Col>
                            {errorUpdate && (
                                <Message variant="warning">
                                    {errorUpdate}
                                </Message>
                            )}
                            {loadingUpdate && <LoaderSmall />}
                            {successUpdate && (
                                <Message variant="good">Update success</Message>
                            )}
                        </Col>
                    </Row>
                </Form>
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
