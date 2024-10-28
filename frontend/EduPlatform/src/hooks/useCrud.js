import useAxiosWithInterceptor from "../helpers/jwtintercepter";
import { BASE_URL } from "../config";
import {useState, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import axios from 'axios'

const useCrud = (initialData, apiURL) => {
    const jwtAxios = useAxiosWithInterceptor();

    const [searchParams, setSearchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const [dataCRUD, setDataCRUD] = useState(initialData);
    const [error, setError] = useState(null);

    const keyParams = Array.from(searchParams.entries());

    if (keyParams.length>0){
        apiURL += '?' + keyParams.map(([key, value])=> `${key}=${value}&`);
    }

    const fetchData = async () => {
        setIsLoading(true);
        try{
            const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {
                withCredentials: true,
            });

            const data = response.data;
            setDataCRUD(data);
            setError(null);
            setIsLoading(false);
            return data;
        }catch (error){
            if (error.response && error.response.status == 400){
                setError(new Error("400"));
            }
            setIsLoading(false);
            throw error;
        }
    }

    return {fetchData, dataCRUD, error, isLoading};

}


export default useCrud;