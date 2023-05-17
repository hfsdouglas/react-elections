import read from "./http-service";

async function apiGetAllCities() {
    const allCities = await read('/cities');
    return allCities;
}

async function apiGetAllCandidates() {
    const allCandidates = await read('/candidates');
    return allCandidates;
}

async function apiGetElections(cityId) {
    const allElections = await read('/election/');
    return allElections;
}

export { apiGetAllCities, apiGetAllCandidates, apiGetElections }