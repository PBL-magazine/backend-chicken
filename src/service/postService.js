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
    const { title, content, image, user_id } = data
    return await Posts.create({ title, content, image, user_id })
  }

  ReadbyId = async (post_id) => {
    return await Posts.findOne({
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["user_id", "email", "nickname"],
        },
      ],
      where: { post_id: post_id },
    })
  }

  ReadAll = async () => {
    return await Posts.findAll({
      include: [
        {
          raw: true,
          model: Users,
          as: "user",
          attributes: ["user_id", "email", "nickname"],
        },
        {
          raw: true,
          model : Likes,
          as : "like",
          attributes : ["user_id" ],
        }
      ],
    })
  }

  Update = async (post_id, body) => {
    return await Posts.update(body, { where: { post_id: post_id } })
  }

  Delete = async (post_id) => {
    return await Posts.destroy({
      where: { post_id },
    })
  }
}

const repo = new Repository()

const postService = {
  createPost: async (data) => {
    return repo.Create(data).then((result) => {
      return result
    })
  },

  getAllPosts: async () => {
    return await repo.ReadAll()
    // return await LIKE_SERVICE.fetchLikesCount()

  },
  // .map((el) =>el.get({plain : true})),

  getPost: async (post_id) => {
    return repo.ReadbyId(post_id).then((result) => {
      return result
    })
  },

  updatePost: async (post_id, body) => {
    return repo.updatePost(post_id, body).then((result) => {
      return result
    })
  },

  deletePost: async (post_id) => repo.Delete(post_id),
}

module.exports = postService
