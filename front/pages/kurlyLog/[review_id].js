import React from "react";
import { useRouter } from "next/router";
import KurlyLogPost from "../../components/KurlyLogPost";

const kurlyLogPost = () => {
    const router = useRouter();
    const reviewId = router.query?.review_id;

    return <KurlyLogPost reviewId={reviewId} />;
};

export default kurlyLogPost;