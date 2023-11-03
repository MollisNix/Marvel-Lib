import axios from "axios";


export const loadDataPattern =  async (url,  urlAPIKey, dataOffset, dataOffestExtenVal, setOffsetState, setDataState, setCords) => {
    
    const charListResponse = await axios.get(`${url}offset=${dataOffset}${urlAPIKey}`);
            setDataState((prev => [...prev, ...charListResponse.data.data.results]));
            setOffsetState(dataOffset + dataOffestExtenVal);
            setCords(false);
}


// export const  FetchData = async (url, setData) => {
//     const charListResponse = await axios.get(url);
//     // setData(charListResponse.data.data.results);
// }

   