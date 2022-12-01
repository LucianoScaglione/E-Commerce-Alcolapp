import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { buscarUsuario } from "../../redux/actions";
import { isAuthenticated } from '../AuthService';
import Home from './Home';
import CartPage from '../CartPage';
import style from '../styles/NavBarUser.module.css';
import Edit from './Edit';
import Favorites from '../Favorites';
import Shopping from './Shopping';
import Loading from '../Loading';

const UserPanel = () => {
  const [state, setState] = useState('home');
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.usuario);
  const user = isAuthenticated();
  useEffect(() => {
    dispatch(buscarUsuario(user.usuario.id))
    usuario && setLoader(false);
  }, [dispatch]);
  if (loader) {
    return <Loading />
  };
  return (
    <div>
      <div className={style.contenedorPadre}>
        <div className={style.contenedorNav}>
          <p onClick={() => setState('home')}>Inicio</p>
          <p onClick={() => setState('editar')}>Editar mi perfil</p>
          <p onClick={() => setState('compras')}>Mis compras</p>
          <p onClick={() => setState('carrito')}>Mi carrito</p>
          <p onClick={() => setState('favoritos')}>Mis favoritos</p>
        </div>
      </div>
      <div>
        {state === 'home' && <Home usuario={usuario} />}
        {state === 'editar' && <Edit usuario={usuario} />}
        {state === 'carrito' && <CartPage />}
        {state === 'favoritos' && <Favorites />}
        {state === 'compras' && <Shopping usuario={usuario} />}
      </div>
    </div>
  );
};

export default UserPanel;