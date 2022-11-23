import { useEffect, useRef, useState } from "react";
import useFetch from "../Hooks/useFetch";
import { URLS } from "../Hooks/useUrl";

function Create(props) {

    const [newPost, setNewPost] = useState({});
    const { loading: loadingNewPost, response: responseNewPost, error: responseErrorPost, abort: responseAbortPost, fetchData } = useFetch();
    const form = useRef(null);

    useEffect(()=>{
        if(responseNewPost){

            props.setPosts((prev)=>([{...responseNewPost,id: ++responseNewPost.id + Math.random(),user:{username: newPost.name,name:newPost.name,id:11}},...prev]))
        }
    },[responseNewPost])

    function onChange(e) {
        setNewPost((prev)=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }
    async function onSubmit(e) {
        e.preventDefault();
        await fetchData(URLS.createPost(),
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newPost.title,
                    body: newPost.body,
                    userId: "11"
                })
            })
        
            form.current.reset();

    }


    return (
        <section className="create">
            <form ref={form} onChange={onChange}>
                <input type="text" name='name' className="create" placeholder="Name" />
                <input type="text" name='title' className="create" placeholder="Title" />
                <textarea type="text" name='body' className="create" placeholder="Content" />
                <button onClick={onSubmit}>Create</button>
            </form>
        </section>
    )

}

export default Create;