const db = require("../models/index")

const Comments = db.comments
const Posts = db.posts
const Users = db.users

// 게시물 전체 조회	/api/posts	GET
const fetchCommentList = async (req, res) => {
  const post = await Comments.findAll({})
  res.status(200).send({ comments: comment })
}

// 게시물 생성	/api/post	POST
const createComment = async (req, res) => {
  const { content } = req.body
//   const user_id = req.params.user_id

  // 인증과정을 거처서  인증이 (토큰이 확인 되면 ) user_id 반환

  const post = await Comments.create({
    content: content,
    user_id: 1, //인증을 해야함
  })
  res.status(200).send(post)
}

// // 특정 게시물 조회	/api/posts/:post_id	GET
// router.get('/posts/:post_id')
const readComment = async (req, res) => {
  let id = req.params.post_id

  const post = await Comments.findOne({
    include: [{ model: Posts, as: "post" }],
    where: { post_id: id },
  })
  res.status(200).send(post)
  console.log(post)
}

// 특정 코멘트 수정
// router.patch('/posts/:post_id/comment/:comment_id')
const updateComment = async (req, res) => {
  let comment_id = req.params.comment_id
  let post_id = req.params.post_id

  const info = ({ content } = req.body)

  const post = await Comments.update(req.body, { where: { comment_id: comment_id, post_id : post_id } })
  res.status(200).send(post)
}

// 특정 코멘트 삭제
// router.delete('/posts/:post_id/comment/:comment_id')
const deleteComment = async (req, res) => {
  let id = req.params.comment_id

  await Comments.destory({ where: { comment_id: id } })
  res.status(200).send("posts deleted")
}

module.exports = {
  fetchCommentList,
  createComment,
  readComment,
  updateComment,
  deleteComment,
}
