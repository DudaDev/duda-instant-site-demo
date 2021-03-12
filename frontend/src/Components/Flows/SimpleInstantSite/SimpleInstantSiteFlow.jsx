import SimpleProgressIndicator from './SimpleProgressIndicator'
import SimpleTemplateSelector from './SimpleTemplateSelector'
import SimpleSiteControls from './SimpleSiteControls'
import Typography from '@material-ui/core/Typography'
import Duda from '../../../Utilities/Duda'
import React, {  useState } from 'react'
import { Helmet } from 'react-helmet'
import 'fontsource-roboto'

const { FormControl, 
        TextField, 
        Button,
        Grid,
        Container
} = require('@material-ui/core/')

function SimpleInstantSiteFlow() {
  
  const [siteCreated, setSiteCreated] = useState(false)
  const [completed, setCompleted] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [errored, setErrored] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const [form, setForm] = useState({
    "templateId": '0',
    "phoneNumber": '',
    "emailAddress": '',
    "businessName": '',
    "streetAddress": '',
    "postalCode": '',
    "region": '',
    "city": '',
    "country": '',
    "logoUrl": '',
    "overview": '',
    "services": '',
    "aboutUs": '',
    "backgroundUrl": ''
  })

  function handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    setForm({ ...form, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault();

    const contentLibrary = {
        "location_data":{
          "phones":[
            {
              "phoneNumber": form.phoneNumber,
              "label":"Business Phone"
            }
          ],
          "emails": [{
              "emailAddress": form.emailAddress,
              "label":"Business Email"
          }],
          "label": form.businessName,
          "address": {
            "streetAddress": form.streetAddress,
            "postalCode": form.postalCode,
            "region": form.region,
            "city": form.city,
            "country": form.country
          },
          "logo_url": form.logoUrl,
          "site_texts":{
            "overview": form.overview,
            "services": form.services,
            "about_us": form.aboutUs,
            "custom":[{
                "label":"Business Description",
                "text": form.businessDescription
            }]
          },
          "business_data": {
            "name":"Business Logo",
            "logo_url": form.logoUrl
          },
          "site_images":[{
            "label":"Background",
            "url": form.backgroundUrl,
            "alt":"Site Background"
          }]
      }
    }

    const userId = 'test-user-123'

    Duda.createSite(form.templateId)
      .then(response => {
        const siteName = response.siteName
        setUpdating(true)
        setStatus(`Site created: ${siteName}`)
        setProgress(20)
        Duda.uploadContent(siteName, contentLibrary)
          .then(response => {
            setStatus(response.status)
            setProgress(40)
            Duda.createUser(userId)
              .then(response => {
                setStatus(response.status)
                setProgress(60)
                Duda.grantUserAccess(userId, siteName)
                  .then(response => {
                    setStatus(response.status)
                    setProgress(80)
                    Duda.grantUserAccess(userId, siteName)
                      .then(response => {
                        setStatus(response.status)
                        setProgress(100)
                        setSiteCreated(true)
                        setUpdating(false)
                      })
                      .catch(error => {
                        setErrored(true)
                        setStatus(error)
                      })
                  })
                  .catch(error => {
                    setErrored(true)
                    setStatus(error)
                  })
              })
              .catch(error => {
                setErrored(true)
                setStatus(error)
              })
          })
          .catch(error => {
            setErrored(true)
            setStatus(error)
          })
      })
      .catch(error => {
        setErrored(true)
        setStatus(error)
      })

  }

  function autofill() {
    console.log("autofilling")
    setForm({
      "templateId": '1008302',
      "phoneNumber": '555-867-5309',
      "emailAddress": 'sales@mybiz.com',
      "businessName": 'Business & Co.',
      "streetAddress": '123 Main St.',
      "postalCode": '94107',
      "region": 'California',
      "city": 'San Francisco',
      "country": 'US',
      "logoUrl": 'ttps://irt-cdn.multiscreensite.com/7536fe2010ed4f7ea68e21d0cb868e01/dms3rep/multi/ice_cream_logo_b_w-18-300x300.svg',
      "overview": 'Oh, Duda? Duda is a variation of "Dude", who just happens to be the main character in one of our favorite movies of all time: The Big Lebowski. You should watch it some time. Look out for that ferret!',
      "services": 'Responsive Website Builder',
      "aboutUs": 'Duda is a leading website builder for web professionals and agencies of all sizes. Our website builder enables you to build amazing, feature-rich websites that are perfectly suited to desktop, tablet and mobile. Our mobile builder enables you to build mobile-only sites from scratch, or based on an existing desktop site or Facebook business page. Duda allows professionals and agencies to build high-converting, personalized websites at scale. Duda optimizes each and every site for Google PageSpeed.',
      "backgroundUrl": 'https://irt-cdn.multiscreensite.com/7536fe2010ed4f7ea68e21d0cb868e01/dms3rep/multi/sign_icecream_shop-1000x1108.jpg'
    }) 
  }

  return (
        <Container>
          <Helmet>
            <title>Simple Instant Flow</title>
          </Helmet>
          <FormControl style={{ marginBottom: '30px', color: 'white' }}>

            <Grid container>

              <Grid item xs={6}>
                <Typography variant='h4'>Simple Instant Site</Typography>
                <Typography variant='body1'>Enter your business information below to create a site:</Typography>
              </Grid>

              <Grid item xs={6} style={{ paddingTop: '20px' }}>
                <SimpleProgressIndicator 
                    completed={completed} 
                    errored={errored} 
                    updating={updating} 
                    status={status} 
                    progress={progress} 
                    handleChange={handleChange}/>
              </Grid>

              <Grid item xs={2} style={{ marginTop: '30px' }}>
                <SimpleTemplateSelector handleChange={handleChange}/>
              </Grid>
              
              <Grid item xs={2} style={{ marginTop: '30px' }}>
                <Button 
                    onClick={autofill} 
                    variant="contained" 
                    color="default" 
                    style={{ marginLeft: '20px' }}
                    >Auto-fill</Button>
              </Grid>

              <Grid item xs={8}>
                <SimpleSiteControls 
                    updating={updating} 
                    siteCreated={siteCreated} 
                    completed={completed}
                    handleSubmit={handleSubmit}/>
              </Grid>

              <Grid item xs={6} style={{ paddingRight: '30px', marginBottom: '10px' }}>
                <Typography variant='h6' style={{ marginTop: '30px', marginBottom: '10px' }}>Business Details</Typography>
                <TextField onChange={handleChange} variant="filled" name="businessName" label="Business Name" style={{ width: '100%' }}/>
                <TextField onChange={handleChange} variant="filled" multiline rowsMax="4" rows="4" name="overview" label="Overview" style={{ width: '100%' }}/>
                <TextField onChange={handleChange} variant="filled" multiline rowsMax="4" rows="4" name="aboutUs" label="About Us" style={{ width: '100%' }}/>
                <TextField onChange={handleChange} variant="filled" multiline rowsMax="4" rows="4" name="services" label="Services" style={{ width: '100%' }}/>
                <Typography variant='h6' style={{ marginTop: '30px', marginBottom: '10px' }}>Contact Information</Typography>
                <TextField onChange={handleChange} variant="filled" name="phoneNumber" label="Phone Number" placeholder="(800) 867-5309" style={{ width: '100%' }}/>
                <TextField onChange={handleChange} variant="filled" name="email" label="Email" placeholder="sales@company.site" style={{ width: '100%' }}/>
              </Grid>

              <Grid item xs={6}>
                <Typography variant='h6' style={{ marginTop: '30px', marginBottom: '10px' }}>Address</Typography>
                <TextField onChange={handleChange} variant="filled" name="streetAddress" label="Street" style={{ width: '100%' }}/>
                <TextField onChange={handleChange} variant="filled" name="city" label="City" style={{ width: '100%' }}/>
                <TextField onChange={handleChange} variant="filled" name="region" label="Region" style={{ width: '100%' }}/>
                <TextField onChange={handleChange} variant="filled" name="country" label="Country" style={{ width: '100%' }}/>
                <TextField onChange={handleChange} variant="filled" name="postalCode" label="Postal Code" style={{ width: '100%' }}/>
                <Typography variant='h6' style={{ marginTop: '30px', marginBottom: '10px' }}>Content</Typography>
                <TextField onChange={handleChange} variant="filled" name="backgroundUrl" label="Background Image URL" placeholder="https://files.host/background.jpg" style={{ width: '100%' }}/>
                <TextField onChange={handleChange} variant="filled" name="logoUrl" label="Logo Image URL" placeholder="https://files.host/files/logo.png" style={{ width: '100%' }}/>
                <TextField onChange={handleChange} variant="filled" multiline rowsMax="4" rows='4' name="businessDescription" label="Description" style={{ width: '100%' }}/>
              </Grid>

            </Grid>
          </FormControl>
        </Container>
  );
}

export default SimpleInstantSiteFlow;