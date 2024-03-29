import React, { useState, useEffect } from "react";

import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader, { LoaderSmall } from "../components/Loader";

import {
    createProduct,
    deleteProduct,
    listProducts,
} from "../actions/productActions";
import { Button, Col, Row, Table } from "react-bootstrap";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { Paginate } from "../components/Paginate";

const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = useSelector((state) => state.productDelete);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = useSelector((state) => state.productCreate);

    const deleteHandler = (id) => {
        if (window.confirm("Are you Sure?")) {
            dispatch(deleteProduct(id));
        }
    };

    const createHandler = () => {
        // create product
        dispatch(createProduct());
    };

    useEffect(() => {
        if (!userInfo.isAdmin) {
            history.push("/login");
        }
        if (successCreate) {
            console.log(createdProduct);
            history.push(`/admin/product/${createdProduct._id}/edit`);
            dispatch({ type: PRODUCT_CREATE_RESET });
        } else {
            dispatch(listProducts("", pageNumber));
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdProduct,
        pageNumber,
    ]);
    return (
        <>
            <Row>
                <Col md={9}>
                    <h2>Products</h2>
                </Col>
                <Col>
                    <Button className="my-3" onClick={createHandler}>
                        <i className="fas fa-plus"></i>Create new product
                    </Button>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="warning">{error}</Message>
            ) : loadingDelete ? (
                <LoaderSmall />
            ) : errorDelete ? (
                <Message variant="warning">{errorDelete}</Message>
            ) : loadingCreate ? (
                <LoaderSmall />
            ) : errorCreate ? (
                <Message variant="warning">{errorCreate}</Message>
            ) : (
                <>
                    <Table
                        striped
                        responsive
                        hover
                        bordered
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>

                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>

                                    <td>
                                        <LinkContainer
                                            to={`/admin/product/${product._id}/edit`}
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
                                            onClick={() => {
                                                deleteHandler(product._id);
                                            }}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </>
    );
};

export default ProductListScreen;
