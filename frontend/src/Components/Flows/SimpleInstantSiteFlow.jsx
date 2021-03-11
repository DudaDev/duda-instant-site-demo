import Duda from '../../Utilities/Duda'
import 'fontsource-roboto'
import Typography from '@material-ui/core/Typography'
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

function SimpleInstantSiteFlow() {
  // Duda.createSite('1026287')
  //   .then(response => {
  //     const siteName = response.siteName
  //     console.log(`Site created: ${siteName}`)
  //     Duda.deleteSite(siteName)
  //       .then(response => {
  //         console.log(`Site deleted. Message: ${response}`)
  //       })
  //       .catch(error => {
  //         console.log(`Error deleting site!: ${error.message}`)
  //       })
  //   })
  //   .catch(error => {
  //     console.log(`Error creating site!: ${error.message}`)
  //   })
  return (
        <Container>
          <FormControl id="instantSite" action="#">
            <Grid container>

              <Grid item xs={8}>
                <Typography variant='h4'>Simple Instant Site</Typography>
                <Typography variant='p'>Enter your business information below to create a site:</Typography>
              </Grid>
              
              <Grid item xs={4}>
                <LinearProgress variant="determinate" value={50} />
                <Button onClick={''} variant="contained" color="primary">Create Site</Button>
              </Grid>

              <Grid item xs={12}>
                <Select value={""} onChange={''} displayEmpty>
                  <MenuItem value="" name="templateId">
                    <em>Pick a template:</em>
                  </MenuItem>
                  <MenuItem value={1013306}>Creative Portfolio</MenuItem>
                  <MenuItem value={1008302}>Ice Cream Shop</MenuItem>
                  <MenuItem value={1005052}>Soap & Suds</MenuItem>
                  <MenuItem value={1002785}>My Bicycle Blog</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={6}>
                <Typography variant='h6'>Business Details</Typography>
                <TextField variant="filled" name="business_name" label="Business Name" style={{ width: '100%' }}/>
                <TextField variant="filled" multiline rowsMax="4" rows="4" name="overview" label="Overview" style={{ width: '100%' }}/>
                <TextField variant="filled" multiline rowsMax="4" rows="4" name="aboutUs" label="About Us" style={{ width: '100%' }}/>
                <TextField variant="filled" multiline rowsMax="4" rows="4" name="services" label="Services" style={{ width: '100%' }}/>
                <Typography variant='h6'>Contact Information</Typography>
                <TextField variant="filled" name="phoneNumber" label="Phone Number" placeholder="(800) 867-5309" style={{ width: '100%' }}/>
                <TextField variant="filled" name="email" label="Email" placeholder="sales@company.site" style={{ width: '100%' }}/>
              </Grid>

              <Grid item xs={6}>
                <Typography variant='h6'>Address</Typography>
                <TextField variant="filled" name="streetAddress" label="Street" style={{ width: '100%' }}/>
                <TextField variant="filled" name="city" label="City" style={{ width: '100%' }}/>
                <TextField variant="filled" name="region" label="Region" style={{ width: '100%' }}/>
                <TextField variant="filled" name="country" label="Country" style={{ width: '100%' }}/>
                <TextField variant="filled" name="postalCode" label="Postal Code" style={{ width: '100%' }}/>
                <Typography variant='h6'>Content</Typography>
                <TextField variant="filled" name="businessImage" label="Background Image URL" placeholder="https://files.host/background.jpg" style={{ width: '100%' }}/>
                <TextField variant="filled" name="logoUrl" label="Logo Image URL" placeholder="https://files.host/files/logo.png" style={{ width: '100%' }}/>
                <TextField variant="filled" multiline rowsMax="4" rows='4' name="business_description" label="Description" style={{ width: '100%' }}/>
              </Grid>

            </Grid>
          </FormControl>
        </Container>
  );
}

export default SimpleInstantSiteFlow;