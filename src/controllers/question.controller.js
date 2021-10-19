var response = require("../utils/res");
const { question, mission, score, user} = require("../db/models");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: total_items, rows: scores } = data;
  const current_page = page ? +page : 0;
  const total_pages = Math.ceil(total_items / limit);

  return { total_items, scores, total_pages, current_page };
};

exports.question_show = async (req, res) => {
  const id = req.params.id;
  if (id) {
    await question.findOne({
      where: {
        id: id
      },
      include: mission
    }).then((questions) => {
      const resData = {
        questions: questions,
      };
      response.ok(res, "load question data", resData);
    }).catch((err) => {
      console.log('questionShow findOne error : ', err);
    });
  } else {
    await question.findAll({ include: mission })
    .then( async (questions) => {
      const resData = {
        questions: questions,
      };
      response.ok(res, "load question data", resData);
    }).catch((err) => {
      console.log('questionShow findAll error : ', err);
    });
  }
};


exports.score_show = async (req, res) => {
  const id = req.params.id;
  if (id) {
    await score.findOne({
      where: {
        user_id: id
      }
    }).then((scores) => {
      const resData = {
        scores: scores,
      };
      response.ok(res, "load score data", resData);
    }).catch((err) => {
      console.log('scoreShow findOne error : ', err);
    });
  } else {
    const { page, size, title } = req.query;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const { limit, offset } = getPagination(page, size);

    await score.findAndCountAll({
      include: user,
      // where: condition,
      limit, offset
    })
    .then( async (scores) => {
      // const resData = {
      //   scores: scores,
      // };
      const resData = getPagingData(scores, page, limit);
      response.ok(res, "load scores data", resData);
      // response.ok(res, "load scores data", resData);
    }).catch((err) => {
      console.log('scoreShow findAll error : ', err);
    });
  }
};

exports.score_create = async (req, res) => {
  await score.create({
    user_id: req.body.user_id,
    question_id: req.body.question_id,
    score: req.body.score
  }).then((score) => {
    response.ok(res, "score created", 1);
  }).catch((err) => {
    console.log('score create error :', err);
  });
}

exports.score_update = async (req, res) => {
  const id = req.params.id;
  await score.update({
    score: req.body.score
  }, {
    where: {
      id: id
    }
  }).then((score) => {
    response.ok(res, "score updated", 1);
  }).catch((err) => {
    console.log('score updated error :', err);
  });
}

exports.score_delete = async (req, res) => {
  const id = req.params.id;
  const flag = req.params.flag;
  await score.update({
    delete_flag: flag == 1 ? 1 : null,
  }, {
    where: {
      id: id
    }
  }).then((score) => {
    var msg = "score unDeleted";
    if (flag == 1) {
      msg = "score deleted"
    }
    response.ok(res, msg, 1);
  }).catch((err) => {
    console.log('score deleted error :', err);
  });
}