const db = require("../models/index")

const Comments = db.comments
const Users = db.users
const Posts = db.posts

/*############# Service logic ###################
1. bussiness logic 이라고 하다
2. Repository( data Access 기능)
Client -> Service -> Repository -> DB
#############################################*/

//Comment Service
class Repository {
  Create = async (data) => {
    const { user_id, post_id, content } = data
    return await Comments.create({ user_id, post_id, content })
  }

  searchByPostId = async (post_id) => {
    return await Comments.findAll({
      raw: true,
      nest: true,
      order : [['createdAt', 'DESC']],
      where: {
        post_id,
      },
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["user_id", "email", "nickname"],
        },
      ],
    })
  }

  Update = async (comment_id, body) => {
    return await Comments.update(body, {
      where: {
        comment_id: comment_id,
      },
    })
  }

  Delete = async (comment_id) => {
    return await Comments.update(
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
  createComment: async (data) => {
    return comment.Create(data)
  },

  getAllComments: async (post_id) => {
    return comment.searchByPostId(post_id)
  },

  updateComment: async (comment_id, body) => {
    return comment.Update(comment_id, body).then((result) => {})
  },

  deleteComment: async (comment_id) => {
    return comment.Delete(comment_id).then((result) => {})
  },
}

module.exports = commentService
