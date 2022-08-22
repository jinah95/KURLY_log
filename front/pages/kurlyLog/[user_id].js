import React from "react";
import { useRouter } from "next/router";
import MyKurly from "../../components/MyKurly";

const myKurly = () => {
    const router = useRouter();
    const userId = router.query?.user_id;
    console.log(router.query)
    return <MyKurly userId={userId}/>;
};

export default myKurly;
