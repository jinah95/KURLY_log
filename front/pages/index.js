import Best from "../components/Best";
import { getPost } from "../api";

export const getServerSideProps = async (context) => {
    const res = await getPost("/goods");
    const newArr = res.data.data || null;

    return {
        props: { newArr },
    };
};

export default function Home({ newArr }) {
    return <Best newArr={newArr} />;
}
