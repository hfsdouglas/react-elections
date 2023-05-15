import read from "./http-service";

export default async function apiGetAllCities() {
    const allCities = await read('/cities');
    return allCities;
}