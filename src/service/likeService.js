const { Op } = require("sequelize")
const db = require("../models/index")

const Likes = db.likes
/*############# Service logic ###################
1. bussiness logic 이라고 하다
2. Repository( data Access 기능)
Client -> Service -> Repository -> DB
#############################################*/

class Repository {
  saveLike = async (post_id, user_id) => {
    await Likes.create({ post_id, user_id })
  }

  removeLike = async (post_id, user_id) => {
    await Likes.destroy({
      where: {
        [Op.and]: [{ post_id: post_id }, { user_id: user_id }],
      },
    })
  }

  checkLike = async (post_id, user_id) => {
    return await Likes.findOne({
      where: {
        post_id,
        user_id,
      },
    })
  }
}

const rep = new Repository()

const likeService = {
  saveCounter: async (post_id, user_id) => {
    const result = await rep.saveLike(post_id, user_id)
  },

  fetchLikesCount: async (post_id) => {
    return await Likes.count({
      where: { post_id: post_id },
    })
  },

  test: async (post_id, user_id) => {
    const result = await rep.checkLike(post_id, user_id)

    if (result) {
      await rep.removeLike(post_id, user_id)
    } else {
      await rep.saveLike(post_id, user_id)
    }

    console.log(result)
    return result
  },
}

module.exports = likeService
