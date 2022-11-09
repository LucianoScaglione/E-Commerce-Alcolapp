import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './AuthService';
import UserContext from './UserContext';
import style from './styles/Navbar.module.css';
import lupa from '../images/lupa.svg';
import carrito from '../images/carrito.svg';
import { buscarProducto } from '../redux/actions';

const Navbar = () => {
  const [input, setInput] = useState('');
  const [usuarioActual, setUsuarioActual] = useState(UserContext);
  const [buscar, setBuscar] = useState(false);
  const usuario = isAuthenticated();
  const dispatch = useDispatch();
	const cerrarSesion = () => {
    localStorage.removeItem('user');
    setUsuarioActual({});
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(buscarProducto(input));
  };
  return (
    <div className={style.contenedor}>
      <div className={style.contenedorNavbar}>
      <h1 className={style.nombrePagina}>Alcolapp</h1>
      </div>
      <div className={style.contenedorNavbar}>
        <img className={style.svg} src={lupa} alt='Buscar' onClick={()=> buscar ? setBuscar(false) : setBuscar(true)} />
        {buscar && 
        <form onSubmit={handleSubmit}>
        <input type='text' value={input} placeholder='Buscar producto' onChange={handleChange} />
        </form>
        }
        <Link to='/cart'>
        <img className={style.svg} src={carrito} alt='Carrito' />
        </Link>
        { usuario.token ? 
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
  )
}

export default Navbar;