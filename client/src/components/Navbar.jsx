import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './AuthService';
import UserContext from './UserContext';
import style from './styles/Navbar.module.css';
import lupa from '../images/svg/lupa.svg';
import carrito from '../images/svg/carrito.svg';
import favoritos from '../images/svg/favoritos.svg';
import panel from '../images/svg/panel.svg';
import { buscarProducto } from '../redux/actions';

const Navbar = ({ setPaginaActual }) => {
  const [input, setInput] = useState('');
  const [usuarioActual, setUsuarioActual] = useState(UserContext);
  const [buscar, setBuscar] = useState(false);
  const usuario = isAuthenticated();
  const dispatch = useDispatch();
  const cerrarSesion = () => {
    localStorage.removeItem('user');
    setUsuarioActual({});
    localStorage.clear();
    window.location.reload();
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(buscarProducto(input));
    setPaginaActual(1);
  };
  return (
    <div className={style.contenedor}>
      <div className={style.contenedorNavbar}>
        <h1 className={style.nombrePagina}>Alcolapp</h1>
      </div>
      <div className={style.contenedorNavbar}>
        <img className={style.svgBus} src={lupa} alt='Buscar' onClick={() => buscar ? setBuscar(false) : setBuscar(true)} title='Buscar' />
        {buscar &&
          <form onSubmit={handleSubmit}>
            <input type='text' value={input} placeholder='Buscar producto' onChange={handleChange} />
          </form>
        }
        {
          usuario.usuario && usuario.usuario.is_admin &&
          <Link to={`/panel/admin/${usuario.usuario.id}`}>
            <img className={style.svgPan} src={panel} alt='Panel' title='Panel de admin' />
          </Link>
        }
        <Link to='/favorites'>
          <img className={style.svgFav} src={favoritos} alt='Favorito' title='Favoritos' />
        </Link>
        <Link to='/cart'>
          <img className={style.svgCarr} src={carrito} alt='Carrito' title='Carrito' />
        </Link>
        {usuario.token ?
          <>
            <Link className={style.linkUrl} to={`panel/user/${usuario.usuario.id}`}>
              <p className={style.parrafoNombre}>Hola, {usuario.usuario.nombre} {usuario.usuario.apellido}</p>
            </Link>
            <p className={style.parrafo} onClick={cerrarSesion}>Cerrar sesión</p>
          </>
          :
          <Link className={style.link} to='/login'>
            <p className={style.parrafo}>Iniciar sesión</p>
          </Link>
        }
      </div>
    </div>
  );
};

export default Navbar;