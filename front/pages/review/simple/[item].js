import React from "react";
import SimpleReact from "../../../components/SimpleReview";

export async function getServerSideProps() {
    return {
        props: {},
    };
}

const simple = () => {
    return <SimpleReact />;
};

export default simple;
