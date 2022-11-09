import { useState } from 'react';
import style from '../styles/AdminPanel.module.css';
import Categories from './Categories';
import Products from './Products';
import Users from './Users';

const AdminPanel = () => {
  const [valor, setValor] = useState('usuarios');
  return (
    <div className={style.contenedor}>
      <header className={style.header}>Panel de Admin</header>
      <div className={style.contenedorAsideArticle}>
      <aside className={style.aside}> 
        <p className={ valor === 'usuarios' && style.pMarcado  } onClick={() => setValor('usuarios')}>Usuarios</p>
        <p className={ valor === 'productos' && style.pMarcado  } onClick={() => setValor('productos')}>Productos</p>
        <p className={ valor === 'categories' && style.pMarcado  } onClick={() => setValor('categories')}>Categorías</p>
        <p>Órdenes</p>
      </aside>
      <article className={style.article}>
        {valor === 'usuarios' && <Users />}
        {valor === 'productos' && <Products />}
        {valor === 'categories' && <Categories />}
      </article>
      </div>
    </div>
    )
}

export default AdminPanel;