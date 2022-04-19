const db = require("../models/index")

const Comments = db.comments
const Users = db.users

/*############# Service logic ###################
1. bussiness logic 이라고 하다
2. Repository( data Access 기능)
Client -> Service -> Repository -> DB
#############################################*/

//Comment Service
class Repository {
  Create = async (user_id, post_id, data) => {
    return await Comments.create(data)
  }

  ReadAll = async () => {
    await Comments.findAll({
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["nickname"],
        },
      ],
      attributes: ["comment_id", "content", "createdAt"],
    })
  }

  Update = async (comment_id, body) => {
    await Comments.update(body, {
      where: {
        comment_id: comment_id,
      },
    })
  }

  Delete = async (comment_id) => {
    await Comments.update(
      {
        deletedAt: new Date(),
      },
      {
        where: { comment_id: comment_id },
      }
    )
  }
}

const comment = new Repository()

const commentService = {
  createComment: async (user_id, post_id, data) => {
    return comment.Create(data).then((result) => {
      console.log(result)
    })
  },

  getAllComments: async () => {
    return comment.ReadAll().then((result) => {
      console.log(result)
    })
  },

  updateComment: async (comment_id, body) => {
    return comment.Update(comment_id, body).then((result) => {
      console.log(result)
    })
  },

  deleteComment: async (comment_id) => {
    return comment.Delete(comment_id).then((result) => {
      console.log(result)
    })
  },
}

module.exports = commentService
