import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductos, eliminarProducto, obtenerDetalleProducto, actualizarProducto } from '../../redux/actions';
import style from '../styles/PanelGeneral.module.css';
import editar from '../../images/editar.svg';
import eliminar from '../../images/eliminar.svg';
import swal from 'sweetalert';
import Modal from '../Modal';
import spinner from '../../images/spinner.svg';

const Products = () => {
  const productos = useSelector(state => state.productos);
  const detalleProducto = useSelector(state => state.detalleProducto)
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    titulo: '',
    cantidadDisponible: 0,
    cantidadVendida: 0,
    precio: 0 
  })
  const borrarProducto = (id) => {
    swal({
      title: "¿Estás seguro que deseas eliminar este producto?",
      text: "Una vez eliminado, desaparecerá de la página",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(eliminarProducto(id));
        setTimeout(() => {
          window.location.reload();
      }, 3000);
      } else {
        swal("Se ha cancelado la eliminación");
      }
    });
  }
  const handleClick = (payload) => {
    setIsOpen(true)
    dispatch(obtenerDetalleProducto(payload))
  }
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name] : e.target.value });
  }
  const handleSubmit = () => {
    dispatch(actualizarProducto(detalleProducto.id, input));
    swal("Producto actualizado correctamente", {
      icon: "success",
    });
    setTimeout(() => {
      window.location.reload();
  }, 3000);
  }
  useEffect(() => {
    dispatch(obtenerProductos());
  }, [dispatch]);
  useEffect(() => {
    if (detalleProducto) {
    setInput({
      titulo: detalleProducto.titulo,
      cantidadDisponible: detalleProducto.cantidadDisponible,
      cantidadVendida: detalleProducto.cantidadVendida,
      precio: detalleProducto.precio 
    });
   }
  }, [detalleProducto]);
  return (
    <>
    {
      productos.length ?
      <>
      <table className={style.table}>
          <thead className={style.thead}>
            <tr>
          <th className={style.th}>Id</th>
          <th className={style.th}>Nombre</th>
          <th className={style.th}>Disponibles</th>
          <th className={style.th}>Ventas</th>
          <th className={style.th}>Categoria</th>
          <th className={style.th}>Precio</th>
          <th className={style.th}>Acción</th>
            </tr>
          </thead>
          <tbody className={style.tbody}>
          { productos?.map(producto => {
              return (
                <tr>
                  <td className={style.td}>{producto.id}</td>
                  <td className={style.td}>{producto.titulo}</td>
                  <td className={style.td}>{producto.cantidadDisponible}</td>
                  <td className={style.td}>{producto.cantidadVendida}</td>
                  <td className={style.td}>{producto.idCategoria}</td>
                  <td className={style.td}>${producto.precio}</td>
                  <td className={style.td}><img className={style.svg} src={editar} alt='editar' title='Editar' onClick={() => handleClick(producto)} /><img className={style.svg} src={eliminar} alt='eliminar' title='Eliminar' onClick={() => borrarProducto(producto.id)}/></td>
                </tr>
            )
            })
            }         
          </tbody>
        </table>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} tituloModal="Producto" despachar={handleSubmit}>
          <h2>Editar producto</h2>
          <form onChange={handleChange}>
              <label>Nombre</label>
              <input type='text' name='titulo' value={input.titulo} placeholder='Editar el nombre' />
              <label>Disponibles</label>
              <input type='number' name='cantidadDisponible' value={input.cantidadDisponible} placeholder='Editar la cantidad disponible' />
              <label>Ventas</label>
              <input type='number' name='cantidadVendida' value={input.cantidadVendida} placeholder='Editar la cantidad de ventas' />
              <label>Precio</label>
              <input type='number' name='precio' value={input.precio} placeholder='Editar el precio' />
          </form>
        </Modal>   
        </>
        :
        <img src={spinner} className={style.spinner} alt='' />
    }  
       </>
    )
}

export default Products;