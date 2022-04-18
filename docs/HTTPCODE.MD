# backend_chicken

## 상태코드
- 1xx (정보): 요청을 받았으며 프로세스를 계속한다
    - 100	continue
    - 101	Switching
    - 102	Processing
    - 103	Early Hints
    - 104-199	Unassigned	
- 2xx (성공): 요청을 성공적으로 받았으며 인식했고 수용하였다
    - 200	OK
    - 201	Created
    - 202	Accepted
    - 203	Non-Authoritative Information
    - 204	No Content
    - 205	Reset Content
    - 206	Partial Content
    - 207	Multi-Status
    - 208	Already Reported
    - 209-225	Unassigned
    - 226	IM Used
    - 227-299	Unassigned

- 3xx (리다이렉션): 요청 완료를 위해 추가 작업 조치가 필요하다
    - 300	Multiple Choices
    - 301	Moved Permanently
    - 302	Found
    - 303	See Other
    - 304	Not Modified
    - 305	Use Proxy
    - 306	(Unused)
    - 307	Temporary Redirect
    - 308	Permanent Redirect
    - 309-399	Unassigned	

- 4xx (클라이언트 오류): 요청의 문법이 잘못되었거나 요청을 처리할 수 없다
    - 400	Bad Request
    - 401	Unauthorized
    - 402	Payment Required
    - 403	Forbidden
    - 404	Not Found
    - 405	Method Not Allowed
    - 406	Not Acceptable
    - 407	Proxy Authentication Required
    - 408	Request Timeout
    - 409	Conflict
    - 410	Gone
    - 411	Length Required
    - 412	Precondition Failed
    - 413	Content Too Large
    - 414	URI Too Long
    - 415	Unsupported Media Type
    - 416	Range Not Satisfiable
    - 417	Expectation Failed
    - 418	(Unused)
    - 419-420	Unassigned	
    - 421	Misdirected Request
    - 422	Unprocessable Content
    - 423	Locked
    - 424	Failed Dependency
    - 425	Too Early
    - 426	Upgrade Required
    - 427	Unassigned	
    - 428	Precondition Required
    - 429	Too Many Requests
    - 430	Unassigned	
    - 431	Request Header Fields Too Large
    - 432-450	Unassigned
    - 451	Unavailable For Legal Reasons
    - 452-499	Unassigned

- 5xx (서버 오류): 서버가 명백히 유효한 요청에 대해 충족을 실패했다
    -  500	Internal Server Error
    -  501	Not Implemented
    -  502	Bad Gateway
    -  503	Service Unavailable
    -  504	Gateway Timeout
    -  505	HTTP Version Not Supported
    -  506	Variant Also Negotiates
    -  507	Insufficient Storage
    -  508	Loop Detected
    -  509	Unassigned	
    -  510	Not Extended (OBSOLETED)
    -  511	Network Authentication Required
    -  512-599	Unassigned
## 작업 순서

1. 요구조건 확인
   - 게시판 형식의 블로그
2. 요구조건에 맞게 API 설정
3. ERD(Entity-Relationship DIagram)
   - [링크](https://www.erdcloud.com/ko/index.html)

## API 설계

- 게시물 전체 조회

```javascript
/*
* . 게시물 조회 /api/post GET
* . /response(success)
*/
{
"response": {
    "success": {
      "status": "200 Ok",
      "data": {
        "ok": true,
        "rows": [
          {
            "post_id": "Number",
            "content": "String",
            "image_url": "String",
            "createdAt": "Date",
            "updatedAt": "Date",
            "author": {
              "user_id": "Number",
              "email": "String",
              "nickname": "String"
            }
          }
        ]
      }
    }
  }
}
```

```javascript
//response(error)
//에러처리
{
"errors": {
      "status": "500 Internal Server Error"
    }
}
```

- 게시물 생성

```json
/*
*  게시물 생성 /api/post POST 
*/

{
  "response": {
    "success": {
      "status": "201 Created",
      "data": {
        "ok": true,
        "row": {
          "post_id": "Number",
          "content": "String",
          "image_url": "String",
          "createdAt": "Date",
          "updatedAt": "Date",
          "author": {
            "user_id": "Number",
            "email": "String",
            "nickname": "String"
          }
        }
      }
    }
  }
}
```

```json
/*
* resopnse(error)
*/

{
"errors": [
      {
        "status": "401 Unauthorized",
        "data": {
          "ok": false,
          "message": "로그인 상태가 아닙니다."
        }
      },
      {
        "status": "404 Not Found",
        "data": {
          "ok": false,
          "message": "해당 게시물 정보를 찾을 수 없습니다."
        }
      },
      {
        "status": "500 Internal Server Error"
      }
    ]
}


```

- 특정 게시물 조회

```javascript
/*
*   특정 게시물 조회 /api/posts/:post_id GET
*/
{
  "status": "200 Ok",
  "data": {
    "ok": true,
    "row": {
      "post_id": "Number",
      "content": "String",
      "image": "String",
      "createdAt": "Date",
      "updatedAt": "Date",
      "likes": "Number",
      "author": {
        "user_id": "Number",
        "email": "String",
        "nickname": "String"
      }
    }
  }
}
```

* 에러처리
```javascript
// response(error)
{
  "status": "500 Internal Server Error"
}
```
- 특정 게시물 삭제


```javascript
// response(error)
{
  "status": "500 Internal Server Error"
}
```

- 특정 게시물 수정

```javascript

```

- 사용자 회원가입

```javascript

```

- 사용자 로그인

```javascript

```

## ERD 설계

![image](https://user-images.githubusercontent.com/56494905/163545378-ffe19847-68a1-4ac1-9d87-0df35ff4c71a.png)