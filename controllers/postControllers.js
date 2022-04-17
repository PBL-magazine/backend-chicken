const db = require("../models/index")

const Posts = db.posts
const Comments = db.comments

// 게시물 전체 조회	/api/posts	GET
const fetchList = async (req, res) => {
  const post = await Posts.findAll({
    attribute: ["title", "content"],
  })
  res.status(200).send(post)
}

// 게시물 생성	/api/post	POST
const creaetPost = async (req, res) => {
  conosle.log(req.body)
  const info = ({ title, content } = req.body)

  const post = await Posts.create(info)
  res.status(200).send(post)
  console.log(post)
}

// // 특정 게시물 조회	/api/posts/:post_id	GET
// router.get('/posts/:post_id')
const readPost = async (req, res) => {
  let id = req.params.post_id

  const post = await Posts.findOne({ where: { id: id } })
  res.status(200).send(post)
  console.log(post)
}

// // 특정 게시물 수정	/api/posts/:post_id	PATCH
// router.patch('/posts/:post_id')
const updatePost = async (req, res) => {
  let id = req.params.post_id
  const info = ({ title, content } = req.body)

  const post = await Posts.update(req.body, { where: { id: id } })
  res.status(200).send(post)
  console.log(post)
}

// // 특정 게시물 삭제	/api/posts/:post_id	DELETE
// router.delete('/posts/:post_id')
const deletePost = async (req, res) => {
  let id = req.params.post_id

  await Posts.destory({ where: { id: id } })
  res.status(200).send("posts deleted")
}

module.exports = {
  fetchList,
  creaetPost,
  readPost,
  updatePost,
  deletePost,
}
