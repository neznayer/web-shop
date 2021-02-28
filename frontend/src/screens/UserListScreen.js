import React, { useState, useEffect } from "react";

import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";

import { listUsers } from "../actions/userActions";
import { Button, Table } from "react-bootstrap";

const UserListScreen = () => {
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const deleteHandler = (e) => {
        console.log("delete user" + e.target.parentNode.dataset.value);
    };
    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);
    return (
        <>
            <h2>Users</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="warning">{error}</Message>
            ) : (
                <Table striped responsive hover bordered className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Adimn</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "green" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/user/${user._id}/edit`}
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={deleteHandler}
                                        data-value={user._id}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListScreen;
