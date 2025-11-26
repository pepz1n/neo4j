import UsuarioRoutes from './usuarioRoute.js';

const Routes = (app) => {
  app.use('/usuarios', UsuarioRoutes);
};

export default Routes;