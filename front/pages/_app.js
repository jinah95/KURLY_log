import React, { useState, useEffect, useReducer, createContext } from "react";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { loginReducer } from "../provider/reducer";
import { get } from "../api";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function MyApp({ Component, pageProps }) {
    const [userState, dispatch] = useReducer(loginReducer, {
        user: null,
    });

    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            const currentUser = sessionStorage.getItem("userToken");

            if (currentUser) {
                const res = await get("/users/current");
                const user = res.data.data;

                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: user,
                });
            } else {
                console.error(
                    "%c SessionStorage에 토큰 없음.",
                    "color: #d93d1a;"
                );
            }
        } catch (err) {
            console.error("error message: ", err);
        }

        setIsFetchCompleted(true);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    if (!isFetchCompleted) {
        return "loading...";
    }
    return (
        <DispatchContext.Provider value={dispatch}>
            <UserStateContext.Provider value={userState}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </UserStateContext.Provider>
        </DispatchContext.Provider>
    );
}

export default MyApp;
