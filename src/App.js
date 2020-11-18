import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/booking">
            <Booking />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
