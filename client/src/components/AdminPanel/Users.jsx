import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerUsuarios, eliminarUsuario, buscarUsuario, actualizarUsuario, buscarUsuariosPorNombre } from '../../redux/actions';
import style from '../styles/PanelGeneral.module.css';
import editar from '../../images/svg/editar.svg';
import eliminar from '../../images/svg/eliminar.svg';
import swal from 'sweetalert';
import Modal from '../Modal';
import spinner from '../../images/svg/spinner.svg';

const Users = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector(state => state.usuarios);
  const usuario = useSelector(state => state.usuario);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
    email: '',
    celular: '',
  });
  const [loader, setLoader] = useState(true);
  const borrarUsuario = (id) => {
    swal({
      title: "¿Estás seguro que deseas eliminar este usuario?",
      text: "Una vez eliminado, la cuenta dejará de existir",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(eliminarUsuario(id));
          swal("Usuario eliminado correctamente", {
            icon: "success",
          });
        } else {
          swal("Se ha cancelado la eliminación");
        };
      });
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleClick = (id) => {
    setIsOpen(true);
    dispatch(buscarUsuario(id));
  };
  const handleSubmit = () => {
    dispatch(actualizarUsuario(usuario.id, input));
    swal("Usuario actualizado correctamente", {
      icon: "success",
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  const handleChangeNombre = (e) => {
    setNombreUsuario(e.target.value)
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(buscarUsuariosPorNombre(nombreUsuario));
  };
  useEffect(() => {
    dispatch(obtenerUsuarios()).then(setLoader(false));
  }, [dispatch]);
  useEffect(() => {
    if (usuario) {
      setInput({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        celular: usuario.celular
      });
    };
  }, [usuario]);
  if (loader) {
    return <img src={spinner} className={style.spinner} alt='' />
  };
  return (
    <div>
      <div className={style.divSuperiorOrdenYUsuario}>
        <button className={style.buttonTodosLosUsuarios} onClick={() => dispatch(obtenerUsuarios())}>Todos</button>
        <div className={style.divBuscarOrdenYUsuario}>
          <form>
            <input type='text' placeholder='Buscar usuario' onChange={handleChangeNombre} />
            <button className={style.buttonBuscar} title='Buscar' disabled={!nombreUsuario.length} onClick={(e) => handleSubmitSearch(e)}><svg className={style.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" /></svg></button>
          </form>
        </div>
      </div>
      {
        usuarios.length ?
          <div>
            <table className={style.table}>
              <thead className={style.thead}>
                <tr>
                  <th className={style.th}>Id</th>
                  <th className={style.th}>Nombre</th>
                  <th className={style.th}>Apellido</th>
                  <th className={style.th}>Email</th>
                  <th className={style.th}>Celular</th>
                  <th className={style.th}>Admin</th>
                  <th className={style.th}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {usuarios?.sort((a, b) => { return a.id - b.id }).map((usuario, index) => {
                  return (
                    <tr key={index}>
                      <td className={style.td}>{usuario.id}</td>
                      <td className={style.td}>{usuario.nombre}</td>
                      <td className={style.td}>{usuario.apellido}</td>
                      <td className={style.td}>{usuario.email}</td>
                      <td className={style.td}>{usuario.celular}</td>
                      <td className={style.td}>{`${usuario.is_admin}`}</td>
                      <td className={style.td}><img className={style.svg} src={editar} alt='editar' onClick={() => handleClick(usuario.id)} /><img className={style.svg} src={eliminar} alt='eliminar' title='Eliminar' onClick={() => borrarUsuario(usuario.id)} /></td>
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} tituloModal="Usuario" despachar={handleSubmit}>
              <h2>Editar usuario</h2>
              <form onChange={handleChange}>
                <label>Nombre</label>
                <input type='text' name='nombre' defaultValue={input.nombre} placeholder='Editar el nombre' />
                <label>Apellido</label>
                <input type='text' name='apellido' defaultValue={input.apellido} placeholder='Editar el apellido' />
                <label>Email</label>
                <input type='email' name='email' defaultValue={input.email} placeholder='Editar el email' />
                <label>Celular</label>
                <input type='number' name='celular' defaultValue={input.celular} placeholder='Editar el celular' />
              </form>
            </Modal>
          </div>
          :
          <div className={style.sinOrdenes}>
            <p>No existen usuarios registrados</p>
          </div>
      }
    </div>
  );
};

export default Users;