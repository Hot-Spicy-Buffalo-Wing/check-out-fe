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

const Router = () => {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            <Route path="/main" element={<MainPage />} />
            <Route path="*" element={<Navigate to="/main" />} />
          </>
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
      <UserProvider>
        <Router />
      </UserProvider>
    </SWRConfig>
  );
}

export default App;
