import {formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function Post({_id, title, summary, cover, content, createdAt, author, viewCount, sharableLink}) {
    return (
      <Link className='post-link' to={`/post/${_id}`}>
        <div className='post'>
          <div className='image'>
            <img src={'http://localhost:4000/'+cover} alt='Post Cover' />
          </div>
          <div className='content'>
            <div>
              <h2>{title}</h2>
              <p className='info'>
                <time>{formatISO9075(new Date(createdAt))}</time>
                <span className='author'>@{author.username}</span>
              </p>
              <p className='description'>{summary}</p>
            </div>
            <span className='post-views'><FontAwesomeIcon icon={faEye} color='#9D68FF' /> {viewCount}</span>
          </div>
        </div>
      </Link>
    ) 
}