import style from '../styles/PanelGeneral.module.css';
import editar from '../../images/editar.svg';
import eliminar from '../../images/eliminar.svg';

const Categories = () => {
  const data = [{ id: 'MLA10511', categoria: 'Whisky', cantidad: 50},
                { id: 'MLA40995', categoria: 'Gin', cantidad: 50},
                { id: 'MLA403656', categoria: 'Cerveza', cantidad: 50},
                { id: 'MLA1404', categoria: 'Vino', cantidad: 50}
              ]
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
            { data.map(e => {
              return (
            <tr>
              <td className={style.td}>{e.id}</td>
              <td className={style.td}>{e.categoria}</td>
              <td className={style.td}>{e.cantidad}</td>
              <td className={style.td}><img className={style.svg} src={editar} alt='editar' /><img className={style.svg} src={eliminar} alt='eliminar' /></td>
            </tr>
           )
            })
            }            
          </tbody>
      </table>
    )
}

export default Categories;