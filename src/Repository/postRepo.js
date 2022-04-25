'use strict';
const db = require('../models/index');

const Users = db.users
const Posts = db.posts
const Comments = db.posts
const Likes = db.likes

module.exports = new class postRepo {
  constructor() { }
  Create = async (data) => {
    const { content, image_url, user_id } = data;
    return await Posts.create({ content, image_url, user_id });
  };

  // raw와 nest 옵션을 썼을때 차이점을 확인해해라
  ReadbyId = async (post_id) => {
    return await Posts.findOne({
      // raw: true,
      // nest: true,
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["user_id", "email", "nickname"],
        },
        {
          model: Likes,
          as: "likes",
          attributes: ["user_id"],
        },
      ],
      where: { post_id },
    });
  };

  ReadAll = async () => {
    return await Posts.findAll({
      // raw: true,
      // nest: true,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["user_id", "email", "nickname"],
        },
        {
          model: Likes,
          as: "likes",
          attributes: ["user_id"],
        },
      ],
    });
  };

  Update = async (content, post_id) => {
    return await Posts.update(content, { where: { post_id: post_id } });
  };

  Delete = async (post_id) => {
    return await Posts.destroy({
      where: { post_id },
    });
  };
};
