import { useRef, useState } from "react";
import useFetch from "../Hooks/useFetch";
import { URLS } from "../Hooks/useUrl"
import Create from "./Create";

function PostNavigation(props) {

    const { loading, response: userResponse, error, abort } = useFetch('https://jsonplaceholder.typicode.com/users');
    const [searchList, setSearchList] = useState([]);
    const input = useRef(null);

    function onClick(url, e) {
        props.onClick(url);
    }

    function onChangeInput(e) {
        if (e.target.value) {

            let list = userResponse && userResponse.filter(user => {
                return (regX(e.target.value).test(user.name)
                    || regX(e.target.value).test(user.id)
                    || regX(e.target.value).test(user.username))
            });

            setSearchList(() => generateList(list));
        } else {
            setSearchList([]);
        }
    }

    function regX(params) {
        return new RegExp(params, 'gmi')
    }

    function generateList(users) {
        return (
            users.map(user =>
                <li className="user-item" key={user.name} id={user.id} onClick={(e) => onClick(URLS.getByUserId(user.id), e)}>
                    <span>{user.username}</span><span>({user.name})</span><span>id:({user.id})</span></li>));
    }

    const fullUserList = userResponse && generateList(userResponse);

    return (
        <nav className="posts-navigation">
            <div className="posts-navigation-filters">

                <h3>Get posts</h3>
                <input ref={input} onChange={onChangeInput} type="search" placeholder="Search by name/username/id" />
                <button onClick={()=>onClick(URLS.getAll())}>View all post</button>
                <button onClick={()=>onClick(URLS.getLast20())}>View last 20 post</button>
                <p>You can view a user's last 5 posts by selecting a user from the list on the right.</p>

            </div>
            <ul>
                {loading && <h3 style={{ textAlign: 'center' }}>Loading</h3>}
                {error && <h1>Data is not available! Try again later.</h1>}
                {loading === false && searchList.length === 0 ? (input.current?.value === '' ? fullUserList : <p>Query not match any user</p>) : searchList}
            </ul>
            <Create setPosts={props.setPosts}/>
        </nav>
    )

}


export default PostNavigation;