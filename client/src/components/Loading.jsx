import style from './styles/Loading.module.css';

const Loading = () => {
  return (
    <div>
      <div className={style.container}>
        <div className={style.containerHijo}>
          <span className={style.span}>Cargando</span>
          <svg className={style.svg} xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle className={style.opacity} cx="12" cy="12" r="10" stroke="black" stroke-width="4"></circle>
            <path className={style.path} fill="black" // black pinta el circle en negro
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Loading;