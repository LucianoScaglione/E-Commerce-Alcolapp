import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actualizarUsuario } from '../../redux/actions';
import swal from 'sweetalert';
import style from '../styles/PanelGeneralUser.module.css';
import usuarioImg from '../../images/usuario.png';

const Edit = ({ usuario }) => {
  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    imagen: ''
  });
  const dispatch = useDispatch();
  const convertirBase64 = (imagen) => {
    Array.from(imagen).forEach(archivo => {
      let reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => {
        let arrayAuxiliar = [];
        let base64 = reader.result;
        arrayAuxiliar = base64.split(',');
        setInput({
          nombre: input.nombre,
          apellido: input.apellido,
          celular: input.celular,
          imagen: arrayAuxiliar[1]
        });
      };
    });
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
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
        imagen: ''
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
        <div className={style.contenedorImagen2}><img src={usuario.imagen ? usuario.imagen : usuarioImg} alt='Perfil' /></div>
        <div className={style.contenedorForm}>
          <div className={style.margenForm}>
            <form className={style.form} onChange={handleChange}>
              <input type='text' name='nombre' defaultValue={input.nombre} placeholder='Editar nombre' />
              <input type='text' name='apellido' defaultValue={input.apellido} placeholder='Editar apellido' />
              <input type='phone' name='celular' defaultValue={input.celular} placeholder='Editar celular' />
              <input type='file' name='imagen' accept="image/png, image/jpeg" onChange={e => convertirBase64(e.target.files)} />
            </form>
          </div>
          <button className={style.button} onClick={() => handleSubmit()}>Editar usuario</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;