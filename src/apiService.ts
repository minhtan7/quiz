import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        // authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
});

api.interceptors.request.use(
    (request) => {
        console.log("Starting Request", request);
        return request;
    },
    function (error) {
        console.log("REQUEST ERROR", error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log("Response:", response);
        // if (response && response.data && response.data.data.accessToken) {
        //     localStorage.setItem("accessToken", response.data.data.accessToken);
        // }
        return response;
    },
    function (error) {
        error = error.response.data;
        console.log("RESPONSE ERROR", error);
        let errorMsg = error.message || "";
        if (error.errors && error.errors.message)
            errorMsg = errorMsg + ": " + error.errors.message;

        return Promise.reject(error);
    }
);

export default api;
