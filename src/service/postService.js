const db = require("../models/index")
const LIKE_SERVICE = require("../service/likeService")

const Posts = db.posts
const Users = db.users
const Likes = db.likes

/*############# Service logic ###################
1. bussiness logic 이라고 하다
2. Repository( data Access 기능)
Client -> Service -> Repository -> DB
#############################################*/

class Repository {
  Create = async (data) => {
    const { content, image_url, user_id } = data
    return await Posts.create({ content, image_url, user_id })
  }

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
    })
  }

  ReadAll = async () => {
    return await Posts.findAll({
      // raw: true,
      // nest: true,
      order : [['createdAt', 'DESC']],
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
    })
  }

  Update = async (content, post_id) => {
    return await Posts.update(content, { where: { post_id: post_id } })
  }

  Delete = async (post_id) => {
    return await Posts.destroy({
      where: { post_id },
    })
  }
}

const repo = new Repository()

const postService = {
  createPost: async (data) => repo.Create(data),

  getAllPosts: async () => await repo.ReadAll(),

  getPost: async (post_id) => await repo.ReadbyId(post_id),

  updatePost: async (content, post_id) =>
    await repo.Update(content, post_id),

  deletePost: async (post_id) => await repo.Delete(post_id),
}

module.exports = postService
