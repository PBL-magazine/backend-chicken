const express = require("express")
const router = express.Router()
const db = require("../models/index")

const Posts = db.posts
const Comments = db.comments
const Likes = db.likes
const Users = db.users

//api

// 게시물 전체 조회	/api/posts	GET
router.get("/posts", async (req, res) => {
  const posts = await Posts.findAll({})
  const users = await Users.findAll({
    //   include : [{
    //       model : Posts,
    //       as : Posts,
    //       attributes : ['email', 'nickname']
    //   }]
  })
  const comments = await Comments.findAll({})

  const createuser = Users.build({
    nickname: "유저1",
    email: "diasm2@gmail.com",
    password: "1234",
    role: 1,
  })

  const createpost = Posts.build({
    content: "내용",
    user_id: 1,
  })

  const createcomment = async () =>
    await Comments.create({
      content: "내용입니다",
      // post_id : 1,
      // user_id : 2,
    })

  // excute()
  // createcomment()

  res.json({ test: "ok", posts: posts, Users: users, comments: comments })
})

// 게시물 생성	/api/post	POST
router.post("/posts", async (req, res) => {
  const { content } = req.body
  const list = await Posts.findAll({})

  res.json({ test: "ok", data: list })
})

// // 특정 게시물 조회	/api/posts/:post_id	GET
// router.get('/posts/:post_id')
// // 특정 게시물 수정	/api/posts/:post_id	PATCH
// router.patch('/posts/:post_id')
// // 특정 게시물 삭제	/api/posts/:post_id	DELETE
// router.delete('/posts/:post_id')

// // 특정 게시물 좋아요 상태 변경	/api/posts/:post_id/like	PUT
// router.put('/posts/:post_id/like')

// // 특정 게시물 전체 댓글 조회	/api/posts/:post_id/comments	GET
// router.get('/posts/:post_id/comments')
// // 특정 게시물 댓글 생성	/api/posts/:post_id/comments	POST
// router.post('/posts/:post_id/comments')
// // 특정 게시물 댓글 수정	/api/posts/:post_id/comments/:comment_id	PATCH
// router.patch('/posts/:post_id/comments/:comment_id')
// // 특정 게시물 댓글 삭제	/api/posts/:post_id/comments/:comment_id	DELETE
// router.delete('/posts/:post_id/comments/:comment_id')

// // 사용자 회원가입	/api/users/signup	POST
// router.post("/users/signup")
// // 사용자 로그인	/api/users/signin	POST
// router.post("/users/signin")
// // 인증처리 미들웨어	/api/users/auth	GET
// router.get("/users/auth")

module.exports = router
