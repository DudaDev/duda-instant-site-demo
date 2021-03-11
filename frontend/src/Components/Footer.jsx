import { Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <Container style={{
      marginTop: '30px',
      position: 'fixed',
      bottom: 0,
      marginBottom: '10px'
    }}>
      <Typography>
        Powered by Duda's APIs. Developer documentation <a href='https://developer.duda.co/docs'>here</a>
      </Typography>
    </Container>
  );
}

export default Footer;