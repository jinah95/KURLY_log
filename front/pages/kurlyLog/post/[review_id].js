import React from "react";
import KurlyLogPost from "../../../components/KurlyLogPost";

export async function getServerSideProps() {
    return {
        props: {},
    };
}

const kurlyLogPost = () => {
    return <KurlyLogPost />;
};

export default kurlyLogPost;
