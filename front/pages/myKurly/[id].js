import React from "react";
import { useRouter } from "next/router";
import MyKurly from "../../components/MyKurly";

const myKurly = () => {
    const router = useRouter();
    const myUserId = router.query?.id;
    // 보통 내 페이지에 개인 블로그인 경우 /:id 로 들어감!
    return <MyKurly />;
};

export default myKurly;
