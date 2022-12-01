import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../AuthService";

const PrivateRoutePanelAdmin = ({ component: Component, ...rest }) => {
  const usuario = isAuthenticated();
  return (
    <Route {...rest}>{usuario.usuario && usuario.usuario.is_admin ? <Component /> : <Redirect to='/login' />}</Route>
  );
};

export default PrivateRoutePanelAdmin;