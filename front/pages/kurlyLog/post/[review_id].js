import React from "react";
import KurlyLogPost from "../../../components/KurlyLogPost";

export async function getServerSideProps() {
    return {
        props: {},
        fallback: true,
    };
}

const kurlyLogPost = () => {
    return <KurlyLogPost />;
};

export default kurlyLogPost;
