import { useState, useEffect } from 'react'
import style from './styles/Carrusel.module.css';
import flechaizquierda from '../images/svg/flechaizquierda.svg';
import flechaderecha from '../images/svg/flechaderecha.svg';

const Carrusel = ({ autoPlay }) => {
  const imagenes = ['whisky.jpg', 'gin.jpg', 'vino.jpg', 'cerveza.jpg', 'whisky2.jpg', 'gin2.jpg', 'cerveza2.jpg', 'vino2.jpg'];
  const [indexActual, setIndexActual] = useState(0);
  const [imagenActual, setImagenActual] = useState(imagenes[0]);
  const [loaded, setLoaded] = useState(false);
  const seleccionarNuevaImagen = (indexActual, imagenes, siguiente = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condicion = siguiente ? indexActual < imagenes.length - 1 : indexActual > 0;
      const siguienteIndice = siguiente ? condicion ? indexActual + 1 : 0 : condicion ? indexActual - 1 : imagenes.length - 1
      setImagenActual(imagenes[siguienteIndice]);
      setIndexActual(siguienteIndice);
    }, 500);
  };
  const imagenAnterior = () => {
    seleccionarNuevaImagen(indexActual, imagenes, false);
  };
  const imagenSiguiente = () => {
    seleccionarNuevaImagen(indexActual, imagenes);
  };
  useEffect(() => {
    if (autoPlay) {
      const intervalo = setInterval(() => {
        seleccionarNuevaImagen(indexActual, imagenes);
      }, 2000);
      return () => clearInterval(intervalo);
    };
  });
  return (
    <div>
      <img className={loaded ? style.loaded : style.imagenes} src={require(`../images/${imagenActual}`)} alt='Error al cargar imagen' onLoad={() => setLoaded(true)} />
      <div className={style.contenedor}>
        <button onClick={imagenAnterior}><img src={flechaizquierda} alt='Siguiente' /></button>
        <button onClick={imagenSiguiente}><img src={flechaderecha} alt='Anterior' /></button>
      </div>
    </div>
  );
};

export default Carrusel;