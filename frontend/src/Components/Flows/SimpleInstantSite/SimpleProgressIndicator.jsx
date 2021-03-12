import 'fontsource-roboto'
const { Typography,
    LinearProgress } = require("@material-ui/core")


function SimpleProgressIndicator(props) {
    if (props.updating) {
        return (
            <>
                <Typography variant='body1'>{props.status}</Typography>
                <LinearProgress value={props.progress} style={{ marginTop: '10px' }}/>
            </>
        )
    } else { return <></> }

}

export default SimpleProgressIndicator;