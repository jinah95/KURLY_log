import React from "react";
import { useRouter } from "next/router";
import KurlyLogPost from "../../components/KurlyLogPost";

const kurlyLogPost = () => {
    const router = useRouter();
    // const userId = router.query?.userId;
    const productId = router.query?.productId;

    return <KurlyLogPost user={'id'} prouctId={productId}/>;
};

export default kurlyLogPost;