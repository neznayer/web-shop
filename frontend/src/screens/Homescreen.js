import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";
import { Paginate } from "../components/Paginate";
import { ProductCarousel } from "../components/ProductCarousel";
import { Meta } from "../components/Meta";
import { Link } from "react-router-dom";
const Homescreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    // const [products, setProducts] = useState([]); bcuz we using Redux state now
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);

    const { error, loading, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta />
            {!keyword ? (
                <>
                    <ProductCarousel />
                    <h1>Latest Products</h1>
                </>
            ) : (
                <>
                    <Link to="/" className="btn btn-light">
                        Go back
                    </Link>
                    <h1>Search results</h1>
                </>
            )}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : !products?.length && keyword ? (
                <h2> Search returned no results </h2>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword || ""}
                    />
                </>
            )}
        </>
    );
};

export default Homescreen;
