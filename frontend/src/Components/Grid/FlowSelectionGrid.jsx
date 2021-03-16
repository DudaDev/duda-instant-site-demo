import { Container, Grid } from "@material-ui/core";
import FlowSelectionGridItem from "./FlowSelectionGridItem";
import 'fontsource-roboto'
import { Helmet } from 'react-helmet'

function FlowSelectionGrid() {
  return (
    <>
        <Helmet>
          <title>Duda Instant Site Demos</title>
        </Helmet>
        <Container style={{ marginTop: '40px', marginBottom:'40px' }}>
          <Grid container justify='flex-start' spacing={2}>
            <Grid item xs={4}>
              <FlowSelectionGridItem name='/simple'/>
            </Grid>
          </Grid>
        </Container>
    </>
  );
}

export default FlowSelectionGrid;