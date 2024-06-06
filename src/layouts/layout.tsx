import { Link, Outlet } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Box, Button } from '@mantine/core';

function Layout() {
  const { logout } = useUser();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '15px',
          marginRight: '20px',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '575px',
          }}
        >
          <Link to="/main">
            <Button style={{ backgroundColor: 'burlywood' }}>
              나의 메인 페이지
            </Button>
          </Link>
          <Link to="/look-books">
            <Button style={{ backgroundColor: 'purple' }}>
              내가 만든 LookBook list 보기
            </Button>
          </Link>
          <Link to="/posts">
            <Button style={{ backgroundColor: 'olive' }}>게시판 보기</Button>
          </Link>
          <Button onClick={logout}>로그아웃</Button>
        </Box>
      </header>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
