import { Title, Text, Container, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Title style={{ margin: 20 }}>Check-out</Title>

      <Container size={720} style={{ marginBottom: 20 }}>
        <Text size="lg">
          연령대와 성별, 그리고 날씨 정보 및 TPO 정보를 이용해서 코디를
          추천해주는 서비스입니다.
        </Text>
      </Container>

      <Container>
        <Link to="/signup">
          <Button variant="white" size="lg">
            Sign Up
          </Button>
        </Link>

        <Link to="/signin">
          <Button size="lg">Sign In</Button>
        </Link>
      </Container>
    </Container>
  );
}

export default LandingPage;
