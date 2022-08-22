import React from "react";
import ProductPerReview from "../../components/ProductPerReview";

export async function getServerSideProps() {
    return {
        props: {},
    };
}

const reviews = () => {
    return <ProductPerReview />;
};

export default reviews;
