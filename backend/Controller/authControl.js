const User = require('../Models/User');
const jwt = require('jsonwebtoken')

exports.postLogin = async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        console.log(email, password)


        if(!(email && password)){
            return res.status(300).json({
                message : "Insuficient Data"
            });
        }

        const userFind = await User.findOne({ email : email});
        if(!userFind){
            return res.status(206).json({
                message : "User Not Found!!"
            })
        }
        if(userFind.password == password){
            const payload = {
                email : userFind.email,
                username : userFind.username
            };
    
            const secret = process.env.jwtTokenSecret;
            const authToken = jwt.sign(payload , secret , {
                expiresIn : '10h'
            });

            return res.status(200).json({
                auth_token : "bearer " + authToken,
                user : userFind,
                message : "User Logged In"
            });    

        }else{
            return res.status(300).json({
                message : "Incorrect Password"
            });
        }

    }catch(err){
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

exports.postSignup = async(req, res) => {
    try {
        const body = req.body;
        // console.log(body);
        const userData = {
            email : body.email,
            username : body.username,
            password : body.password
        }
        console.log(userData);
        if((userData.email == null || userData.username == null || userData.password == null)){
            return res.status(300).json({
                message : "Insuficient Data"
            });
        }

        const checkUser = await User.find({ email : userData.email });
        if(checkUser){
            return res.status(300).json({
                message : "Email is Used by another user"
            });
        }

        const newUser = new User({
            email : userData.email,
            username : userData.username,
            password : userData.password,
            courses : []
        });

        await newUser.save();
        const payload = {
            email : userData.email,
            username : userData.username
        };

        const secret = process.env.jwtTokenSecret;
        const authToken = jwt.sign(payload , secret , {
            expiresIn : '10h'
        });

        return res.status(200).json({
            auth_token : "bearer " + authToken,
            user : userData,
            message : "User Created"
        });    

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

exports.getUser = async(req , res) => {
    try {
        const email = req.email;
        const user = await User.findOne({ email : email });
        if(!user){
            return res.status(400).json({
                message : "User Not Found"
            });
        }

        return res.status(200).json({
            user
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : "Server Error"
        })
    }
}

exports.dummy = async(req, res) => {
    try {

    }catch(err){
        return res.status(500).json({
            message : "Server Error"
        })
    }
}