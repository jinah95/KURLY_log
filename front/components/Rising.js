import React, { useState } from "react";
import styled from "styled-components";
import RisingReviews from "./RisingReviews";
import initialItems from "./mock.json";

const Rising = () => {
    const [risingState, setRisingState] = useState({
        items: initialItems,
        moreItemsLoading: false,
        hasNextPage: true,
    });
    const loadMore = () => {
        setRisingState({ ...risingState, moreItemsLoading: true });
        const newItems = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
        setRisingState({
            ...risingState,
            moreItemsLoading: false,
            items: [...risingState.items, ...newItems],
        });
        console.log(risingState.items);
    };
    const { items, moreItemsLoading, hasNextPage } = risingState;
    return (
        <Wrapper>
            <Header></Header>
            <BestKurlioncer>
                <KurlioncerPageMove>
                    <PageMoveWrapper>
                        <PageMoveFirst>
                            <PageMoveTitle>떠오르는 샛별 리뷰</PageMoveTitle>
                            <PageMoveSubTitle>
                                급변하는 리뷰 사회, 나도 컬리언서가 될 수 있다?
                            </PageMoveSubTitle>
                        </PageMoveFirst>
                    </PageMoveWrapper>
                </KurlioncerPageMove>
            </BestKurlioncer>
            <>
                <RisingReviews
                    items={items}
                    moreItemsLoading={moreItemsLoading}
                    loadMore={loadMore}
                    hasNextPage={hasNextPage}
                />
            </>
        </Wrapper>
    );
};

export default Rising;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
`;

const Header = styled.div`
    width: 100%;
    height: 40%;
    background: url("risingAD.jpg");
    background-size: cover;
    color: white;
    display: grid;
    grid-template-rows: 8fr 2fr;
    padding: 0 20px;
`;

const BestKurlioncer = styled.div`
    margin: 16px 0px;
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
