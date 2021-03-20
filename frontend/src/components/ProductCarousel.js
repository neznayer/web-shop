import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { listTopProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
export const ProductCarousel = () => {
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(
        (state) => state.productTop
    );

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="warning">error</Message>
    ) : (
        <Carousel pause="hover" className="bg-dark">
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                        ></Image>
                        <Carousel.Caption>
                            <h3>
                                {product.name} ({product.price})
                            </h3>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};
