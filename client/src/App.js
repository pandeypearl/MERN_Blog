import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './utils/UserContext';
import CreatePost from './pages/CreatePost';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/new-post' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostDetailPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
