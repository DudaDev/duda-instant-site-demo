import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SimpleInstantSiteFlow from './Components/Flows/SimpleInstantSiteFlow'
import Navigation from './Components/Navigation'
import Manager from './Components/Manager'
import FlowSelectionGrid from './Components/Grid/FlowSelectionGrid'
import ScrollToTop from './Utilities/ScrollToTop'
import Footer from './Components/Footer'
import './App.css'
import { ThemeProvider, 
        createMuiTheme } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import { Helmet } from 'react-helmet'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Container>
            <ScrollToTop />
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
      main: '#000000'
    }
  }
})

export default App;
