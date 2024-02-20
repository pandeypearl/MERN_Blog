import { useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
import { UserContext } from "../utils/UserContext";
import PostFooter from "../components/PostFooter";

export default function PostDetailPage() {
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();
    const [postInfo, setPostInfo] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
              response.json().then(postInfo => {
                setPostInfo(postInfo);
              })
            });
    }, []);

    if (!postInfo) return '';

    return (
      <>
          <div className='post-wrapper'>
          
          <h1>{postInfo.title}</h1>

          <div className='post-info'>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className='author'>Post by @{postInfo.author.username}</div>
          </div>
          {userInfo.id === postInfo.author._id && (
            <div className='edit'>
              <Link className='edit-btn' to={`/edit/${postInfo._id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
                Edit Post
              </Link>
            </div>
          )}

          <div className='cover-image'>
            <img src={`http://localhost:4000/${postInfo.cover}`} alt='Cover' />
          </div>

          <div className="post-content">
            <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
          </div>
            
          
        </div>
        <PostFooter />
      </>
        
    );
}