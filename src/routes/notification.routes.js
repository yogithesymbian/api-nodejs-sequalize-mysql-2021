const { authJwt } = require("../middleware");
const controller = require("../controllers/notification.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // create
  app.post("/api/payment/notification",
    controller.payment_notification_listen
  );

};
