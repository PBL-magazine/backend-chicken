const router = require("express").Router()
const auth = require("../auth/auth")
const LIKE_SERVICE = require("../service/likeService")

// like
// 로그인이 안되어 있으면 좋아요 불가
// 좋아요를 가지고 있는 거에 카운터를 불러오면 됨

router.put("/posts/:post_id/like", auth, async (req, res) => {
  const post_id = req.params.post_id
  const { user_id } = res.locals.info

  // await LIKE_SERVICE.saveCounter(post_id, user_id )
  // await LIKE_SERVICE.fetchLikesCount(post_id)

  await LIKE_SERVICE.toggleLike(post_id, user_id)

  res.send({ ok: true })
}) // 특정 게시물 좋아요 상태 변경

module.exports = router
