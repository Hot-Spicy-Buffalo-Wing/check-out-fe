import { Outlet } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Button } from '@mantine/core';

function Layout() {
  const { logout } = useUser();
  return (
    <div>
      <header
        style={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: '15px',
          marginRight: '20px',
        }}
      >
        <Button onClick={logout}>로그아웃</Button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
