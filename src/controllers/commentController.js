const router = require("express").Router()
const auth = require("../auth/auth")
const COMMENT_SERVICE = require("../service/commentService")

// 코멘트 전체 조회	/api/posts	GET
router.get("/posts/:post_id/comments", async (req, res) => {
  const post_id = parseInt(req.params.post_id)

  const result = await COMMENT_SERVICE.getAllComments(post_id)
  res.status(200).send(result)
})

// 특정 게시물에 댓글 생성
router.post("/posts/:post_id/comments", auth, async (req, res) => {
  const { user_id } = res.locals.info
  const { content } = req.body
  const post_id = parseInt(req.params.post_id)

  const result = await COMMENT_SERVICE.createComment({ user_id, post_id, content })

  res.status(200).send(result)
})

// 특정 게시물에 댓글 수정
router.put("/posts/:post_id/comments/:comment_id", auth, async (req, res) => {
  // const { user_id } = res.locals.info
  // const { post_id } = req.params.post_id
  const { comment_id } = req.params.comment_id

  await COMMENT_SERVICE.updateComment(comment_id, req.body)

  res.status(200).send("good")
})

// 특정 게시물 댓글 삭제
router.delete(
  "/posts/:post_id/comments/:comment_id",
  auth,
  async (req, res) => {
    const { comment_id } = req.params.comment_id
    await COMMENT_SERVICE.deleteComment(comment_id)
    res.status(200).send("comment deleted")
  }
)

module.exports = router
