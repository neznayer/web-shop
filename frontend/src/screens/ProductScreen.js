import React from "react";
import {
    Button,
    Card,
    Col,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

import products from "../products";

const ProductScreen = ({ match }) => {
    // match comes from Router. match.params.x here :x. abc/:x/:y,  -> match.params.x, match.params.y
    const product = products.find((p) => p._id === match.params.id);
    //find producrt by id. (id is getted from link, from Router's :id)

    return (
        <>
            <Link to="/" className="btn btn-dark my-3">
                Go back
            </Link>
            <Row>
                <Col md={6}>
                    <Image fluid src={product.image} alt={product.name}></Image>{" "}
                    {/*fluid makes image to stay inside container */}
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                            />
                        </ListGroupItem>
                        <ListGroupItem>Price: ¥{product.price}</ListGroupItem>
                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0
                                            ? "In stock"
                                            : "Out of stock"}
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Button
                                    className="btn-block"
                                    type="button"
                                    disabled={product.countInStock === 0}
                                >
                                    Add to cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;
