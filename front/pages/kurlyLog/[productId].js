import React from "react";
import { useRouter } from "next/router";
import KurlyLogPost from "../../components/KurlyLogPost";

const kurlyLogPost = () => {
    const router = useRouter();
    const productId = router.query?.id;
    
    return <KurlyLogPost user={'u'} product={'p'}/>;
};

export default kurlyLogPost;