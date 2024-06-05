import cx from "clsx";
import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  MantineProvider,
} from "@mantine/core";
import { Link } from "react-router-dom";
// import classes from "./LandingPage.module.scss";

const theme = {
  spacing: { xs: 8, sm: 12, md: 16, lg: 24, xl: 32 },
  component: {
    Button: {
      defaultProps: {
        color: "blue",
        variant: "filled",
      },
    },
  },
};

function LandingPage() {
  return (
    <MantineProvider theme={theme}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />
      <Title>
        Automated AI code reviews for{" "}
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
