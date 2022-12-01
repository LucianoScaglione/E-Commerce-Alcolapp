import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerOrdenes, eliminarOrden, obtenerDetalleOrden, actualizarOrden, obtenerOrdenesPorId, filtrosOrdenesPanel } from '../../redux/actions';
import spinner from '../../images/svg/spinner.svg';
import editar from '../../images/svg/editar.svg';
import eliminar from '../../images/svg/eliminar.svg';
import style from '../styles/PanelGeneral.module.css';
import swal from 'sweetalert';
import Modal from '../Modal';

const Orders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(1);
  const [input, setInput] = useState();
  const [idOrden, setIdOrden] = useState('');
  const [loader, setLoader] = useState(true);
  const ordenes = useSelector(state => state.ordenes);
  const orden = useSelector(state => state.orden);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput(e.target.value);
  };
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
          swal("Orden eliminada correctamente", {
            icon: "success",
          });
        } else {
          swal("Se ha cancelado la eliminación");
        };
      });
  };
  const handleChangeFilter = (e) => {
    dispatch(filtrosOrdenesPanel(e.target.value));
    setOrder(e.target.value);
  };
  const handleSubmitId = (e) => {
    e.preventDefault();
    dispatch(obtenerOrdenesPorId(idOrden));
  };
  const handleChangeId = (e) => {
    setIdOrden(e.target.value);
  };
  const handleClick = (payload) => {
    setIsOpen(true);
    dispatch(obtenerDetalleOrden(payload));
  };
  const handleSubmit = () => {
    dispatch(actualizarOrden(orden.id, input));
    swal("Orden actualizada correctamente", {
      icon: "success",
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
  useEffect(() => {
    dispatch(obtenerOrdenes()).then(setLoader(false));
  }, [dispatch]);
  if (loader) {
    return <img src={spinner} className={style.spinner} alt='' />
  };
  return (
    <div>
      <div className={style.divSuperiorOrdenYUsuario}>
        <select onChange={handleChangeFilter}>
          <option hidden>Órdenes</option>
          <option value='todas'>Todas</option>
          <option value='cancelada'>Canceladas</option>
          <option value='pendiente'>Pendientes</option>
          <option value='finalizada'>Finalizadas</option>
        </select>
        <div className={style.divBuscarOrdenYUsuario}>
          <form>
            <input type='text' placeholder='Buscar orden' onChange={handleChangeId} />
            <button className={style.buttonBuscar} title='Buscar' disabled={!idOrden.length} onClick={(e) => handleSubmitId(e)}><svg className={style.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" /></svg></button>
          </form>
        </div>
      </div>
      {
        ordenes.length ?
          <div>
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
                {ordenes?.map((orden, index) => {
                  const hora = orden.fecha.split("-").join("/").slice(0, 10);
                  const horaFinal = hora + " " + orden.fecha.slice(11, 19);
                  return (
                    <tr key={index}>
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
              <form>
                <label>Id</label>
                <input type='text' value={orden.id} disabled={true} />
                <label>Estado</label>
                <select onChange={handleChange}>
                  <option hidden>{orden.estado}</option>
                  <option value='cancelada'>cancelada</option>
                  <option value='pendiente'>pendiente</option>
                  <option value='finalizada'>finalizada</option>
                </select>
              </form>
            </Modal>
          </div>
          :
          <div className={style.sinOrdenes}>
            <p>No existen órdenes registradas</p>
          </div>
      }
    </div>
  );
};

export default Orders;