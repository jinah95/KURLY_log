import React from "react";
import ProductDetail from "../../components/ProductDetail";

export async function getServerSideProps() {
    return {
        props: {},
    };
}

const product = () => {
    return <ProductDetail />;
};

export default product;
