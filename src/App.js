import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from './components/Admin';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Menu from './components/Menu';
import Registro from './components/Registro';

function App() {
  return (
    <div className="container">
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={ Inicio } />
          <Route path="/admin" component={ Admin } />
          <Route path="/login" component={ Login } />
          <Route path="/registrar" component={ Registro } />          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
