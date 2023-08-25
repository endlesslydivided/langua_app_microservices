import React, { useContext, useEffect, useState } from 'react'
import { BaseException } from '../exceptions/base.exception';
import { toast } from 'react-toastify';

type UseLoadingParams =
{
    fetch: (...args:any[]) => Promise<any>,
    errorCallback?: (error: BaseException) => void,
    params?: any
}

type Filters = {
    page: number,
    limit: number
}

export const initialFiltersState:Filters = 
{
    page: 0,
    limit: 10
}

const useFetch = ({fetch,errorCallback,params}:UseLoadingParams) => {

    const [loading,setLoading] = useState(false);
    const [data,setData] = useState<any[]>([]);
    
    const [filters,setFilters] = useState<Filters>(initialFiltersState);
    const [totalPages,setTotalPages] = useState<number>(0);
    const [count,setCount] = useState<number>(0);

    useEffect(() =>
    {
        setLoading(true);
        fetch({...filters,...params}).then((result) =>
        {
            setData([...result.rows]);
            setTotalPages(Math.ceil(result?.count / filters.limit) ?? 0);
            setCount(result?.count?? 0);

        })
        .catch((error) =>{
            if(errorCallback)
            {
                errorCallback(error);
            }
            toast(error.message,{autoClose:5000,type:'success'});
        })
        .finally(() => {
            setLoading(false);
        });
    },[filters])


    return {loading,data,setData,filters,setFilters,totalPages,count};
}

export default useFetch;
