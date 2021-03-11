import { Link, withRouter } from "react-router-dom";
import { Button, ButtonGroup } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';

function Navigation() {
  return (
    <>
        <Link to="/">
          <Button variant="contained" color="primary" style={{
            fontWeight: "bold"
          }} startIcon={<AppsIcon/>}>
            Home
          </Button>
        </Link>
        <ButtonGroup>
          <Link to="/manage">
            <Button variant="contained" color="default">
              Manage
            </Button>
          </Link>
        </ButtonGroup>

    </>
  );
}

export default withRouter(Navigation);