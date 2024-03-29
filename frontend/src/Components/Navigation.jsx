import { Link, withRouter } from "react-router-dom";
import { Button, Grid, Typography } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import 'fontsource-roboto'

function Navigation() {
  return (
    <>
      <Grid container style={{ marginTop: '20px', marginBottom:'20px' }}>
        <Grid item xs={8}>
          <Link to="/" style={{ float: 'left', marginRight: '20px' }}>
            <Button variant="contained" color="primary"><AppsIcon/></Button>
          </Link>
          <Link to="/" style={{ float: 'left', marginRight: '20px' }}>
            <Typography variant='h5' style={{ marginTop: '2px', fontWeight: 'bold' }}>Duda Instant Site Demos
          </Typography>
          </Link>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <Link to="/templates" style={{ float: 'right', width: '150px' }}>
            <Button variant="contained">Templates</Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default withRouter(Navigation);