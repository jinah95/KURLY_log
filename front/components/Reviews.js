import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReviewLists from "./ReviewLists";
import { getPost } from "../api";

const Reviews = ({ reviewInitial, productId }) => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [reviewState, setReviewState] = useState({
        items: reviewInitial,
        moreItemsLoading: false,
        hasNextPage: true,
    });

    const loadMore = async () => {
        const per = 5;
        const res = await getPost(
            `/logs/goods/${productId}?page=${page + 1}&perPage=${per}`
        );

        if (
            res.data.data?.reviews?.length === 0 ||
            res.data.message === "fail"
        ) {
            return;
        } else {
            setPage((cur) => cur + 1);
            setReviewState({ ...reviewState, moreItemsLoading: true });
            const newItems = [...res.data.data.reviews];
            setReviewState({
                ...reviewState,
                moreItemsLoading: false,
                items: [...reviewState.items, ...newItems],
            });
        }
    };

    useEffect(() => {
        setPage(1);
    }, []);

    const { items, moreItemsLoading, hasNextPage } = reviewState;

    return (
        <Wrapper>
            <ReviewLists
                items={items}
                moreItemsLoading={moreItemsLoading}
                loadMore={loadMore}
                hasNextPage={hasNextPage}
            />
        </Wrapper>
    );
};

export default Reviews;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    padding-top: 185px;
`;
