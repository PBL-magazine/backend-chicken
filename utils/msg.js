const errMsg = {
  Err401: {
    // status: "401 Unauthorized",
    // data: {
      ok: false,
      message: "로그인 필요 또는 수정 권한 없음",
    // },
  },
  Err401: {
    // status: "401 Unauthorized",
    // data: {
      ok: false,
      message: "로그인 필요 또는 삭제 권한 없음",
    // },
  },
  Err404: {
    // status: "404 Not Found",
    // data: {
      ok: false,
      message: "정보를 찾을 수 없음",
    // },
  },
  Err400: {
    // status: "400 Bad Request",
    // data: {
      ok: false,
      message: "입력 형식 확인 요망",
    // },
  },
  Err409: {
    // status: "409 Conflict",
    // data: {
      ok: false,
      message: "사용자가 이미 존재함",
    // },
  },
  Err419: {
    // status: "419 Authentication Timeout",
    // data: {
      ok: false,
      message: "토큰이 만료되었습니다",
    // },
  },
  Err500: {
    status: "500 Internal Server Error",
  },
}

const success = (row, name) => {
  return {
      ok: true,
     [name]: row,
  }
}

module.exports = { errMsg, success }
