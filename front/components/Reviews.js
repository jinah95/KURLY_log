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

const Header = styled.div`
    width: 100%;
    height: 40%;
    background: url("/risingAD.jpg");
    background-size: cover;
    color: white;
    display: grid;
    grid-template-rows: 8fr 2fr;
    padding: 0 20px;
`;

const BestKurlioncer = styled.div`
    margin: 16px 0;
`;

const KurlioncerPageMove = styled.a`
    padding: 16px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
`;

const PageMoveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const PageMoveFirst = styled.div``;

const PageMoveTitle = styled.span`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: calc(100% - 70px);
    color: rgb(51, 51, 51);
    font-size: 18px;
    line-height: normal;
    font-weight: 600;
    letter-spacing: 0.2px;
`;

const MoreButton = styled.span`
    font-size: 12px;
`;

const PageMoveSubTitle = styled.span`
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    color: rgb(153, 153, 153);
    font-weight: 400;
    letter-spacing: normal;
    line-height: 1.29;
    margin-top: 4px;
`;

// const InfiniteWrapper = styled.div`
//     ::-webkit-scrollbar {
//         width: 0;
//         background: transparent;
//     }
// `;
