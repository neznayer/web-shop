import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";

import { listOrders } from "../actions/orderActions";

import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const OrdersListScreen = ({ history }) => {
    const dispatch = useDispatch();
    const ordersList = useSelector((state) => state.ordersList);
    const { loading, error, orders } = ordersList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        // only show this if user is Admin. if not, redirect to login page
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, userInfo]); //success delete changes and list users is reloaded
    return (
        <>
            <h2>Orders</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="warning">{error}</Message>
            ) : (
                <Table striped responsive hover bordered className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>

                            <th>Total price</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>

                                <td>{order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        <>
                                            <i
                                                className="fas fa-check"
                                                style={{ color: "green" }}
                                            />
                                            <span>
                                                {order.paidAt?.substring(0, 10)}
                                            </span>
                                        </>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        <>
                                            <i
                                                className="fas fa-check"
                                                style={{ color: "green" }}
                                            />
                                            <p>
                                                {order.deliveredAt?.substring(
                                                    0,
                                                    10
                                                )}
                                            </p>
                                        </>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                        >
                                            <i className="fas fa-info"></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default OrdersListScreen;
