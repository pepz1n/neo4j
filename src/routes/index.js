import UsuarioRoutes from './usuarioRoute.js';
import EnderecoRoutes from './enderecoRoute.js';

const Routes = (app) => {
  app.use('/usuarios', UsuarioRoutes);
  app.use('/enderecos', EnderecoRoutes);
};

export default Routes;