const db = require("../models/index")

const Posts = db.posts
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
  const { user_id, email, nickname, role } = res.locals.info
  console.log(res.locals.info)

  const { title, content, image_url } = req.body

  const post = await Posts.create({
    title: title,
    content: content,
    image_url: image_url,
    user_id: user_id, //인증을 해야함
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
  const post_id = req.params.post_id

  await Posts.update(
    {
      deletedAt: new Date(),
    },
    {
      where: { post_id: post_id },
    }
  )

  res.status(200).send("post deleted")
}

module.exports = {
  fetchList,
  createPost,
  readPost,
  updatePost,
  deletePost,
}
