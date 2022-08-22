import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PreviewCard from "./Cards/PreviewCard";
import { get } from "../api";

const Content = ({ data }) => {
    const [posts, setPosts] = useState(data);
    const [hasMore, setHasMore] = useState(true);
    
    const getMorePost = async () => {
        try {
            const res = await get(`/logs/my-log?page=${posts.length}&perPage=2`);
            
            // 계속 똑같은 거 받아옴.. 수정하기
            console.log(res.data.data.logs);
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