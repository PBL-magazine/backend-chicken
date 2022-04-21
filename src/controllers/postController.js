const router = require("express").Router()
const auth = require("../auth/auth")
const POST_SERVICE = require("../service/postService")
const Message = require("../../utils/msg")
const multer = require("multer")
const path = require("path")

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname))
    },
  }),
})
/*############# controller ###################
컨트롤러는 데이터를 라우터 + 받아오는 
#############################################*/

// 전체 게시물 조회
router.get("/posts", async (req, res) => {
  try {
    const result = await POST_SERVICE.getAllPosts()

    res.status(200).send(Message.success(result, "rows"))
  } catch (err) {
    res.status(500).send(Message.Err500)
  }
})

// 게시물 생성
router.post("/posts", auth, upload.single("image"), async (req, res) => {
  try {
    const { user_id } = res.locals.info

    if (!user_id) {
      res.status(401).send(Message.Err401)
    }

    const { content } = req.body
    const image_url = "/uploads/" + req.file.filename

    if (!content && !image_url) {
      res.status(400).send(Message.Err400)
    }

    POST_SERVICE.createPost({ content, image_url, user_id })
    res.status(200).send(Message.success())
  } catch (err) {
    console.log(err)
    res.status(500).send(Message.Err500)
  }
})

// 특정 게시물 조회
router.get("/posts/:post_id", async (req, res) => {
  try {
    const post_id = req.params.post_id
    const result = await POST_SERVICE.getPost(post_id)

    res.status(200).send(Message.success(result, "row"))
  } catch (err) {
    res.status(500).send(Message.Err500)
  }
})

// 특정 게시물 수정
router.patch("/posts/:post_id", auth, async (req, res) => {
  try {
    const post_id = req.params.post_id

    await POST_SERVICE.updatePost(req.body, post_id)

    res.status(200).send({ ok: true })
  } catch (err) {
    console.log(err)
    res.status(500).send(Message.Err500)
  }
})

// 특정 게시물 삭제
router.delete("/posts/:post_id", auth, async (req, res) => {
  try {
    //관련되 댓글을 다 삭제 할 것인가? 생각해봐야함
    const post_id = req.params.post_id

    POST_SERVICE.deletePost(post_id)

    res.status(200).send({ ok: true })
  } catch (err) {
    console.log(err)
    res.status(500).send(Message.Err500)
  }
})

module.exports = router
