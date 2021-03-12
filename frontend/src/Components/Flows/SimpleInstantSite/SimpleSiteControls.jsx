import 'fontsource-roboto'
const { Grid, 
    Button,
ButtonGroup } = require("@material-ui/core")


function SimpleSiteControls(props) {
    if (props.updating) {
        return (
            <Grid container>
                <Grid item xs={12} style={{ marginTop: '30px' }}>
                    <ButtonGroup style={{ float: 'right' }}>
                        <Button variant="contained" color="default">Edit Site</Button>
                        <Button variant="contained" color="secondary">Delete Site</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <Grid container>
                <Grid item xs={8}></Grid>
                <Grid item xs={4} style={{ marginTop: '30px' }}>
                    <Button onClick={props.handleSubmit} variant="contained" color="primary" disabled={!props.completed} style={{ float: 'right' }}>Create Site</Button>
                </Grid>
            </Grid>
        )
    }

}

export default SimpleSiteControls;