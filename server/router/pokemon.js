import { Router } from 'express';
import * as pokemon from '../controllers/pokemon';

const routerInstance = Router();

routerInstance.route('/pokemon')
  .get(pokemon.get)
  .put(pokemon.add);

routerInstance.route('/pokemon/:id')
  .get(pokemon.getById)
  .post(pokemon.updateById)
  .delete(pokemon.deleteById);


export default routerInstance;
