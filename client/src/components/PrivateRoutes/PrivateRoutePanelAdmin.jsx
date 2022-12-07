import { Route } from "react-router-dom";
import { isAuthenticated } from "../AuthService";
import Error from "../Error";

const PrivateRoutePanelAdmin = ({ component: Component, ...rest }) => {
  const usuario = isAuthenticated();
  return (
    <Route {...rest}>{usuario.usuario && usuario.usuario.is_admin ? <Component /> : <Error />}</Route>
  );
};

export default PrivateRoutePanelAdmin;