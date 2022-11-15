import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/AdminPanel.module.css';
import Orders from './Orders';
import Products from './Products';
import Users from './Users';

const AdminPanel = () => {
  const [valor, setValor] = useState('usuarios');
  return (
    <div className={style.contenedor}>
      <Link className={style.linkUrl} to='/'>
      <p className={style.volver}>{'< Volver'}</p>
      </Link>
      <div className={style.contenedorAsideArticle}>
      <aside className={style.aside}> 
        <p className={ valor === 'usuarios' && style.pMarcado } onClick={() => setValor('usuarios')}>Usuarios</p>
        <p className={ valor === 'productos' && style.pMarcado } onClick={() => setValor('productos')}>Productos</p>
        <p className={ valor === 'ordenes' && style.pMarcado } onClick={() => setValor('ordenes')}>Órdenes</p>
      </aside>
      <article className={style.article}>
        {valor === 'usuarios' && <Users />}
        {valor === 'productos' && <Products />}
        {valor === 'ordenes' && <Orders />}
      </article>
      </div>
    </div>
    )
}

export default AdminPanel;