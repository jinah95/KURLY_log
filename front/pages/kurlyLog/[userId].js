import React from "react";
import MyKurly from "../../components/MyKurly";

export async function getServerSideProps() {
    return {
        props: {},
    };
}

const myKurly = () => {
    return <MyKurly />;
};

export default myKurly;
