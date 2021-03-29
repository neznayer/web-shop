import React from "react";
import { Helmet } from "react-helmet";

export const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}></meta>
            <meta name="keywords" content={keywords}></meta>
        </Helmet>
    );
};

Meta.defaultProps = {
    title: "Welcome to ProShop",
    keywords: "electronics, shop",
    description: "web shop of electronics with best prices",
};
