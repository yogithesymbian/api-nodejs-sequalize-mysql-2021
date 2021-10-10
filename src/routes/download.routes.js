const { authJwt } = require("../middleware");
const controller = require("../controllers/download.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // findAll
  app.get("/api/excel/download/:date1/:date2",
    [authJwt.verifyToken],
    controller.download_excel
  );

  // findOne
  // app.get("/api/excel/download/:id",
  //   [authJwt.verifyToken],
  //   controller.controller_show
  // );

  // // create
  // app.post("/api/excel/download",
  //   [authJwt.verifyToken],
  //   controller.controller_create
  // );

  // // update
  // app.put("/api/excel/download/:id",
  //   [authJwt.verifyToken],
  //   controller.controller_update
  // );

  // // delete
  // app.delete("/api/excel/download/:id/:flag",
  //   [authJwt.verifyToken],
  //   controller.controller_delete
  // );
};
