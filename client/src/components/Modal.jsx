import style from './styles/Modal.module.css';

const Modal = ({ children, isOpen, setIsOpen, tituloModal, despachar }) => {
  return (
    <>
      {isOpen &&
        <div className={style.principal}>
          <div className={style.contenedorModal}>
            <div className={style.contenedorTituloModal}>
              <h3>{tituloModal}</h3>
            </div>
            <button className={style.botonCerrar} onClick={() => setIsOpen(false)}>X</button>
            <div className={style.contenido}>
              {children}
            </div>
            <div className={style.divButtonConfirmar}>
              <button onClick={() => despachar()}>Confirmar</button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Modal;