import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerUsuarios, eliminarUsuario, buscarUsuario, actualizarUsuario } from '../../redux/actions';
import style from '../styles/PanelGeneral.module.css';
import editar from '../../images/editar.svg';
import eliminar from '../../images/eliminar.svg';
import swal from 'sweetalert';
import Modal from '../Modal';
import spinner from '../../images/spinner.svg';

const Users = () => {
  const dispatch = useDispatch();
  const usuarios = useSelector(state => state.usuarios);
  const usuario = useSelector(state => state.usuario);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    nombre: '',    
    apellido: '',
    email: '',  
    celular: 0 
  })
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
        setTimeout(() => {
          window.location.reload();
      }, 3000);
      } else {
        swal("Se ha cancelado la eliminación");
      }
    });
  }
  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }
  const handleClick = (id) => {
    setIsOpen(true);
    dispatch(buscarUsuario(id));
  }
  const handleSubmit = () => {
    dispatch(actualizarUsuario(usuario.id, input));
    swal("Usuario actualizado correctamente", {
      icon: "success",
    });
    setTimeout(() => {
      window.location.reload();
  }, 3000);
  }
  useEffect(() => {
    dispatch(obtenerUsuarios());
  }, [dispatch]);
  useEffect(() => {
    if (usuario) {
      setInput({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        celular: usuario.celular,
      })
    }
  }, [usuario]);
    return (
      <>
    {
      usuarios.length ?
      <>
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
            { usuarios?.sort((a, b) => { return a.id-b.id }).map(usuario => {
              return (
                <tr>
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
              <input type='text' name='nombre' value={input.nombre} placeholder='Editar el nombre' />
              <label>Apellido</label>
              <input type='text' name='apellido' value={input.apellido} placeholder='Editar el apellido' />
              <label>Email</label>
              <input type='email' name='email' value={input.email} placeholder='Editar el email' />
              <label>Celular</label>
              <input type='number' name='celular' value={input.celular} placeholder='Editar el celular' />
          </form>
        </Modal>
        </>
        :
        <img src={spinner} className={style.spinner} alt='' />
    }  
       </>
    )
}

export default Users;