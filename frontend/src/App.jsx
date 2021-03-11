import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SimpleInstantSiteFlow from './Components/Flows/SimpleInstantSiteFlow'
import Navigation from './Components/Navigation'
import FlowSelectionGrid from './Components/Grid/FlowSelectionGrid'
import ScrollToTop from './Utilities/ScrollToTop'
import Footer from './Components/Footer'
import './App.css'
import { ThemeProvider, 
        createMuiTheme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

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
            </Switch>
            <Footer />
          </Container>
        </Router>
      </ThemeProvider>
    </>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f56033'
    }
  }
})

export default App;
