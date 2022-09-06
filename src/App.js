import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'upkit/dist/style.min.css';
import store from './app/store';
import Home from './pages/Home';
import { listen } from './app/listener';
import { getCart } from './api/cart';
import Register from './pages/Register/index';
import RegisterSuccess from './pages/RegisterSuccess/index';
import Login from './pages/Login';
import UserAccount from './pages/UserAccount';
import UserAddressAdd from './pages/UserAddressAdd';
import UserAddress from './pages/UserAddress';
import Checkout from './pages/Checkout';
import Invoice from './pages/Invoice';
import UserOrders from './pages/UserOrders';


function App() {
  React.useEffect(() => {
    listen();
    getCart();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/register/berhasil">
            <RegisterSuccess />
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/account">
            <UserAccount />
          </Route>
          <Route path="/alamat-pengiriman/tambah">
            <UserAddressAdd />
          </Route>
          <Route path="/alamat-pengiriman">
            <UserAddress />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/invoice/:order_id">
            <Invoice />
          </Route>
          <Route path="/pesanan">
            <UserOrders />
          </Route>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;