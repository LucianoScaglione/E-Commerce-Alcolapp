import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { buscarUsuario } from "../../redux/actions";
import { isAuthenticated } from '../AuthService';
import Home from './Home';
import CartPage from '../CartPage';
import style from '../styles/NavBarUser.module.css';
import Edit from './Edit';

const UserPanel = () => {
  const [state, setState] = useState('home');
  const dispatch = useDispatch();
  const usuario = useSelector(state => state.usuario);
  const user = isAuthenticated();
  useEffect(() => {
    dispatch(buscarUsuario(user.usuario.id)) 
  }, [dispatch])
  return (
    <>
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
      { state === 'home' && <Home usuario={usuario} /> } 
      { state === 'editar' && <Edit usuario={usuario} /> }
      { state === 'carrito' && <CartPage /> }
    </div>
    </>
  )
}

export default UserPanel;