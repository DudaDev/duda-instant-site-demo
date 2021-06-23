import { Button, ButtonGroup, Container, Grid, Typography } from '@material-ui/core';
import Image from 'material-ui-image';

function TemplateItem(props) {

    const template = props.template;

    return (
        <>
            <Image src={template.desktop_thumbnail_url} alt={`Preview of ${template.template_name}`} aspectRatio={0.8} style={{ boxShadow: '0px 0px 30px rgba(0,0,0,0.2)' }}/>
            <Typography variant='h5' style={{ 
                    color: 'white',
                    margin: '10px 0px'
                }}>{template.template_name}</Typography>
            <Grid container style={{
                    marginBottom: '20px'
                }} justify="center" alignItems="center">
                <Grid xs={6}>
                    <Typography>Pages: {template.template_properties.page_count}</Typography>
                    <Typography>Blog: {template.template_properties.has_blog ? "Yes" : "No"}</Typography>
                </Grid>
                <Grid xs={6}>
                    <Typography>Store: {template.template_properties.has_store ? "Yes" : "No"}</Typography>
                    <Typography>ID: {template.template_id}</Typography>
                </Grid>
                <Grid xs={12}>
                    <ButtonGroup style={{ 
                        float: 'right', 
                        marginTop: '10px'
                    }}>
                        <Button variant="contained" color="default" onClick={() => { window.open(template.preview_url) }}>Preview</Button>
                        <Button variant="contained" color="primary">Build...</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </>
    );

}

export default TemplateItem;