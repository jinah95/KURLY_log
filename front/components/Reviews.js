import initialItems from "./mock.json";
import React, { useState } from "react";
import styled from "styled-components";
import ReviewLists from "./ReviewLists";

const Reviews = () => {
    const [reviewState, setReviewState] = useState({
        items: initialItems,
        moreItemsLoading: false,
        hasNextPage: true,
    });

    const loadMore = () => {
        setReviewState({ ...reviewState, moreItemsLoading: true });
        const newItems = [
            "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
            "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
            "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
            "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
            "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
            "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
            "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
            "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        ];
        setReviewState({
            ...reviewState,
            moreItemsLoading: false,
            items: [...reviewState.items, ...newItems],
        });
    };
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
    padding-top: 150px;
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
