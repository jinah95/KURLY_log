import React from "react";
import { useRouter } from "next/router";
import KurlyLogPost from "../../components/KurlyLogPost";

const kurlyLogPost = () => {
    const router = useRouter();
    const productId = router.query?.productId;
    
    return <KurlyLogPost user={'u'} prouctId={productId}/>;
};

export default kurlyLogPost;