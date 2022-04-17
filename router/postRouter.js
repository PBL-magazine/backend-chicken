const postController = require("../controllers/postControllers")
const router = require("express").Router()

router.post("/posts", postController.creaetPost)

router.get("/posts", postController.fetchList)

router.get("/posts/:post_id", postController.readPost)

router.put("/posts/:post_id", postController.updatePost)

router.delete("/posts/:post_id", postController.deletePost)

module.exports = router
