import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'upkit/dist/style.min.css';
import store from './app/store';
import Home from './pages/Home';
import { listen } from './app/listener';
import Register from './pages/Register/index';
import RegisterSuccess from './pages/RegisterSuccess/index';
import Login from './pages/Login';

function App() {
  React.useEffect(() => { listen() }, []);

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
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;