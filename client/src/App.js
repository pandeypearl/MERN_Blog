import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import { UserContextProvider } from './utils/UserContext';
import CreatePost from './pages/CreatePost';
import PostDetailPage from './pages/PostDetailPage';
import EditPostPage from './pages/EditPostPage';
import { LightDarkModeProvider } from './utils/LightDarkModeContext';

function App() {
  return (
    <UserContextProvider>
      <LightDarkModeProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/new-post' element={<CreatePost />} />
            <Route path='/post/:id' element={<PostDetailPage />}>
              <Route index element={<PostDetailPage />} />
              <Route path='share/:shareId' element={<PostDetailPage />} />
            </Route>
            <Route path='/edit/:id' element={<EditPostPage />} />
            
          </Route>
          
        </Routes>
      </LightDarkModeProvider>
    </UserContextProvider>
  );
}

export default App;
