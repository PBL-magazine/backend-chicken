const likeRepo = require("../Repository/likeRepo")

/*############# Service logic ###################
1. bussiness logic 이라고 하다
2. Repository( data Access 기능)
Client -> Service -> Repository -> DB
#############################################*/

const likeService = {

  toggleLike: async (post_id, user_id) => {
    const isLike = await likeRepo.checkLike(post_id, user_id)

    if (isLike) {
      await likeRepo.removeLike(post_id, user_id)
    } else {
      await likeRepo.saveLike(post_id, user_id)
    }

    return isLike
  },
}

module.exports = likeService
