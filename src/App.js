import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {

  render() {
    return (
      <div>  
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders"  component={Orders} />
          <Route path="/auth"  component={Auth} />
          <Route path="/logout"  component={Logout} />
          <Route path="/checkout" component={Checkout} />
        </Layout>
      </div>
    );
  }
}

export default App;
