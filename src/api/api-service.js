import axios from "axios";

const url = "http://localhost:8080";

export const GET_TUs = async () => {
    const data = axios.get(`${url}/tu`);
    return data;
}

export const GET_DETERIORATIONS = async (tu, deterioraion) => {
    const data = axios.get(`${url}/trendline/${tu}/${deterioraion}`);
    return data;
}