import { Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import AdminPanel from './components/AdminPanel/AdminPanel';
import CartPage from './components/CartPage';
import Detail from './components/Detail';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserPanel from './components/UserPanel/UserPanel';
import Favorites from './components/Favorites';
import PrivateRoutePanelAdmin from './components/PrivateRoutes/PrivateRoutePanelAdmin';
import PrivateRouteFavorites from './components/PrivateRoutes/PrivateRouteFavorites';

function App() {
  return (
    <div>
      <CartProvider>
        <Route exact path='/' component={Home} />
        <Route exact path='/product/:id' component={Detail} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/cart' component={CartPage} />
        <PrivateRoutePanelAdmin exact path="/panel/admin/:id" component={AdminPanel} />
        <Route exact path='/panel/user/:id' component={UserPanel} />
        <PrivateRouteFavorites exact path='/favorites' component={Favorites} />
      </CartProvider>
    </div>
  );
};

export default App;