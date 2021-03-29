import SimpleInstantSiteFlow from './Components/Flows/SimpleInstantSite/SimpleInstantSiteFlow'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles"
import FlowSelectionGrid from './Components/Grid/FlowSelectionGrid'
import ScrollToTop from './Utilities/ScrollToTop'
import Navigation from './Components/Navigation'
import { createBrowserHistory } from 'history'
import { Container } from "@material-ui/core"
import Manager from './Components/Manager'
import Footer from './Components/Footer'
import { Helmet } from 'react-helmet'
import { withAuthenticator } from '@aws-amplify/ui-react';
import './App.css'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Helmet>
            <title>Duda Instant Site Demos</title>
        </Helmet>
        <Router>
          <Container>
            <ScrollToTop history={createBrowserHistory()}/>
            <Navigation />
            <Switch>
              <Route path="/" exact component={() => <FlowSelectionGrid />} />
              <Route path="/simple" exact component={() => <SimpleInstantSiteFlow />} />
              <Route path="/manage" exact component={() => <Manager />} />
            </Switch>
            <Footer />
          </Container>
        </Router>
      </ThemeProvider>
    </>
  );
}

const theme = createMuiTheme({
  typography: {
    h1: {
      color: 'white'
    },
    h2: {
      color: 'white'
    },
    h3: {
      color: 'white'
    },
    h4: {
      color: 'white',
      marginTop: '10px'
    },
    h5: {
      color: 'white'
    },
    h6: {
      color: 'white'
    },
    subtitle1: {
      color: 'white'
    },
    subtitle2: {
      color: 'white'
    },
    body1: {
      color: 'white'
    },
    body2: {
      color: 'white'
    },
    button: {
      color: 'white'
    },
    caption: {
      color: 'white'
    },
    overline: {
      color: 'white'
    }
  },
  palette: {
    primary: {
      main: '#f56033'
    },
    secondary: {
      main: '#FF0000'
    }
  }
})

export default withAuthenticator(App);
