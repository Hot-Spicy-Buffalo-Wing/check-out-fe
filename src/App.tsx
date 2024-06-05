import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';

import '@mantine/core/styles.layer.css';
import '@mantine/core/styles.css';
import UserProvider from './hooks/UserProvider';
import useUser from './hooks/useUser';
import { SWRConfig } from 'swr';
import api from './api';
import LookBookPage from './pages/LookBookPage';
import { MantineProvider } from '@mantine/core';
import PostListPage from './pages/PostListPage';
import Layout from './layouts/layout';
import PostCreatePage from './pages/PostCreatePage';
import PostDetailPage from './pages/PostDetailPage';

const Router = () => {
  const { user, loading } = useUser();
  if (loading) return null;
  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <Route element={<Layout />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/create" element={<PostCreatePage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/look-books" element={<LookBookPage />} />
            <Route path="*" element={<Navigate to="/main" />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => api.get(url).then((res) => res.data) }}
    >
      <MantineProvider>
        <UserProvider>
          <Router />
        </UserProvider>
      </MantineProvider>
    </SWRConfig>
  );
}

export default App;
