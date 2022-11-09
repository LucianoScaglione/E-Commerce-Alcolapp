import { useState, useEffect, createContext } from 'react';
import { isAuthenticated } from './AuthService';
import Login from './Login';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [usuarioActual, setUsuarioActual] = useState(undefined);

    useEffect(() => {
        const verificarLogueado = async () => {
            let cuser = isAuthenticated();
						console.log("userContext cuser: ", cuser)
            if (cuser === null) {
                localStorage.setItem('user', '');
                cuser = '';
            }
            setUsuarioActual(cuser);
        };
        verificarLogueado();
    }, []);

    return (
        <UserContext.Provider value={[usuarioActual, setUsuarioActual]}>
            {usuarioActual?.token ? children : <Login />}
        </UserContext.Provider>
    );
};


export default UserContext;