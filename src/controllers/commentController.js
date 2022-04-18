const db = require("../models/index")

const Comments = db.comments
const Posts = db.posts
const Users = db.users

// 게시물 전체 조회	/api/posts	GET
const fetchCommentList = async (req, res) => {
  console.log(req.params.post_id)
  const post = await Comments.findAll({
    where: {
      post_id: req.params.post_id,
    },
    include: [
      {
        model: Users,
        as: "user",
        attributes: ["nickname"],
      },
    ],
    attributes: ["comment_id", "content", "createdAt"],
  })

  console.log(post)
  res.status(200).send({ comments: post })
}

// 게시물 생성	/api/post	POST
const createComment = async (req, res) => {
  const { user_id, email, nickname, role } = res.locals.info
  const { content } = req.body
  //   const user_id = req.params.user_id

  // 인증과정을 거처서  인증이 (토큰이 확인 되면 ) user_id 반환

  const post = await Comments.create({
    content: content,
    user_id: user_id, //인증을 해야함
    post_id: req.params.post_id,
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
  const { user_id, email, nickname, role } = res.locals.info
  const post_id = req.params.post_id
  const comment_id = req.params.comment_id

  const comparing = await Comments.update(req.body, {
    where: {
      post_id: post_id,
      user_id: user_id,
      comment_id: comment_id,
    },
  })

  res.send({ result: comparing })
  res.status(200).send(comparing)
}

// 특정 코멘트 삭제
// router.delete('/posts/:post_id/comment/:comment_id')
const deleteComment = async (req, res) => {
  const comment_id = req.params.comment_id

  await Comments.update(
    {
      deletedAt: new Date(),
    },
    {
      where: { comment_id: comment_id },
    }
  )

  res.status(200).send("comment deleted")
}

module.exports = {
  fetchCommentList,
  createComment,
  readComment,
  updateComment,
  deleteComment,
}
