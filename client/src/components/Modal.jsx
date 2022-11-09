import style from './styles/Modal.module.css';

const Modal = ({ children, isOpen, setIsOpen, tituloModal, despachar }) => {
    return (
      <>
      { isOpen &&
       <div className={style.principal}>
        <div className={style.contenedorModal}>
          <div className={style.contenedorTituloModal}>
            <h3>{tituloModal}</h3>
          </div>
            <button className={style.botonCerrar} onClick={() => setIsOpen(false)}>X</button>
            <div className={style.contenido}>
            { children }
            </div>
              <div className={style.divButtonConfirmar}>
              <button onClick={() => despachar()}>Confirmar</button>
              </div>
         </div>
        </div>
      }
        </>
        )
      }

export default Modal;

{/* <div className={style.principal}>
<div className={style.contenedorModal}>
  <div className={style.contenedorTituloModal}>
    <h3>Producto</h3>
  </div>
    <button className={style.botonCerrar} onClick={() => setIsOpen(false)}>X</button>
    <div className={style.contenido}>
    <h2>Editar producto</h2>
    <form>
      <label>Nombre</label>
      <input type='text' placeholder='Editar el nombre' />
      <label>Disponibles</label>
      <input type='number' placeholder='Editar la cantidad disponible' />
      <label>Ventas</label>
      <input type='number' placeholder='Editar la cantidad de ventas' />
      <label>Precio</label>
      <input type='number' placeholder='Editar el precio' />
      </form>
    </div>
      <div className={style.divButtonConfirmar}>
      <button>Confirmar</button>
      </div>
 </div>
</div> */}
