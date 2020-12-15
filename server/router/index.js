import { Router } from 'express';

import user from './user';
import sign from './sign';
import pokemon from './pokemon';


const router = Router();
router
  .use(user)
  .use(sign)
  .use(pokemon);

router.get('/ping', (req, res) => res.send('pong'));

export default router;
