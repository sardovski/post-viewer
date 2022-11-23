import { useState } from "react";


const URLS = {
    getByUserId: (id) => {
        return `https://jsonplaceholder.typicode.com/posts?userId=${id}&_sort=id&_order=desc&_start=0&_end=5&_expand=user`;
    },
    getLast20: () => {
        return 'https://jsonplaceholder.typicode.com/posts?_sort=id&_order=desc&_start=0&_end=20&_expand=user';
    },
    getAll: () => {
        return 'https://jsonplaceholder.typicode.com/posts?_sort=id&_order=desc&_expand=user';
    },
    createPost:()=>{
        return 'https://jsonplaceholder.typicode.com/posts';
    }
}

function useUrl(props = URLS.getLast20()) {
    const [url, setUrl] = useState(props);
    return [url,setUrl]
}

export { useUrl , URLS};