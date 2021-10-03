var response = require("../utils/res");
const { user } = require("../db/models");
const fs = require("fs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


exports.user_upload_image_update = async (req, res) => {
  const id = req.params.id;

  console.log(req.file.mimetype);
  console.log(req.file.originalname);

  fs.writeFileSync(
    __basedir + "/resources/static/assets/tmp/" + req.file.filename,
    fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
    )
  );
  await user.update({
    image_profile: req.file.originalname,
  }, {
    where: {
      id: id
    }
  }).then( async (user) => {

    response.ok(res, "user updated", 1);
  }).catch((err) => {
    console.log('user updated error :', err);
  });
}