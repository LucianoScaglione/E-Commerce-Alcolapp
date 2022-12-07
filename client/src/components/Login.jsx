import { useState } from 'react';
import { login } from './AuthService'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import style from './styles/Login.module.css';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    contraseña: ''
  });
  const history = useHistory();
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(input.email, input.contraseña);
      history.push('/');
      setInput({ email: '', contraseña: '' })
    } catch (error) {
      swal({
        title: "Error",
        text: "Correo o contraseña incorrecta",
        icon: "error",
        button: "Ok",
      });
    };
  };
  return (
    <div className={style.contenedor}>
      <Link className={style.linkUrl} to='/'>
        <p className={style.volver}>{'< Volver'}</p>
      </Link>
      <div className={style.card}>
        <div className={style.contenedorCard}>
          <div className={style.campos}>
            <h4>Iniciar sesión</h4>
            <form onSubmit={handleSubmit}>
              <input type='email' name='email' value={input.email} placeholder='Ingrese su correo electrónico' onChange={handleChange} />
              <input type='password' name='contraseña' value={input.contraseña} placeholder='Ingrese su contraseña' onChange={handleChange} />
              <button>Ingresar</button>
            </form>
            <p className={style.texto}>¿No tienes cuenta? Regístrate ingresando <Link className={style.link} to='/register'>aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
