import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {formatISO9075} from 'date-fns';

export default function PostDetailPage() {
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
        <div className='post-wrapper'>
        
          <h1>{postInfo.title}</h1>

          <div className='post-info'>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className='author'>Post by @{postInfo.author.username}</div>
          </div>

          <div className='cover-image'>
            <img src={`http://localhost:4000/${postInfo.cover}`} alt='Cover' />
          </div>

          <div className="post-content">
            <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
          </div>
            
          
        </div>
    );
}