const User = require("../Models/user.model.js");
const Response = require("../Models/response.model.js");
const jwtService = require("./jwt.service.js");
const UserDOA = require("../db/user.db.js");

const UserServices = {
    fetchAllUser: async () => {
        try {
            let user = await User.find()
            
            if (user) {
                return new Response(200, true, user);
            } else {
                return new Response(200, true, 'No users to fetch');
            }
        } catch (error) {
            return new Response(500, false, "Internal server error");
        }
    },

    fetchUser: async (userID) => {   
        try {
            let user = await User.findById(userID);

            if (user) {
                return new Response(200, true, user);
            } else {
                return new Response(200, true, "No user with that user ID")
            }
        } catch (error) {
            console.log("🚀 ~ file: user.service.js ~ line 57 ~ fetchUser: ~ error", error)
            return new Response(500, false, "Internal server error");
        }
    },

    login: async () => {      
        try {
            // Find user by email
            let user = await User.findById(userID);

            // Check if user exists
            if (!user) {
                return new Response( 400 ,false, "Error: Email not found");
            }

            try {
                let isValid = await bcrypt.validate(password, user.password);

                if (isValid) {
                    
                    // User matched
                    // Create JWT Payload
                    const payload = {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                    };

                    jwtService.createJWT__Token(payload);

                    
                } else {
                    return new Response(400, false, "Password incorrect");
                }
                
            } catch (error) {
                return new Response(500, false, "Internal server error");
            }
        } catch (error) {
            console.log("🚀 ~ file: user.service.js ~ line 103 ~ login: ~ error", error)
            return new Response(500, false, "Internal server error");
        }
    },

    createUser: async (newUserData) => {
        
        //Validation
        if (typeof newUserData == "undefined" && newUserData !== null) {
            return new Response(400, false, 'user data is empty or bad, will not be able create new user!!');
        }
        if (
            Object.keys(newUserData).length === 0 &&
            newUserData.constructor === Object
        ) {
            return new Response(400, false, 'user data is empty or bad, will not be able create new user!!');
        }

        const newUser = new User({
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            email: newUserData.email,
            password: newUserData.password,
            role: newUserData.role,
            address: newUserData.address,
            phone: newUserData.phone,
            gender: newUserData.gender,
        });
        console.log("🚀 ~ file: user.service.js ~ line 98 ~ newUser", newUser)

        try {
            let foundUser = await User.findOne({ email: newUser.email })

            if(foundUser){
                console.log("🚀 ~ file: user.service.js ~ line 99 ~ .then ~ user", foundUser)
                return new Response(400, false, "Oops! Email id is already taken.");
            } else {
                try{
                    
                    newUser.password = bcrypt.hash(newUser.password);
                    
                    let newCreatedUser = await newUser.save()
                    
                    if(newCreatedUser){
                        return new Response(200, true, newCreatedUser);
                    } else {
                        console.log('System was not able to create a new record.');
                        return new Response(400, false, "Bad Request!");
                    }
                } catch(error) {
                    return new Response(500, false, "Internal server error");
                }
            }
        } catch (error) {
            console.log("🚀 ~ file: user.service.js ~ line 124 ~ createUser: ~ error", error)
            return new Response(500, false, "Internal server error");
        }
    },

    deleteUser: async (userID) => {
        try {
            let user = await User.findByIdAndRemove(userID).exec();
    
            if (user) {
                return new Response(200, true, user);
            } else {
                console.log("No user found with this specified _ID, Aborting update."); 
                return new Response(400, false, "Bad Request!");
            }
        } catch (error) {
            return new Response(500, false, "Internal server error");
        }
    },

    updateUser: async (userID, userUpdates) => {

        //Validation
        if (typeof userUpdates == "undefined" && userUpdates !== null) {
            throw new Error('user data is empty or bad, will not be able update the user!!');
        }
        if (
            Object.keys(userUpdates).length === 0 &&
            userUpdates.constructor === Object
        ) {
            throw new Error('user data is empty or bad, will not be able update the user!!');
        }
        if (typeof userID == "undefined" && userID !== null) {
            throw new Error('user _ID is empty or bad, will not be able update the user!!');
        }
        
        try {
            let user = await User.findById(userID);
    
            if (user) {
                user.firstName = userUpdates.firstName;
                user.lastName = userUpdates.lastName;
                user.address = userUpdates.address;
                user.phone = Number(userUpdates.phone);
                user.gender = userUpdates.gender;

                try {
                    let newUser = await user.save();

                    if (newUser){
                        return new Response(200, true, user);
                    } else {
                        console.log("Will never reach else but added as a debug point, Aborting update.") 
                        return new Response(400, false, 'Bad request!');
                    }
                } catch (error) {
                    return new Response(500, false, "Internal server error");
                }
            
            } else {
                console.log("No user found with this specified _ID, Aborting update.");
                return new Response(400, false, 'Bad request!');
            }
        } catch (error) {
            return new Response(500, false, "Internal server error");
        }
    },
};

module.exports = UserServices;
