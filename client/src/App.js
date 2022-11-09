import { Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { CartProvider } from './components/CartContext';
import CartPage from './components/CartPage';
import Detail from './components/Detail';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserPanel from './components/UserPanel/UserPanel';

function App() {
  return (
   <div>
  <CartProvider>
  <Route exact path='/' component={Home} />
  <Route exact path='/product/:id' component={Detail} />
  <Route exact path='/login' component={Login} />
  <Route exact path='/register' component={Register} />
  <Route exact path='/cart' component={CartPage} />
  <Route exact path='/panel/admin/:id' component={AdminPanel} />
  <Route exact path='/panel/user/:id' component={UserPanel} />

  

  </CartProvider>  
  </div>
    )
}

export default App;
