const express = require("express");
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const {auth} = require("../../middleware/auth");
const config = require("../../config/index");

const { JWT_SECRET } = config;

const router = express.Router();
// LOGIN / POST
router.post("/login",(req,res) => {
    const {email,password} = req.body;

    if(!email) 
       return res.status(400).json({msg: "이메일 작성 다시"});
    else if(!password) 
       return res.status(400).json({msg: "비번 작성 다시"});

       User.findOne({email}).then((user)=>{
           if(!user) return res.status(400).json({msg: "이메일을 확인"});
           
           bcrypt.compare(password,user.password).then((isMatch)=>{
               if(!isMatch){
                   return res.status(400).json({msg:"비밀번호 확인"});
                 }
                 jwt.sign(
                    {id: user.id},
                    JWT_SECRET,
                    {expiresIn: 3600},
                    (err,token) => {
                        if(err) return res.status(400).json({error});
                        
                        res.json({
                            token,
                            user:{
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                            }
                        })
                    }

                )
           })

          
       })
})
// LOGOUT / POST
router.post("/logout", (req,res)=>{
    res.json("LOGOUT SUCCESS")
})
//  Authentication / GET
router.get("/user", auth, async(req,res)=>{
    try{
        const user = await (await User.findById(req.user.id)).select("-password");
    
        if(!user){
            return res.status(400).json({msg: "유저 존재않함"})
        }

        res.json(user);
    }catch(e){
        res.status(400).json({msg: e.message});
    }
})

module.exports = router;

