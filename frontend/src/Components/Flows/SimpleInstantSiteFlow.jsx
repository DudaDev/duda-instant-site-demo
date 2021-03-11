import Duda from '../../Utilities/Duda'
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles";
import 'fontsource-roboto'

const { FormControl, 
        TextField, 
        Button, 
        Select, 
        MenuItem,
        LinearProgress,
        Grid,
        Container
} = require('@material-ui/core/')
const { makeStyles, ThemeProvider } = require('@material-ui/core/styles')

const styles = {
  
};

function SimpleInstantSiteFlow() {
  // Duda.createSite('1026287')
  //   .then(response => {
  //     const siteName = response.siteName
  //     console.log(`Site created: ${siteName}`)
  //     Duda.deleteSite(siteName)
  //       .then(response => {
  //         console.log(`Site deleted. Message: ${response}`)
  //       })`
  //       .catch(error => {
  //         console.log(`Error deleting site!: ${error.message}`)
  //       })
  //   })
  //   .catch(error => {
  //     console.log(`Error creating site!: ${error.message}`)
  //   })
  return (
        <Container>
          <FormControl id="instantSite" action="#" style={{
                   marginTop: '30px',
                   marginBottom: '30px',
                   color: 'white'
                }}>
            <Grid container>

              <Grid item xs={5}>
                <Typography variant='h4'>Simple Instant Site</Typography>
                <Typography variant='body1'>Enter your business information below to create a site:</Typography>
              </Grid>
              <Grid item xs={7} style={{
                  paddingTop: '20px'
                }}>
                <Typography variant='body1'>Creating site...</Typography>
                <LinearProgress style={{
                  marginTop: '10px'
                }}/>
              </Grid>

              <Grid item xs={2} style={{
                   marginTop: '30px'
                }}>
                <Select value={""} onChange={''} displayEmpty>
                  <MenuItem value="" name="templateId">
                    <em>Pick a template:</em>
                  </MenuItem>
                  <MenuItem value={1013306} color="secondary">Creative Portfolio</MenuItem>
                  <MenuItem value={1008302} color="secondary">Ice Cream Shop</MenuItem>
                  <MenuItem value={1005052} color="secondary">Soap & Suds</MenuItem>
                  <MenuItem value={1002785} color="secondary">My Bicycle Blog</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={2} style={{
                   marginTop: '30px'
                }}>
                <Button onClick={''} variant="contained" color="default" style={{
                   marginLeft: '20px'
                }}>Auto-fill</Button>
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={2} style={{
                   marginTop: '30px'
                }}>
                <Button onClick={''} 
                        variant="contained" 
                        color="primary" 
                        disabled
                        style={{
                            float: 'right'
  
                        }}
                >Create Site</Button>
              </Grid>

              <Grid item xs={6} style={{
                paddingRight: '30px',
                marginBottom: '10px'
              }}>
                <Typography variant='h6' style={{
                   marginTop: '30px',
                   marginBottom: '10px'
                }}>Business Details</Typography>
                <TextField variant="filled" name="business_name" label="Business Name" style={{ width: '100%' }}/>
                <TextField variant="filled" multiline rowsMax="4" rows="4" name="overview" label="Overview" style={{ width: '100%' }}/>
                <TextField variant="filled" multiline rowsMax="4" rows="4" name="aboutUs" label="About Us" style={{ width: '100%' }}/>
                <TextField variant="filled" multiline rowsMax="4" rows="4" name="services" label="Services" style={{ width: '100%' }}/>
                <Typography variant='h6' style={{
                   marginTop: '30px',
                   marginBottom: '10px'
                }}>Contact Information</Typography>
                <TextField variant="filled" name="phoneNumber" label="Phone Number" placeholder="(800) 867-5309" style={{ width: '100%' }}/>
                <TextField variant="filled" name="email" label="Email" placeholder="sales@company.site" style={{ width: '100%' }}/>
              </Grid>

              <Grid item xs={6}>
                <Typography variant='h6' style={{
                   marginTop: '30px',
                   marginBottom: '10px'
                }}>Address</Typography>
                <TextField variant="filled" name="streetAddress" label="Street" style={{ width: '100%' }}/>
                <TextField variant="filled" name="city" label="City" style={{ width: '100%' }}/>
                <TextField variant="filled" name="region" label="Region" style={{ width: '100%' }}/>
                <TextField variant="filled" name="country" label="Country" style={{ width: '100%' }}/>
                <TextField variant="filled" name="postalCode" label="Postal Code" style={{ width: '100%' }}/>
                <Typography variant='h6' style={{
                   marginTop: '30px',
                   marginBottom: '10px'
                }}>Content</Typography>
                <TextField variant="filled" name="businessImage" label="Background Image URL" placeholder="https://files.host/background.jpg" style={{ width: '100%' }}/>
                <TextField variant="filled" name="logoUrl" label="Logo Image URL" placeholder="https://files.host/files/logo.png" style={{ width: '100%' }}/>
                <TextField variant="filled" multiline rowsMax="4" rows='4' name="business_description" label="Description" style={{ width: '100%' }}/>
              </Grid>

            </Grid>
          </FormControl>
        </Container>
  );
}

export default withStyles(styles)(SimpleInstantSiteFlow);