import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SimpleInstantSiteFlow from './Components/Flows/SimpleInstantSiteFlow'
import Navigation from './Components/Navigation'
import FlowSelectionGrid from './Components/Grid/FlowSelectionGrid'
import ScrollToTop from './Utilities/ScrollToTop'
import Footer from './Components/Footer'

function App() {
  return (
    <>
      <Router>
          <ScrollToTop />
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => <FlowSelectionGrid />} />
            <Route path="/simple" exact component={() => <SimpleInstantSiteFlow />} />
          </Switch>
          <Footer />
        </Router>
    </>
  );
}

export default App;
