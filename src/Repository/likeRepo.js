'use strict';
const db = require('../models/index');
const Likes = db.likes
const { Op } = require("sequelize");

module.exports = new class likeRepo {
  constructor() { }
  saveLike = async (post_id, user_id) => {
    await Likes.create({ post_id, user_id });
  };

  removeLike = async (post_id, user_id) => {
    await Likes.destroy({
      where: {
        [Op.and]: [{ post_id: post_id }, { user_id: user_id }],
      },
    });
  };

  checkLike = async (post_id, user_id) => {
    return await Likes.findOne({
      where: {
        post_id,
        user_id,
      },
    });
  };
}
