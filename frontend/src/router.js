import Navigation from './components/Navigation/Navigation';
import Logout from './components/Logout/Logout';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import CryptoCurrencies from "./pages/Cryptocurrencies";
import Profile from './pages/Profile';
import CryptoInfo from './components/Cryptos/CryptoInfo';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function router() {
  return (
      <div className={"router"}>
          <Router>
            <Navigation />
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/settings" component={Settings} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/logout" component={Logout} />
                  <Route exact path="/coins" component={CryptoCurrencies} />
                  <Route path="/coins/:cmid" component={CryptoInfo} />
                  <Route exact path="/profile/1" component={Profile} />
              </Switch>
          <Footer />
          </Router>
      </div>
  );
}

export default router;