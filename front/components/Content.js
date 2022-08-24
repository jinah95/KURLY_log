import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PreviewCard from "./Cards/PreviewCard";
import { getPost } from "../api";

const Content = ({ data }) => {
    const [posts, setPosts] = useState(data);
    const [hasMore, setHasMore] = useState(true);
    
    const getMorePost = async () => {
        if (posts.length <= 0) { 
            return;
        }

        try {
            const res = await getPost(`/logs/my-log?page=${posts.length}&perPage=2`);
            // (`/logs/user/${userId}?page=1&perPage=3`);
            
            const newPosts = res.data.data;
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

// import React from "react";
// import MyKurlyPostAll from "./MyKurlyPostAll";
// import { getPost } from "../api";

// export const getServerSideProps = async (context) => {
//     const start = 1;
//     const per = 2;
//     const userId = "e373a5b2-4918-43b2-bf85-7af10a41b4a3";
//     const res = await getPost(`/logs/user/${userId}?page=${start}&perPage=${per}`);
//     const firstBoards = res.data.data || null;

//     return {
//         props: { firstBoards },
//     };
// };

// const Content = ({ firstBoards }) => {
//     return <MyKurlyPostAll firstBoards={firstBoards} />;
// };

// export default Content;