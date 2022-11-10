import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actualizarUsuario } from '../../redux/actions';
import swal from 'sweetalert';
import style from '../styles/PanelGeneralUser.module.css';
import vino from '../../images/vino.jpg';


const Edit = ({ usuario }) => {
  const [input, setInput] = useState({
    nombre: '',    
    apellido: '',
    celular: 0 
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  };
  const handleSubmit = () => {
    dispatch(actualizarUsuario(usuario.id, input));
    swal("Usuario editado correctamente", {
      icon: "success",
    });
    setTimeout(() => {
      window.location.reload();
  }, 3000);
  };
  useEffect(() => {
    if (usuario) {
      setInput({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        celular: usuario.celular,
        //imagen: usuario.imagen
      });
    };
  }, [usuario]);
  return (
    <div>
       <Link className={style.linkUrl} to='/'>
      <p className={style.volver}>{'< Volver'}</p>
      </Link>
      <div className={style.principal}>
      <h1>Editar usuario</h1>
      </div>
      <div className={style.row}>
      <div className={style.contenedorImagen2}><img src={vino} alt='profile' /></div>
      <div className={style.contenedorForm}>
      <form className={style.form} onChange={handleChange}>
        <input type='text' name='nombre' value={input.nombre} placeholder='Editar nombre' /> 
        <input type='text' name='apellido' value={input.apellido} placeholder='Editar apellido' /> 
        <input type='phone' name='celular' value={input.celular} placeholder='Editar celular'/> 
        <input type='file' accept='image/png, image/jpeg' placeholder='Editar imagen' />
      </form>
        <button className={style.button} onClick={() => handleSubmit()}>Editar usuario</button>
      </div>
      </div>
    </div>
  )
}

export default Edit; 
