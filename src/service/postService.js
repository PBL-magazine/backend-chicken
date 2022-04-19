const db = require("../models/index")

const Posts = db.posts
const Users = db.users
/*############# Service logic ###################
1. bussiness logic 이라고 하다
2. Repository( data Access 기능)
Client -> Service -> Repository -> DB
#############################################*/

class Repository {
  Create = async (data) => {
    const { title, content, image_url, user_id } = data
    return await Posts.create({ title, content, image_url, user_id })
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
      ],
    })
  }

  Update = async (post_id, body) => {
    return await Posts.update(body, { where: { post_id: post_id } })
  }

  Delete = async (post_id) => {
   return await Posts.destory(
      {
        deletedAt: new Date(),
      },
      {
        where: { post_id: post_id },
      }
    )
  }
}

const repo = new Repository()

const postService = {
  createPost: async (data) => {
    return repo.Create(data).then((result) => {
      console.log(result)
    })
  },

  getAllPosts: async () => {
    return repo.ReadAll().then((result) => {
      console.log(result)
    })
  },

  getPost: async (post_id) => {
    return repo.ReadbyId(post_id).then((result) => {
      console.log(result)
    })
  },
  updatePost: async (post_id, body) => {
    return repo.updatePost(post_id, body).then((result) => {
      console.log(result)
    })
  },
  deletePost: async (post_id) => {
    return repo.deletePost(post_id).then((result) => {
      console.log(result)
    })
  },
}

module.exports = postService
