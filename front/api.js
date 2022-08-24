import axios from "axios";
var os = require("os");

const backendPortNumber = "5000";

const serverUrl =
    "http://" +
    +"ec2-3-34-194-179.ap-northeast-2.compute.amazonaws.com" +
    ":" +
    backendPortNumber;

async function get(endpoint, params = "") {
    return axios.get(serverUrl + endpoint + params, {
        // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

async function getRecycleInfo(endpoint, data) {
    return axios.post(serverUrl + endpoint, data);
}

async function getQuary(endpoint, { params = {} }) {
    return axios.get(serverUrl + endpoint, {
        params,
        // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

async function getPost(endpoint, params = "") {
    return axios.get(serverUrl + endpoint + params);
}

async function patch(endpoint, data) {
    return axios.patch(serverUrl + endpoint, data, {
        // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

async function post(endpoint, data) {
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    // 예시: {name: "Kim"} => {"name": "Kim"}
    const bodyData = JSON.stringify(data);

    return axios.post(serverUrl + endpoint, bodyData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

async function sendImageFile(endpoint, formData) {
    return axios.post(serverUrl + endpoint, formData, {
        headers: {
            "content-type": "multipart/form-data",
        },
    });
}

async function sendPostImageFile(endpoint, formData) {
    return axios.post(serverUrl + endpoint, formData, {
        headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

async function sendProfileFile(endpoint, formData) {
    return axios.post(serverUrl + endpoint, formData, {
        headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

async function put(endpoint, data) {
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    // 예시: {name: "Kim"} => {"name": "Kim"}
    const bodyData = JSON.stringify(data);

    return axios.put(serverUrl + endpoint, bodyData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

async function del(endpoint, params = "") {
    return axios.delete(serverUrl + endpoint + params, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
    });
}

export {
    get,
    getQuary,
    getRecycleInfo,
    patch,
    post,
    getPost,
    sendImageFile,
    sendProfileFile,
    sendPostImageFile,
    put,
    del as deleteItem,
};
