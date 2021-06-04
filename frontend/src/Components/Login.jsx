import Duda from '../../Utilities/Duda'
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import { Helmet } from 'react-helmet'
import 'fontsource-roboto'

const { FormControl, 
        TextField, 
        Button, 
        LinearProgress,
        Grid,
        Container
} = require('@material-ui/core/')
const { makeStyles, ThemeProvider } = require('@material-ui/core/styles')

const styles = {
  
};

function Login() {

  return (
        <Container>
          <Helmet>
            <title>Login</title>
          </Helmet>
          <FormControl id="login" action="#" style={{ marginBottom: '30px', color: 'white' }}>
            <Grid container>

            </Grid>
          </FormControl>
        </Container>
  );
}

export default withStyles(styles)(Login);