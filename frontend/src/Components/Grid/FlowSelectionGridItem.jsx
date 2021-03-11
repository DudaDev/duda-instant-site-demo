import { Typography } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import Image from 'material-ui-image';

function FlowSelectionGridItem() {
    return (
        <>
            <Link to='/simple'>
                <Image src='/simplePreview.png' alt='Preview of Simple Flow' aspectRatio={1.25}/>
                <Typography variant="h6">Simple Instant Site</Typography>
            </Link>
        </>
    );
  }
  
  export default FlowSelectionGridItem;