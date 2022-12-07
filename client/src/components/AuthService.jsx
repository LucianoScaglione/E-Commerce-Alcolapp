import axios from 'axios';

export const login = async (email, contraseña) => {
  const response = await axios.post('http://localhost:3001/login', {
    email,
    contraseña
  });
  const token = response.data.token;
  if (token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  };
  setTimeout(() => {
    window.location.reload();
  }, 10);
  return response.data;
};

export const register = async (nombre, apellido, email, contraseña, celular, imagen) => {
  const registrar = await axios.post('http://localhost:3001/register', {
    nombre,
    apellido,
    email,
    contraseña,
    celular,
    imagen
  });
  return registrar;
};

export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  if (!user) {
    return {}
  };
  return JSON.parse(user);
};