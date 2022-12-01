import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filtrarPorCategoria } from '../redux/actions';
import style from './styles/Filters.module.css';

const Filters = ({ setPaginaActual }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    categoria: '',
    min: '',
    max: ''
  });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(filtrarPorCategoria(input));
    setPaginaActual(1);
  };
  return (
    <div className={style.contenedor}>
      <button className={style.buttonTodos} onClick={() => dispatch(filtrarPorCategoria('todos'))}>Todos</button>
      <select name='categoria' onChange={handleChange}>
        <option hidden>Categoría</option>
        <option value='Whisky'>Whisky</option>
        <option value='Gin'>Gin</option>
        <option value='Cerveza'>Cerveza</option>
        <option value='Vino'>Vino</option>
      </select>
      <div className={style.divRangoPrecio}>
        <p>De</p>
        <input name='min' type='number' value={input.min} placeholder='min' disabled={!input.categoria.length} onChange={handleChange} />
        <p>a</p>
        <input name='max' type='number' value={input.max} placeholder='max' disabled={!input.min} onChange={handleChange} />
      </div>
      <div className={style.divBoton}>
        <button onClick={() => handleSubmit()} disabled={!input.categoria && !input.min && !input.max ? true : false}>Aplicar filtros</button>
      </div>
    </div>
  );
};

export default Filters;