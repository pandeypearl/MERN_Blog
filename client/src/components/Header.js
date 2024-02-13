import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUsername(userInfo.username);
      })
    })
  }, []);
    return (
      <header>
        <Link to='/' className='logo'>Pretty's Blog</Link>
        
        <nav>
        {username && (
          <>
            <Link to='/post'>Post</Link>
            <a href=''>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
        </nav>
      </header>
  )
}