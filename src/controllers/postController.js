const router = require("express").Router()
const auth = require("../auth/auth")
const POST_SERVICE = require("../service/postService")

/*############# controller ###################
컨트롤러는 데이터를 라우터 + 받아오는 
#############################################*/

// 게시물 전체 보여주기
router.get("/posts", async (req, res) => {
  POST_SERVICE.getAllPosts()

  res.status(200).send({ post: "good" })
})
// 게시물 등록
router.post("/posts", auth, async (req, res) => {
  const { user_id } = res.locals.info
  const { title, content, image_url } = req.body

  POST_SERVICE.createPost({ title, content, image_url, user_id })

  res.status(200).send("done")
})

// 특정 게시물 조회
router.get("/posts/:post_id", async (req, res) => {
  const { post_id } = req.params.post_id

  POST_SERVICE.getPost(post_id)

  res.status(200).send("good")
})

// 게시물 하나 업데이트 하기
router.put("/posts/:post_id", auth, async (req, res) => {
  const { post_id } = req.params.post_id

  POST_SERVICE.updatePost(post_id, req.body)

  res.status(200).send("good")
})

// 게시물 하나 지우기
router.delete("/posts/:post_id", auth, async (req, res) => {
  const { post_id } = req.params.post_id

  res.status(200).send("post deleted")
})

// like
router.put("/posts/:post_id/like", auth) // 특정 게시물 좋아요 상태 변경


// Register, Login
router.post("/users/signup") // 사용자 회원가입
router.post("/users/signin") // 사용자 로그인

module.exports = router
