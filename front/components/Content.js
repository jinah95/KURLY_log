import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PreviewCard from "./Cards/PreviewCard";
import { get } from "../api";

const Content = ({ data }) => {
    const [posts, setPosts] = useState(data);
    const [hasMore, setHasMore] = useState(true);
    
    const id = "e373a5b2-4918-43b2-bf85-7af10a41b4a3";

    const getMorePost = async () => {
        try {
            const res = await get("/logs/my-log");
            // const res = await fetch(
            //     `https://jsonplaceholder.typicode.com/todos?_start=${posts.length}&_limit=10`
            // );
            const newPosts = res.data.data.logs;
            setPosts((post) => [...post, ...newPosts]);
        } catch (err) {
            console.error("error message: ", err);
        }
    };
  
    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={getMorePost}
            hasMore={hasMore}
            loader={<h4> Loading...</h4>}
            endMessage={<h4>Nothing more to show</h4>}
        >
            {
                posts.map((post, index) => (
                    <PreviewCard 
                        key={index}
                        post={post} 
                    />
                ))
            }
        </InfiniteScroll>
    );
};
  
export default Content;