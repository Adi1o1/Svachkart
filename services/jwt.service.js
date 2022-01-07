const jwt = require("jsonwebtoken");

const JWT__Strategy = {
    createJWT__Token: (payload) => {
        // Sign token
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: process.env.TOKEN_EXPIRE_TIME,
            },
            (err, token) => {
                if (err) {
                    return new Response(500, false, err);
                }
                return new Response(200, true, "Bearer " + token);
            }
        );
    },

    validate: (pass1, pass2) => {
        return bcrypt.compare(pass1, pass2)
    }
}

module.exports = JWT__Strategy;