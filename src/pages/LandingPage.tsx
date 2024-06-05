import { Title, Text, Container, Button, MantineProvider } from '@mantine/core';
import { Link } from 'react-router-dom';
// import classes from "./LandingPage.module.scss";

const theme = {
  spacing: { xs: '8px', sm: '12px', md: '16px', lg: '24px', xl: '32px' },
  component: {
    Button: {
      defaultProps: {
        color: 'blue',
        variant: 'filled',
      },
    },
  },
};

function LandingPage() {
  return (
    <MantineProvider theme={theme}>
      <Title>
        Automated AI code reviews for{' '}
        <Text component="span" inherit>
          any stack
        </Text>
      </Title>

      <Container size={640}>
        <Text size="lg">
          Build more reliable software with AI companion. AI is also trained to
          detect lazy developers who do nothing and just complain on Twitter.
        </Text>
      </Container>

      <Button variant="white" size="lg">
        <Link to="/signup">Sign Up</Link>
      </Button>
      <Button size="lg">
        <Link to="/signin">Sign In</Link>
      </Button>
    </MantineProvider>
  );
}

export default LandingPage;
