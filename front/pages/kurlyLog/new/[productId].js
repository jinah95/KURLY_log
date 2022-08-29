import React from "react";
import NewKurlyLog from "../../../components/NewKurlyLog";

export async function getServerSideProps() {
    return {
        props: {},
    };
}

const newKurlyLog = () => {
    return <NewKurlyLog />;
};

export default newKurlyLog;
