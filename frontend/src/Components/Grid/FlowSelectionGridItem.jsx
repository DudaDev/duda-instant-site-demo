import { Typography } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";

function FlowSelectionGridItem() {
    return (
        <>
            <Link to='/simple'>
                <img src='/simplePreview.png' alt='Preview of Simple Flow' style={{width: '100%'}}/>
                <Typography variant="h6">Simple Instant Site</Typography>
            </Link>
        </>
    );
  }
  
  export default FlowSelectionGridItem;