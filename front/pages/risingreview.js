import React from "react";
import Rising from "../components/Rising";
import { getPost } from "../api";
// import { getServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (context) => {
    const start = 1;
    const per = 2;
    const res = await getPost(`/logs/pop?page=${start}&perPage=${per}`);
    const firstBoards = res.data.data || null;

    return {
        props: { firstBoards },
    };
};

const risingreview = ({ firstBoards }) => {
    console.log(firstBoards);
    return <Rising firstBoards={firstBoards} />;
};

export default risingreview;
