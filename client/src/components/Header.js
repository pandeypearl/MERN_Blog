import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext)

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username

  return (
    <header>
      <div>
        <Link to='/' className='logo'>PrettyTech</Link>
      </div>
      
      
      <nav>
      {username && (
        <>
          <Link to='/about' className='about-link'>About</Link>
          <Link to='/new-post'>New Post</Link>
          <Link to='/register'>Register</Link>
          <a href='' onClick={logout}>Logout</a>
          <span className='user'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
            </svg>
            <span>@{username}</span>
          </span>
        </>
      )}
      {!username && (
        <>
          <Link to='/about' className='about-link'>About</Link>
          <Link to='/login'>Login</Link>
        </>
      )}
      </nav>
    </header>
  )
}