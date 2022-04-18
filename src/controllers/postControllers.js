const db = require("../models/index")

const Posts = db.posts
const Comments = db.comments
const Users = db.users

// 게시물 전체 조회	/api/posts	GET
const fetchList = async (req, res) => {
  const post = await Posts.findAll({
    include: [
      {
        raw: true,
        model: Users,
        as: "user",
        attributes: ["user_id", "email", "nickname"],
      },
    ],
  })
  res.status(200).send({ post: post })
}

// 게시물 생성	/api/post	POST
const createPost = async (req, res) => {
  console.log(req.body)
  const { title, content, image_url } = req.body

  const post = await Posts.create({
    title: title,
    content: content,
    image_url: image_url,
    user_id: 1, //인증을 해야함
  })
  res.status(200).send(post)
}

// 특정 게시물 조회
// router.get('/posts/:post_id')
const readPost = async (req, res) => {
  let id = req.params.post_id

  const post = await Posts.findOne({
    include: [
      {
        model: Users,
        as: "user",
        attributes: ["user_id", "email", "nickname"],
      },
    ],
    where: { post_id: id },
  })
  res.status(200).send(post)
  console.log(post)
}

// // 특정 게시물 수정	/api/posts/:post_id	PATCH
// router.patch('/posts/:post_id')
const updatePost = async (req, res) => {
  let id = req.params.post_id
  console.log(id)

  // const info = ({ title, content } = req.body)

  const post = await Posts.update(req.body, { where: { post_id: id } })
  res.status(200).send(post)
}

// // 특정 게시물 삭제	/api/posts/:post_id	DELETE
// router.delete('/posts/:post_id')
const deletePost = async (req, res) => {
  let id = req.params.post_id

  await Posts.destory({ where: { post_id: id } })
  res.status(200).send("posts deleted")
}

module.exports = {
  fetchList,
  createPost,
  readPost,
  updatePost,
  deletePost,
}
