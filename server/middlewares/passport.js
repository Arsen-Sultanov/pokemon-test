import { Strategy as LocalStrategy } from 'passport-local';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { server } from 'config';
import { User } from 'models';

export const localStrategy = new LocalStrategy(async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!(user === password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export const serializeUser = (user, done) => {
  done(null, user.id);
};

export const deserializeUser = async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) done(null, user);
  } catch (err) {
    done(err, null);
  }
};

export const checkAuth = (req, res, next) => {
  req.isAuthenticated()
    ? next()
    : res.status(401).send({ message: 'Unauthorized' });
};

export const googleStrategy = new GoogleStrategy(server.soc.google,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ googleId: profile.id });
      if (!user) {
        const user = new User({
          email: profile._json.email,
          username: profile._json.email.replace('@gmail.com', ''),
          googleId: profile.id
        });
        await user.save();
        return done(false, user);
      }
      return done(false, user);
    } catch (error) {
      return done(error, {});
    }
  });
