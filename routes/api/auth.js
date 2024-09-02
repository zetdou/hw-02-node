const express = require("express");
const router = express.Router();
const User = require("../../services/schemas/userSchema");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res, next) => {
    const {username, email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        return res.status(409).json({
            message: "This email is already taken!"
        })
    }
    try {
        const newUser = new User({username, email})
        await newUser.setPassword(password);
        await newUser.save();
        return res.status(201).json({message: "User created"});
    } catch (err) {
        next(err)
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(!user) {
        return res.status(401).json({
            message: "User not exists!"
        });
    }
    const isPasswordCorrect = await user.validatePassword(password)
    if(isPasswordCorrect) {
        const payload = {
            id: user._id,
            username: user.username
        }
        const token = jwt.sign(
            payload,
            process.env.SECRET,
            {expiresIn: "12h"}
        )
        return res.json({token})
    } else {
        return res.status(401).json({
            message: "Wrong password!"
        });
    }
});

module.exports = router;