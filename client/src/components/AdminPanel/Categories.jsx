import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductos, eliminarProductosCategoria } from '../../redux/actions';
import style from '../styles/PanelGeneral.module.css';
import eliminar from '../../images/svg/eliminar.svg';
import spinner from '../../images/svg/spinner.svg';
import swal from 'sweetalert';

const Categories = () => {
  const dispatch = useDispatch();
  const productos = useSelector(state => state.productos);
  const data = [{ id: 'MLA10511', categoria: 'Whisky' },
  { id: 'MLA40995', categoria: 'Gin' },
  { id: 'MLA403656', categoria: 'Cerveza' },
  { id: 'MLA1404', categoria: 'Vino' }
  ];
  const eliminarProductosDeCategoria = (id) => {
    swal({
      title: "¿Estás seguro?",
      text: "Se eliminarán todos los productos de la categoría seleccionada",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(eliminarProductosCategoria(id))
          swal("Productos eliminados correctamente", {
            icon: "success"
          });
        } else {
          swal("Se ha cancelado la eliminación");
        };
      });
  }
  useEffect(() => {
    dispatch(obtenerProductos());
  }, [dispatch]);
  if (!productos.length) {
    return <img src={spinner} className={style.spinner} alt='' />
  }
  return (
    <table className={style.table}>
      <thead className={style.thead}>
        <tr>
          <th className={style.th}>Id</th>
          <th className={style.th}>Categoría</th>
          <th className={style.th}>Cantidad productos</th>
          <th className={style.th}>Acción</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e, index) => {
          return (
            <tr key={index}>
              <td className={style.td}>{e.id}</td>
              <td className={style.td}>{e.categoria}</td>
              <td className={style.td}>{productos.filter(producto => producto.idCategoria === e.id).length}</td>
              <td className={style.td}><img className={style.svg} src={eliminar} alt='eliminar' title='Eliminar productos' onClick={() => eliminarProductosDeCategoria(e.id)} /></td>
            </tr>
          )
        })
        }
      </tbody>
    </table>
  );
};

export default Categories;