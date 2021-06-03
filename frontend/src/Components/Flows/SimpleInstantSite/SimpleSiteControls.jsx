import 'fontsource-roboto'
import Duda from '../../../Utilities/Duda'
import React, {  useState } from 'react'
const { Grid, 
      Button,
 ButtonGroup, 
 CircularProgress} = require("@material-ui/core")


function SimpleSiteControls(props) {
    const [editorLoading, setEditorLoading] = useState(false)
    const [siteDeleting, setSiteDeleting] = useState(false)

    function handleEditClick() {
        setEditorLoading(true)
        Duda.getSSOLink(props.userId, props.siteName, props.session)
            .then(response => {
                window.open(response.url)
                setEditorLoading(false)
            })
    }

    if (props.siteCreated) {
        return (
            <Grid container>
                <Grid item xs={12} style={{ marginTop: '30px' }}>
                    <ButtonGroup style={{ float: 'right' }}>
                        <Button variant="contained" color="default" onClick={handleEditClick}>{editorLoading ? <CircularProgress style={{width: '1em', height: '1em'}}/> : 'Edit Site'}</Button>
                        <Button variant="contained" color="secondary"onClick={props.handleDelete}>{siteDeleting ? <CircularProgress style={{width: '1em', height: '1em'}}/> : 'Delete Site'}</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <Grid container>
                <Grid item xs={8}></Grid>
                <Grid item xs={4} style={{ marginTop: '30px' }}>
                    <Button onClick={props.handleSubmit} variant="contained" color="primary" disabled={(!props.formCompleted) || (props.updating && props.formCompleted)} style={{ float: 'right' }}>Create Site</Button>
                </Grid>
            </Grid>
        )
    }

}

export default SimpleSiteControls;