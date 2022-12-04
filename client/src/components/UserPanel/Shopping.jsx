import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { buscarOrdenesUsuario, crearComentario, comentariosDeUsuario, vaciarComentariosDeUsuario } from "../../redux/actions";
import style from '../styles/PanelGeneralUser.module.css';
import swal from "sweetalert";

const Shopping = ({ usuario }) => {
  const ordenUsuario = useSelector(state => state.ordenUsuario);
  const comentariosUsuario = useSelector(state => state.comentariosUsuario);
  const [comento, setComento] = useState(false);
  const dispatch = useDispatch();
  const [comentario, setComentario] = useState('');
  const handleChange = (e) => {
    setComentario(e.target.value);
  };
  const handleSubmit = (id) => {
    const buscarComentarios = comentariosUsuario.find(e => e.ProductoId === id)
    if (!buscarComentarios) {
      dispatch(crearComentario({ descripcion: comentario, id: id, usuarioId: usuario.id }));
      setComentario('');
      setComento(id)
    } else {
      swal("Error", "Sólo puedes dejar un comentario por producto", "error");
      setComentario('');
    }
  };
  useEffect(() => {
    dispatch(buscarOrdenesUsuario(usuario.id));
    return () => {
      dispatch(vaciarComentariosDeUsuario());
    };
  }, [dispatch]);

  useEffect(() => {
    !comentariosUsuario.length && dispatch(comentariosDeUsuario(usuario.id));
  }, [dispatch, comentariosUsuario, comento]);
  return (
    <div>
      <Link className={style.linkUrl} to='/'>
        <p className={style.volver}>{'< Volver'}</p>
      </Link>
      <div className={style.contenedorPadre}>
        {ordenUsuario.length ? ordenUsuario.map((orden, index) => {
          const hora = orden.fecha.split("-").join("/").slice(0, 10);
          const horaFinal = hora + " " + orden.fecha.slice(11, 19);
          return (
            <div key={index} className={style.divContenedorDatos}>
              <div className={style.contenedorOrden}>
                <p>Estado de orden: {orden.estado}</p>
                <p>Precio final: ${orden.precio_orden}</p>
                <p>Fecha: {horaFinal}</p>
              </div>
              <div className={style.contenedorProductos}>
                {
                  orden.Productos?.map((e, index) => {
                    return (
                      <div key={index} className={style.divProductosPrincipal}>
                        <div className={style.divProductos}>
                          <Link className={style.linkUrl} to={`/product/${e.id}`}>
                            <h4>{e.titulo}</h4>
                          </Link>
                          <img src={e.miniatura} alt='no encontrado' />
                          <p>${e.precio}</p>
                        </div>
                        <div className={style.divComentario}>
                          {orden.estado === 'finalizada' && (!comentariosUsuario.find(el => el.ProductoId === e.id) && !(comento === e.id)) &&
                            <div className={style.contenedorComentarioPrincipal}>
                              <textarea className={style.textarea} placeholder='Deja tu comentario...' maxLength={140} onChange={handleChange} />
                              <div className={style.contenedorComentario}>
                                <button onClick={() => handleSubmit(e.id)} disabled={comentario.length < 4}>Enviar</button>
                              </div>
                            </div>
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        }) : <div className={style.sinOrdenes}><p>No existen órdenes registradas</p></div>}
      </div>
    </div>
  );
};

export default Shopping;