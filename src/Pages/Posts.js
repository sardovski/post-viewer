import Post from "../Components/Post";
import PostNavigation from "../Components/PostNavigation";
import useFetch from "../Hooks/useFetch";
import {useUrl,URLS} from "../Hooks/useUrl";
import "./Posts.scss";

function Posts(props) {

    const[url,setUrl] = useUrl();
    const { loading: postLoading, response: postResponse, error: postError, abort: postAbort,setResponse } = useFetch(url);

    function onClick(url,_){
        postAbort();
        setUrl(url);
    }

    return (
        <section className="posts wrapper">
            <h1>Post Viewer App</h1>

            <PostNavigation setPosts={setResponse} onClick={onClick}/>

            <div className="posts-container">
                {postLoading && <h5 style={{ fontSize: '4em',textAlign: 'center', color:'white'}}>Loading</h5>}
                {postError ? <h1>Data is not available! Try again later.</h1> : ((postResponse && postLoading ===false) && postResponse.map(post => <Post key={post.id} author={post.user.username} title={post.title} body={post.body} ownerId={post.userId} id={post.id} />))}
                
            </div>
        </section>
    )
}


export default Posts;