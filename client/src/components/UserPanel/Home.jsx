import style from '../styles/PanelGeneralUser.module.css';
import usuarioImg from '../../images/usuario.png';
import { Link } from "react-router-dom";

const Home = ({ usuario }) => {
  return (
    <div>
      <Link className={style.linkUrl} to='/'>
        <p className={style.volver}>{'< Volver'}</p>
      </Link>
      <div className={style.principal}>
        <div className={style.contenedor}>
          <h1>¡Hola, {`${usuario.nombre} ${usuario.apellido}`}!</h1>
          <div className={style.contenedorImagen}><img src={usuario.imagen ? usuario.imagen : usuarioImg} alt='profile' /></div>
          <div className={style.contenedorHeight}>
            <div className={style.contenedorDatos}>
              <p>Correo electrónico:</p>
              <i>{`${usuario.email}`}</i>
            </div>
            <div className={style.contenedorDatos}>
              <p>Celular:</p>
              <i>{`${usuario.celular}`}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;