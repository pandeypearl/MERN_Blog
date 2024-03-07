import { useContext, useEffect, useState, useRef } from "react";
import { Link, useParams, useLocation } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
import { UserContext } from "../utils/UserContext";
// import PostFooter from "../components/PostFooter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCopy, faCheck, faMessage, faMugSaucer } from '@fortawesome/free-solid-svg-icons';
import EmailLink from "../components/EmailLink";

export default function PostDetailPage() {
  const {userInfo} = useContext(UserContext);
  const {id, shareId} = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const location = useLocation();
  // const [shareableLink, setShareableLink] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Fetching post details including view count
    const fetchPostDetails = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]; // Get the JWT token from cookies
        console.log('Token:', token);
        const response = await fetch(`http://localhost:4000/post/${shareId ? `${id}/share/${shareId}` : id}`);
        const postData = await response.json();
        setPostInfo(postData);

        // Updating view count
        await fetch(`http://localhost:4000/post/${id}/updateViewCount`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({}),
        });

      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [id, shareId, location]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postInfo.sharableLink)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 5000);
      })
      .catch((err) => console.error('Failed to copy:', err));
  };

  if (!postInfo) return '';

    return (
      <>
        <div className='post-wrapper'>
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
          
          <h1>{postInfo.title}</h1>

          <div className='post-info'>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className='author'>@{postInfo.author.username}</div>
            
          </div>
          

          <div className='cover-image'>
            <img src={`http://localhost:4000/${postInfo.cover}`} alt='Cover' />
          </div>

          <div className="post-content">
            <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
          </div>

          <div className='post-interaction'>
            <div className='view-count'><small><FontAwesomeIcon icon={faEye} /> {postInfo.viewCount}</small></div>
            <div className='post-btns'> 
              {/* Display shareable link if available */}
              {postInfo.sharableLink && (
                <div className="shareable-link">
                  <div className='shareable-link-container'>
                    <input type="text" value={postInfo.sharableLink} readOnly ref={inputRef} />
                    <button onClick={copyToClipboard} className='copy-link-btn'>
                      {copySuccess ? 
                        (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faCopy} />
                        )
                      }
                    </button>
                  </div>
                </div>
              )}
              <div className='post-email post-int-btn'>
                <EmailLink
                  emailAddress='blog@prettypandey.tech' 
                  subject='Blog Post: Title of Blog Post Here'
                  body='Please do not forget to reference the title of the blog post in the subject.'
                  buttonText={<FontAwesomeIcon icon={faMessage} />}
                />
              </div>
              <div className='post-int-btn'>
                <a href='https://www.buymeacoffee.com/prettypandey' target='_blank' rel="noopener noreferrer" > 
                  <FontAwesomeIcon icon={faMugSaucer} />
                </a>
              </div>
              
            </div>
          </div>
            
          
        </div>
        {/* <PostFooter /> */}
      </>
        
    );
}