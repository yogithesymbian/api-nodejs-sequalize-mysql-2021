var response = require("../utils/res");
const { user , role } = require("../models");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  // User.findOne({
  //   where: {
  //     username: req.body.username,
  //   },
  // }).then((user) => {
  //   if (user) {
  //     response.err(res, "Failed! Username is already in use!", 400);
  //     return;
  //   }

    // Email
    try {
      await user.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        if (user) {
          response.err(res, "Failed! Email is already in use!", 400);
          return;
        }

        next();
      });
    } catch (error) {
      console.log('an error : ', error);
    }
  // });
};

checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (await !role.includes(req.body.roles[i])) {
        var msg = "Failed! Role does not exist = " + req.body.roles[i];
        response.err(res, msg, 400);
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
