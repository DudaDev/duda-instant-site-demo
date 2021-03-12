import { Container, Grid } from "@material-ui/core";
import FlowSelectionGridItem from "./FlowSelectionGridItem";
import { Helmet } from 'react-helmet'

function FlowSelectionGrid() {
  return (
    <>
        <Helmet>
          <title>Duda Instant Site Demos</title>
        </Helmet>
        <Container style={{
          marginTop: '40px',
          marginBottom:'40px'
        }}>
          <Grid container justify='left' spacing={2} justify="center">
            <Grid item xs={4}>
              <FlowSelectionGridItem name='/simple'/>
            </Grid>
          </Grid>
        </Container>
    </>
  );
}

export default FlowSelectionGrid;