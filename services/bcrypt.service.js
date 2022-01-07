const bcrypt = require("bcryptjs");

const _bcrypt = {
    hash: (userPassword) => {
        //Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {throw err};
            bcrypt.hash(
                userPassword,
                salt,
                (error_, hash) => {
                    if (error_) {console.log(error_); throw error_;};
                    return hash;
                }
            );
        });
    },

    validate: (pass1, pass2) => {
        return bcrypt.compare(pass1, pass2)
    }
}

module.exports = _bcrypt;