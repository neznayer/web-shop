import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push("/");
        }
    };
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder="Search products..."
                className="ml-sm-2 mr-sm-5"
            ></Form.Control>
            <Button type="submit" variant="outline-success" className="p-2">
                Search
            </Button>
        </Form>
    );
};
