import { Container, Grid } from "@material-ui/core";
import FlowSelectionGridItem from "./FlowSelectionGridItem";

function FlowSelectionGrid() {
  return (
    <>
        <Container>
          <Grid container spacing={2} justify="center">
            <Grid item xs={4}>
              <FlowSelectionGridItem name='/simple'/>
            </Grid>
            <Grid item xs={4}>
              <FlowSelectionGridItem name='/simple'/>
            </Grid>
            <Grid item xs={4}>
              <FlowSelectionGridItem name='/simple'/>
            </Grid>
            <Grid item xs={4}>
              <FlowSelectionGridItem name='/simple'/>
            </Grid>
            <Grid item xs={4}>
              <FlowSelectionGridItem name='/simple'/>
            </Grid>
            <Grid item xs={4}>
              <FlowSelectionGridItem name='/simple'/>
            </Grid>
          </Grid>
        </Container>
    </>
  );
}

export default FlowSelectionGrid;