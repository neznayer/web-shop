import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Col,
    Form,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import {
    addReviewProduct,
    listProductDetails,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_ADD_REVIEW_RESET } from "../constants/productConstants";
import { Meta } from "../components/Meta";

const ProductScreen = ({ history, match }) => {
    // match comes from Router. match.params.x here :x. abc/:x/:y,  -> match.params.x, match.params.y

    //const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1); // qty to add to cart
    const [rating, setRating] = useState(0); // qty to add to cart
    const [comment, setComment] = useState(""); // qty to add to cart

    //find producrt by id. (id is getted from link, from Router's :id)

    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);

    const { loading, error, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const {
        error: errorProductReview,
        success: successProductReview,
    } = useSelector((state) => state.productAddReview);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(addReviewProduct(match.params.id, { rating, comment }));
    };

    useEffect(() => {
        // if (successProductReview) {
        //     dispatch({ type: PRODUCT_ADD_REVIEW_RESET });
        // }

        dispatch({ type: PRODUCT_ADD_REVIEW_RESET });

        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match, successProductReview]);

    return (
        <>
            <Link to="/" className="btn btn-dark my-3">
                Go back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Meta title={product.name} />
                    <Row>
                        <Col md={6}>
                            <Image
                                fluid
                                src={product.image}
                                alt={product.name}
                            ></Image>
                            {/*fluid makes image to stay inside container */}
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h3>{product.name}</h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Rating
                                        value={product.rating || 0}
                                        text={`${product?.numReviews} reviews`}
                                    />
                                </ListGroupItem>
                                <ListGroupItem>
                                    Price: ¥{product.price}
                                </ListGroupItem>
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
                                    {product.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty:</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}
                                    <ListGroupItem>
                                        <Button
                                            className="btn-block"
                                            type="button"
                                            disabled={
                                                product.countInStock === 0
                                            }
                                            onClick={addToCartHandler}
                                        >
                                            Add to cart
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && (
                                <Message> No reviews </Message>
                            )}
                            <ListGroup variant="flush">
                                {product.reviews.map((review) => (
                                    <ListGroupItem key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating
                                            value={review.rating}
                                            text={review.rating}
                                        />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroupItem>
                                ))}
                                <ListGroupItem>
                                    <h2>Write a review</h2>
                                    {errorProductReview && (
                                        <Message variant="warning">
                                            {errorProductReview}
                                        </Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>

                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        {" "}
                                                        Select...
                                                    </option>
                                                    <option value="1">
                                                        1 - Poor
                                                    </option>
                                                    <option value="2">
                                                        2 - Fair
                                                    </option>
                                                    <option value="3">
                                                        3 - Good
                                                    </option>
                                                    <option value="4">
                                                        4 - Very good
                                                    </option>
                                                    <option value="5">
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>Review:</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows="3"
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                type="submit"
                                                variant="primary"
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please
                                            <Link to="/login">login</Link> to
                                            add a review
                                        </Message>
                                    )}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;
