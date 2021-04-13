const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const config = require("../../config/index");

const { JWT_SECRET } = config;

const router = express.Router();

// Get All User / GET
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(400).json({ msg: "유저 없다" });
    }
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
  }
});
// REGISTER USER / POST
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name) return res.status(400).json({ msg: "이름 작성 다시" });
  else if (!email) return res.status(400).json({ msg: "이메일 작성 다시" });
  else if (!password) return res.status(400).json({ msg: "비번 작성 다시" });

  User.findOne({ email }).then((users) => {
    if (users) return res.status(400).json({ msg: "이미 존재함" });

    const newUser = new User({
      name,
      email,
      password,
    });

    // 해쉬 패스워드
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ err });

        newUser.password = hash;
        newUser.save().then((user) => {
          //sign(유저 정보, secretKey, option, function)
          //token = 유저정보 +secretKey
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) return res.status(400).json({ error });
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

// Change User Password / POST
router.post("/changepassword", async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ msg: "이메일을 작성해주세요." });
  else if (!password)
    return res.status(400).json({ msg: "비밀번호를 입력해주세요." });

  User.findOne({ email }).then((user) => {
    if (!users) return res.status(400).json({ msg: "없는 이메일입니다." });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(400).json({ err });

        try {
          await User.findByIdAndUpdate(
            user.id,
            { password: hash },
            { new: true }
          );

          res.json("success");
        } catch (e) {
          console.log(e);
        }
      });
    });
  });
});
module.exports = router;
