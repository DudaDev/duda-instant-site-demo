import Duda from '../../Utilities/Duda'
import 'fontsource-roboto'
import Typography from '@material-ui/core/Typography'
const { FormControl, 
        TextField, 
        Button, 
        Select, 
        MenuItem,
        LinearProgress,
        Grid
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
    <Grid container>
      <Grid item xs={12}>
        <FormControl id="instantSite" action="#">
        
          <Typography variant='h4'>Simple Instant Site</Typography>
          <Typography variant='p'>Enter your business information below to create a site:</Typography>
          
          <Select value={""} onChange={''} displayEmpty>
            <MenuItem value="" name="templateId">
              <em>Pick a template:</em>
            </MenuItem>
            <MenuItem value={1013306}>Creative Portfolio</MenuItem>
            <MenuItem value={1008302}>Ice Cream Shop</MenuItem>
            <MenuItem value={1005052}>Soap & Suds</MenuItem>
            <MenuItem value={1002785}>My Bicycle Blog</MenuItem>
          </Select>

          <Typography variant='h6'>Business Details</Typography>
          <TextField variant="filled" name="business_name" label="Business Name"/>
          <TextField variant="filled" multiline rowsMax="4" rows="4" name="overview" label="Overview"/>
          <TextField variant="filled" multiline rowsMax="4" rows="4" name="aboutUs" label="About Us"/>
          <TextField variant="filled" multiline rowsMax="4" rows="4" name="services" label="Services"/>

          <Typography variant='h6'>Address</Typography>
          <TextField variant="filled" name="streetAddress" label="Street"/>
          <TextField variant="filled" name="city" label="City"/>
          <TextField variant="filled" name="region" label="Region"/>
          <TextField variant="filled" name="country" label="Country"/>
          <TextField variant="filled" name="postalCode" label="Postal Code"/>

          <Typography variant='h6'>Contact Information</Typography>
          <TextField variant="filled" name="phoneNumber" label="Phone Number" placeholder="(800) 867-5309"/>
          <TextField variant="filled" name="email" label="Email" placeholder="sales@company.site"/>

          <Typography variant='h6'>Content</Typography>
          <TextField variant="filled" name="businessImage" label="Background Image URL" placeholder="https://files.host/background.jpg"/>
          <TextField variant="filled" name="logoUrl" label="Logo Image URL" placeholder="https://files.host/files/logo.png"/>
          <TextField variant="filled" multiline rowsMax="4" rows='4' name="business_description" label="Description"/>

          <LinearProgress variant="determinate" value={50} />
          <Button onClick={''} variant="contained" color="primary">Create Site</Button>

        </FormControl>
      </Grid>
    </Grid>
  );
}

export default SimpleInstantSiteFlow;