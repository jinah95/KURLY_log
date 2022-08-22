import React, { useState, useEffect, useReducer, createContext } from "react";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { loginReducer } from "../provider/reducer";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function MyApp({ Component, pageProps }) {
    const [userState, dispatch] = useReducer(loginReducer, {
        user: null,
    });

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
