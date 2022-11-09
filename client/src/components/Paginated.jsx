import style from './styles/Paginated.module.css';

const Paginated = ({ productosPorPagina, paginado, productos }) => {
  const numeroDePaginas = [];
  for (let i = 1; i <= Math.ceil(productos / productosPorPagina); i++) {
    numeroDePaginas.push(i);
  }
  return (
    <nav className={style.contenedor}>
      <ul>
        { 
          numeroDePaginas?.map(numero => (
              <button key={numero} onClick={() => paginado(numero)}>{numero}</button>
            )  
          )
        }
      </ul>
    </nav>
  )
}

export default Paginated;