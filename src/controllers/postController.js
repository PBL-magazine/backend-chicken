const router = require("express").Router()
const auth = require("../auth/auth")
const POST_SERVICE = require("../service/postService")
const Message = require("../../utils/Msg")

/*############# controller ###################
컨트롤러는 데이터를 라우터 + 받아오는 
#############################################*/

// 전체 게시물 조회
router.get("/posts", async (req, res) => {
  try {
    const result = await POST_SERVICE.getAllPosts()

    // const data = result.map((el) => el.get({ plain: true }))
    // console.log(data)
    // console.log(Message.success(result,"row"))
    res.status(200).send(Message.success(result, "rows"))
    // res.status(200).send(Message.success(result))
  } catch (err) {
    res.status(500).send(Message.Err500)
  }
})

// 게시물 생성
router.post("/posts", auth, async (req, res) => {
  try {
    const { user_id } = res.locals.info
    if (!user_id) {
      res.status(401).send(Message.Err401)
    }

    const { title, content, image_url } = req.body
    if (!title && !content && !image_url) {
      res.status(400).send(Message.Err400)
    }

    POST_SERVICE.createPost({ title, content, image_url, user_id })
    res.status(200).send(Message.success())
  } catch (err) {
    res.status(500).send(Message.Err500)
  }
})

// 특정 게시물 조회
router.get("/posts/:post_id", async (req, res) => {
  try {
    const post_id = req.params.post_id
    const result = await POST_SERVICE.getPost(post_id)

    res.status(200).send(Message.success(result,"row"))
  } catch (err) {
    res.status(500).send(Message.Err500)
  }
})

// 특정 게시물 수정
router.put("/posts/:post_id", auth, async (req, res) => {
  try {
    const post_id = req.params.post_id

    const { title, content, image_url } = req.body
    if (!title && !content && !image_url) {
      await POST_SERVICE.updatePost(post_id, { title, content, image_url })
    }

    res.status(200).send(Message.success())
  } catch (err) {
    res.status(500).send(Message.Err500)
  }
})

// 특정 게시물 삭제
router.delete("/posts/:post_id/delete", auth, async (req, res) => {
  try {
    //관련되 댓글을 다 삭제 할 것인가? 생각해봐야함
    const post_id = req.params.post_id
    //파라미터가 없으면 에러

    POST_SERVICE.deletePost(post_id)

    res.status(200).send(Message.success())
  } catch (err) {
    res.status(500).send(Message.Err500)
  }
})

module.exports = router
