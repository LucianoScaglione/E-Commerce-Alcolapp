import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerOrdenes, eliminarOrden, obtenerDetalleOrden, actualizarOrden } from '../../redux/actions';
import spinner from '../../images/spinner.svg';
import editar from '../../images/editar.svg';
import eliminar from '../../images/eliminar.svg';
import style from '../styles/PanelGeneral.module.css';
import swal from 'sweetalert';
import Modal from '../Modal';

const Orders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState();
  const ordenes = useSelector(state => state.ordenes);
  const orden = useSelector(state => state.orden);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const borrarOrden = (id) => {
    swal({
      title: "¿Estás seguro que deseas eliminar esta orden?",
      text: "Una vez eliminada, desaparecerá del registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(eliminarOrden(id));
        setTimeout(() => {
          window.location.reload();
      }, 3000);
      } else {
        swal("Se ha cancelado la eliminación");
      }
    });
  }
  const handleClick = (payload) => {
    setIsOpen(true);
    dispatch(obtenerDetalleOrden(payload));
  };
  const handleSubmit = () => {
    dispatch(actualizarOrden(orden.id, input))
    swal("Orden actualizada correctamente", {
      icon: "success",
    });
    setTimeout(() => {
      window.location.reload();
  }, 3000);
  }
  useEffect(() => {
    dispatch(obtenerOrdenes());
  }, [dispatch]);
  console.log(input)
  return (
    <>
    {
      ordenes.length ?
      <>
      <table className={style.table}>
          <thead className={style.thead}>
            <tr>
          <th className={style.th}>Id orden</th>
          <th className={style.th}>Usuario</th>
          <th className={style.th}>Estado</th>
          <th className={style.th}>Fecha</th>
          <th className={style.th}>Valor</th>
          <th className={style.th}>Acción</th>
            </tr>
          </thead>
          <tbody className={style.tbody}>
          { ordenes?.map(orden => {
            const hora = orden.fecha.split("-").join("/").slice(0, 10);
            const horaFinal = hora + " " + orden.fecha.slice(11, 19);
              return (
                <tr>
                  <td className={style.td}>{orden.id}</td>
                  <td className={style.td}>{orden.Usuarios.map(usuario => usuario.email)}</td>
                  <td className={style.td}>{orden.estado}</td>
                  <td className={style.td}>{horaFinal}</td>
                  <td className={style.td}>${orden.precio_orden}</td>
                  <td className={style.td}><img className={style.svg} src={editar} alt='editar' title='Editar' onClick={() => handleClick(orden.id)} /><img className={style.svg} src={eliminar} alt='eliminar' title='Eliminar' onClick={() => borrarOrden(orden.id)} /></td>
                </tr>
            )
            })
            }         
          </tbody>
        </table>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} tituloModal="Orden" despachar={handleSubmit}>
          <h2>Editar orden</h2>
          <label>Id</label>
          <p>{orden.id}</p>
          <label>Estado</label>
            <select onChange={handleChange}>
            <option hidden>{orden.estado}</option>
            <option value='cancelada'>cancelada</option>
            <option value='pendiente'>pendiente</option>
            <option value='finalizada'>finalizada</option>
            </select>
        </Modal>
        </>
        :
        <img src={spinner} className={style.spinner} alt='' />
      }  
      </>
  )
}

export default Orders;