/**
 * @file configuring JWT-session stratergy.
 * @author Krutin Trivedi <krutin@dal.ca>
 */

const UserService = require("../../services/user.service.js");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      
      try{
        let user = await UserService.fetchUser(jwt_payload.id)
        
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      }
      catch(err) {
        console.log(err);
      }
    })
  );
};