import axios from "axios";

const BASE_URL = process.env.NODE_ENV === 'development'
    ? "http://localhost:3001"
    : "https://undefinded";

const axiosInstance = axios.create({  baseURL: BASE_URL, timeout: 10000 });

export default async function read(url) {
    const { data } = await axiosInstance.get(url);
    return data;
}
