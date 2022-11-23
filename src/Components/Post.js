
import './Post.scss';

function Post(props) {
    

    return(
        <div className="post">
            <h3 className="post-title">{props.title}</h3>
            <p className="post-content">{props.body}</p>
            <p className="post-author">{props.author}</p>
        </div>
    )
}

export default Post;