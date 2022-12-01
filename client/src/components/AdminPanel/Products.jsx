import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosPanel, eliminarProducto, obtenerDetalleProducto, actualizarProducto, crearProducto, filtrosProductosPanel, buscarProductoPorId } from '../../redux/actions';
import style from '../styles/PanelGeneral.module.css';
import editar from '../../images/svg/editar.svg';
import eliminar from '../../images/svg/eliminar.svg';
import swal from 'sweetalert';
import Modal from '../Modal';
import spinner from '../../images/svg/spinner.svg';

const Products = () => {
  const productosPanel = useSelector(state => state.productosPanel);
  const detalleProducto = useSelector(state => state.detalleProducto);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(1);
  const [isOpen2, setIsOpen2] = useState(false);
  const [input, setInput] = useState({
    titulo: '',
    miniatura: '',
    cantidadDisponible: 0,
    cantidadVendida: 0,
    idCategoria: '',
    precio: 0
  });
  const [idProducto, setIdProducto] = useState('');
  const handleSubmitId = (e) => {
    e.preventDefault();
    dispatch(buscarProductoPorId(idProducto));
  };
  const convertirBase64 = (imagen) => {
    Array.from(imagen).forEach(archivo => {
      let reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => {
        let arrayAuxiliar = [];
        let base64 = reader.result;
        arrayAuxiliar = base64.split(',');
        setInput({
          titulo: input.titulo,
          miniatura: arrayAuxiliar[1],
          cantidadDisponible: input.cantidadDisponible,
          cantidadVendida: input.cantidadVendida,
          idCategoria: input.idCategoria,
          precio: input.precio
        });
      };
    });
  };
  const handleChangeId = (e) => {
    setIdProducto(e.target.value);
  };
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
          swal("Producto eliminado correctamente", {
            icon: "success"
          });
        } else {
          swal("Se ha cancelado la eliminación");
        };
      });
  };
  const handleClick = (payload) => {
    setIsOpen(true);
    dispatch(obtenerDetalleProducto({ id: payload }));
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(actualizarProducto(detalleProducto.id, input));
    swal("Producto actualizado correctamente", {
      icon: "success",
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  const handleSubmit2 = () => {
    dispatch(crearProducto(input))
    setInput({
      titulo: '',
      miniatra: '',
      cantidadDisponible: 0,
      cantidadVendida: 0,
      idCategoria: '',
      precio: 0
    });
    swal("Producto creado correctamente", {
      icon: "success",
    });
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  const filtrarProductos = (e) => {
    dispatch(filtrosProductosPanel(e.target.value))
    setOrder(e.target.value);
  };
  useEffect(() => {
    dispatch(obtenerProductosPanel());
  }, [dispatch]);
  useEffect(() => {
    if (detalleProducto) {
      setInput({
        titulo: detalleProducto.titulo,
        miniatura: '',
        cantidadDisponible: detalleProducto.cantidadDisponible,
        cantidadVendida: detalleProducto.cantidadVendida,
        precio: detalleProducto.precio
      });
    };
  }, [detalleProducto]);
  return (
    <div>
      <div className={style.divSuperior}>
        <select onChange={filtrarProductos}>
          <option hidden>Filtros</option>
          <option value='az'>A-Z</option>
          <option value='za'>Z-A</option>
          <option value='+ventas'>+ Ventas</option>
          <option value='-ventas'>- Ventas</option>
        </select>
        <div className={style.divBuscarProducto}>
          <form>
            <input type='text' placeholder='Buscar producto' onChange={handleChangeId} />
            <button className={style.buttonBuscar} title='Buscar' disabled={!idProducto.length} onClick={(e) => handleSubmitId(e)}><svg className={style.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" /></svg></button>
          </form>
        </div>
        <button className={style.buttonCrearProducto} onClick={() => setIsOpen2(true)}>Crear producto</button>
      </div>
      <div>
        {
          productosPanel.length ?
            <div>
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
                  {productosPanel?.map((producto, index) => {
                    return (
                      <tr key={index}>
                        <td className={style.td}>{producto.id}</td>
                        <td className={style.td}>{producto.titulo}</td>
                        <td className={style.td}>{producto.cantidadDisponible}</td>
                        <td className={style.td}>{producto.cantidadVendida}</td>
                        <td className={style.td}>{producto.categoria}</td>
                        <td className={style.td}>${producto.precio}</td>
                        <td className={style.td}><img className={style.svg} src={editar} alt='editar' title='Editar' onClick={() => handleClick(producto.id)} /><img className={style.svg} src={eliminar} alt='eliminar' title='Eliminar' onClick={() => borrarProducto(producto.id)} /></td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table>
              <Modal isOpen={isOpen2} setIsOpen={setIsOpen2} tituloModal="Producto" despachar={handleSubmit2}>
                <h2>Crear producto</h2>
                <form onChange={handleChange}>
                  <label>Nombre</label>
                  <input type='text' name='titulo' placeholder='Elige el nombre' />
                  <label>Disponibles</label>
                  <input type='number' name='cantidadDisponible' placeholder='Elige la cantidad disponible' />
                  <label>Ventas</label>
                  <input type='number' name='cantidadVendida' placeholder='Elige la cantidad de ventas' />
                  <label>Categoría</label>
                  <select name='idCategoria'>
                    <option hidden />
                    <option value='MLA10511'>Whisky</option>
                    <option value='MLA40995'>Gin</option>
                    <option value='MLA403656'>Cerveza</option>
                    <option value='MLA1404'>Vino</option>
                  </select>
                  <label>Precio</label>
                  <input type='number' name='precio' placeholder='Elige el precio' />
                  <label>Imagen</label>
                  <input type='file' name='miniatura' accept="image/png, image/jpeg" onChange={e => convertirBase64(e.target.files)} />
                </form>
              </Modal>
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
                  <label>Imagen</label>
                  <img src={detalleProducto.miniatura} alt='miniatura' />
                  <input type='file' name='miniatura' accept="image/png, image/jpeg" onChange={e => convertirBase64(e.target.files)} />
                </form>
              </Modal>
            </div>
            :
            <img src={spinner} className={style.spinner} alt='' />
        }
      </div>
    </div>
  );
};

export default Products;