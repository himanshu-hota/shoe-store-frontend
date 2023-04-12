import { API_URL,STRAPI_API_TOKEN } from "./urls";

export const fetchDataFromAPI = async (endpoints) => {
    const options = {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + STRAPI_API_TOKEN
        }
    };

    const url = `${API_URL}${endpoints}`;
    const res = await fetch(url,options);
    const data = await res.json();

    return data;
}