import { Router } from 'express';
import { favorite } from 'controllers';
import { passport } from 'middlewares';

const routerInstance = Router();

routerInstance.use(passport.checkAuth);

routerInstance
  .route('/favorite/:id')
  .put(favorite.add)
  .delete(favorite.deleteFavorite);

routerInstance
  .get('/favorite', favorite.get);

export default routerInstance;
