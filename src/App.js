import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'upkit/dist/style.min.css';
import GuardRoute from './components/GuardRoute';
import GuestOnlyRoute from './components/GuestOnlyRoute';
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
import Logout from './pages/Logout';


function App() {
  React.useEffect(() => {
    listen();
    getCart();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <GuestOnlyRoute path="/register/berhasil">
            <RegisterSuccess />
          </GuestOnlyRoute>
          <GuestOnlyRoute path="/register" component={Register} />
          <GuestOnlyRoute path="/login">
            <Login />
          </GuestOnlyRoute>
          <GuardRoute path="/account">
            <UserAccount />
          </GuardRoute>
          <GuardRoute path="/alamat-pengiriman/tambah">
            <UserAddressAdd />
          </GuardRoute>
          <GuardRoute path="/alamat-pengiriman">
            <UserAddress />
          </GuardRoute>
          <GuardRoute path="/checkout">
            <Checkout />
          </GuardRoute>
          <GuardRoute path="/invoice/:order_id">
            <Invoice />
          </GuardRoute>
          <GuardRoute path="/pesanan">
            <UserOrders />
          </GuardRoute>
          <GuardRoute path="/logout">
            <Logout />
          </GuardRoute>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;