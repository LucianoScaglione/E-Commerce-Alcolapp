import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../AuthService";

const PrivateRouteFavorites = ({ component: Component, ...rest }) => {
  const usuario = isAuthenticated();
  return (
    <Route {...rest}>{usuario.usuario ? <Component /> : <Redirect to='/login' />}</Route>
  );
};

export default PrivateRouteFavorites;