import { Router } from 'express';
import { sign } from 'controllers';
import passport from 'passport';

const routerInstance = Router();

routerInstance.route('/sign')
  .post(sign.signIn)
  .delete(sign.signOut);

routerInstance.get('/sign/gmail',
  passport.authenticate('google', { scope: ['profile', 'email'] }));


// http://localhost:8000/sign/gmail/callback

routerInstance.get('/sign/gmail/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

export default routerInstance;
