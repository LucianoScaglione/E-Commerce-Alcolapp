import { useState } from 'react'
import style from './styles/Carrusel.module.css'
import imagen1 from '../images/whisky.jpg'
import imagen2 from '../images/gin.jpg'
import imagen3 from '../images/vino.jpg'
import imagen4 from '../images/cerveza.jpg'
import flechaizquierda from '../images/flechaizquierda.svg';
import flechaderecha from '../images/flechaderecha.svg';

const Carrusel = () => {
  const [imagenActual, setImagenActual] = useState(0)
  const imagenes = [ imagen1, imagen2, imagen3,imagen4];
  const cantidad = imagenes?.length
  if (!Array.isArray(imagenes)) { return; }
  const imagenPosterior = () => {
    setImagenActual(imagenActual === cantidad - 1 ? 0 : imagenActual + 1)
  }
  const imagenAnterior = () => {
    setImagenActual(imagenActual === 0 ? cantidad - 1 : imagenActual - 1)
  }
  return (
    <div>
      { 
        imagenes.length && imagenes.map((imagen, index) => {
          return (
            <div className={imagenActual === index ? `${style.slide} ${style.active}` : `${style.slide}` }>
              {
                imagenActual === index &&
                <img className={style.imagenes} key={index} src={imagen} alt='imagen' />
              }
            </div>
          )
        })
      }
      <div className={style.contenedor}>
      <button onClick={imagenPosterior}><img src={flechaizquierda} alt='Siguiente' /></button>
      <button onClick={imagenAnterior}><img src={flechaderecha} alt='Anterior' /></button>
      </div>
    </div>
  )
}

export default Carrusel;