"use strict"
// const  postRepo  = new (require("./repository"))()
const postRepo = require("../Repository/postRepo")

const postService = {
  createPost: async (data) => {
   return await postRepo.Create(data)
  },

  getAllPosts: async () => {
   return await postRepo.ReadAll()
  },

  getPost: async (post_id) => {
   return await postRepo.ReadbyId(post_id)
  },

  updatePost: async (content, post_id) => {
   return await postRepo.Update(content, post_id)
  },

  deletePost: async (post_id) => {
   return await postRepo.Delete(post_id)
  },
}

module.exports = postService
