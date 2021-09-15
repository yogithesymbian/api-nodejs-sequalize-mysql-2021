var response = require("../utils/res");
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op; // operators

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) =>  {
  // Save User to Database
  await User.create({
    // username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then( async (user) => {
      console.log(`create user`);
      if (req.body.roles) {
        console.log(`create user have roles`);
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then( async (roles) => {
          await user.setRoles(roles).then(() => {
            const resData = {
              user: user,
            };
            response.ok(res, "User was registered successfully!", resData);
          });
        });
      } else { // default role if request doesn't have set the data
      console.log(`create user have not roles`);
        // user.setRoles([1])
        console.log(`data user id : ` + user.id);
        console.log(`data user email : ` + user.email);
        await user.setRoles([2]).then(() => {
          const resData = {
            user: user,
          };
          response.ok(res, "User was registered successfully!", resData);
        });
      }
    })
    .catch((err) => {
      response.err(res, err.message, 500);
    });
};

exports.signin = async (req, res) => {
  await User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then( async (user) => {
      if (!user) {
        return response.err(res, "User Not found.", 404);
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return response.err(res, "Invalid Password!", 401);
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400000, // 24000 hours
        // expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      await user.getRoles().then( async (roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        const resData = {
          user: user,
          roles: authorities,
          accessToken: token,
        };
        response.ok(res, "User was login successfully!", resData);
      });
    })
    .catch((err) => {
      return response.err(res, err.message, 500);
    });
};
