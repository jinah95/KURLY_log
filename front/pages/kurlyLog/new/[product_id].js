import React from "react";
import { useRouter } from "next/router";
import NewKurlyLog from "../../../components/NewKurlyLog";

export async function getServerSideProps() {
    return {
        props: {},
    };
}

const newKurlyLog = () => {
    const router = useRouter();
    const productId = router.query?.product_id;

    return <NewKurlyLog productId={productId} />;
};

export default newKurlyLog;
