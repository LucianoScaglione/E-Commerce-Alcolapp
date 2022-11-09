import axios from 'axios';

export const login = async (email, contraseña) => {
    const response = await axios.post('http://localhost:3001/login', {
        email,
        contraseña
    });
    console.log("response: ", response)
    const token = response.data.token;
    if (token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log("json stringify: ", JSON.stringify(response.data))
    }
    console.log("token: ", token)
    return response.data;
};

export const register = async (nombre, apellido, email, contraseña, celular) => {
    const registrar = await axios.post ('http://localhost:3001/register', {
        nombre,
        apellido,
        email,
        contraseña,
        celular
    });
    return registrar;
}

export const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    if (!user) {
        return {}
    }
    return JSON.parse(user);
};