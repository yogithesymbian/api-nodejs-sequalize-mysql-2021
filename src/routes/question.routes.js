const { authJwt } = require("../middleware");
const controller = require("../controllers/question.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    // findAll
    app.get("/api/question",
      [authJwt.verifyToken],
      controller.question_show
    );

    // findOne
    app.get("/api/question/:id",
      [authJwt.verifyToken],
      controller.question_show
    );

    // findAll
    app.get("/api/score",
      [authJwt.verifyToken],
      controller.score_show
    );

    // findOne
    app.get("/api/score/:id",
      [authJwt.verifyToken],
      controller.score_show
    );

    // create
    app.post("/api/score",
      [authJwt.verifyToken],
      controller.score_create
    );

    // update
    app.put("/api/score/:id",
      [authJwt.verifyToken],
      controller.score_update
    );

    // delete
    app.delete("/api/score/:id/:flag",
      [authJwt.verifyToken],
      controller.score_delete
    );
};
