import { Link, withRouter } from "react-router-dom";

function Navigation() {
  return (
    <>
        <Link to="/">
          Flow Picker
        </Link>
        <Link to="/simple">
          Simple
        </Link>

    </>
  );
}

export default withRouter(Navigation);