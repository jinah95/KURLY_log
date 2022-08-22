import React from "react";
import { FixedSizeList } from "react-window";
import styled from "styled-components";
import InfiniteLoader from "react-window-infinite-loader";
import ReviewCard from "./ReviewCard";

const ReviewLists = ({ items, moreItemsLoading, loadMore, hasNextPage }) => {
    const Row = ({ index, style }) => (
        <ReviewCard
            image={items[index]}
            num={index}
            style={style}
            loading={index === items.length}
        />
    );

    const itemCount = hasNextPage ? items.length + 1 : items.length;

    return (
        <InfiniteLoader
            isItemLoaded={(index) => index < items.length}
            itemCount={itemCount}
            loadMoreItems={loadMore}
        >
            {({ onItemsRendered, ref }) => (
                <FixedSizeList
                    className="fixed-style"
                    height={1000}
                    itemCount={itemCount}
                    itemSize={450}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                >
                    {Row}
                </FixedSizeList>
            )}
        </InfiniteLoader>
    );
};

export default ReviewLists;
