const { Users } = require("../models/users")
const { Comments } = require("../models/comments")
const { Posts} = require("../models/posts")

const postService = {
  // 게시물 전체 조회	/api/posts	GET
  fetchListPosts: async (req, res) => {
      const list = Posts.findAll({})


  },

  // 게시물 생성	/api/post	POST
  createPost: async (req, res) => {},

  // 특정 게시물 조회	/api/posts/:post_id	GET
  readPost: async (req, res) => {},

  // 특정 게시물 수정	/api/posts/:post_id	PATCH
  updatePost: async (req, res) => {},

  // 특정 게시물 삭제	/api/posts/:post_id	DELETE
  deletePost: async (req, res) => {},
}

module.exports = {
  postService,
}
