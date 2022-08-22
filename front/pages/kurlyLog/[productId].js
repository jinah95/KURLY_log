import React from "react";
import { useRouter } from "next/router";
import KurlyLogPost from "../../components/KurlyLogPost";
import { get } from "../../api";

const kurlyLogPost = () => {
    const router = useRouter();
    // const userId = router.query?.userId;
    const userId = "e373a5b2-4918-43b2-bf85-7af10a41b4a3";
    const productId = router.query?.productId;

    return <KurlyLogPost userId={userId} prouctId={productId}/>;
};

export default kurlyLogPost;