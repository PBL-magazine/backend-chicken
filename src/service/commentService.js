const commentRepo = require("../Repository/commentRepo")

//Comment Service
const commentService = {
  createComment: async (data) => commentRepo.Create(data),

  getAllComments: async (post_id) => commentRepo.searchByPostId(post_id),

  updateComment: async (comment_id, body) =>
    commentRepo.Update(comment_id, body),

  deleteComment: async (comment_id) => commentRepo.Delete(comment_id),
}

module.exports = commentService
