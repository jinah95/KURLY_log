import React from "react";
import { useRouter } from "next/router";

const myKurly = () => {
    const router = useRouter();
    const myUserId = router.query?.id;
    console.log(myUserId);
    return <div>myKurly</div>;
};

export default myKurly;
