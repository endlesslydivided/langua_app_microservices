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
    page: 1,
    limit: 10
}

const useFetch = ({fetch,errorCallback,params}:UseLoadingParams) => {

    const [loading,setLoading] = useState(false);
    const [data,setData] = useState<any[]>([]);
    
    const [filters,setFilters] = useState<Filters>(initialFiltersState);
    const [totalPages,setTotalPages] = useState<number>(0);
    const [count,setCount] = useState<number>(0);

    const initFetch = () =>
    {
        setLoading(true);
        fetch({...filters,page:filters.page - 1,...params}).then((result) =>
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
            toast(error.reason,{autoClose:5000,type:'error'});
        })
        .finally(() => {
            setLoading(false);
        });
    }

    useEffect(() =>
    {
        initFetch();
    },[filters])


    return {
        loading,
        data,setData,
        filters,setFilters,
        totalPages,
        count,
        initFetch
    };
}

export default useFetch;
