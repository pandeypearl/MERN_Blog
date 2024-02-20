import {formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';

export default function Post({_id, title, summary, cover, content, createdAt, author, viewCount}) {
    return (
      <Link className='post-link' to={`/post/${_id}`}>
        <div className='post'>
          <div className='image'>
            <img src={'http://localhost:4000/'+cover} alt='Post Cover' />
          </div>
          <div className='content'>
            <p className='info'>
              <a href='' className='author'>@{author.username}</a>
              <time>{formatISO9075(new Date(createdAt))}</time>
            </p>
            <h2>{title}</h2>
            <p className='description'>{summary}</p>
          </div>
        </div>
      </Link>
    ) 
}