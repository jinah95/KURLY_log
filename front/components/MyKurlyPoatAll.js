import Content from "./Content";
import { getPost } from "../api";

export default function MyKurlyPostAll(props) {
    return <Content data={props.data} />;
}

export const getStaticProps = async () => {
    const data = await getPost(
        // `/logs/user/${userId}?page=1&perPage=3`
        `/logs/my-log?page=1&perPage=10`
    ).then((res) => res.data.data);
    return {
        props: { data },
    };
};
