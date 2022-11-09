import style from '../styles/PanelGeneralUser.module.css';
import vino from '../../images/vino.jpg';


const Edit = ({ usuario }) => {
  return (
    <div>
      <h1>Editar usuario</h1>
      <div className={style.principal}>
      <div className={style.contenedorImagen}><img src={vino} alt='profile' /></div>
      <form className={style.form}>
        <input type='text' value={usuario.nombre} placeholder='Editar nombre' /> {/*Nombre */}
        <input type='text' value={usuario.apellido}placeholder='Editar apellido' /> {/*Apellido */}
        <input type='phone' value={usuario.celular} placeholder='Editar celular'/> {/*Celular */}
        <input type="file" accept="image/png, image/jpeg" placeholder='Editar imagen' />{/*Imagen */}
        {/* <input type='' /> */}
      </form>
      </div>
    </div>
  )
}

export default Edit;