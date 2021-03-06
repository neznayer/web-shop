import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader, { LoaderSmall } from "../components/Loader";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { upperFirst, lowerCase } from "lodash";

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const fields = {
        name: "",
        price: 0,
        brand: "",
        category: "",
        description: "",
        image: "",
        countInStock: 0,
    };
    const [productEditDetails, setProductEditDetails] = useState(fields);
    const dispatch = useDispatch();

    const { loading, error, product } = useSelector(
        (state) => state.productDetails
    );
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = useSelector((state) => state.productUpdate);

    // if there i sno user, get it from userid. dispatch puts found user in state.
    // useEffect fires bcoz user is changed
    // setName  etc., will then fill input fields with user info
    useEffect(() => {
        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId));
        } else {
            setProductEditDetails(product);
        }
    }, [product, productId, history, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateProduct(productEditDetails));
    };

    const changeHandler = (e) => {
        setProductEditDetails({
            ...productEditDetails,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {error && <Message variant="warning">{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    {Object.keys(fields).map((fieldName) => {
                        return (
                            <Form.Group controlId={fieldName} key={fieldName}>
                                <Form.Label>
                                    {upperFirst(lowerCase(fieldName))}
                                </Form.Label>
                                <Form.Control
                                    type={
                                        fieldName === "price" ||
                                        fieldName === "countInStock"
                                            ? "number"
                                            : "text"
                                    }
                                    as={
                                        fieldName === "description"
                                            ? "textarea"
                                            : undefined
                                    }
                                    rows={
                                        fieldName === "description" ? 3 : null
                                    }
                                    placeholder={`enter ${upperFirst(
                                        lowerCase(fieldName)
                                    )}`}
                                    value={productEditDetails[fieldName]}
                                    name={fieldName}
                                    onChange={changeHandler}
                                ></Form.Control>
                            </Form.Group>
                        );
                    })}

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

export default ProductEditScreen;
