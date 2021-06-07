import { Container, Grid, Typography } from '@material-ui/core';
import Image from 'material-ui-image';

function TemplateItem(props) {

    const template = props.template;

    return (
        <>
            <Container style={{ marginTop: '40px', marginBottom:'40px' }}>
                <Grid item xs={4}>
                    <Image src={template.desktop_thumbnail_url} alt={`Preview of ${template.template_name}`} aspectRatio={0.8} style={{ boxShadow: '0px 0px 30px rgba(0,0,0,0.2)' }}/>
                    <Typography variant='h5' style={{ 
                            color: 'white'
                        }}>{template.template_name}</Typography>
                    <Typography>{template.template_name}</Typography>
                </Grid>
            </Container>
        </>
    );

}

export default TemplateItem;