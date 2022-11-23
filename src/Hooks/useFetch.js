import { useEffect, useState } from "react";

function useFetch(url, options) {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [abort, setAbort] = useState(()=>()=>{});

    const fetchData = async (url,options) => {

      const abortController = new AbortController();
      const signal = abortController.signal;
      const abort = abortController.abort.bind(abortController);

      setAbort(()=>abort);
      setLoading(true);

      try {
        const res = await fetch(url, {...options, signal});
        const json = await res.json();

        setResponse(json);
        setLoading(false);

      } catch (error) {

        setError(error);
        setLoading(false);

      }
    };
    
    useEffect(()=>{
      if(url){
          fetchData(url,options);

          return () => {
            abort();
          }
        }
        
    },[url])


    return { loading ,response, error, abort, fetchData,setResponse };

}


export default useFetch;